import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../material';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-from-template',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dialog-from-template.component.html',
  styleUrl: './dialog-from-template.component.scss',
})
export class DialogFromTemplateComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogFromTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
