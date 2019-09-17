import { Disciplina } from './disciplina.model'
import { Aluno } from './aluno.model'

 

class Nota{

    public disciplina: Disciplina
    public aluno: Aluno
    public valor: number 

}

export class NotasDisciplina{

    public notasUnidade: Nota[]

}