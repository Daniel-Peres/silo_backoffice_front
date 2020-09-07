import { Usuario } from './usuario.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = "http://localhost:3001/usuarios"
  baseLoginUrl = "http://localhost:8080/login"
  baseListUrl = "http://localhost:8080/api/user/list"
  baseReadUrl = "http://localhost:8080/api/user/"
  baseCreateUrl = "http://localhost:8080/api/user/"
  baseDeleteUrl = "http://localhost:8080/api/user/"
  baseUpdateUrl = "http://localhost:8080/api/user/"

  private httpOptions = { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('usuario')).token };

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  login(model) {
    return this.http.post<Usuario>(this.baseLoginUrl, model).pipe(map(obj => obj), catchError(e => this.errorHandler(e)));
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseCreateUrl, usuario)
    .pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
  read(name, pageSize, page): Observable<any> {
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('pageSize', pageSize);
    params = params.append('page', page);
    return this.http.get<Usuario[]>(this.baseListUrl, { headers: this.httpOptions, params: params})
    .pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
  readById(id: number): Observable<Usuario> {
    const url = `${this.baseReadUrl}${id}`;
    return this.http.get<Usuario>(url)
    .pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(usuario: Usuario): Observable<Usuario> {
    const url = `${this.baseUpdateUrl}${usuario.id}`;
    return this.http.put<Usuario>(url, usuario)
    .pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Usuario> {
    const url = `${this.baseDeleteUrl}${id}`;
    return this.http.delete<Usuario>(url)
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

  errorHandler(e: any): Observable<any> {
    console.log(e);
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  showMessage2(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['msg-alert'] 
    });
  }
}
