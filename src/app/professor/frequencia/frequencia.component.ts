import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { Aluno } from 'src/app/shared/aluno.model';
import { TurmaBD } from 'src/app/services/turma-bd.service';

@Component({
  selector: 'app-frequencia',
  templateUrl: './frequencia.component.html',
  styleUrls: ['./frequencia.component.css'],
  providers: [DisciplinaBD, TurmaBD]
})
export class FrequenciaComponent implements OnInit {

  public diaAula: string = ''
  public alunos: any[] = []
  public disciplina: Disciplina = new Disciplina()

  constructor(
    private route: ActivatedRoute,
    private disciplinaBD: DisciplinaBD,
    private turmaBD: TurmaBD
  ) { }

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {
      this.disciplinaBD.getHorario(parametros.id)
        .then((resp: any) => {
          this.diaAula = resp
        })
        this.disciplinaBD.getDisciplina(parametros.id)
            .then((disciplina: Disciplina) => {
              this.disciplina = disciplina
              this.turmaBD.getAlunos(disciplina.turma)
                .then((alunos: any) => {
                  this.alunos = alunos
                })
            })
    })

  }

}
