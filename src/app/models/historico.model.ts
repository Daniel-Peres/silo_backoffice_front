import { Veiculo } from './veiculo.model';

export interface Historico {
    id?: number 
    veiculo?: Veiculo
    datahora?: string
    qtdPasageiros?: number
    status?: string
}