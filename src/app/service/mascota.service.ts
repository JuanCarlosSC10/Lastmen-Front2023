import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { const_uri } from '../constantes/const_uri';
import { MascotasModel } from '../models/mascota.model';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})

export class MascotaService {

  url = const_uri.mant_mascota;
  
  constructor(
    private _http: HttpClient,
    private _sesionservice: SesionService
  ) { }

  getAll(): Observable<MascotasModel[]> {
    return this._http.get<MascotasModel[]>(this.url);
  }

  create(mascota: MascotasModel): Observable<MascotasModel> {
    return this._http.post<MascotasModel>(this.url, mascota);
  }

  update(mascota: MascotasModel): Observable<MascotasModel> {
    return this._http.put<MascotasModel>(this.url, mascota)
  }

  delete(id: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${id}`);
  }
}