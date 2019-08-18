import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class Autenticacao{

    private dominio: string = '@dominio.com'

    public errorMessage: string
    public token_id: string

    constructor(private  router: Router){
    }

    public autenticar(matricula: string, senha: string): Promise<any>{
        this.errorMessage = undefined
        return firebase.auth().signInWithEmailAndPassword(matricula+this.dominio, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', idToken)
                        this.router.navigate(['/home'])
                        console.log("autenticou")
                    })
            })
            .catch((erro: Error) => {
                this.errorMessage = erro.message
            })
    }

    public autenticado(): boolean{

        if(this.token_id == undefined && localStorage.getItem('idToken') !== null){
            this.token_id = localStorage.getItem('idToken')
        }

        if(this.token_id === undefined) {
            this.router.navigate([''])
        }
        return this.token_id !== undefined
    }

}