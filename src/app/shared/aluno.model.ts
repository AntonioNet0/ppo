import { Turma } from './turma.model';

class Aluno{
     
    constructor(
        public id: string,
        public matricula: string,
        public senha: string,
        public email: string,
        public cpf: string,
        public turma: Turma[]
    ){}

}
export { Aluno }