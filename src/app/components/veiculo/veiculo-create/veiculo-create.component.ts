import { EquipamentoService } from './../../../services/equipamento.service';
import { Router } from '@angular/router';
import { VeiculoService } from './../../../services/veiculo.service';
import { Veiculo } from './../../../models/veiculo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-veiculo-create',
  templateUrl: './veiculo-create.component.html',
  styleUrls: ['./veiculo-create.component.css']
})
export class VeiculoCreateComponent implements OnInit {

  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresaId;


  selectedVeiculo: string;
  veiculos = { content: [] };
  veiculosEmpresa = { content: [] };
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];


  veiculo: Veiculo = {
    id: null,
    modeloVeiculo: '',
    placaVeiculo: '',
    empresa: '',
    empresaId: null,
    codEquipamento: '',
    numeroLinha: '',
    totalLugares: null,
    lugaresSentado: null,
    lugaresEmPe: null,
  }

  selectedEquipamento: string;
  equipamentos = { content: [] };
  equipamentosEmpresa = { content: [] };

  constructor(private veiculoService: VeiculoService,
    private equipamentoService: EquipamentoService,
    private router: Router
  ) {
    // atribuindo valor retirado do JWT
    this.veiculo.empresaId = JSON.parse(localStorage.getItem('usuario')).empresaId;
  }


  ngOnInit(): void {
    this.listarTodosVeiculos();
    this.preencheEmpresa();
    this.listarTodosEquipamentos();
  }

  createVeiculo(): void {
    if (this.checkCampos()) {
      this.veiculoService.showMessage2('Campos obrigatórios não preenchidos!');
    } else {
      this.veiculo.codEquipamento = this.selectedEquipamento;
      this.veiculoService.create(this.veiculo).subscribe(() => {
        this.veiculoService.showMessage('Veículo cadastrado com sucesso!');
        this.router.navigate(['/manter_veiculos']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/manter_veiculos']);
  }

  // checar campos obrigatórios vazios
  checkCampos(): Boolean {
    if (this.veiculo.placaVeiculo === '' ||
      this.veiculo.modeloVeiculo === '' ||
      this.veiculo.totalLugares === null ||
      this.veiculo.lugaresSentado === null
      // this.veiculo.empresaId === null ||
      // this.veiculo.empresa === null
    ) { return true; } else { return false; }
  }

  calculaLugaresEmPe(): void {
    // limitando o numero de pessoas sentadas à lotação máxima
    if (this.veiculo.totalLugares <= this.veiculo.lugaresSentado) {
      this.veiculo.lugaresSentado = this.veiculo.totalLugares;
    }
    this.veiculo.lugaresEmPe = this.veiculo.totalLugares - this.veiculo.lugaresSentado;
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
        this.veiculosEmpresa.content = this.veiculos.content.filter(x => x.empresaId == this.userEmpresaId);
      }
    })
  }

  preencheEmpresa(): void {
    if (JSON.parse(localStorage.getItem('usuario')).empresaId === 1) {
      this.veiculo.empresa = 'SPTrans';
    } else if (JSON.parse(localStorage.getItem('usuario')).empresaId === 2) {
      this.veiculo.empresa = 'ViaSul';
    } else if (JSON.parse(localStorage.getItem('usuario')).empresaId === 3) {
      this.veiculo.empresa = 'MoveBus';
    } else {
      this.veiculo.empresa = 'TransUniao';
    }
  }

  listarTodosEquipamentos(): void {
    this.equipamentoService.read('', this.pageSize, this.currentPage).subscribe(equipamento => {
      this.equipamentos = equipamento;
      this.totalSize = equipamento.totalElements;

      // armazenando em equipamentosEmpresa apenas equipamentos da mesma empresa do usuário
      this.equipamentosEmpresa.content = this.equipamentos.content.filter(x => x.empresaId == this.userEmpresaId);
    })
  }
}
