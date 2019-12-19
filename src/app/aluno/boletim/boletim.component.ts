import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { AlunoBD } from 'src/app/services/aluno-bd.service';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Aluno } from 'src/app/shared/aluno.model';
import { Turma } from 'src/app/shared/turma.model';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-boletim',
  templateUrl: './boletim.component.html',
  styleUrls: ['./boletim.component.css'],
  providers: [AlunoBD, TurmaBD, DisciplinaBD]
})
export class BoletimComponent implements OnInit {

  public aluno: Aluno = new Aluno()
  public estadoForm: boolean = false
  public disciplinas: string[] = []
 
  constructor(
    private alunoBD: AlunoBD,
    private turmaBD: TurmaBD
  ) {}
  ngOnInit() {
    this.alunoBD.listarAlunos()
      .then((alunos: any) => {
        this.alunoBD.getAluno()
          .then((aluno: any) => {
            this.aluno = aluno
            this.turmaBD.getTurmaPorCodigo(aluno.turma)
              .then((resp: any) => {
                this.disciplinas = resp.disciplinas.split("_")
              })
          })
      })
}}
