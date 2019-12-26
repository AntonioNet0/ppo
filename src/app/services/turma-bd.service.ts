import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Professor } from '../shared/professor.model';
import { Router } from '@angular/router';
import { Turma } from '../shared/turma.model';
import { Aluno } from '../shared/aluno.model';
import { HorarioAluno } from '../shared/horario.model';

@Injectable()
export class TurmaBD {

    public errorMessage: string

    constructor(
        private router: Router
    ) { }

    public async cadastroTurma(turma: Turma): Promise<any> {
        return firebase.database().ref(`turmas/${turma.codigo}`).set(turma)
            .then(() => {
                
                this.router.navigate([`home-admin/turma/cadastro-horario/${turma.codigo}`])
            })
    }

    public async listarTurmas(): Promise<any> {
        return firebase.database().ref('turmas').orderByChild('nome')
            .once('value')
            .then((snapshot: any) => {
                let turmas: Turma[] = []

                snapshot.forEach((childSnapshot: any) => {

                    let turma = childSnapshot.val()
                    turma.key = childSnapshot.key

                    turmas.push(turma)
                })

                return turmas
            })
    }

    public async removeTurma(turma: Turma): Promise<any> {
        return firebase.database().ref(`turmas/${turma.codigo}`).remove()
    }

    public async editarTurma(turma: Turma, codigo: string): Promise<any> {
        return firebase.database().ref(`turmas/${codigo}`).set(turma)
    }

    public async adicionarAluno(turmaCodigo: string, aluno: any): Promise<any> {
        return firebase.database().ref(`turmas/${turmaCodigo}/alunos/${aluno.matricula}`).set(aluno)
    }

    public async removerAluno(turmaCodigo: string, aluno: any): Promise<any> {
        return firebase.database().ref(`turmas/${turmaCodigo}/alunos/${aluno.matricula}`).remove()
    }

    public async pesquisaTurmas(termo: string): Promise<Turma[]> {
        return firebase.database().ref(`turmas`).orderByChild('nome')
            .once('value')
            .then((snapshot: any) => {
                let turmas: Turma[] = []

                snapshot.forEach((childSnapshot: any) => {
                    let turma = childSnapshot.val()
                    turma.key = childSnapshot.key

                    if ((turma.codigo + '').toLowerCase().startsWith(termo.toLowerCase())) {
                        turmas.push(turma)
                        console.log(turma.codigo)
                    }
                })
                if (turmas.length === 0) {
                    turmas.push({ nome: '', alunos: null, disciplinas: null, codigo: 'Nenhuma informação encontrada', sala: null, turno: null, horario: null })
                }

                return turmas
            })
    }

    public async getTurmaPorCodigo(id: string): Promise<any> {
        return firebase.database().ref(`turmas/${id}`)
            .once('value')
            .then((snapshot: any) => {
                let turma: Turma = {codigo: '', alunos:null, disciplinas:'', nome:'', sala:'', turno:'', horario: null}

                snapshot.forEach((childSnapshot: any) => {
                    if (childSnapshot.key === 'codigo') {
                        turma.codigo = childSnapshot.val()
                    } else if (childSnapshot.key === 'disciplinas') {
                        turma.disciplinas = childSnapshot.val()
                    } else if (childSnapshot.key === 'nome') {
                        turma.nome = childSnapshot.val()
                    } else if (childSnapshot.key === 'sala') {
                        turma.sala = childSnapshot.val()
                    } else if (childSnapshot.key === 'turno') {
                        turma.turno = childSnapshot.val()
                    } else if (childSnapshot.key === 'Horario') {
                        turma.horario = childSnapshot.val()
                    }
            })

            return turma

            })
    }

    public async cadastroHorario(codTurma: string, horario: HorarioAluno): Promise<any> {
        return firebase.database().ref(`turmas/${codTurma}/Horario`).remove()
            .then(()=> {
                firebase.database().ref(`turmas/${codTurma}/Horario`).set(horario)
                    .then(() => {
                        this.router.navigate(['home-admin/turma/listar'])
                    })
            })
    }
    public async getHorario(codTurma: string): Promise<any> {
        return firebase.database().ref(`turmas/${codTurma}/Horario`)
            .once('value')
            .then((snapshot: any) => {
                let horario: any = {segunda: [], terca: [], quarta: [], quinta: [], sexta: []}
                snapshot.forEach((childSnapshot: any) => {
                    let hor = childSnapshot.val()
                    if (childSnapshot.key === 'segunda') {
                        horario.segunda = hor
                    } else if (childSnapshot.key === 'terca') {
                        horario.terca = hor
                    } else if (childSnapshot.key === 'quarta') {
                        horario.quarta = hor
                    } else if (childSnapshot.key === 'quinta') {
                        horario.quinta = hor
                    } else if (childSnapshot.key === 'sexta') {
                        horario.sexta = hor
                    }

                });
                return horario
            })
    }
    public async getAlunos(codTurma: string): Promise<any> {
        return firebase.database().ref(`turmas/${codTurma}/alunos`).orderByChild('nome')
            .once('value')
            .then((snapshot: any) => {
                let alunos: any[] = []
                snapshot.forEach((childSnapshot: any) => {
                    let aluno = childSnapshot.val()
                    aluno.key = childSnapshot.key

                    alunos.push(aluno)
                });
                return alunos
            })
    }


}