import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Administrador } from '../shared/admin.model';
import { EncrDecrService } from './encrDecr.service';

@Injectable()
export class Autenticacao {

    private dominio: string = '@dominio.com'

    public errorMessage: string
    public token_id: string

    constructor(
        private router: Router,
        private encrDecrService: EncrDecrService
    ) { }

    public async autenticar(matricula: string, senha: string): Promise<any> {
        this.errorMessage = undefined
        return firebase.auth().signInWithEmailAndPassword(matricula + "@dominioaluno.com", senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', idToken)
                        let modulo = this.encrDecrService.set('123456$#@$^@1ERF', 'tipoLogin')
                        let tipoLogin = this.encrDecrService.set('123456$#@$^@1ERF', 'aluno')
                        localStorage.setItem(modulo, tipoLogin)
                        this.router.navigate(['/home-aluno'])
                        console.log("autenticou aluno")
                    })
            })
            .catch(() => {
                firebase.auth().signInWithEmailAndPassword(matricula + "@dominioprof.com", senha)
                    .then((resposta: any) => {
                        firebase.auth().currentUser.getIdToken()
                            .then((idToken: string) => {
                                this.token_id = idToken
                                localStorage.setItem('idToken', idToken)
                                let modulo = this.encrDecrService.set('123456$#@$^@1ERF', 'tipoLogin')
                                let tipoLogin = this.encrDecrService.set('123456$#@$^@1ERF', 'professor')
                                localStorage.setItem(modulo, tipoLogin)
                                this.router.navigate(['/home-professor'])
                                console.log("autenticou prof")
                            })
                    })
                    .catch(() => {
                        firebase.auth().signInWithEmailAndPassword(matricula + "@dominioadmin.com", senha)
                            .then((resposta: any) => {
                                firebase.auth().currentUser.getIdToken()
                                    .then((idToken: string) => {
                                        this.token_id = idToken
                                        localStorage.setItem('idToken', idToken)
                                        let modulo = this.encrDecrService.set('123456$#@$^@1ERF', 'tipoLogin')
                                        let tipoLogin = this.encrDecrService.set('123456$#@$^@1ERF', 'admin')
                                        localStorage.setItem(modulo, tipoLogin)
                                        this.router.navigate(['/home-admin'])
                                        console.log("autenticou admin")
                                    })
                            })
                            .catch((error: any) => this.errorMessage = error)
                    })
            })
    }

    public autenticado(): boolean {

        if (this.token_id === undefined && localStorage.getItem('idToken') !== null) {
            let modulo = this.encrDecrService.set('123456$#@$^@1ERF', 'tipoLogin')
            let tipoLogin = this.encrDecrService.get('123456$#@$^@1ERF', localStorage.getItem(modulo))
            if ( tipoLogin === 'aluno') {
                this.token_id = localStorage.getItem('idToken')
                this.router.navigate(['home-aluno'])
            } else if (tipoLogin === 'professor') {
                this.token_id = localStorage.getItem('idToken')
                this.router.navigate(['home-professor'])
            } else if (tipoLogin === 'admin') {
                this.token_id = localStorage.getItem('idToken')
                this.router.navigate(['home-admin'])
            }

        }

        if (this.token_id === undefined) {
            this.router.navigate([''])
        }
        return this.token_id !== undefined
    }

    public async logout(): Promise<any> {
        if (localStorage.getItem('idToken') !== null) {
            localStorage.removeItem('idToken')
            localStorage.removeItem(this.encrDecrService.set('123456$#@$^@1ERF', 'tipoLogin'))
            this.router.navigate([''])
        }
    }

}