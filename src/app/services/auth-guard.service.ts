import { CanActivate } from '@angular/router';
import { Autenticacao } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AutenticacaoGuard implements CanActivate{

    constructor(
        private autenticacao: Autenticacao
    ){}

    canActivate(){
        return this.autenticacao.autenticado()
    }

}