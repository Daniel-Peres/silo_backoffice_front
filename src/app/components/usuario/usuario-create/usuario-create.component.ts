import { Usuario } from './../usuario.model';
import { Router } from '@angular/router';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  usuario: Usuario = {
    empresa: '',
    email: '',
    nomeUsuario: '',
    senha: '',
    nivelAcesso: '',
    nomeCompleto: ''
  }

  constructor(private usuarioService: UsuarioService, private router: Router) { }


  ngOnInit(): void {
  }

  createUsuario(): void {
    this.usuarioService.create(this.usuario).subscribe(() => {
      this.router.navigate(['/manter_usuarios'])
    })
  }

  cancel(): void {
    this.router.navigate(['/manter_usuarios'])
  }

}
