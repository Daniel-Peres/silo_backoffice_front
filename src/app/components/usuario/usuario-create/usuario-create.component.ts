import { empty } from 'rxjs';
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
    if (this.checkCampos()) {
      this.usuarioService.showMessage2('Campos obrigatórios não preenchidos!');
    } else {
      if (this.senhaCheck === this.usuario.senha) {

        this.usuarioService.create(this.usuario).subscribe(() => {
          this.usuarioService.showMessage('Usuário criado com sucesso!');
          this.router.navigate(['/manter_usuarios']);
        });

      } else {
        this.usuarioService.showMessage2('As senhas informadas são diferentes!');
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/manter_usuarios']);
  }

  // checar campos obrigatórios vazios
  checkCampos(): Boolean {
    if (this.usuario.nome === '' ||
      this.usuario.senha === '' ||
      this.usuario.empresaId === null ||
      this.usuario.empresa === ''
    ) { return true; } else { return false; }
  }
}
