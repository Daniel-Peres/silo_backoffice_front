import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../usuario.service';
import { Usuario } from './../usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

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

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.usuarioService.readById(id).subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  updateUsuario(): void {
    if (this.checkCampos()) { // checando campos não preenchidos
      this.usuarioService.showMessage2('Campos obrigatórios não podem estar vazios!');
    } else {
      if (this.senhaCheck === this.usuario.senha) {

        this.usuarioService.update(this.usuario).subscribe(() => {
          this.router.navigate(['/manter_usuarios']);
          this.usuarioService.showMessage('Usuário atualizado com sucesso!');
        });

      } else {
        this.usuarioService.showMessage2('Senhas não conferem!');
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/manter_usuarios']);
  }

  // checar campos obrigatórios vazios
  checkCampos(): Boolean {
    if (
      this.usuario.nome === '' ||
      this.usuario.senha === '' ||
      this.usuario.empresaId === null ||
      this.usuario.empresa === ''
    ) { return true } else { return false; }
  }

}
