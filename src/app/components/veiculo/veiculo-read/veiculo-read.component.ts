import { Veiculo } from './../../../models/veiculo.model';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-veiculo-read',
  templateUrl: './veiculo-read.component.html',
  styleUrls: ['./veiculo-read.component.css']
})
export class VeiculoReadComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  usuarios = { content: [] };
  veiculos = { content: [] };
  filter = '';
  displayedColumns = ['id', 'numeroLinha', 'modeloVeiculo', 'placaVeiculo', 'empresaId', 'empresa', 'totalLugares', 'lugaresSentados', 'lugaresEmPe', 'codEquipamento', 'action']

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.listarTodosUsuarios();
  }

  navigateToNovoVeiculo(): void {
    this.router.navigate(['veiculos/create']);
  }

  listarTodosUsuarios(): void {
    this.usuarioService.read('', this.pageSize, this.currentPage).subscribe(usuarios => {
      this.usuarios = usuarios;
      this.totalSize = usuarios.totalElements;

      if (this.totalSize == 0)
        this.usuarioService.showMessage2('Nenhum registro encontrado.')

      if (this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.usuarios.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  // listarTodosVeiculos(): void {
  //   this.veiculoService.read('', this.pageSize, this.currentPage).subscribe(veiculos => {
  //     this.veiculos = veiculos;
  //     this.totalSize = veiculos.totalElements;

  //     if (this.totalSize == 0)
  //       this.usuarioService.showMessage2('Nenhum registro encontrado.')

  //     if (this.dataSource == undefined) {
  //       this.dataSource = new MatTableDataSource(this.veiculos.content);
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   })
  // }

  getPaginatorData(event): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarTodosUsuarios();
    // this.listarTodosVeiculos();
  }

  listarUsuariosFiltro(): void {
    this.usuarioService.read(this.filter, this.pageSize, this.currentPage).subscribe(usuarios => {
      this.usuarios = usuarios;
      this.totalSize = usuarios.totalElements;

      if (this.totalSize == 0)
        this.usuarioService.showMessage2('Nenhum registro encontrado.')

      if (this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.usuarios.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  // listarVeiculosFiltro(): void {
  //   this.veiculoService.read(this.filter, this.pageSize, this.currentPage).subscribe(veiculos => {
  //     this.veiculos = veiculos;
  //     this.totalSize = veiculos.totalElements;

  //     if (this.totalSize == 0)
  //       this.veiculoService.showMessage2('Nenhum registro encontrado.')

  //     if (this.dataSource == undefined) {
  //       this.dataSource = new MatTableDataSource(this.veiculos.content);
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   })
  // }

}