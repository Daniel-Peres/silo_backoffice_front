import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})
export class UsuarioReadComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  usuarios = { content: [] };
  filter = '';
  displayedColumns = ['id','nome', 'empresaId', 'empresa', 'action']
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.listarTodosUsuarios();
  }

  navigateToNovoUsuario(): void {
    this.router.navigate(['/usuarios/create']); 
  }

  listarTodosUsuarios(): void {
    this.usuarioService.read('', this.pageSize, this.currentPage).subscribe(usuarios => {
      this.usuarios = usuarios;
      this.totalSize = usuarios.totalElements;
      // this.usuarioService.showMessage('Listagem de usuários realizada com sucesso!')

      if(this.totalSize == 0)
        this.usuarioService.showMessage2('Nenhum registro encontrado.')

      if(this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.usuarios.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  getPaginatorData(event): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarTodosUsuarios();
  }

  listarUsuariosFiltro(): void {
    this.usuarioService.read(this.filter, this.pageSize, this.currentPage).subscribe(usuarios => {
      this.usuarios = usuarios;
      this.totalSize = usuarios.totalElements;
      
      if(this.totalSize == 0)
        this.usuarioService.showMessage2('Nenhum registro encontrado.')

      if(this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.usuarios.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

}
