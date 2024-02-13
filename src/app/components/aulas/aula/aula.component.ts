import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../../material';
import { CommonModule } from '@angular/common';
import { IAula } from '../../../core/models/Aula.interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnackbarService } from '../../../core/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFromTemplateComponent } from '../../../core/dialog/dialog-from-template/dialog-from-template.component';
import { ServicesService } from '../../../core/services/services.service';

@Component({
  selector: 'app-aula',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './aula.component.html',
  styleUrl: './aula.component.scss',
})
export class AulaComponent {
  @ViewChild('aulaDialog', { static: true })
  aulaDialog!: TemplateRef<any>;
  @Output() EventReloadData = new EventEmitter<boolean>();

  public selectedAula!: IAula | null;
  private aulaDto!: IAula;

  public dialogRef: any;

  public aulaForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    capacidad: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    equipamiento: new FormControl('', Validators.required),
  });

  constructor(
    private $snackbar: SnackbarService,
    private dialog: MatDialog,
    private $services: ServicesService
  ) {}

  openDialog(aula?: IAula) {
    this.selectedAula = null;
    if (aula) this.mapping(aula);
    else this.aulaForm.reset();
    this.dialogRef = this.dialog.open(DialogFromTemplateComponent, {
      width: '550px',
      disableClose: true,
      data: {
        element: this.selectedAula,
        template: this.aulaDialog,
      },
    });
    this.dialogRef.afterClosed().subscribe({
      next: () => {
        this.EventReloadData.emit(true);
      },
    });
  }

  mapping(aula: IAula) {
    this.selectedAula = Object.assign(aula);
    this.aulaForm.controls['nombre'].setValue(this.selectedAula?.nombre);
    this.aulaForm.controls['descripcion'].setValue(
      this.selectedAula?.descripcion
    );
    this.aulaForm.controls['capacidad'].setValue(this.selectedAula?.capacidad);
    this.aulaForm.controls['tipo'].setValue(this.selectedAula?.tipo);
    this.aulaForm.controls['equipamiento'].setValue(
      this.selectedAula?.equipamiento
    );
  }

  reverseMapping() {
    this.aulaDto = Object.assign({});
    if (this.selectedAula) this.aulaDto.id = this.selectedAula.id;
    this.aulaDto.nombre = this.aulaForm.controls['nombre'].value;
    this.aulaDto.descripcion = this.aulaForm.controls['descripcion'].value;
    this.aulaDto.capacidad = this.aulaForm.controls['capacidad'].value;
    this.aulaDto.tipo = this.aulaForm.controls['tipo'].value;
    this.aulaDto.equipamiento = this.aulaForm.controls['equipamiento'].value;
  }

  onSaveData() {
    if (this.aulaForm.valid) {
      this.reverseMapping();
      this.$services.createOrUpdateAula(this.aulaDto).subscribe({
        next: (data) => {
          this.mapping(data);
          this.$snackbar.openSuccess(
            'Operación exitosa',
            'Los cambios se han guardado satisfactoriamente'
          );
          this.dialogRef.close(true);
        },
      });
    } else {
      this.aulaForm.markAsPristine();
      this.$snackbar.openWarning(
        'Error de validación',
        'Asegurese de que ha llenado el formulario correctamente'
      );
    }
  }
}
