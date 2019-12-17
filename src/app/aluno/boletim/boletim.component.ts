import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { AlunoBD } from 'src/app/services/aluno-bd.service';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Aluno } from 'src/app/shared/aluno.model';
import { Turma } from 'src/app/shared/turma.model';

@Component({
  selector: 'app-boletim',
  templateUrl: './boletim.component.html',
  styleUrls: ['./boletim.component.css'],
  providers: [AlunoBD, TurmaBD, DisciplinaBD]
})
export class BoletimComponent implements OnInit {

  public alunos: Aluno[] = []
  public turmas: Turma [] = []
  public disciplinas: Disciplina[] = []
 
  constructor(
  
    private alunoBD: AlunoBD,
    private turmaBD:TurmaBD,
    private disciplinaBD: DisciplinaBD 

  ) {}

  ngOnInit() {
    
    this.disciplinaBD.listaDisciplinas()
      .then((disciplinas: any) => {
        this.disciplinas = disciplinas
      })
      this.alunoBD.listarAlunos()
        .then((alunos: any) => {
          this.alunos = alunos
        })
      this.turmaBD.listarTurmas()
      .then((turmas: any) => {
        this.turmas = turmas
      })
    }
}
