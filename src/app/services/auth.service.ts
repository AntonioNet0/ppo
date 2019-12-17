import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class Autenticacao {

    private dominio: string = '@dominio.com'

    public errorMessage: string
    public token_id: string

    constructor(
        private router: Router
    ) { }

    public async autenticar(matricula: string, senha: string): Promise<any> {
        this.errorMessage = undefined
        return firebase.auth().signInWithEmailAndPassword(matricula + "@dominioaluno.com", senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', idToken)
                        let modulo = '67766362796274766120'
                        let tipoLogin = '6E7968616220'
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
                                let modulo = '67766362796274766120'
                                let tipoLogin = '63656273726666626520'
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
                                        let modulo = '67766362796274766120'
                                        let tipoLogin = '6E717A7661'
                                        localStorage.setItem(modulo, tipoLogin)
                                        this.router.navigate(['/home-admin'])
                                        console.log("autenticou admin")
                                    })
                            })
                            .catch(() => {
                                console.log('asdasd')
                                this.errorMessage = 'Credenciais Inválidas'
                                console.log(this.errorMessage)
                            })
                    })
            })
    }

    public autenticado(): boolean {
        let dominio: string = 'http://localhost:4200/'
        if (this.token_id === undefined && localStorage.getItem('idToken') !== null) {

            let modulo = '67766362796274766120'
            let tipoLogin = localStorage.getItem(modulo)

            if (tipoLogin === '6E7968616220') {

                
                this.token_id = localStorage.getItem('idToken')

                if (window.location.href !== dominio) {

                    let url = window.location.href
                    let urlErro = dominio + 'home-aluno'

                    if (url.substring(0, urlErro.length) !== urlErro) {

                        this.router.navigate(['home-aluno'])

                    }
                } else {
                    this.router.navigate(['home-aluno'])
                }


            } else if (tipoLogin === '63656273726666626520') {

                this.token_id = localStorage.getItem('idToken')

                if (window.location.href !== dominio) {

                    let url = window.location.href
                    let urlErro = dominio + 'home-professor'

                    if (url.substring(0, urlErro.length) !== urlErro) {

                        this.router.navigate(['home-professor'])

                    }
                } else {
                    this.router.navigate(['home-professor'])
                }

            } else if (tipoLogin === '6E717A7661') {

                this.token_id = localStorage.getItem('idToken')

                if (window.location.href !== dominio) {
                   
                    let url = window.location.href
                    let urlErro = dominio + 'home-admin'

                    if (url.substring(0, urlErro.length) !== urlErro) {

                        this.router.navigate(['home-admin'])

                    } 
                } else {
                        this.router.navigate(['home-admin'])
                    }
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
            localStorage.removeItem('67766362796274766120')
            this.router.navigate([''])
        }
    }

}