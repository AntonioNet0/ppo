import { Component, OnInit } from '@angular/core';
import { Autenticacao } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-boletim',
  templateUrl: './home-boletim.component.html',
  styleUrls: ['./home-boletim.component.css']
})
export class HomeBoletimComponent implements OnInit {

  constructor(
  private autenticaco: Autenticacao){}
  ngOnInit() {
  }
  public logout(): void{
    console.log("clicou")
    this.autenticaco.logout()
  }

}
