import { Component, OnInit } from '@angular/core';
import { AlunoBD } from 'src/app/services/aluno-bd.service';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Aluno } from 'src/app/shared/aluno.model';

@Component({
  selector: 'app-boletim',
  templateUrl: './boletim.component.html',
  styleUrls: ['./boletim.component.css'],
  providers: [AlunoBD, TurmaBD, DisciplinaBD]
})
export class BoletimComponent implements OnInit {

  public aluno: Aluno = new Aluno()
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
}
}
