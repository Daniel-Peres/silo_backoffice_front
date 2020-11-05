import { Historico } from './../models/historico.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  baseListUrl = "http://localhost:8080/api/historico/list"
  baseReadUrl = "http://localhost:8080/api/historico/"
  baseReadGeralUrl = "http://localhost:8080/api/historico/geral"
  baseReadStatusUrl = "http://localhost:8080/api/historico/status"
  baseCreateUrl = "http://localhost:8080/api/historico/"
  baseDeleteUrl = "http://localhost:8080/api/historico/"
  baseUpdateUrl = "http://localhost:8080/api/historico/"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  
  // create(historico: Historico): Observable<Historico> {
  //   let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
  //   return this.http.post<Historico>(this.baseCreateUrl, historico, { headers: httpOptions })
  //     .pipe(
  //       map((obj) => obj),
  //       catchError(e => this.errorHandler(e))
  //     );
  // }

  read(datahora, pageSize, page): Observable<any> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };

    let params = new HttpParams();
    params = params.append('datahora', datahora);
    params = params.append('pageSize', pageSize);
    params = params.append('page', page);
    return this.http.get<Historico[]>(this.baseListUrl, { headers: httpOptions, params: params })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  read2(datahora, empresaId, pageSize, page): Observable<any> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };

    let params = new HttpParams();
    params = params.append('datahora', datahora);
    params = params.append('empresaId', empresaId);
    params = params.append('pageSize', pageSize);
    params = params.append('page', page);
    return this.http.get<Historico[]>(this.baseListUrl, { headers: httpOptions, params: params })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  readGeral(empresaId): Observable<any> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
    let params = new HttpParams();
    params = params.append('empresaId', empresaId);
    return this.http.get<Historico[]>(this.baseReadGeralUrl, { headers: httpOptions, params: params })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  readStatus(empresaId, veiculoId): Observable<any> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
    let params = new HttpParams();
    params = params.append('empresaId', empresaId);
    params = params.append('veiculoId', veiculoId);
    return this.http.get<Historico>(this.baseReadStatusUrl, { headers: httpOptions, params: params })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  readById(id: number): Observable<Historico> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
    const url = `${this.baseReadUrl}${id}`;
    return this.http.get<Historico>(url, { headers: httpOptions })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  // update(historico: Historico): Observable<Historico> {
  //   let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
  //   return this.http.put<Historico>(this.baseUpdateUrl, historico, { headers: httpOptions })
  //     .pipe(
  //       map((obj) => obj),
  //       catchError(e => this.errorHandler(e))
  //     );
  // }

  // delete(id: number): Observable<Historico> {
  //   let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
  //   const url = `${this.baseDeleteUrl}${id}`;
  //   return this.http.delete(url, { headers: httpOptions })
  //     .pipe(
  //       map((obj) => obj),
  //       catchError(e => this.errorHandler(e))
  //     );
  // }

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