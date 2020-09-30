import { Router, ActivatedRoute } from '@angular/router';
import { VeiculoService } from './../../../services/veiculo.service';
import { Component, OnInit } from '@angular/core';
import { Veiculo } from 'src/app/models/veiculo.model';

@Component({
  selector: 'app-equipamento-update',
  templateUrl: './equipamento-update.component.html',
  styleUrls: ['./equipamento-update.component.css']
})
export class EquipamentoUpdateComponent implements OnInit {

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
    codEquipamento: null,
    numeroLinha: '',
    totalLugares: null,
    lugaresSentado: null,
    lugaresEmPe: null,
  }

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.veiculoService.readById(id).subscribe(veiculo => {
      this.veiculo = veiculo;
    });
    this.listarTodosVeiculos();
  }

  updateVeiculo(): void {
    // if (this.checkCampos()) { // checando campos não preenchidos
    //   this.veiculoService.showMessage2('Campos obrigatórios não podem estar vazios!');
    // } else {
    this.veiculoService.update(this.veiculo).subscribe(() => {
      this.router.navigate(['/manter_veiculos']);
      this.veiculoService.showMessage('Veículo atualizado com sucesso!');
    });
    // }
  }

  cancel(): void {
    this.router.navigate(['/manter_equipamentos']);
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

      // armazenando em veiculosEmpresa apenas veiculos da mesma empresa do usuário
      this.veiculosEmpresa.content = this.veiculos.content.filter(x => x.empresaId == this.userEmpresaId);
    })
  }
}