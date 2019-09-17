import { Turma } from './turma.model';
import { Boletim } from './boletim.model';

class Aluno{
     
    public matricula: string
    public senha: string
    public nome: string
    public email: string
    public cpf: string
    public turma: Turma
    public boletim: Boletim

    constructor(){}

}
export { Aluno }