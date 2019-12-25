import * as firebase from 'firebase';
import { Injectable } from '@angular/core';


@Injectable()
export class NotasBD {

    public async cadastrarNotas(notas: any): Promise<any> {
        let disciplina = notas.disciplina
        delete notas.disciplina

        let bimestre = notas.bimestre
        delete notas.bimestre
        console.log('aqui')
        return firebase.database().ref(`notas/${disciplina}/${bimestre}`).set(notas)
    }

    public async getNotasDiscipilinaBimestre(disciplina: string, bimestre: string): Promise<any> {
        return firebase.database().ref(`notas/${disciplina}/${bimestre}`)
            .once('value')
            .then((snapshot: any) => {
                let notas: any = []
                snapshot.forEach((childSnapshot: any) => {
                    let nota = childSnapshot.val()
                    nota.key = childSnapshot.key
                    notas.push(nota)
                });
                return notas
            })
    }

    public async getNotasAluno(disciplina: string, alunoMatricula: string): Promise<any> {
        return firebase.database().ref(`notas/${disciplina}`)
            .once('value')
            .then((snapshot: any) => {
                let notasAluno: any = []
                snapshot.forEach((childSnapshot: any) => {

                    childSnapshot.val().forEach((n: any) => {
                        if (n.matricula === alunoMatricula) {
                            n.bimestre = childSnapshot.key
                            notasAluno.push(n)
                        }
                    })

                })
                return notasAluno
            })
    }

}