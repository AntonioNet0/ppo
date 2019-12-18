import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { ProfessorBD } from 'src/app/services/professor-bd.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css'],
  providers: [DisciplinaBD, ProfessorBD]
})
export class DiarioComponent implements OnInit {

  public disciplina: Disciplina = new Disciplina()
  public professorNome: string = ''

  constructor(
    private route: ActivatedRoute,
    private disciplinaBD: DisciplinaBD,
    private professorBD: ProfessorBD
  ) { }

  ngOnInit() {
    this.route.params.subscribe((partametros: Params) => {
      this.disciplinaBD.getDisciplina(partametros.idDisciplina)
        .then((disciplina: any) => {
          this.disciplina = disciplina
          this.professorBD.getProfessorPorMatricula(this.disciplina.professorMatricula)
            .then((resp: any) => {
              this.professorNome = resp.nome
            })
        })
    })
  }

}
