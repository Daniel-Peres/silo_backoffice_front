import { Historico } from './../../models/historico.model';
import { HistoricoService } from './../../services/historico.service';
import { VeiculoService } from './../../services/veiculo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-lotacao',
  templateUrl: './status-lotacao.component.html',
  styleUrls: ['./status-lotacao.component.css']
})
export class StatusLotacaoComponent implements OnInit {

  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;

  veiculos = { content: [] };
  selectedVeiculo: string = "";

  // historico: Historico;
  historico = { content: [] };

  constructor( 
              private veiculoService: VeiculoService,
              private historicoService: HistoricoService
              ) { }

  ngOnInit(): void {
    this.listarTodosVeiculos();
  }

  listarTodosVeiculos(): void {
    this.veiculoService.readGeral(this.userEmpresaId).subscribe(veiculo => {
      this.veiculos.content = veiculo;
    })
  }

  listarHistorico(): void {
    console.log(this.userEmpresaId + '---' + this.selectedVeiculo)
    this.historicoService.readStatus(this.userEmpresaId, this.selectedVeiculo).subscribe(historico => {
      this.historico.content = historico;
    })

    alert(JSON.stringify(this.historico.content));
  }

}
