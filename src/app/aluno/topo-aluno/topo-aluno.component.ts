import { Component } from '@angular/core';
import { Autenticacao } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topo-aluno',
  templateUrl: './topo-aluno.component.html',
  styleUrls: ['./topo-aluno.component.css'],
})
export class TopoAlunoComponent  {

  constructor(
    private autenticacao: Autenticacao
   ) { }

  ngOnInit() {
  }

  public logout(): void{
    this.autenticacao.logout()
  }

}
