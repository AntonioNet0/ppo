import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodoLetivo } from '../shared/periodo-letivo.model';


@Injectable()
export class PeriodoLetivoBD {

    constructor(
        private router: Router
    ){}

    public async cadastroPeriodoLetivo(periodo: PeriodoLetivo): Promise<any> {
        return firebase.database().ref(`periodo-letivo`).set(periodo)
            .then(() => this.router.navigate(['home-admin']))
    }



}