import { EmpresaService } from './../../../services/empresa.service';
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

  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;

  usuarios = { content: [] };
  empresas = { content: [] };
  usuariosEmpresa = { content: [] };
  filter = '';
  displayedColumns = [/*'id',*/'nome', /*'empresaId',*/ 'empresa', 'action']
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  constructor(private usuarioService: UsuarioService, private router: Router, private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.listarTodosUsuarios();
    this.listarTodasEmpresas();

  }

  navigateToNovoUsuario(): void {
    this.router.navigate(['/usuarios/create']);
  }

  listarTodasEmpresas(): void {

    this.empresaService.read('', this.pageSize, this.currentPage).subscribe(empresa => {
      this.empresas = empresa;
      this.totalSize = empresa.totalElements;
      console.log(empresa);

      if (this.totalSize == 0)
        this.empresaService.showMessage2('Nenhum registro encontrado.')

      if (this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.empresas.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  // listarTodosUsuarios(): void {

  //   this.usuarioService.read('', this.pageSize, this.currentPage).subscribe(usuarios => {
  //     this.usuarios = usuarios;
  //     console.log(usuarios);
  //     this.totalSize = usuarios.totalElements;

  //    // se Se o usuario for o admin, mostra todos os usuários de todas as empresas
  //     if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
  //       this.usuariosEmpresa.content = this.usuarios.content;
  //     } else {
  //       // armazenando em veiculosEmpresa apenas veiculos da mesma empresa do usuário
  //       this.usuariosEmpresa.content = this.usuarios.content.filter(x => x.empresa.id == this.userEmpresaId);
  //     }

  //     if (this.totalSize == 0)
  //       this.usuarioService.showMessage2('Nenhum registro encontrado.')

  //     if (this.dataSource == undefined) {
  //       this.dataSource = new MatTableDataSource(this.usuarios.content);
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   })
  // }

  listarTodosUsuarios(): void {

    if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {

      this.usuarioService.read('', this.pageSize, this.currentPage).subscribe(usuarios => {
        this.usuarios = usuarios;
        this.totalSize = usuarios.totalElements;

        this.usuariosEmpresa.content = this.usuarios.content;

        if (this.totalSize == 0)
          this.usuarioService.showMessage2('Nenhum registro encontrado.')

        if (this.dataSource == undefined) {
          this.dataSource = new MatTableDataSource(this.usuarios.content);
          this.dataSource.paginator = this.paginator;
        }
      })
    } else {
      this.usuarioService.readEmpresa('', this.userEmpresaId, this.pageSize, this.currentPage).subscribe(usuarios => {
        this.usuarios = usuarios;
        this.totalSize = usuarios.totalElements;


        // armazenando em veiculosEmpresa apenas veiculos da mesma empresa do usuário
        this.usuariosEmpresa.content = this.usuarios.content;


        if (this.totalSize == 0)
          this.usuarioService.showMessage2('Nenhum registro encontrado.')

        if (this.dataSource == undefined) {
          this.dataSource = new MatTableDataSource(this.usuarios.content);
          this.dataSource.paginator = this.paginator;
        }
      })
    }
  }

  listarUsuariosFiltro(): void {

    if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {

      this.usuarioService.read(this.filter, this.pageSize, this.currentPage).subscribe(usuarios => {
        this.usuarios = usuarios;
        this.totalSize = usuarios.totalElements;

        this.usuariosEmpresa.content = this.usuarios.content;

        if (this.totalSize == 0)
          this.usuarioService.showMessage2('Nenhum registro encontrado.')

        if (this.dataSource == undefined) {
          this.dataSource = new MatTableDataSource(this.usuarios.content);
          this.dataSource.paginator = this.paginator;
        }
      })

    } else {

      this.usuarioService.readEmpresa(this.filter, this.userEmpresaId, this.pageSize, this.currentPage).subscribe(usuarios => {
        this.usuarios = usuarios;
        this.totalSize = usuarios.totalElements;


        // armazenando em veiculosEmpresa apenas veiculos da mesma empresa do usuário
        this.usuariosEmpresa.content = this.usuarios.content;


        if (this.totalSize == 0)
          this.usuarioService.showMessage2('Nenhum registro encontrado.')

        if (this.dataSource == undefined) {
          this.dataSource = new MatTableDataSource(this.usuarios.content);
          this.dataSource.paginator = this.paginator;
        }
      })

    }
  }

  getPaginatorData(event): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarTodosUsuarios();
  }

  // listarUsuariosFiltro(): void {

  //   this.usuarioService.read(this.filter, this.pageSize, this.currentPage).subscribe(usuarios => {
  //     this.usuarios = usuarios;
  //     this.totalSize = usuarios.totalElements;

  //     // se Se o usuario for o adminmostra todos os usuários de todas as empresas
  //     if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
  //       this.usuariosEmpresa.content = this.usuarios.content;
  //     } else {
  //       // armazenando em veiculosEmpresa apenas veiculos da mesma empresa do usuário
  //       this.usuariosEmpresa.content = this.usuarios.content.filter(x => x.empresa.id == this.userEmpresaId);
  //     }

  //     if (this.totalSize == 0)
  //       this.usuarioService.showMessage2('Nenhum registro encontrado.')

  //     if (this.dataSource == undefined) {
  //       this.dataSource = new MatTableDataSource(this.usuarios.content);
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   })
  // }

  // listarUsuariosFiltro(): void {

  //   this.usuarioService.read('this.filter', this.pageSize, this.currentPage).subscribe(usuarios => {
  //     this.usuarios = usuarios;
  //     this.totalSize = usuarios.totalElements;


  //     // armazenando em veiculosEmpresa apenas veiculos da mesma empresa do usuário
  //     this.usuariosEmpresa.content = this.usuarios.content;


  //     if (this.totalSize == 0)
  //       this.usuarioService.showMessage2('Nenhum registro encontrado.')

  //     if (this.dataSource == undefined) {
  //       this.dataSource = new MatTableDataSource(this.usuarios.content);
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   })
  // }

}
