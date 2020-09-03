import { Usuario } from './../../usuario/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UsuarioService } from './../../usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private usuarioService: UsuarioService ) { }

  model: any = {};

  ngOnInit(): void {
    localStorage.removeItem('usuario');
  }

  navigateToHome(): void {
    this.router.navigate(['home']);
  }

  efetuarLogin() {
    this.usuarioService.login(this.model).pipe(first()).subscribe(resUsuario => {
      localStorage.setItem('usuario', JSON.stringify(resUsuario));
      this.router.navigate(['home']);
    }, (err) => { console.log(err); });
  }
}
