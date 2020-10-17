import { EmpresaService } from './../../../services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { Component, OnInit, NgModule } from '@angular/core';
import { isNull } from '@angular/compiler/src/output/output_ast';

// interface Empresa {
//   value: string;
//   viewValue: string;
// }

@Component({
    selector: 'app-usuario-update',
    templateUrl: './usuario-update.component.html',
    styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

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
        email: '',
        jwttoken: '',
        expireAt: 0
    }

    senhaCheck: String = '';
    inputEmpresa = true;
    inputNome = true;

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
        });

        //se for o usuário admin, habilita os campos nome e empresa
        if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
            this.inputEmpresa = false;
            this.inputNome = false;
        }
    }

    updateUsuario(): void {
        this.usuario.empresa.id = this.selectedEmpresa;
        if (this.usuario.nome === 'admin') {
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
