import { Equipamento } from './../../../models/equipamento.model';
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
    equipamento: {
      id: null
    },
    numeroLinha: '',
    totalLugares: null,
    lugaresSentado: null,
    lugaresEmPe: null,
  }

  selectedEquipamento: number;
  equipamentos = { content: [] };
  equipamentosEmpresa = { content: [] };

  // equipamento: Equipamento = {
  //   id: null,
  //   codEquipamento: '',
  //   descricaoEquipamento: '',
  //   statusEquipamento: '',
  //   empresa: {
  //     id: null,
  //     empresa_nome: ''
  //   }    
  // }

  equipamento: Equipamento;

  
  constructor(private veiculoService: VeiculoService,
    private equipamentoService: EquipamentoService,
    private router: Router
  ) {
    // atribuindo valor retirado do JWT
    this.veiculo.empresa.id = JSON.parse(localStorage.getItem('usuario')).empresa.id;
    // this.veiculo.empresa.id = JSON.parse(localStorage.getItem('usuario')).empresa.empresa_nome;
  }

  ngOnInit(): void {
    this.listarTodosVeiculos();
    // this.preencheEmpresa();
    this.listarTodosEquipamentos();
  }

  createVeiculo(): void {
    // alert(JSON.stringify(this.equipamentosEmpresa.content.filter(x => x.id == this.selectedEquipamento)));
    // console.log(this.equipamentosEmpresa.content.filter(x => x.id == this.selectedEquipamento));
    // this.equipamento.content = this.equipamentosEmpresa.content.filter(x => x.id == this.selectedEquipamento)
    // console.log(this.equipamento.content);
    this.preencheEquipamentoStatusAtivo();


    if (this.checkCampos()) {
      this.veiculoService.showMessage2('Campos obrigatórios não preenchidos!');
    } else {
      this.veiculo.equipamento.id = this.selectedEquipamento;
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
        this.veiculosEmpresa.content = this.veiculos.content.filter(x => x.empresa.id == this.userEmpresaId);
      }
    })
  }

  listarTodosEquipamentos(): void {
    this.equipamentoService.read('', this.pageSize, this.currentPage).subscribe(equipamento => {
      this.equipamentos = equipamento;
      this.totalSize = equipamento.totalElements;

      // armazenando em equipamentosEmpresa apenas equipamentos da mesma empresa do usuário
      this.equipamentosEmpresa.content = this.equipamentos.content.filter(x => x.empresa.id == this.userEmpresaId && x.statusEquipamento == 'INATIVO');
    })
  }

  updateEquipamento(): void {
    this.equipamentoService.update(this.equipamento).subscribe(() => {
      // this.router.navigate(['/manter_equipamentos']);
      this.equipamentoService.showMessage('Equipamento atualizado com sucesso!');
    });
  }

  preencheEquipamentoStatusAtivo(): void {
    this.equipamentosEmpresa.content.forEach(equipamento => {
      if(equipamento.id == this.selectedEquipamento){
        this.equipamento = equipamento;
      }
    });

    this.equipamento.statusEquipamento = 'ATIVO'
    console.log(this.equipamento)
    this.updateEquipamento();
    
  }
}
