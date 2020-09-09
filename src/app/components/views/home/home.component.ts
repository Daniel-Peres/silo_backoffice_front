import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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

}
