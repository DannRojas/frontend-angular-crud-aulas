import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, action: string, snackType?: string) {
    const _snackType: string = snackType !== undefined ? snackType : 'Success';
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
      data: { message: message, snackType: _snackType },
    });
  }

  public openInfo(title: string, message?: string, duration?: number) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: duration ? duration : 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['info-snackbar'],
      data: { title, message, snackType: 'Info' },
    });
  }
  public openSuccess(title: string, message?: string, duration?: number) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: duration ? duration : 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
      data: { title, message, snackType: 'Success' },
    });
  }
  public openWarning(title: string, message?: string, duration?: number) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: duration ? duration : 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['warning-snackbar'],
      data: { title, message, snackType: 'Warning' },
    });
  }
  public openDanger(
    title: string,
    message?: string | Array<string>,
    duration?: number
  ) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: duration ? duration : 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
      data: { title, message, snackType: 'Error' },
    });
  }
}
