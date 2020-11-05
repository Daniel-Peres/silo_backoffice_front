import { Historico } from './../../models/historico.model';
import { HistoricoService } from './../../services/historico.service';
import { VeiculoService } from './../../services/veiculo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nivel-lotacao',
  templateUrl: './nivel-lotacao.component.html',
  styleUrls: ['./nivel-lotacao.component.css']
})
export class NivelLotacaoComponent implements OnInit {

  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;

  lugaresDisponiveis = 0;
  lugaresSentado = 0;
  lugaresEmPé = 0;

  onibusColor = "onibus.png"

  veiculos = { content: [] };
  selectedVeiculo: string = "";

  historico: Historico = {
    id: null,
    datahora: '',
    equipamento: {
      codEquipamento: ''
    },
    veiculo: {
      placaVeiculo: '',
      modeloVeiculo: ''
    },
    qtdPassageiros: null,
    status: ''
  };

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
    if (this.selectedVeiculo == "") { 
      this.historicoService.showMessage2("Selecione um veiculo!!!")
    } else {
      // setInterval(() => {
        this.historicoService.readStatus(this.userEmpresaId, this.selectedVeiculo).subscribe(historico => {
          this.historico = historico;

          if (this.historico.status == "Lotação Baixa") {
            this.onibusColor = "onibus_verde.png"
          } else if (this.historico.status == "Lotação Alta") {
            this.onibusColor = "onibus_vermelho.png"
          } else {
            this.onibusColor = "onibus_amarelo"
          }
        })
      // }, 10000)
    }
  }
}
