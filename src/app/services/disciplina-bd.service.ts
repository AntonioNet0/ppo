import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from '../shared/disciplina.model';

@Injectable()
export class DisciplinaBD {

    public errorMessage: string

    constructor(
        private router: Router
    ){}

    public async cadastroDisciplina(disciplina: Disciplina): Promise<any> {
        return firebase.database().ref(`disciplinas/${disciplina.nome}`).set(disciplina)
            .then(() => {
                this.router.navigate(['home-admin/disciplina/listar'])
            })
    }

    public async listaDisciplinas(): Promise<any> {

        return firebase.database().ref(`disciplinas`)
            .once('value')
            .then((snapshot: any) => {
                let disciplinas: Disciplina[] = []

                snapshot.forEach((childSnapshot: any) => {

                    let disciplina = childSnapshot.val()
                    disciplina.key = childSnapshot.key

                    disciplinas.push(disciplina)
                })

                return disciplinas
            })
    }

    public async removeDisciplina(disciplina: Disciplina): Promise<any> {
        return firebase.database().ref(`disciplinas/${disciplina.nome}`).remove()
    }

    public async editarDisciplina(disciplina: Disciplina, nome: string): Promise<any>{
        return firebase.database().ref(`disciplinas/${disciplina.nome}`).set(disciplina)

    }

}