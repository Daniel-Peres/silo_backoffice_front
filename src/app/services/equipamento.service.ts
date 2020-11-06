import { Equipamento } from './../models/equipamento.model';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  baseListUrl = "http://localhost:8080/api/equipamento/list"
  baseReadUrl = "http://localhost:8080/api/equipamento/"
  baseCreateUrl = "http://localhost:8080/api/equipamento/"
  baseDeleteUrl = "http://localhost:8080/api/equipamento/"
  baseUpdateUrl = "http://localhost:8080/api/equipamento/"
  baseReadDisabledUrl = "http://localhost:8080/api/equipamento/disabled"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  
  create(equipamento: Equipamento): Observable<Equipamento> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
    return this.http.post<Equipamento>(this.baseCreateUrl, equipamento, { headers: httpOptions })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  readDisabled(empresaId): Observable<any> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
    let params = new HttpParams();
    params = params.append('empresaId', empresaId);
    return this.http.get<Equipamento[]>(this.baseReadDisabledUrl, { headers: httpOptions, params: params })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  read(codEquipamento, pageSize, page): Observable<any> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };

    let params = new HttpParams();
    params = params.append('codEquipamento', codEquipamento);
    params = params.append('pageSize', pageSize);
    params = params.append('page', page);
    return this.http.get<Equipamento[]>(this.baseListUrl, { headers: httpOptions, params: params })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  read2(codEquipamento, empresaId, pageSize, page): Observable<any> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };

    let params = new HttpParams();
    params = params.append('codEquipamento', codEquipamento);
    params = params.append('empresaId', empresaId);
    params = params.append('pageSize', pageSize);
    params = params.append('page', page);
    return this.http.get<Equipamento[]>(this.baseListUrl, { headers: httpOptions, params: params })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  readById(id: number): Observable<Equipamento> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
    const url = `${this.baseReadUrl}${id}`;
    return this.http.get<Equipamento>(url, { headers: httpOptions })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  update(equipamento: Equipamento): Observable<Equipamento> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
    return this.http.put<Equipamento>(this.baseUpdateUrl, equipamento, { headers: httpOptions })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  delete(id: number): Observable<Equipamento> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
    const url = `${this.baseDeleteUrl}${id}`;
    return this.http.delete(url, { headers: httpOptions })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    });
  }

  showMessage2(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['msg-error']
    });
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);

    if (e.error.message != '') {
      this.showMessage(e.error.message, true);
    } else {
      this.showMessage('Ocorreu um erro!', true);
    }
    return EMPTY;
  }
}