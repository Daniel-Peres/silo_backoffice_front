import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css']
})
export class MenuButtonComponent implements OnInit {

  // Admin só pode gerenciar usuários ficando com outros botões desabilitados
  //variavel de controle dos botões: true desabilita / false habilita
  adminButtons = true;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
      this.adminButtons = true;
    } else {
      this.adminButtons = false;
    }
  }

  navigateToHome(): void {
    this.router.navigate(['home']);
  }
  navigateToManterVeiculos(): void {
    // if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
    //   this.usuarioService.showMessage2('Um administrador só pode gerenciar usuários');
    // } else {
      this.router.navigate(['manter_veiculos']);
    // }
  }
  navigateToManterEquipamentos(): void {
    // if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
    //   this.usuarioService.showMessage2('Um administrador só pode gerenciar usuários');
    // } else {
      this.router.navigate(['manter_equipamentos']);
    // }
  }
  navigateToManterUsuarios(): void {
    this.router.navigate(['manter_usuarios']);
  }
  navigateToMostrarNivelLotacao(): void {
    // if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
    //   this.usuarioService.showMessage2('Um administrador só pode gerenciar usuários');
    // } else {
      this.router.navigate(['mostrar_nivel_lotacao']);
    // }

  }
  navigateToLogin(): void {
    this.router.navigate(['login']);
  }
}
