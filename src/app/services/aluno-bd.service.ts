import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from '../shared/aluno.model';

@Injectable()
export class AlunoBD {

    private dominio: string = '@dominioaluno.com'

    public errorMessage: string
    public token_id: string

    constructor(
        private router: Router
    ) { }

    public async cadastroAluno(aluno: Aluno): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(aluno.matricula + this.dominio, aluno.senha)
            .then((resposta: any) => {

                delete aluno.senha

                firebase.database().ref(`alunos/${btoa(aluno.matricula + this.dominio)}`)
                    .set(aluno)
                this.router.navigate(['home-admin/aluno/listar'])

            })
            .catch((erro: Error) => {
                console.log("Aqui deu merda")
                console.log(erro)
                this.errorMessage = erro.message
            }
            )
    }

    public async listarAlunos(): Promise<any> {

        return firebase.database().ref(`alunos`).orderByChild('nome')
            .once('value')
            .then((snapshot: any) => {
                let alunos: Aluno[] = []

                snapshot.forEach((childSnapshot: any) => {

                    let aluno = childSnapshot.val()
                    aluno.key = childSnapshot.key

                    alunos.push(aluno)
                })

                return alunos
            })
    }

    public async removeAluno(aluno: Aluno): Promise<any> {
        return firebase.database().ref(`alunos/${btoa(aluno.matricula + this.dominio)}`).remove()
    }

    public async editarAluno(aluno: Aluno, matricula: string): Promise<any> {
        delete aluno.senha
        return firebase.database().ref(`alunos/${btoa(matricula + this.dominio)}`).set(aluno)
    }

    public async pesquisaAlunos(termo: string): Promise<Aluno[]> {
        return firebase.database().ref(`alunos`).orderByChild('nome')
            .once('value')
            .then((snapshot: any) => {
                let alunos: Aluno[] = []

                snapshot.forEach((childSnapshot: any) => {
                    let aluno = childSnapshot.val()
                    aluno.key = childSnapshot.key

                    if ((aluno.nome + '').toLowerCase().startsWith(termo.toLowerCase())) {
                        alunos.push(aluno)
                        console.log(aluno.nome)
                    }
                })
                if (alunos.length === 0) {
                    alunos.push({ nome: 'Nenhuma informação encontrada', 
                                cpf: '', matricula: '', email: '', senha: '',turma: '', boletim: null })
                }

                return alunos
            })
    }

}