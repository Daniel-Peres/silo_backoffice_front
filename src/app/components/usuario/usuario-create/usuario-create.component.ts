import { EmpresaService } from './../../../services/empresa.service';
import { element } from 'protractor';
import { empty } from 'rxjs';
import { Usuario } from '../../../models/usuario.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

interface NivelAcesso {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-usuario-create',
    templateUrl: './usuario-create.component.html',
    styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

    userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;

    usuarios = { content: [] };
    usuariosEmpresa = { content: [] };
    public pageSize = 10;
    public currentPage = 0;
    public totalSize = 0;
    public pageSizeOptions: number[] = [5, 10, 25, 100];

    empresas = { content: [] };
    selectedEmpresa: number;

    usuario: Usuario = {
        id: null,
        nome: '',
        senha: '',
        empresa: {
            id: null,
            empresa_nome: ''
        },
        nivelAcesso: '',
        email: '',
        jwttoken: '',
        expireAt: 0
    }

    niveis: NivelAcesso[] = [
        { value: 'administrador', viewValue: 'Administrador' },
        { value: 'usuario', viewValue: 'Usuario' }
    ];

    selectedNivelAcesso: string;

    senhaCheck: String = '';

    //variavel de controle do campo empresa: true desabilita / false habilita
    inputEmpresa = true;
    //variavel de controle do campo nivelAcesso: true desabilita / false habilita
    inputNivelAcesso = true;

    constructor(private usuarioService: UsuarioService,
        private router: Router,
        private empresaService: EmpresaService) { }

    ngOnInit(): void {
        //se for o usuário admin, habilita o campo para a escolha da empresa
        //se não for o usuário admin, desabilita e insere a empresa do usuário logado no campo empresa
        if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
            this.inputEmpresa = false;
            this.inputNivelAcesso = false;
        } else {
            this.selectedEmpresa = JSON.parse(localStorage.getItem('usuario')).empresa.id;
            this.inputNivelAcesso = false;
        }
        this.listarTodasEmpresas();
    }

    createUsuario(): void {
        this.usuario.empresa.id = this.selectedEmpresa;
        this.usuario.nivelAcesso = this.selectedNivelAcesso;

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
    }

    listarTodasEmpresas(): void {
        this.empresaService.read('', this.pageSize, this.currentPage).subscribe(empresa => {
            this.empresas = empresa;
            this.totalSize = empresa.totalElements;
        })
    }

    // checar campos obrigatórios vazios
    checkCampos(): Boolean {
        if (this.usuario.nome === '' ||
            this.usuario.senha === '' ||
            this.usuario.nivelAcesso === undefined
            // this.usuario.empresa.id === null
            // this.usuario.empresa === ''
        ) { return true; } else { return false; }
    }
}