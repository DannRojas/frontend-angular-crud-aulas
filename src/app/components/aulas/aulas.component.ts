import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IAula } from '../../core/models/Aula.interface';
import { MaterialModule } from '../../material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServicesService } from '../../core/services/services.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../core/snackbar/snackbar.service';
import { AulaComponent } from './aula/aula.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '../../core/dialog/common-dialog/common-dialog.component';

@Component({
  selector: 'app-aulas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MaterialModule, AulaComponent],
  templateUrl: './aulas.component.html',
  styleUrl: './aulas.component.scss',
})
export class AulasComponent {
  public aulas!: IAula[];

  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'capacidad',
    'tipo',
    'equipamiento',
  ];
  dataSource!: MatTableDataSource<IAula>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(AulaComponent) public aulaComponent!: AulaComponent;

  constructor(
    private $services: ServicesService,
    private $snackbar: SnackbarService,
    public dialog: MatDialog
  ) {
    this.getData();
  }

  getData() {
    this.$services.getAulas().subscribe({
      next: (aulas: IAula[]) => {
        this.aulas = aulas;
        this.dataSource = new MatTableDataSource(this.aulas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.$snackbar.openDanger(
          'Error',
          'Ha ocurrido un error al obtener el listado de Aulas'
        );
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public deleteAula(id: number): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        icon: 'help',
        title: 'Está seguro de que desea eliminar el Aula?',
        description: 'Esta acción no puede deshacerse',
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.$services.deleteAula(id).subscribe({
          next: (data) => {
            this.getData();
            this.$snackbar.openSuccess(
              'Operación exitosa',
              'El producto se ha eliminado satisfactoriamente'
            );
          },
        });
      }
    });
  }
}
