import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName = JSON.parse(localStorage.getItem('usuario')).nome;
  nivelAcesso = JSON.parse(localStorage.getItem('usuario')).nivelAcesso;

  constructor() { }

  ngOnInit(): void {
  }

}

