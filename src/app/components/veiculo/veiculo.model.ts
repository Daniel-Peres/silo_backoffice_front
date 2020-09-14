export interface Veiculo {
    id?: number 
    nome: string
    empresa: string
    empresaId: number
    email?: string
    // login?: string
    senha: string
    jwttoken?: string
    expireAt?: number
}