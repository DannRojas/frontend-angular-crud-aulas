import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { ServicesService } from '../services/services.service';

export const RequestsInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const $service = inject(ServicesService);
  $service.isLoading.next(true);
  return next(request).pipe(
    finalize(() => {
      $service.isLoading.next(false);
    })
  );
};
