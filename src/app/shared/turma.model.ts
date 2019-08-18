import { Aluno } from './aluno.model';
import { Professor } from './professor.model';

export class Turma{

    constructor(
        public id: string,
        public nome: string,
        public alunos: Aluno[],
        public professor: Professor,
        public disciplina: string,
        public sala: string,
        public turno: string,
        public cargaHoraria: number,
        public horarioInicio: Date,
        public horaFim: Date

    ){}

}