import { Router, ActivatedRoute } from '@angular/router';
import { VeiculoService } from './../../../services/veiculo.service';
import { Component, OnInit } from '@angular/core';
import { Veiculo } from 'src/app/models/veiculo.model';

@Component({
  selector: 'app-equipamento-delete',
  templateUrl: './equipamento-delete.component.html',
  styleUrls: ['./equipamento-delete.component.css']
})
export class EquipamentoDeleteComponent implements OnInit {

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
    const id = +this.route.snapshot.paramMap.get('id');
    this.veiculoService.readById(id).subscribe(veiculo => {
      this.veiculo = veiculo;
    })
  }

  deleteVeiculo(): void {
    this.veiculoService.delete(this.veiculo.id).subscribe(() => {
      this.router.navigate(['/manter_veiculos']);
      this.veiculoService.showMessage('Veículo apagado com sucesso!');
    })
  }

  cancel(): void {
    this.router.navigate(['/manter_equipamentos']);
  }

}
