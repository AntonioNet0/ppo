import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Administrador } from '../shared/admin.model';
import { Router } from '@angular/router';

@Injectable()
export class AdminDB {

    private dominio: string = '@dominioadmin.com'

    public errorMessage: string
    public token_id: string

    constructor(
        private router: Router
    ) {
    }

    public async cadastroAdmin(admin: Administrador): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(admin.login + this.dominio, admin.senha)
            .then((resposta: any) => {

                delete admin.senha

                firebase.database().ref(`administradores/${btoa(admin.login + this.dominio)}`)
                    .set(admin)
                this.router.navigate(['home-admin/admin/listar'])

            })
            .catch((erro: Error) => {
                console.log(erro)
                this.errorMessage = erro.message
            }
            )
    }

    public async listAdmin(): Promise<any> {

        return firebase.database().ref(`administradores`).orderByChild('nome')
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

    public async removeAdmin(admin: Administrador): Promise<any> {
        return firebase.database().ref(`administradores/${btoa(admin.login + this.dominio)}`).remove()
    }

    public async editarAdmin(admin: Administrador, login: string): Promise<any> {
        delete admin.senha
        return firebase.database().ref(`administradores/${btoa(admin.login + this.dominio)}`).set(admin)
    }

    public async pesquisaAdmins(termo: string): Promise<any>{
        return firebase.database().ref(`as`)
    }

}