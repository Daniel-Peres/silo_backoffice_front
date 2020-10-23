import { Equipamento } from './../../../models/equipamento.model';
import { EquipamentoService } from './../../../services/equipamento.service';
import { VeiculoService } from './../../../services/veiculo.service';
import { Veiculo } from './../../../models/veiculo.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-veiculo-delete',
  templateUrl: './veiculo-delete.component.html',
  styleUrls: ['./veiculo-delete.component.css']
})
export class VeiculoDeleteComponent implements OnInit {

  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;

  veiculo: Veiculo = {
    id: null,
    modeloVeiculo: '',
    placaVeiculo: '',
    empresa: null,
    equipamento: {
      id: null
    },
    numeroLinha: '',
    totalLugares: null,
    lugaresSentado: null,
    lugaresEmPe: null,
  }

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  equipamentos = { content: [] };
  equipamentosEmpresa = { content: [] };

  //equipamento utilizado para realizar o update no status do equipamento
  equipamento: Equipamento;

  constructor(
    private veiculoService: VeiculoService,
    private equipamentoService: EquipamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.veiculoService.readById(id).subscribe(veiculo => {
      this.veiculo = veiculo;
    })

    this.listarTodosEquipamentos();
    // console.log(this.equipamentosEmpresa);
  }

  deleteVeiculo(): void {
    this.veiculoService.delete(this.veiculo.id).subscribe(() => {
      this.router.navigate(['/manter_veiculos']);
      this.veiculoService.showMessage('Veículo excluído com sucesso!');
    })

    // this.alteraEquipamentoStatusInativo();
  }

  cancel(): void {
    this.router.navigate(['/manter_veiculos']);
  }

  listarTodosEquipamentos(): void {
    this.equipamentoService.read('', this.pageSize, this.currentPage).subscribe(equipamento => {
      this.equipamentos = equipamento;
      this.totalSize = equipamento.totalElements;

      // armazenando em equipamentosEmpresa apenas equipamentos da mesma empresa do usuário
      this.equipamentosEmpresa.content = this.equipamentos.content.filter(x => x.empresa.id == this.userEmpresaId && x.statusEquipamento == 'ATIVO');
    })
  }

  updateEquipamento(): void {
    this.equipamentoService.update(this.equipamento).subscribe(() => {
      // this.router.navigate(['/manter_equipamentos']);
      this.equipamentoService.showMessage('Equipamento atualizado com sucesso!');
    });
  }

  alteraEquipamentoStatusInativo(): void {
    this.equipamentosEmpresa.content.forEach(equipamento => {
      if(equipamento.id == this.veiculo.equipamento.id){
        this.equipamento = equipamento;
      }
    });

    this.equipamento.statusEquipamento = 'INATIVO'
    // console.log(this.equipamento)
    this.updateEquipamento();    
  }

}
