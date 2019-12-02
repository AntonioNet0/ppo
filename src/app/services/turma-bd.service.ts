import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Professor } from '../shared/professor.model';
import { Router } from '@angular/router';
import { Turma } from '../shared/turma.model';

@Injectable()
export class TurmaBD {

    public errorMessage: string

    constructor(
        private router: Router
    ){}

    public async cadastroTurma(turma: Turma): Promise<any> {
        return firebase.database().ref(`turmas/${turma.codigo}`).set(turma)
            .then(() => {
                this.router.navigate(['home-admin/turma/listar'])
            })
    }

    public async listarTurmas(): Promise<any>{
        return firebase.database().ref('turmas').orderByChild('nome')
        .once('value')
        .then((snapshot: any) => {
            let turmas: Turma[] = []

            snapshot.forEach((childSnapshot: any) => {

                let turma = childSnapshot.val()
                turma.key = childSnapshot.key

                turmas.push(turma)
            })

            return turmas
        })
    }

    public async removeTurma(turma: Turma): Promise<any>{
        return firebase.database().ref(`turmas/${turma.codigo}`).remove()
    }

    public editarTurma(turma: Turma, codigo: string): Promise<any>{
        return firebase.database().ref(`turmas/${codigo}`).set(turma)
    }

}