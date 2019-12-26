import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodoLetivo } from '../shared/periodo-letivo.model';

@Injectable()
export class PeriodoLetivoBD {

    constructor(
        private router: Router
    ) { }

    public async cadastroPeriodoLetivo(periodo: PeriodoLetivo): Promise<any> {
        return firebase.database().ref(`periodo-letivo`).set(periodo)
            .then(() => this.router.navigate(['home-admin']))
    }

    public async cadastroDiasLetivos(segundas: string[], tercas: string[], quartas: string[], quintas: string[], sextas: string[]): Promise<any> {
        firebase.database().ref('dias-letivos').remove()
        firebase.database().ref('dias-letivos/segunda').set(segundas)
        firebase.database().ref('dias-letivos/terca').set(tercas)
        firebase.database().ref('dias-letivos/quarta').set(quartas)
        firebase.database().ref('dias-letivos/quinta').set(quintas)
        return firebase.database().ref('dias-letivos/sexta').set(sextas)
    }

    public async cadastroBimestres(dias: any, diaSemana: string): Promise<any> {

        return firebase.database().ref(`bimestres/${diaSemana}`).set(dias)
        
    }

    public async limpaBimestre(): Promise<any> {
        return firebase.database().ref('bimestres').remove()
    }

    public async getBimestresPorDia(dia: string): Promise<any> {
        return firebase.database().ref(`bimestres/${dia.toLowerCase()}s`)
            .once('value')
            .then((snapshot: any) => {
                let bimestresDia: any[] = []
                snapshot.forEach((childsnapshot: any) => {
                    bimestresDia.push(childsnapshot.val())

                });
                return bimestresDia
            })
    }

}