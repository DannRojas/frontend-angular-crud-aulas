import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAula } from '../models/Aula.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private readonly _http: HttpClient) {}

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  getAulas(): Observable<IAula[]> {
    let url: string = `${environment.apiUrl}/aulas`;
    return this._http.get<IAula[]>(url);
  }

  getAula(id: number): Observable<IAula> {
    let url: string = `${environment.apiUrl}/aulas/${id}`;
    return this._http.get<IAula>(url);
  }

  deleteAula(id: number): Observable<any> {
    let url: string = `${environment.apiUrl}/aulas/${id}`;
    return this._http.delete<any>(url);
  }

  createOrUpdateAula(data: IAula): Observable<IAula> {
    let url: string;
    if (data.id) {
      url = `${environment.apiUrl}/aulas/${data.id}`;
      return this._http.put<IAula>(url, data);
    } else {
      url = `${environment.apiUrl}/aulas`;
      return this._http.post<IAula>(url, data);
    }
  }
}
