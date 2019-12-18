import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Professor } from '../shared/professor.model';
import { Router } from '@angular/router';
import { Disciplina } from '../shared/disciplina.model';

@Injectable()
export class ProfessorBD {

    private dominio: string = '@dominioprof.com'

    public errorMessage: string
    public token_id: string

    constructor(
        private router: Router
    ) { }

    public async cadastroProfessor(professor: Professor): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(professor.matricula + this.dominio, professor.senha)
            .then((resposta: any) => {

                delete professor.senha

                firebase.database().ref(`professores/${btoa(professor.matricula + this.dominio)}`)
                    .set(professor)
                this.router.navigate(['home-admin/professor/listar'])

            })
            .catch((erro: Error) => {
                console.log(erro)
                this.errorMessage = erro.message
            }
            )
    }

    public async listProfessores(): Promise<any> {

        return firebase.database().ref(`professores`).orderByChild('nome')
            .once('value')
            .then((snapshot: any) => {
                let professores: Professor[] = []

                snapshot.forEach((childSnapshot: any) => {

                    let professor = childSnapshot.val()
                    professor.key = childSnapshot.key

                    professores.push(professor)
                })

                return professores
            })
    }

    public async editarProfessor(professor: Professor, matricula: string): Promise<any> {
        delete professor.senha
        return firebase.database().ref(`professores/${btoa(matricula + this.dominio)}`).set(professor)
    }

    public async atualizarInformacoesProfessor(professor: Professor){
        delete professor.senha
        let email = firebase.auth().currentUser.email
        return firebase.database().ref(`professores/${btoa(email)}`).set(professor)
    }

    public async removeAdmin(professor: Professor): Promise<any> {
        return firebase.database().ref(`professores/${btoa(professor.matricula + this.dominio)}`).remove()
    }

    public async confirmarSenha(senha: string): Promise<boolean> {
        let email = firebase.auth().currentUser.email

        return firebase.auth().signInWithEmailAndPassword(email, senha).then(() => true, () => false)
    }

    public async mudarSenha(senha: string): Promise<any> {
        return firebase.auth().currentUser.updatePassword(senha).then(() => this.router.navigate(['home-admin']));
    }

    public async getProfessor(): Promise<any> {
        let email = firebase.auth().currentUser.email
        return firebase.database().ref(`professores/${btoa(email)}`)
            .once('value')
            .then((snapshot: any) => {
                let professor: any = {cpf: '', email: '', matricula: '', nome: ''}

                snapshot.forEach((childSnapshot: any) => {

                    let prof = childSnapshot.val()
                    
                    if(childSnapshot.key === 'cpf'){
                       professor.cpf = prof
                    }else if(childSnapshot.key === 'email'){
                        professor.email = prof
                    }else if(childSnapshot.key === 'matricula'){
                        professor.matricula = prof
                    } else if(childSnapshot.key === 'nome'){
                        professor.nome = prof
                    }
                    
                   
                })
                //console.log(professor)
                return professor
            })
    }


    public async pesquisaProfessores(termo: string): Promise<Professor[]>{        
        return firebase.database().ref(`professores`).orderByChild('nome')
        .once('value')
        .then((snapshot: any) => {
            let professores: Professor[] = []
            
            snapshot.forEach((childSnapshot: any) => {
                let professor = childSnapshot.val()
                professor.key = childSnapshot.key

                if((professor.nome+'').toLowerCase().startsWith(termo.toLowerCase())){
                    professores.push(professor)
                    console.log(professor.nome)
                }
            })
            if(professores.length === 0) {
                professores.push({nome: 'Nenhuma informação encontrada', email: '', senha: '', cargaHoraria: 0, matricula: '', cpf:'', disciplinas: []})
            }

            return professores
        })
    }

    public async getProfessorPorMatricula(matricula: string): Promise<any> {
        return firebase.database().ref(`professores/${btoa(matricula+"@dominioprof.com")}`)
        .once('value')
        .then((snapshot: any) => {
            let professor: any = {cpf: '', email: '', matricula: '', nome: ''}

            snapshot.forEach((childSnapshot: any) => {

                let prof = childSnapshot.val()
                
                if(childSnapshot.key === 'cpf'){
                   professor.cpf = prof
                }else if(childSnapshot.key === 'email'){
                    professor.email = prof
                }else if(childSnapshot.key === 'matricula'){
                    professor.matricula = prof
                } else if(childSnapshot.key === 'nome'){
                    professor.nome = prof
                }
                
               
            })
            //console.log(professor)
            return professor
        })
    }


    public async adicionarDisciplina(disciplina: Disciplina): Promise<any> {
        let disciplinaCod = {nome: disciplina.nome, turma: disciplina.turma}
        return firebase.database().ref(`professores/${btoa(disciplina.professorMatricula+this.dominio)}/disciplinas/${disciplinaCod.nome}`).set(disciplinaCod)
    }

    public async removerDisciplina(disciplina: any, matriculaProfessor: string): Promise<any> {
        let disciplinaCod = {nome: disciplina.nome, turma: disciplina.turma}
        return firebase.database().ref(`professores/${btoa(matriculaProfessor+this.dominio)}/disciplinas/${disciplinaCod.nome}`).remove()
    }


}