import { UsuarioService } from './../../services/usuario.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
    }
  // }

}
