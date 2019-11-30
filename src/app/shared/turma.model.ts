import { Aluno } from './aluno.model';
import { Professor } from './professor.model';
import { Disciplina } from './disciplina.model';

export class Turma{

    public codigo: string
    public nome: string
    public alunos: Aluno[]
    public disciplinas: string
    public sala: string
    public turno: string

    constructor(){}

}