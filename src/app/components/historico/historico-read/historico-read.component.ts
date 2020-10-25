import { HistoricoService } from './../../../services/historico.service';
import { Router } from '@angular/router';
import { VeiculoService } from './../../../services/veiculo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-historico-read',
  templateUrl: './historico-read.component.html',
  styleUrls: ['./historico-read.component.css']
})
export class HistoricoReadComponent implements OnInit {

  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;

  // selectedValue: string;
  selectedVeiculo: string;
  veiculos = { content: [] };
  veiculosEmpresa = { content: [] };

  dataSource: MatTableDataSource<any>;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  historicos = { content: [] };
  historicosEmpresa = { content: [] };

  filter: '';

  displayedColumns = [/*'id',*/ 'datahora', 'veiculo', 'equipamento', 'qtdPassageiros', 'status' /*, 'action'*/]

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private historicoService: HistoricoService,
    private veiculoService: VeiculoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarTodosHistoricos();
    this.listarTodosVeiculos();
  }

  navigateToNovoVeiculo(): void {
    // this.router.navigate(['veiculos/create']);
  }

  listarTodosHistoricos(): void {
    this.historicoService.read('', this.pageSize, this.currentPage).subscribe(historico => {
      this.historicos = historico;
      this.totalSize = historico.totalElements;

      // se Se o usuario for o admin, mostra todos os usuários de todas as empresas
      if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
        this.historicosEmpresa.content = this.historicos.content;
      } else {
        // armazenando em historicosEmpresa apenas historicos da mesma empresa do usuário
        this.historicosEmpresa.content = this.historicos.content.filter(x => x.veiculo.empresa.id == this.userEmpresaId);
      }

      if (this.totalSize == 0)
        this.historicoService.showMessage2('Nenhum registro encontrado.')

      if (this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.historicos.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  listarTodosHistoricosPorVeiculo(): void {
    this.historicoService.read('', this.pageSize, this.currentPage).subscribe(historico => {
      this.historicos = historico;
      this.totalSize = historico.totalElements;

      // se Se o usuario for o admin, mostra todos os usuários de todas as empresas
      if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
        this.historicosEmpresa.content = this.historicos.content;
      } else {
        // armazenando em historicosEmpresa apenas historicos da mesma empresa do usuário
        this.historicosEmpresa.content = this.historicos.content.filter(
          x => x.veiculo.empresa.id == this.userEmpresaId && x.veiculo.placaVeiculo == this.selectedVeiculo);
      }

      if (this.totalSize == 0)
        this.historicoService.showMessage2('Nenhum registro encontrado.')

      if (this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.historicos.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }


  getPaginatorData(event): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarTodosHistoricos();
  }

  

  listarHistoricosFiltro(): void {
    this.historicoService.read(this.filter, this.pageSize, this.currentPage).subscribe(historico => {
      this.historicos = historico;
      this.totalSize = historico.totalElements;

      // se Se o usuario for o admin, mostra todos os usuários de todas as empresas
      if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
        this.historicosEmpresa.content = this.historicos.content;
      } else {
        // armazenando em historicosEmpresa apenas historicos da mesma empresa do usuário
        this.historicosEmpresa.content = this.historicos.content.filter(x => x.empresa.id == this.userEmpresaId);
      }

      if (this.totalSize == 0)
        this.historicoService.showMessage2('Nenhum registro encontrado.')

      if (this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.historicos.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  listarTodosVeiculos(): void {
    this.veiculoService.read('', this.pageSize, this.currentPage).subscribe(veiculo => {
      this.veiculos = veiculo;
      this.totalSize = veiculo.totalElements;
      
      // se Se o usuario for o admin, mostra todos os usuários de todas as empresas
      if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
        this.veiculosEmpresa.content = this.veiculos.content;
      } else {
        // armazenando em veiculosEmpresa apenas veiculos da mesma empresa do usuário
        this.veiculosEmpresa.content = this.veiculos.content.filter(x => x.empresa.id == this.userEmpresaId);
      }

      if (this.totalSize == 0)
        this.veiculoService.showMessage2('Nenhum registro encontrado.')

      if (this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.veiculos.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }
}