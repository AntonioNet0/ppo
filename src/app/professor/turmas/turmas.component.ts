import { Component, OnInit } from '@angular/core';
import { ProfessorBD } from 'src/app/services/professor-bd.service';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { Disciplina } from 'src/app/shared/disciplina.model';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css'],
  providers: [ DisciplinaBD, ProfessorBD ]
})
export class TurmasComponent implements OnInit {

  public disciplinas: Disciplina[] = []

  constructor(
    private disciplinaBD: DisciplinaBD,
  ) { }

  ngOnInit() {
    this.disciplinaBD.listaDisciplinas()
      .then(() => {
        this.disciplinaBD.listaDisciplinasProfessor()
          .then((resp: any) => {
            this.disciplinas = resp
          })
      })
  }

}
