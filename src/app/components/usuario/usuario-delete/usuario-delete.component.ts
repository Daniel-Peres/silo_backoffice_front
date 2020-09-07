import { Usuario } from './../usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {

  // usuario: Usuario
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

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.usuarioService.readById(id).subscribe(usuario => {
    //   this.usuario = usuario;
    // })
  }

  deleteUsuario(): void {
    this.usuarioService.delete(this.usuario.id).subscribe(() => {
      this.router.navigate(['/manter_usuarios']);
      this.usuarioService.showMessage('Usuário apagado com sucesso!');
    })
  }

  cancel(): void {
    this.router.navigate(['/manter_usuarios']);
  }

}
