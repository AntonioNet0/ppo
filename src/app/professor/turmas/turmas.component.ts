import { Component, OnInit } from '@angular/core';
import { Turma } from 'src/app/shared/turma.model';
import { TurmaBD } from 'src/app/services/turma-bd.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css'],
  providers: [ TurmaBD ]
})
export class TurmasComponent implements OnInit {

  public turmas: Turma[] = []

  constructor(
    private turmaBD: TurmaBD
  ) { }

  ngOnInit() {
  }

}
