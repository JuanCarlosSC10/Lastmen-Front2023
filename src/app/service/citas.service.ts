import { Injectable } from '@angular/core';
import { const_uri } from '../constantes/const_uri';
import { Observable } from 'rxjs';
import { CitasModel }from '../models/citas.model';
import { SesionService } from './sesion.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  url=const_uri.mant_cita;

  constructor(
    private _http: HttpClient,
    private _sesionservice: SesionService
    ) { }
    getAll():Observable<CitasModel[]>{
      return this._http.get<CitasModel[]>(this.url);
    }
    create(citas: CitasModel): Observable<CitasModel> {
      return this._http.post<CitasModel>(this.url, citas);
    }
  
    update(citas: CitasModel): Observable<CitasModel> {
      return this._http.put<CitasModel>(this.url, citas)
    }
  
  
    delete(id: number): Observable<number> {
      return this._http.delete<number>(`${this.url}${id}`);
    }
}
