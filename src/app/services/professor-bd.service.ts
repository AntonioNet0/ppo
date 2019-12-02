import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Professor } from '../shared/professor.model';
import { Router } from '@angular/router';

@Injectable()
export class ProfessorBD {

    private dominio: string = '@dominioprof.com'

    public errorMessage: string
    public token_id: string

    constructor(
        private router: Router
    ){}

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

    public async editarProfessor(professor: Professor, matricula: string): Promise<any>{
        delete professor.senha
        return firebase.database().ref(`professores/${btoa(matricula+this.dominio)}`).set(professor)
    }

    
    public async removeAdmin(professor: Professor): Promise<any> {
        return firebase.database().ref(`professores/${btoa(professor.matricula + this.dominio)}`).remove()
    }

}