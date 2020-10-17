import { Empresa } from './empresa.model';

export interface Usuario {
    id?: number 
    nome: string
    empresa?: Empresa
    email?: string
    senha: string
    jwttoken?: string
    expireAt?: number
}