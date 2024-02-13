import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  public _array = Array;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    // console.log(data);
  }

  get getIcon(): any {
    switch (this.data.snackType) {
      case 'Success':
        return 'done';
      case 'Error':
        return 'error';
      case 'Warning':
        return 'warning';
      case 'Info':
        return 'info';
    }
  }
}
