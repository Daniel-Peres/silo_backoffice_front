import { async } from '@angular/core/testing';
import { VeiculoService } from './../../../services/veiculo.service';
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

  // selectedValue: string;
  selectedVeiculo: string;

  dataSource: MatTableDataSource<any>;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  // usuarios = { content: [] };
  veiculos = { content: [] };
  veiculosEmpresa = { content: [] };
  filter = '';
  displayedColumns = [/*'id',*/ 'placaVeiculo', 'modeloVeiculo', 'numeroLinha', 'empresaId',/* 'empresa',*/ 'totalLugares', 'lugaresSentado', 'lugaresEmPe', 'codEquipamento', 'action']

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private veiculoService: VeiculoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarTodosVeiculos();
  }

  navigateToNovoVeiculo(): void {
    this.router.navigate(['veiculos/create']);
  }

  listarTodosVeiculos(): void {
    let userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresaId;
    this.veiculoService.read('', this.pageSize, this.currentPage).subscribe(veiculo => {
        this.veiculos = veiculo;
        this.totalSize = veiculo.totalElements;
        
        // armazenando em veiculosEmpresa apenas veiculos da mesma empresa do usuário
        this.veiculosEmpresa.content = this.veiculos.content.filter(x => x.empresaId == userEmpresaId);
        
        if (this.totalSize == 0)
          this.veiculoService.showMessage2('Nenhum registro encontrado.')

        if (this.dataSource == undefined) {
          this.dataSource = new MatTableDataSource(this.veiculos.content);
          this.dataSource.paginator = this.paginator;
        }
      })
  }

  getPaginatorData(event): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarTodosVeiculos();
  }

  listarVeiculosFiltro(): void {
    let userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresaId;
    this.veiculoService.read(this.filter, this.pageSize, this.currentPage).subscribe(veiculo => {
        this.veiculos = veiculo;
        this.totalSize = veiculo.totalElements;
        
        // armazenando em veiculosEmpresa apenas veiculos da mesma empresa do usuário
        this.veiculosEmpresa.content = this.veiculos.content.filter(x => x.empresaId == userEmpresaId);
        
        if (this.totalSize == 0)
          this.veiculoService.showMessage2('Nenhum registro encontrado.')

        if (this.dataSource == undefined) {
          this.dataSource = new MatTableDataSource(this.veiculos.content);
          this.dataSource.paginator = this.paginator;
        }
      })
  }
}