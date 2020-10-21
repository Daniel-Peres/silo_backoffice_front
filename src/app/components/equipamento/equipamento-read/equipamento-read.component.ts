import { EquipamentoService } from './../../../services/equipamento.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-equipamento-read',
  templateUrl: './equipamento-read.component.html',
  styleUrls: ['./equipamento-read.component.css']
})
export class EquipamentoReadComponent implements OnInit {

  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;

  // selectedValue: string;
  selectedEquipamento: string;

  dataSource: MatTableDataSource<any>;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  // usuarios = { content: [] };
  equipamentos = { content: [] };
  equipamentosEmpresa = { content: [] };
  filter = '';
  displayedColumns = [/*'id',*/ 'codEquipamento', 'descricaoEquipamento', 'statusEquipamento', /*'empresaId',*/ 'empresa', 'action']
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private equipamentosService: EquipamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarTodosEquipamentos();
  }

  navigateToNovoEquipamento(): void {
    this.router.navigate(['equipamentos/create']);
  }

  listarTodosEquipamentos(): void {
    this.equipamentosService.read('', this.pageSize, this.currentPage).subscribe(equipamento => {
      this.equipamentos = equipamento;
      this.totalSize = equipamento.totalElements;

      // se Se o usuario for o admin, mostra todos os usuários de todas as empresas
      if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
        this.equipamentosEmpresa.content = this.equipamentos.content;
      } else {
        // armazenando em equipamentosEmpresa apenas equipamentos da mesma empresa do usuário
        this.equipamentosEmpresa.content = this.equipamentos.content.filter(x => x.empresa.id == this.userEmpresaId);
      }

      if (this.totalSize == 0)
        this.equipamentosService.showMessage2('Nenhum registro encontrado.')

      if (this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.equipamentos.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  getPaginatorData(event): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarTodosEquipamentos();
  }

  listarEquipamentosFiltro(): void {
    this.equipamentosService.read(this.filter, this.pageSize, this.currentPage).subscribe(equipamento => {
      this.equipamentos = equipamento;
      this.totalSize = equipamento.totalElements;

      // se Se o usuario for o admin, mostra todos os usuários de todas as empresas
      if (JSON.parse(localStorage.getItem('usuario')).nome === 'admin') {
        this.equipamentosEmpresa.content = this.equipamentos.content;
      } else {
        // armazenando em equipamentosEmpresa apenas equipamentos da mesma empresa do usuário
        this.equipamentosEmpresa.content = this.equipamentos.content.filter(x => x.empresa.id == this.userEmpresaId);
      }

      if (this.totalSize == 0)
        this.equipamentosService.showMessage2('Nenhum registro encontrado.')

      if (this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.equipamentos.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }
}