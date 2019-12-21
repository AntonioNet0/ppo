import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Administrador } from '../shared/admin.model';
import { Router } from '@angular/router';

@Injectable()
export class AvaliacaoBD {

    public async cadastroAvaliacao(avaliacao: any, disciplina: string, bimestre: number): Promise<any> {
        this.getAvaliacoesBimestre(disciplina, bimestre)
        return firebase.database().ref(`avaliacoes/${disciplina}/${bimestre}/${avaliacao.id}`).set(avaliacao)
    }

    public async getAvaliacoesBimestre(disciplina: string, bimestre: any): Promise<any> {
        return firebase.database().ref(`avaliacoes/${disciplina}/${bimestre}`)
            .once('value')
            .then((snapshot: any) => {
                let itens: any[] = [{}]
                snapshot.forEach((childSnapshot: any) => {
                    let item = childSnapshot.val()
                    itens.push(item)
                })
                return itens
            })
    } 

    public async getAvaliacoes(disciplinaNome: string): Promise<any> {
        return firebase.database().ref(`avaliacoes/${disciplinaNome}`)
            .once('value')
            .then((snapshot: any) => {
                let avaliacoes: any = []
                snapshot.forEach((childSnapshot: any) => {
                    let item = childSnapshot.val()
                    //item.key = childSnapshot.key
                    console.log(item)
                    avaliacoes[childSnapshot.key] = item
                });
                console.log(avaliacoes)
                return avaliacoes
            })
    }

    public async removerAvaliacao(avaliacao: any, rota: any): Promise<any> {
        return firebase.database().ref(`avaliacoes/${rota.disciplina}/${rota.bimestre}/${avaliacao.id}`).set(null)
    }

}