import { Equipamento } from './equipamento.model';
import { Empresa } from './empresa.model';

export interface Veiculo {
    id?: number 
    modeloVeiculo?: string
    placaVeiculo?: string
    empresa?: Empresa
    equipamento?: Equipamento
    numeroLinha?: string
    totalLugares?: number
    lugaresSentado?: number    
    lugaresEmPe?: number    
}