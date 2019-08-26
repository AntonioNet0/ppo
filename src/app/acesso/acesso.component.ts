import { Component, OnInit } from '@angular/core';
import { Autenticacao } from '../services/auth.service';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  providers: [Autenticacao]
})
export class AcessoComponent implements OnInit {

  public aluno: boolean = true

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() {

    this.autenticacao.autenticado()

  }
  
  public trocarModulo(modulo: string): void{
    this.aluno = modulo === 'aluno' ? true : false 
  }

}
