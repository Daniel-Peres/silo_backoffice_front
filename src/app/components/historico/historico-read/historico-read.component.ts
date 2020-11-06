import { HistoricoService } from './../../../services/historico.service';
import { Router } from '@angular/router';
import { VeiculoService } from './../../../services/veiculo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-historico-read',
  templateUrl: './historico-read.component.html',
  styleUrls: ['./historico-read.component.css']
})
export class HistoricoReadComponent implements OnInit {

  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;

  // selectedValue: string;  
  selectedData: Date = null;
  data: string;
  dia: string;
  mes: string;
  ano: string;
  veiculos = { content: [] };
  selectedVeiculo: string = "";
  // veiculosEmpresa = { content: [] };

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

  // listarTodosHistoricos(): void {
  //   this.historicoService.read('', this.pageSize, this.currentPage).subscribe(historico => {
  //     this.historicos = historico;
  //     this.totalSize = historico.totalElements;

  //     // armazenando em historicosEmpresa apenas historicos da mesma empresa do usuário
  //     this.historicosEmpresa.content = this.historicos.content.filter(x => x.veiculo.empresa.id == this.userEmpresaId);
  //     // }

  //     if (this.totalSize == 0)
  //       this.historicoService.showMessage2('Nenhum registro encontrado.')

  //     if (this.dataSource == undefined) {
  //       this.dataSource = new MatTableDataSource(this.historicos.content);
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   })
  // }

  listarTodosHistoricos(): void {
    this.historicoService.read2('', this.userEmpresaId, this.pageSize, this.currentPage).subscribe(historico => {
      this.historicos = historico;
      this.totalSize = historico.totalElements;

      this.historicosEmpresa.content = this.historicos.content;

      if (this.totalSize == 0)
        this.historicoService.showMessage2('Nenhum registro encontrado.')

      if (this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.historicos.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }


  // listarTodosHistoricosComFiltros(): void {
  //   if (this.selectedData != undefined) {
  //     this.dia = this.selectedData.getUTCDate().toString();
  //     this.dia = + this.dia < 10 ? '0' + this.dia : this.dia; // adicionando 0 em dias menores do que 10
  //     this.mes = (this.selectedData.getUTCMonth() + 1).toString();
  //     this.mes = + this.mes < 10 ? '0' + this.mes : this.mes; // adicionando 0 em dias menores do que 10
  //     this.ano = this.selectedData.getUTCFullYear().toString();
  //     this.data = this.dia + "/" + this.mes + "/" + this.ano;
  //   }

  //   this.historicoService.read('', this.pageSize, this.currentPage).subscribe(historico => {
  //     this.historicos = historico;
  //     this.totalSize = historico.totalElements;

  //     if ((this.selectedVeiculo != '') && (this.selectedData != null)) {
  //       // armazenando em historicosEmpresa apenas historicos da mesma empresa do usuário
  //       this.historicosEmpresa.content = this.historicos.content.filter(
  //         x => x.veiculo.empresa.id == this.userEmpresaId && x.datahora.match(this.data) && x.veiculo.placaVeiculo == this.selectedVeiculo);
  //     } else if ((this.selectedVeiculo == '') && (this.selectedData != null)) {
  //       this.historicosEmpresa.content = this.historicos.content.filter(
  //         x => x.veiculo.empresa.id == this.userEmpresaId && x.datahora.match(this.data));
  //     } else if ((this.selectedVeiculo != '') && (this.selectedData == null)) {
  //       this.historicosEmpresa.content = this.historicos.content.filter(
  //         x => x.veiculo.empresa.id == this.userEmpresaId && x.veiculo.placaVeiculo == this.selectedVeiculo);
  //     } else {
  //       this.historicosEmpresa.content = this.historicos.content.filter(
  //         x => x.veiculo.empresa.id == this.userEmpresaId);
  //     }

  //     if (this.totalSize == 0)
  //       this.historicoService.showMessage2('Nenhum registro encontrado.')

  //     if (this.dataSource == undefined) {
  //       this.dataSource = new MatTableDataSource(this.historicos.content);
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   })
  // }

  listarTodosHistoricosComFiltros(): void {
    if (this.selectedData != undefined) {
      this.dia = this.selectedData.getUTCDate().toString();
      this.dia = + this.dia < 10 ? '0' + this.dia : this.dia; // adicionando 0 em dias menores do que 10
      this.mes = (this.selectedData.getUTCMonth() + 1).toString();
      this.mes = + this.mes < 10 ? '0' + this.mes : this.mes; // adicionando 0 em dias menores do que 10
      this.ano = this.selectedData.getUTCFullYear().toString();
      this.data = this.dia + "/" + this.mes + "/" + this.ano;
    }

    this.historicoService.read2('', this.userEmpresaId, this.pageSize, this.currentPage).subscribe(historico => {
      this.historicos = historico;
      this.totalSize = historico.totalElements;

      if ((this.selectedVeiculo != '') && (this.selectedData != null)) {
        // armazenando em historicosEmpresa apenas historicos da mesma empresa do usuário
        this.historicosEmpresa.content = this.historicos.content.filter(
          x => x.datahora.match(this.data) && x.veiculo.placaVeiculo == this.selectedVeiculo);
      } else if ((this.selectedVeiculo == '') && (this.selectedData != null)) {
        this.historicosEmpresa.content = this.historicos.content.filter(
          x => x.datahora.match(this.data));
      } else if ((this.selectedVeiculo != '') && (this.selectedData == null)) {
        this.historicosEmpresa.content = this.historicos.content.filter(
          x => x.veiculo.placaVeiculo == this.selectedVeiculo);
      } else {
        this.historicosEmpresa.content = this.historicos.content;
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

  listarTodosVeiculos(): void {
    this.veiculoService.readGeral(this.userEmpresaId).subscribe(veiculo => {
      this.veiculos.content = veiculo;
    })
  }

  CriaPDF() {
    var minhaTabela = document.getElementById('tabela').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 20px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";
    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head>');
    win.document.write('<title>Histórico</title>');   // <title> CABEÇALHO DO PDF.
    win.document.write(style);                                     // INCLUI UM ESTILO NA TAB HEAD
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(minhaTabela);                          // O CONTEUDO DA TABELA DENTRO DA TAG BODY
    win.document.write('</body></html>');
    win.document.close(); 	                                         // FECHA A JANELA
    win.print();                                                            // IMPRIME O CONTEUDO
  }

  nivelDeLotacao(): void {
    this.router.navigate(['/nivel_lotacao']);
  }
}