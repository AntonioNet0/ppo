import * as firebase from 'firebase';
import { Injectable } from '@angular/core';


@Injectable()
export class FrequenciaBD {

    public async adicionarFrequencia(frequencia: any, disciplina: string, data: string): Promise<any> {
        return firebase.database().ref(`frequencia/${disciplina}/${data}`).set(frequencia)
    }

    public async getFrequenciaPorDisciplina(data: string, disciplina: string): Promise<any> {
        return firebase.database().ref(`frequencia/${disciplina}/${data.replace('/', '-')}`)
            .once('value')
            .then((snapshot: any) => {
                let frequencias: any[] = []
                snapshot.forEach(childSnapshot => {
                    let frequencia = childSnapshot.val()
                    frequencias.push(frequencia)
                });

                return frequencias
            })
    }

    public async getFaltasAlunoDisciplina(disciplina: string, alunoMatricula: string): Promise<any> {
        return firebase.database().ref(`frequencia/${disciplina}`)
            .once('value')
            .then((snpashot: any) => {
                let faltas = 0

                snpashot.forEach((childSnapshot: any) => {
                    childSnapshot.val().forEach(item => {
                        if (item.matricula === alunoMatricula) {
                            faltas += parseInt(item.faltas)
                        }
                    })
                })
                return faltas
            })
    }

}