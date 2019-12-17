import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodoLetivo } from '../shared/periodo-letivo.model';
import { promise } from 'protractor';


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


}