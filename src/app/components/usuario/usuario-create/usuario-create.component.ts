import { element } from 'protractor';
import { empty } from 'rxjs';
import { Usuario } from '../../../models/usuario.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

interface Empresa {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

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
  
  //variavel de controle do campo empresa: true desabilita / false habilita
  inputEmpresa = true;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    //se for o usuário admin, habilita o campo para a escolha da empresa
    //se não for o usuário admin, desabilita e insere a empresa do usuário logado no campo empresa
    if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
      this.inputEmpresa = false;
    } else {
      this.preencheEmpresa();
    }
  }

  createUsuario(): void {
    this.usuario.empresa = this.selectedEmpresa;
    this.preencheEmpresaId();

    if (this.checkCampos()) {
      this.usuarioService.showMessage2('Campos obrigatórios não preenchidos!');
    } else {
      if (this.senhaCheck === this.usuario.senha) {

        this.usuarioService.create(this.usuario).subscribe(() => {
          this.usuarioService.showMessage('Usuário cadastrado com sucesso!');
          this.router.navigate(['/manter_usuarios']);
        });

      } else {
        this.usuarioService.showMessage2('As senhas informadas são diferentes!');
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/manter_usuarios']);
    this.preencheEmpresaId();
  }

  // checar campos obrigatórios vazios
  checkCampos(): Boolean {
    if (this.usuario.nome === '' ||
      this.usuario.senha === '' ||
      this.usuario.empresaId === null
      // this.usuario.empresa === ''
    ) { return true; } else { return false; }
  }

  preencheEmpresaId(): void {
    if (this.usuario.empresa === 'SPTrans') {
      this.usuario.empresaId = 1;
    } else if (this.usuario.empresa === 'ViaSul') {
      this.usuario.empresaId = 2;
    } else if (this.usuario.empresa === 'MoveBus') {
      this.usuario.empresaId = 3;
    } else {
      this.usuario.empresaId = 4;
    }

  }
  preencheEmpresa(): void {
    if (JSON.parse(localStorage.getItem('usuario')).empresaId === 1) {
      this.selectedEmpresa = 'SPTrans';
    } else if (JSON.parse(localStorage.getItem('usuario')).empresaId === 2) {
      this.selectedEmpresa = 'ViaSul';
    } else if (JSON.parse(localStorage.getItem('usuario')).empresaId === 3) {
      this.selectedEmpresa = 'MoveBus';
    } else {
      this.selectedEmpresa = 'TransUniao';
    }
  }
}