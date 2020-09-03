import { Usuario } from './../usuario.model';
import { Router } from '@angular/router';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  usuario: Usuario = {
    codUsuario: null,
    nomeUsuario: '',
    empresa: '',
    codEmpresa: null,
    email: '',
    login: '',
    senha: '',
    jwttoken: '',
    expireAt: 0,
    id: 0
  }

  constructor(private usuarioService: UsuarioService, private router: Router) { }


  ngOnInit(): void {
  }

  createUsuario(): void {
    this.usuarioService.create(this.usuario).subscribe(() => {
      this.usuarioService.showMessage('Usuário criado com sucesso!')
      this.router.navigate(['/manter_usuarios'])
    })
  }

  cancel(): void {
    this.router.navigate(['/manter_usuarios'])
  }

}
