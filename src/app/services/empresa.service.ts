import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  baseListUrl = "http://localhost:8080/api/empresa/list"
  baseReadUrl = "http://localhost:8080/api/empresa/"
  baseCreateUrl = "http://localhost:8080/api/empresa/"
  baseDeleteUrl = "http://localhost:8080/api/empresa/"
  baseUpdateUrl = "http://localhost:8080/api/empresa/"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  read(empresaNome, pageSize, page): Observable<any> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };

    let params = new HttpParams();
    params = params.append('empresaNome', empresaNome);
    params = params.append('pageSize', pageSize);
    params = params.append('page', page);
    return this.http.get<Empresa[]>(this.baseListUrl, { headers: httpOptions, params: params })
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );
  }

  readById(id: number): Observable<Empresa> {
    let httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };
    const url = `${this.baseReadUrl}${id}`;
    return this.http.get<Empresa>(url, { headers: httpOptions })
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

  errorHandlerLogin(e: any): Observable<any> {
    console.log(e);
    this.showMessage('Usuário e Senha não cadastrados ou inválidos!', true);
    return EMPTY;
  }

}
