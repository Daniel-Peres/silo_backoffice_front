import { EquipamentoService } from './../../../services/equipamento.service';
import { VeiculoService } from './../../../services/veiculo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { Veiculo } from './../../../models/veiculo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-veiculo-update',
  templateUrl: './veiculo-update.component.html',
  styleUrls: ['./veiculo-update.component.css']
})
export class VeiculoUpdateComponent implements OnInit {

  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;

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
    empresa: {
      id: null,
      empresa_nome: ''
    },
    codEquipamento: '',
    numeroLinha: '',
    totalLugares: null,
    lugaresSentado: null,
    lugaresEmPe: null,
  }

  selectedEquipamento: string;
  equipamentos = { content: [] };
  equipamentosEmpresa = { content: [] };

  constructor(
    private veiculoService: VeiculoService,
    private equipamentoService: EquipamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.veiculoService.readById(id).subscribe(veiculo => {
      this.veiculo = veiculo;
      this.selectedEquipamento = veiculo.codEquipamento;
    });
    this.listarTodosVeiculos();
    this.listarTodosEquipamentos();
  }

  updateVeiculo(): void {
    // if (this.checkCampos()) { // checando campos não preenchidos
    //   this.veiculoService.showMessage2('Campos obrigatórios não podem estar vazios!');
    // } else {
    this.veiculo.codEquipamento = this.selectedEquipamento;
    this.veiculoService.update(this.veiculo).subscribe(() => {
      this.router.navigate(['/manter_veiculos']);
      this.veiculoService.showMessage('Veículo atualizado com sucesso!');
    });
    // }
  }

  cancel(): void {
    this.router.navigate(['/manter_veiculos']);
  }

  // checar campos obrigatórios vazios
  checkCampos(): Boolean {
    if (this.veiculo.placaVeiculo === '' ||
      this.veiculo.modeloVeiculo === '' ||
      // this.veiculo.empresaId === null ||
      // this.veiculo.empresa === null ||
      this.veiculo.totalLugares === null ||
      this.veiculo.lugaresSentado === null
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
        this.veiculosEmpresa.content = this.veiculos.content.filter(x => x.empresa.id == this.userEmpresaId);
      }
    })
  }

  listarTodosEquipamentos(): void {
    this.equipamentoService.read('', this.pageSize, this.currentPage).subscribe(equipamento => {
      this.equipamentos = equipamento;
      this.totalSize = equipamento.totalElements;

      // armazenando em equipamentosEmpresa apenas equipamentos da mesma empresa do usuário
      this.equipamentosEmpresa.content = this.equipamentos.content.filter(x => x.empresa.id == this.userEmpresaId);
    })
  }
}