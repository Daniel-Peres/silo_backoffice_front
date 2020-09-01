import { Router } from '@angular/router';
import { UsuarioService } from './../usuario.service';
import { Usuario } from './../usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})
export class UsuarioReadComponent implements OnInit {

  usuarios: Usuario[]
  displayedColumns = ['id','codUsuario', 'nomeUsuario', 'empresa', 'codEmpresa', 'email', 'login', 'senha', 'action']

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    // this.usuarioService.read().subscribe(usuarios => {
    //   this.usuarios = usuarios
    // })
  }

  navigateToManterUsuarios(): void {
    this.router.navigate(['/usuarios/create']); 
  }

  listarTodosUsuarios(): void {
    this.usuarioService.read().subscribe(usuarios => {
      this.usuarios = usuarios
      // this.usuarioService.showMessage('Listagem de usuários realizada com sucesso!')
    })
  }

}
