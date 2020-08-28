import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css']
})
export class MenuButtonComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  navigateToHome(): void {
    this.router.navigate(['home']);
  }
  navigateToManterVeiculos(): void {
    this.router.navigate(['manter_veiculos']);
  }
  navigateToManterEquipamentos(): void {
    this.router.navigate(['manter_equipamentos']);
  }
  navigateToManterUsuarios(): void {
    this.router.navigate(['manter_usuarios']);
  }
  navigateToMostrarNivelLotacao(): void {
    this.router.navigate(['mostrar_nivel_lotacao']);
  }
  navigateToLogin(): void {
    this.router.navigate(['login']);
  }   
}
