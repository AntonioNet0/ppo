import { Component, OnInit } from '@angular/core';
import { Autenticacao } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topo-adm',
  templateUrl: './topo-adm.component.html',
  styleUrls: ['./topo-adm.component.css']
})
export class TopoAdmComponent implements OnInit {

  constructor(
    private autenticaco: Autenticacao
  ) { }

  ngOnInit() {
  }

  public logout(): void{
    console.log("clicou")
    this.autenticaco.logout()
  }

}
