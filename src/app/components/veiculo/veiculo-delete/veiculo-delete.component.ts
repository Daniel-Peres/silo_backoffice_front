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
      this.veiculoService.showMessage('Veículo excluído com sucesso!');
    })
  }

  cancel(): void {
    this.router.navigate(['/manter_veiculos']);
  }

}
