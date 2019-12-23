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

}