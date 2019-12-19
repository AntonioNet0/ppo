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
                        console.log(frequencia)
                        frequencias.push(frequencia)
                });

                return frequencias
            })
    }

}