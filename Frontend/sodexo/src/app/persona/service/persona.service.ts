import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Comuna } from '../class/comuna/comuna';
import { Persona } from '../class/persona';
import { ResponsePersona } from '../class/response-persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  baseUrl = `${environment.URL_BASE}/persona`

  constructor(private http: HttpClient) { }

  getComunas(): Observable<Comuna[]>{
    return this.http.get<Comuna[]>(`${this.baseUrl}/comunas`);
  }

  getListPersonas(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getPersona(id: number): Observable<ResponsePersona>{
    return this.http.get<ResponsePersona>(`${this.baseUrl}/get/${id}`).pipe(
      map((response: any) => {
        let respuesta: ResponsePersona = new ResponsePersona;
        respuesta.persona = response.persona,
        respuesta.mensaje = response.mensaje

        return respuesta;
      })
    );

  }

  createPersona(persona: Persona): Observable<ResponsePersona>{
    return this.http.post<ResponsePersona>(`${this.baseUrl}`, persona).pipe(
      map((response: any) => {
        let respuesta: ResponsePersona = new ResponsePersona;
        respuesta.persona = response.persona as Persona,
        respuesta.mensaje = response.mensaje as string

        return respuesta
      }),
      catchError((e:any) => {
        if(e.status == 404){
          return throwError(e);
        }
        return throwError(e);
      })
    )
  }

  updatePersona(persona: Persona, id: number): Observable<ResponsePersona>{
    return this.http.put<ResponsePersona>(`${this.baseUrl}/update/${id}`, persona)
    .pipe(
      map((response: any) => {
        let respuesta: ResponsePersona = new ResponsePersona
        respuesta.persona = response.persona,
        respuesta.mensaje = response.mensaje

        return respuesta;
      }),
      catchError((e:any) => {
        if(e.status == 404){
          return throwError(e);
        }
        return throwError(e);
      })
    )
  }

  deletePersona(id: number): Observable<ResponsePersona>{
    return this.http.delete<ResponsePersona>(`${this.baseUrl}/delete/${id}`).pipe(
      map((response: any) => {
        let respuesta: ResponsePersona = new ResponsePersona;
        respuesta.mensaje = response.mensaje

        return respuesta;
      }),
      catchError((e:any) => {
        if(e.status == 404){
          return throwError(e);
        }
        return throwError(e);
      })
    )
  }

}
