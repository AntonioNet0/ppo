import { Turma } from './turma.model';
import { Disciplina } from './disciplina.model';

export class Professor{

   
    public disciplinas: Disciplina[]
    public cargaHoraria: number

    constructor( 
        public nome: string,
        public matricula: string,
        public senha: string,
        public email: string,
        public cpf: string
        ){}

}