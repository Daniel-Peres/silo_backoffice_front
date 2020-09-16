import { Veiculo } from './../models/veiculo.model';
import { Injectable } from '@angular/core';

import { Usuario } from '../models/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  baseUrl = "http://localhost:3001/usuarios"
  baseLoginUrl = "http://localhost:8080/login"
  baseListUrl = "http://localhost:8080/api/user/list"
  baseReadUrl = "http://localhost:8080/api/user/"
  baseCreateUrl = "http://localhost:8080/api/user/"
  baseDeleteUrl = "http://localhost:8080/api/user/"
  baseUpdateUrl = "http://localhost:8080/api/user/"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  
  create(veiculo: Veiculo): Observable<Veiculo> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
    return this.http.post<Veiculo>(this.baseCreateUrl, veiculo, { headers: httpOptions })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  read(name, pageSize, page): Observable<any> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };

    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('pageSize', pageSize);
    params = params.append('page', page);
    return this.http.get<Veiculo[]>(this.baseListUrl, { headers: httpOptions, params: params })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  readById(id: number): Observable<Veiculo> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
    const url = `${this.baseReadUrl}${id}`;
    return this.http.get<Veiculo>(url, { headers: httpOptions })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  update(veiculo: Veiculo): Observable<Veiculo> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
    //const url = `${this.baseUpdateUrl}${veiculo.id}`;
    return this.http.put<Veiculo>(this.baseUpdateUrl, veiculo, { headers: httpOptions })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  delete(id: number): Observable<Veiculo> {
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
      panelClass: ['msg-alert']
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

  errorHandlerLogin(e: any): Observable<any> {
    console.log(e);
    this.showMessage('Usuário e Senha não cadastrados ou inválidos!', true);
    return EMPTY;
  }
}