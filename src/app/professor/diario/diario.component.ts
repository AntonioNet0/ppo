import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { ProfessorBD } from 'src/app/services/professor-bd.service';
import { AtaAlunoPDF } from 'src/app/services/atas-aluno.service';
import { TurmaBD } from 'src/app/services/turma-bd.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css'],
  providers: [DisciplinaBD, ProfessorBD, AtaAlunoPDF, TurmaBD]
})
export class DiarioComponent implements OnInit {

  public disciplina: Disciplina = new Disciplina()
  public professorNome: string = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private disciplinaBD: DisciplinaBD,
    private professorBD: ProfessorBD,
    private ataPDF: AtaAlunoPDF,
    private turmaBD: TurmaBD
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

  public gerar(): void{
    this.turmaBD.getAlunos(this.disciplina.turma)
      .then(alunos => {
        this.ataPDF.ataPresenca(alunos, this.disciplina, this.professorNome)
      })
    
  }

  public voltar(): void {
    this.router.navigate(['home-professor/professor/turmas/'])
  }

}
