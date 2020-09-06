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
    id: null,
    nome: '',
    senha: '',
    empresaId: null,
    empresa: '',
    email: '',
    // login: '',
    jwttoken: '',
    expireAt: 0
  }
  
  senhaCheck: String = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }


  ngOnInit(): void {
  }

  createUsuario(): void {
    if (this.senhaCheck === this.usuario.senha) {
      this.usuarioService.create(this.usuario).subscribe(() => {
        this.usuarioService.showMessage('Usuário criado com sucesso!')
        this.router.navigate(['/manter_usuarios'])
      });
    } else {
      alert('Senhas não conferem');
    }
  }

  cancel(): void {
    this.router.navigate(['/manter_usuarios'])
  }
}
