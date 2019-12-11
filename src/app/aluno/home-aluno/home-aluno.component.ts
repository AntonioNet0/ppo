import { Component, OnInit } from '@angular/core';
import { Autenticacao } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-aluno',
  templateUrl: './home-aluno.component.html',
  styleUrls: ['./home-aluno.component.css']
})
export class HomeAlunoComponent implements OnInit {

  constructor(
  private autenticaco: Autenticacao){}
  ngOnInit() {
  }
  public logout(): void{
    console.log("clicou")
    this.autenticaco.logout()
  }

}
