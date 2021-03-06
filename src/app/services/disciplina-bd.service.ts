import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from '../shared/disciplina.model';

@Injectable()
export class DisciplinaBD {

    public errorMessage: string

    constructor(
        private router: Router
    ) { }

    public async cadastroDisciplina(disciplina: Disciplina): Promise<any> {
        return firebase.database().ref(`disciplinas/${disciplina.nome}`).set(disciplina)
            .then(() => {
                this.router.navigate(['home-admin/disciplina/listar'])
            })
    }

    public async listaDisciplinas(): Promise<any> {

        return firebase.database().ref(`disciplinas`).orderByChild('nome')
            .once('value')
            .then((snapshot: any) => {
                let disciplinas: Disciplina[] = []

                snapshot.forEach((childSnapshot: any) => {

                    let disciplina = childSnapshot.val()
                    disciplina.key = childSnapshot.key

                    disciplinas.push(disciplina)
                })

                return disciplinas
            })
    }
    

    public async removeDisciplina(disciplina: Disciplina): Promise<any> {
        return firebase.database().ref(`disciplinas/${disciplina.nome}`).remove()
    }

    public async editarDisciplina(disciplina: Disciplina, nome: string): Promise<any> {
        return firebase.database().ref(`disciplinas/${disciplina.nome}`).set(disciplina)

    }

    public async pesquisaDisciplinas(termo: string): Promise<Disciplina[]> {
        return firebase.database().ref(`disciplinas`).orderByChild('nome')
            .once('value')
            .then((snapshot: any) => {
                let disciplinas: Disciplina[] = []

                snapshot.forEach((childSnapshot: any) => {
                    let disciplina = childSnapshot.val()
                    disciplina.key = childSnapshot.key

                    if ((disciplina.nome + '').toLowerCase().startsWith(termo.toLowerCase())) {
                        disciplinas.push(disciplina)
                    }
                })
                if (disciplinas.length === 0) {
                    disciplinas.push({
                        nome: 'Nenhuma informação encontrada', turma: null, cargaHoraria: null, codigo: '', notas: null,
                        periodo: '', professorMatricula: '', horaFim: '', horaInicio: ''
                    })
                }
                return disciplinas
            })
    }

    public async listaDisciplinasProfessor(): Promise<any> {
        let email = firebase.auth().currentUser.email
        return firebase.database().ref(`disciplinas`)
            .orderByChild('nome')
            .once('value')
            .then((snapshot: any) => {
                let disciplinas: any[] = []

                snapshot.forEach((childSnapshot: any) => {

                    let disciplina = childSnapshot.val()
                    disciplina.key = childSnapshot.key

                    if (email===(disciplina.professorMatricula+"@dominioprof.com")) {
                        disciplinas.push(disciplina)
                    }


                })

                return disciplinas
            })
    }
    public async listaDisciplinasAluno(): Promise<any> {
        let email = firebase.auth().currentUser.email
        return firebase.database().ref(`disciplinas`)
            .orderByChild('nome')
            .once('value')
            .then((snapshot: any) => {
                let disciplinas: any[] = []

                snapshot.forEach((childSnapshot: any) => {

                    let disciplina = childSnapshot.val()
                    disciplina.key = childSnapshot.key

                    if (email===(disciplina.turma+"@dominioaluno.com")) {
                        disciplinas.push(disciplina)
                    }


                })

                return disciplinas
            })
    }



    public async adicionarHorario(horarioDisciplina: any): Promise<any> {
        let caminho = ''
        if (horarioDisciplina.horario === '07:00 - 07:50') {
            caminho = '0'
        } else if (horarioDisciplina.horario === '07:50 - 08:40') {
            caminho = '1'
        } else if (horarioDisciplina.horario === '08:40 - 09:30') {
            caminho = '2'
        } else if (horarioDisciplina.horario === '09:45 - 10:35') {
            caminho = '3'
        } else if (horarioDisciplina.horario === '10:35 - 11:25') {
            caminho = '4'
        } else if (horarioDisciplina.horario === '11:25 - 12:15') {
            caminho = '5'
        }
        return firebase.database().ref(`disciplinas/${horarioDisciplina.disciplina}/horario/${horarioDisciplina.diaDaSemana}/${caminho}`)
            .set({ hora: horarioDisciplina.horario })
    }

    public async limparHorario(disciplina: string): Promise<any> {
        return firebase.database().ref(`disciplinas/${disciplina}/horario`).remove()
    }

    public async getHorario(disciplina: string): Promise<any> {
        return firebase.database().ref(`disciplinas/${disciplina}/horario`)
            .once('value')
            .then((snapshot: any) => {
                let val: string = ''

                snapshot.forEach((childSnapshot: any) => {

                    val = childSnapshot.key

                });
                return val

            })

    }

    public async getDisciplina(cod: string): Promise<Disciplina> {
        return firebase.database().ref(`disciplinas/${cod}`)
            .once('value')
            .then((snapshot: any) => {
                let disciplina: Disciplina = new Disciplina()

                snapshot.forEach((childSnapshot: any) => {

                    if (childSnapshot.key === 'nome') {
                        disciplina.nome = childSnapshot.val()

                    } else if (childSnapshot.key === 'turma') {
                        disciplina.turma = childSnapshot.val()

                    } else if (childSnapshot.key === 'codigo') {
                        disciplina.codigo = childSnapshot.val()

                    } else if (childSnapshot.key === 'periodo') {
                        disciplina.periodo = childSnapshot.val()
                    
                    } else if (childSnapshot.key === 'professorMatricula') {
                        disciplina.professorMatricula = childSnapshot.val()

                    } else if (childSnapshot.key === 'cargaHoraria') {
                        disciplina.cargaHoraria = childSnapshot.val()   
                    }

                });

                return disciplina
            })
    }

    public async adicionarTurma(codTurma: string, disicplinas: string[]): Promise<any> {
        disicplinas.forEach(disciplina => {
            this.getDisciplina(disciplina)
            .then(dscpl => {
                dscpl.turma = codTurma
                firebase.database().ref(`disciplinas/${disciplina}`).set(dscpl)
            })
            
        })
    }


}