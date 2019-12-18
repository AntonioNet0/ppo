import { Component, OnInit } from '@angular/core';
import { Autenticacao } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topo-professor',
  templateUrl: './topo-professor.component.html',
  styleUrls: ['./topo-professor.component.css'],
})
export class TopoProfessorComponent implements OnInit {

  constructor(
    private autenticacao: Autenticacao
   ) { }

  ngOnInit() {
  }

  public logout(): void{
    this.autenticacao.logout()
      .then(()=> alert("sadas"))
  }

}
