import { Equipamento } from './equipamento.model';
import { Veiculo } from './veiculo.model';

export interface Historico {
    id?: number
    veiculo?: Veiculo
    equipamento?: Equipamento
    datahora?: string
    qtdPassageiros?: number
    status?: string
}