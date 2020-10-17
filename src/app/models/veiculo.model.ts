import { Empresa } from './empresa.model';

export interface Veiculo {
    id?: number 
    modeloVeiculo: string
    placaVeiculo: string
    empresa: Empresa
    codEquipamento?: string
    numeroLinha?: string
    totalLugares: number
    lugaresSentado: number    
    lugaresEmPe: number    
}