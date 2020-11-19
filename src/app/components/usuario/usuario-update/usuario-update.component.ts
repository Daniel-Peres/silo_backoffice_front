import { EmpresaService } from './../../../services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { Component, OnInit, NgModule } from '@angular/core';

interface NivelAcesso {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-usuario-update',
    templateUrl: './usuario-update.component.html',
    styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

    // informações do usuário logado
    userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;
    userName = JSON.parse(localStorage.getItem('usuario')).nome;
    userNivelAcesso = JSON.parse(localStorage.getItem('usuario')).nivelAcesso;

    nome: {};
    selectedEmpresa: number;
    empresas = { content: [] };
    public pageSize = 10;
    public currentPage = 0;
    public totalSize = 0;
    public pageSizeOptions: number[] = [5, 10, 25, 100];

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

    //niveis de acesso que aparece no DropdownList
    niveis: NivelAcesso[] = [
        { value: 'administrador', viewValue: 'Administrador' },
        { value: 'usuario', viewValue: 'Usuario' }
    ];

    //Nivel de acesso selecionado
    selectedNivelAcesso: string;

    senhaCheck: String = '';

    inputNivelAcesso = true;
    inputEmpresa = true;
    inputNome = true;
    inputSenha = true;
    inputConfirmacaoSenha = true;
    updateButtonDisabled = false;

    constructor(
        private usuarioService: UsuarioService,
        private empresaService: EmpresaService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.listarTodasEmpresas();
        const id = +this.route.snapshot.paramMap.get('id')
        this.usuarioService.readById(id).subscribe(usuario => {
            this.usuario = usuario;
            this.selectedEmpresa = usuario.empresa.id;
            this.selectedNivelAcesso = usuario.nivelAcesso;

            //Habilitar campos e botões de acordo com o nivel de acesso do usuário
            //se o usuário logado e selecionado for o admin, habilita apenas campo de senha 
            if (this.userName === 'admin' && usuario.nome === 'admin') {
                this.inputSenha = false;
                this.inputConfirmacaoSenha = false;
            }
            //se for o usuário logado for admin e selecionado não, habilita todos os campos 
            else if (this.userName === 'admin' && usuario.nome != 'admin') {
                this.inputEmpresa = false;
                this.inputNome = false;
                this.inputSenha = false;
                this.inputConfirmacaoSenha = false;
                this.inputNivelAcesso = false;
            }
            //se o usuário logado não for admin , não é o selecionado e os 2 tem nivel de admistrador, desabilita todos os campos 
            else if (this.userName != 'admin' && this.userName != usuario.nome && this.userNivelAcesso == 'administrador' && usuario.nivelAcesso == 'administrador') {
                this.inputEmpresa = true;
                this.inputNome = true;
                this.inputSenha = true;
                this.inputConfirmacaoSenha = true;
                this.updateButtonDisabled = true;
                this.usuarioService.showMessage2("Você não possui permissão para atualizar um administrador!!!");
            }
            //se o usuário logado não for admin , não é o selecionado e não tiver nivel de admistrador, desabilita todos os campos 
            else if (this.userName != usuario.nome && this.userNivelAcesso != 'administrador') {
                this.inputEmpresa = true;
                this.inputNome = true;
                this.inputSenha = true;
                this.inputConfirmacaoSenha = true;
                this.updateButtonDisabled = true;
                this.usuarioService.showMessage2("Voce não possui permissão para atualizar outro usuário!!!");
            }
            //se o usuário logado não for admin , for diferente do selecionado e tiver nivel de admistrador, habilita todos os campos menos empresa
            else if (this.userName != usuario.nome && this.userNivelAcesso === 'administrador') {
                this.inputNome = false;
                this.inputSenha = false;
                this.inputConfirmacaoSenha = false;
                this.inputNivelAcesso = false;
            }
            //se o usuário logado não for admin, e o selecionado é ele mesmo, habilita campos senha 
            else {
                this.inputSenha = false;
                this.inputConfirmacaoSenha = false;
            }

        });
    }

    updateUsuario(): void {
        this.usuario.empresa.id = this.selectedEmpresa;
        this.usuario.nivelAcesso = this.selectedNivelAcesso;

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
        if (
            this.usuario.nome === '' ||
            this.usuario.empresa.id === null ||
            this.usuario.empresa.empresa_nome === ''
        ) { return true } else { return false; }
    }
}
