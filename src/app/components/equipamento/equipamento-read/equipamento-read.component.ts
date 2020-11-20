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

  selectedEquipamento: string;

  dataSource: MatTableDataSource<any>;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  equipamentos = { content: [] };
  equipamentosEmpresa = { content: [] };
  filter = '';
  displayedColumns = ['codEquipamento', 'descricaoEquipamento', 'statusEquipamento', 'empresa', 'action']
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];

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
    this.equipamentosService.read2('', this.userEmpresaId, this.pageSize, this.currentPage).subscribe(equipamento => {
      this.equipamentos = equipamento;
      this.totalSize = equipamento.totalElements;


      // armazenando em equipamentosEmpresa apenas equipamentos da mesma empresa do usuário
      this.equipamentosEmpresa.content = this.equipamentos.content;


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
    this.equipamentosService.read2(this.filter, this.userEmpresaId, this.pageSize, this.currentPage).subscribe(equipamento => {
      this.equipamentos = equipamento;
      this.totalSize = equipamento.totalElements;

      // armazenando em equipamentosEmpresa apenas equipamentos da mesma empresa do usuário
      this.equipamentosEmpresa.content = this.equipamentos.content;


      if (this.totalSize == 0)
        this.equipamentosService.showMessage2('Nenhum registro encontrado.')

      if (this.dataSource == undefined) {
        this.dataSource = new MatTableDataSource(this.equipamentos.content);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

}