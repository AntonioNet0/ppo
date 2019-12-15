import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from '../shared/disciplina.model';

@Injectable()
export class DisciplinaBD {

    public errorMessage: string

    constructor(
        private router: Router
    ){}

    public async cadastroDisciplina(disciplina: Disciplina): Promise<any> {
        return firebase.database().ref(`disciplinas/${disciplina.nome+ " " + disciplina.turma}`).set(disciplina)
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

    public async editarDisciplina(disciplina: Disciplina, nome: string): Promise<any>{
        return firebase.database().ref(`disciplinas/${disciplina.nome}`).set(disciplina)

    }

    public async pesquisaDisciplinas(termo: string): Promise<Disciplina[]>{        
        return firebase.database().ref(`disciplinas`).orderByChild('nome')
        .once('value')
        .then((snapshot: any) => {
            let disciplinas: Disciplina[] = []
            
            snapshot.forEach((childSnapshot: any) => {
                let disciplina = childSnapshot.val()
                disciplina.key = childSnapshot.key

                if((disciplina.nome+'').toLowerCase().startsWith(termo.toLowerCase())){
                    disciplinas.push(disciplina)
                    console.log(disciplina.nome)
                }
            })
            if(disciplinas.length === 0) {
                disciplinas.push({nome: 'Nenhuma informação encontrada', turma: null, cargaHoraria: null, codigo: '', notas: null,
                                    periodo: '', professorMatricula: '', horaFim: '', horaInicio: '' })
            }
            return disciplinas
        })
    }

    public async listaDisciplinasProfessor(): Promise<any> {
        let email = firebase.auth().currentUser.email
        console.log(email)
        return firebase.database().ref(`disciplinas`)
            .orderByChild('nome')
            .once('value')
            .then((snapshot: any) => {
                let disciplinas: any[] = []

                snapshot.forEach((childSnapshot: any) => {

                    let disciplina = childSnapshot.val()
                    disciplina.key = childSnapshot.key

                    if(email.startsWith(disciplina.professorMatricula)){
                        disciplinas.push(disciplina)
                    }

                    
                })

                return disciplinas
            })
    }


}