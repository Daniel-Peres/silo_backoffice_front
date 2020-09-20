export interface Veiculo {
    id?: number 
    modeloVeiculo: string
    placaVeiculo: string
    empresa: string
    empresaId: number
    codEquipamento?: number
    numeroLinha?: string
    totalLugares: number
    lugaresSentado: number    
    lugaresEmPe: number    
}