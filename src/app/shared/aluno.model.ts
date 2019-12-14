import { Turma } from './turma.model';
import { Boletim } from './boletim.model';

class Aluno{
     
    public matricula: string
    public senha: string
    public nome: string
    public email: string
    public cpf: string
    public turma: string
    public boletim: Boletim

    constructor(turma: string, boletim: Boletim){}

}
export { Aluno }