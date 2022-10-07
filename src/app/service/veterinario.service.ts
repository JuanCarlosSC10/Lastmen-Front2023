import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { const_uri } from '../constantes/const_uri';
import { VeterinarioModel } from '../models/veterinario.model';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})

export class VeterinarioService {

  url = const_uri.mant_veterinario;
  constructor(
    private _http: HttpClient,
    private _sesionservice: SesionService
  ) { }

  getAll(): Observable<VeterinarioModel[]> {
    return this._http.get<VeterinarioModel[]>(this.url);
  }

  create(veterinario: VeterinarioModel): Observable<VeterinarioModel> {
    return this._http.post<VeterinarioModel>(this.url, veterinario);
  }

  update(veterinario: VeterinarioModel): Observable<VeterinarioModel> {
    return this._http.put<VeterinarioModel>(this.url, veterinario)
  }

  delete(id: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${id}`);
  }
}
