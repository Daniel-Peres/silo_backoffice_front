import { Equipamento } from './equipamento.model';
import { Veiculo } from './veiculo.model';

export interface Historico {
    id?: number 
    veiculo?: Veiculo
    datahora?: string
    equipamento?: Equipamento
    qtdPasageiros?: number
    status?: string
}