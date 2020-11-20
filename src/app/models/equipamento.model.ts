import { Empresa } from './empresa.model';

export interface Equipamento {
    id?: number
    codEquipamento?: string
    descricaoEquipamento?: string
    statusEquipamento?: string
    empresa?: Empresa
}