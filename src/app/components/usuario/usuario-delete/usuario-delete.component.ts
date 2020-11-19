import { Usuario } from '../../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-usuario-delete',
    templateUrl: './usuario-delete.component.html',
    styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {

    // informações do usuário logado
    userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;
    userName = JSON.parse(localStorage.getItem('usuario')).nome;
    userNivelAcesso = JSON.parse(localStorage.getItem('usuario')).nivelAcesso;

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

    buttonExcluirDisabled = true;

    constructor(
        private usuarioService: UsuarioService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.usuarioService.readById(id).subscribe(usuario => {
            this.usuario = usuario;


            //Habilitar campos e botões de acordo com o nivel de acesso do usuário
            //se o usuário logado e selecionado for o admin, desabilita botão atualizar 
            if (this.userName === 'admin' && usuario.nome === 'admin') {
                this.buttonExcluirDisabled = true;
                this.usuarioService.showMessage2('Exclusão não autorizada:  usuário logado');
            }
            //se for o usuário logado for admin e selecionado não, habilita botão atualizar  
            else if (this.userName === 'admin' && usuario.nome != 'admin') {
                this.buttonExcluirDisabled = false;
            }
            //se o usuário logado não for admin , não é o selecionado e os 2 tem nivel de admistrador, desabilita botão atualizar  
            else if (this.userName != 'admin' && this.userName != usuario.nome && this.userNivelAcesso == 'administrador' && usuario.nivelAcesso == 'administrador') {
                this.buttonExcluirDisabled = true;
                this.usuarioService.showMessage2("Voce não possui permissão para excluir outro administrador!!!");
            }
            //se o usuário logado não for admin , não é o selecionado e não tiver nivel de admistrador, desabilita botão atualizar  
            else if (this.userName != usuario.nome && this.userNivelAcesso != 'administrador') {
                this.buttonExcluirDisabled = true;
                this.usuarioService.showMessage2("Voce não possui permissão para excluir outro usuário!!!");
            }
            //se o usuário logado não for admin , for diferente do selecionado e tiver nivel de admistrador, habilita botão atualizar 
            else if (this.userName != usuario.nome && this.userNivelAcesso === 'administrador') {
                this.buttonExcluirDisabled = false;
            }
            //se o usuário logado não for admin, e o selecionado é ele mesmo, desabilita botão atualizar  
            else {
                this.buttonExcluirDisabled = true;
                this.usuarioService.showMessage2('Exclusão não autorizada:  usuário logado');
            }
        })
    }

    deleteUsuario(): void {
        if (this.usuario.nome === JSON.parse(localStorage.getItem('usuario')).nome) {
            this.usuarioService.showMessage2('Exclusão não autorizada:  usuário logado');
        } else {
            this.usuarioService.delete(this.usuario.id).subscribe(() => {
                this.router.navigate(['/manter_usuarios']);
                this.usuarioService.showMessage('Usuário excluído com sucesso!');
            })
        }
    }

    cancel(): void {
        this.router.navigate(['/manter_usuarios']);
    }

}
