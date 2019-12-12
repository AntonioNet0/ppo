import { Turma } from './turma.model'
import { NotasDisciplina } from './nota.model'

export class Disciplina{

    public nome: string
    public codigo: string
    public professorMatricula: string
    public cargaHoraria: number
    public horaInicio: string
    public horaFim: string
    public turma: string
    public periodo: string
    public notas: NotasDisciplina[] 

    constructor(){
    }

}