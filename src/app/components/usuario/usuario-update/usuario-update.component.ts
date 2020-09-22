import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { isNull } from '@angular/compiler/src/output/output_ast';

interface Empresa {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  selectedValue: string;
  selectedEmpresa: string;

  empresas: Empresa[] = [
    { value: 'SPTrans', viewValue: 'SPTrans' },
    { value: 'ViaSul', viewValue: 'ViaSul' },
    { value: 'MoveBus', viewValue: 'MoveBus' },
    { value: 'TransUniao', viewValue: 'TransUnião' },
  ];

  usuario: Usuario = {
    id: null,
    nome: '',
    senha: '',
    empresaId: null,
    empresa: '',
    email: '',
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
      this.selectedEmpresa = usuario.empresa;
    });

  }

  updateUsuario(): void {
    this.usuario.empresa = this.selectedEmpresa;
    this.preencheEmpresaId();
    if (this.usuario.nome === JSON.parse(localStorage.getItem('usuario')).nome) {
      this.usuarioService.showMessage2('Atualização não autorizada:  usuário logado');
    } else {
      if (this.checkCampos()) { // checando campos não preenchidos
        this.usuarioService.showMessage2('Campos obrigatórios não podem estar vazios!');
      } else {
        if (this.senhaCheck === this.usuario.senha || this.usuario.senha === null) {

          this.usuarioService.update(this.usuario).subscribe(() => {
            this.router.navigate(['/manter_usuarios']);
            this.usuarioService.showMessage('Usuário atualizado com sucesso!');
          });

        } else {
          this.usuarioService.showMessage2('Senhas não conferem!');
        }
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
      // this.usuario.senha === '' ||
      this.usuario.empresaId === null ||
      this.usuario.empresa === ''
    ) { return true } else { return false; }
  }

  preencheEmpresaId(): void {
    if (this.usuario.empresa === 'SPTrans') {
      this.usuario.empresaId = 1;
    } else if (this.usuario.empresa === 'ViaSul') {
      this.usuario.empresaId = 2;
    } else if (this.usuario.empresa === 'MoveBus') {
      this.usuario.empresaId = 3;
    } else if (this.usuario.empresa === 'MoveBus') { }
    else {
      this.usuario.empresaId = 4;
    }
  }
}
