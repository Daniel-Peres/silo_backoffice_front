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
    codEquipamento: null,
    numeroLinha: '',
    totalLugares: null,
    lugaresSentado: null,
    lugaresEmPe: null,
  }



  constructor(private veiculoService: VeiculoService,
    private router: Router
  ) {
    // atribuindo valor retirado do JWT
    this.veiculo.empresaId = JSON.parse(localStorage.getItem('usuario')).empresaId;
  }


  ngOnInit(): void {
    this.listarTodosVeiculos();
  }

  createVeiculo(): void {
    if (this.checkCampos()) {
      this.veiculoService.showMessage2('Campos obrigatórios não preenchidos!');
    } else {
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

      // armazenando em veiculosEmpresa apenas veiculos da mesma empresa do usuário
      this.veiculosEmpresa.content = this.veiculos.content.filter(x => x.empresaId == this.userEmpresaId);
    })
  }
}
