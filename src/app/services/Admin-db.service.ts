import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Administrador } from '../shared/admin.model';
import { promise } from 'protractor';

@Injectable()
export class AdminDB {

    private dominio: string = '@dominio.com'

    public errorMessage: string
    public token_id: string

    constructor() {
    }

    public cadastroAdmin(admin: Administrador): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(admin.login + this.dominio, admin.senha)
            .then((resposta: any) => {

                delete admin.senha

                firebase.database().ref(`administradores/${btoa(admin.login + this.dominio)}`)
                    .set(admin)
                console.log('chegou aqui')

            })
            .catch((erro: Error) => {
                console.log(erro)
                this.errorMessage = erro.message
            }
            )
    }

    public listAdmin(): Promise<any> {

        return firebase.database().ref(`administradores`)
            .once('value')
            .then((snapshot: any) => {
                let admins: Administrador[] = []

                snapshot.forEach((childSnapshot: any) => {

                    let admin = childSnapshot.val()
                    admin.key = childSnapshot.key

                    admins.push(admin)
                })
                
                return admins
            })


    }

}