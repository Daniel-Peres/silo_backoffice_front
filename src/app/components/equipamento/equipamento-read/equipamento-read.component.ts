import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { VeiculoService } from './../../../services/veiculo.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-equipamento-read',
  templateUrl: './equipamento-read.component.html',
  styleUrls: ['./equipamento-read.component.css']
})
export class EquipamentoReadComponent implements OnInit {
  
  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresaId;

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
    this.listarTodosEquipamentos();
  }

  navigateToNovoEquipamento(): void {
    this.router.navigate(['equipamentos/create']);
  }

  listarTodosEquipamentos(): void {
    this.veiculoService.read('', this.pageSize, this.currentPage).subscribe(veiculo => {
        this.veiculos = veiculo;
        this.totalSize = veiculo.totalElements;
        
        // armazenando em veiculosEmpresa apenas veiculos da mesma empresa do usuário
        this.veiculosEmpresa.content = this.veiculos.content.filter(x => x.empresaId == this.userEmpresaId);
        
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
    this.listarTodosEquipamentos();
  }

  listarVeiculosFiltro(): void {
    this.veiculoService.read(this.filter, this.pageSize, this.currentPage).subscribe(veiculo => {
        this.veiculos = veiculo;
        this.totalSize = veiculo.totalElements;
        
        // armazenando em veiculosEmpresa apenas veiculos da mesma empresa do usuário
        this.veiculosEmpresa.content = this.veiculos.content.filter(x => x.empresaId == this.userEmpresaId);
        
        if (this.totalSize == 0)
          this.veiculoService.showMessage2('Nenhum registro encontrado.')

        if (this.dataSource == undefined) {
          this.dataSource = new MatTableDataSource(this.veiculos.content);
          this.dataSource.paginator = this.paginator;
        }
      })
  }
}