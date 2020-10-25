import { Equipamento } from './equipamento.model';
import { Veiculo } from './veiculo.model';

export interface Historico {
    id?: number 
    equipamento?: Equipamento
    veiculo?: Veiculo
    datahora?: string
    qtdPasageiros?: number
    status?: string
}