import { Turma } from './turma.model';

export class Professor{

    constructor(
        public id: string,
        public matricula: string,
        public senha: string,
        public email: string,
        public cpf: string,
        public turmas: Turma[]
    ){}

}