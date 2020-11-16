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
      codEquipamento: '',
      descricaoEquipamento: ''
    },
    veiculo: {
      placaVeiculo: '',
      modeloVeiculo: ''
    },
    qtdPassageiros: null,
    status: ''
  };

  equipamentoInstalado = '';
  numeroDePassageiros = '';
  statusLotacao = '';
  lugaresDiponiveis = null;

  // variável de controle do START e STOP do timer
  stop = false;
  botaoStart = false;
  botaoStop = true;

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

  mostrarNivel(): void {
    this.stop = false;
    if (this.selectedVeiculo == "") {
      this.historicoService.showMessage2("Selecione um veiculo!!!")
      this.zerarHistorico();
    } else {
      this.botaoStart = true;
      this.botaoStop = false;
      var timer = setInterval(() => {
        this.historicoService.readStatus(this.userEmpresaId, this.selectedVeiculo).subscribe(historico => {
          // Se não existir histórico para o veículo selecionado
          if (historico == null) {
            this.historicoService.showMessage2("Não existe histórico para esse veículo!!!");
            this.onibusColor = "onibus.png"
            //zerando informações do histórico que aparece na tela
            this.zerarHistorico();
          } else {
            this.historico = historico;
            this.equipamentoInstalado = this.historico.equipamento.codEquipamento + ' - ' + this.historico.equipamento.descricaoEquipamento;
            this.numeroDePassageiros = this.historico.qtdPassageiros + ' passageiros';
            this.statusLotacao = '( ' + this.historico.status + ' )';

            //mudar a cor do veículo          
            if (this.historico.status == "Lotação - Vazio") {
              this.onibusColor = "onibus.png"
            } else if (this.historico.status == "Lotação - Baixa") {
              this.onibusColor = "onibus_verde.png"
            } else if (this.historico.status == "Lotação - Média") {
              this.onibusColor = "onibus_amarelo.png"
            } else if (this.historico.status == "Lotação - Alta") {
              this.onibusColor = "onibus_vermelho.png"
            } else {
              this.onibusColor = "onibus_vermelho.png"
            }

            this.calculoLugaresDisponiveis();

            if (this.stop == true) {
              clearInterval(timer);
            }

          }
        })
      }, 3000)
    }
  }

  stopMostrarNivel(): void {
    this.stop = true;
    this.botaoStart = false;
    this.botaoStop = true;
  }

  zerarHistorico(): void {
    this.historico.id = null;
    this.historico.datahora = '';
    this.historico.equipamento.codEquipamento = null;
    this.historico.equipamento.descricaoEquipamento = '';
    this.historico.qtdPassageiros = null;
    this.historico.status = '';
    this.historico.veiculo.placaVeiculo = '';
    this.historico.veiculo.modeloVeiculo = '';
    this.historico.veiculo.numeroLinha = '';
    this.historico.veiculo.totalLugares = null;
    this.equipamentoInstalado = '';
    this.numeroDePassageiros = '';
    this.statusLotacao = '';
    this.lugaresDiponiveis = null;
    this.onibusColor = "onibus.png"
  }

  calculoLugaresDisponiveis(): void {
    this.lugaresDiponiveis = this.historico.veiculo.totalLugares - this.historico.qtdPassageiros;
    // this.lugaresDiponiveisSentado = this.historico.veiculo.lugaresSentado < this.historico.qtdPassageiros ? 0 : this.historico.veiculo.lugaresSentado - this.historico.qtdPassageiros;
  }
}
