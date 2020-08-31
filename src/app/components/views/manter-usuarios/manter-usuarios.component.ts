import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manter-usuarios',
  templateUrl: './manter-usuarios.component.html',
  styleUrls: ['./manter-usuarios.component.css']
})
export class ManterUsuariosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // navigateToManterUsuarios(): void {
  //   this.router.navigate(['/usuarios/create']); 
  // }

}
