import { Professor } from './professor.model'
import { Turma } from './turma.model'
import { NotasDisciplina } from './nota.model'

export class Disciplina{

    public nome: string
    public codido: string
    public professor: Professor
    public cargaHoraria: number
    public horaInicio: Date
    public horaFim: Date
    public turma: Turma
    public periodo: string
    public notas: NotasDisciplina[] 

    constructor(){
    }

}