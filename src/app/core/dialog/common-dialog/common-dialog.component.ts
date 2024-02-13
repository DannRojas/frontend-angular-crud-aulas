import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-common-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './common-dialog.component.html',
  styleUrl: './common-dialog.component.scss',
})
export class CommonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
