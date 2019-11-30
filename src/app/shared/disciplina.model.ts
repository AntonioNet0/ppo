import { Turma } from './turma.model'
import { NotasDisciplina } from './nota.model'

export class Disciplina{

    public nome: string
    public codigo: string
    public professorMatricula: string
    public cargaHoraria: number
    public horaInicio: Date
    public horaFim: Date
    public turma: Turma
    public periodo: string
    public notas: NotasDisciplina[] 

    constructor(){
    }

}