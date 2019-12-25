import { Component, OnInit } from '@angular/core';
import { AlunoBD } from 'src/app/services/aluno-bd.service';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Aluno } from 'src/app/shared/aluno.model';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { ProfessorBD } from 'src/app/services/professor-bd.service';
import { FrequenciaBD } from 'src/app/services/frequencia.service';
import { AvaliacaoBD } from 'src/app/services/avaliacao-bd.service';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css'],
  providers: [AlunoBD, TurmaBD, DisciplinaBD, ProfessorBD, FrequenciaBD, AvaliacaoBD]
})
export class DisciplinasComponent implements OnInit {

  public aluno: Aluno = new Aluno()
  public disciplinas: any = []

  constructor(
    private alunoBD: AlunoBD,
    private turmaBD: TurmaBD,
    private disciplinaBD: DisciplinaBD,
    private professorBD: ProfessorBD,
    private frequenciaBD: FrequenciaBD,
    private avaliacaoBD: AvaliacaoBD
  ) { }

  ngOnInit() {
    this.alunoBD.listarAlunos()
      .then(() => {
        this.alunoBD.getAluno()
          .then((aluno: Aluno) => {
            this.aluno = aluno
            this.turmaBD.getTurmaPorCodigo(aluno.turma)
              .then((turma) => {
                // this.disciplinas = turma.disciplinas.split("_")
                // console.log(this.disciplinas)
                turma.disciplinas.split('_').forEach(d => {

                  this.disciplinaBD.getDisciplina(d)
                    .then(resp => {
                      this.professorBD.getProfessorPorMatricula(resp.professorMatricula)
                        .then(prof => {
                          let disciplina = { disciplina: '', professor: '', faltas: 0, avals: null, pos: null }

                          this.avaliacaoBD.getAvaliacoes(d)
                            .then(avals => {
                              
                             
                              this.frequenciaBD.getFaltasAlunoDisciplina(d, this.aluno.matricula)
                                .then(resp => {
                                  disciplina.disciplina = d
                                  disciplina.professor = prof.nome
                                  disciplina.faltas = resp
                                  disciplina.avals = avals
                                  if(avals[0] !== undefined){
                                    let cont = 0
                                    avals[0][0].notas.forEach(a => {
                                     
                                      if (this.aluno.matricula === a.matricula) {
                                        disciplina.pos = cont
                                      }
                                      cont++
                                    })
                                  }
                                  this.disciplinas.push(disciplina)
                                })
                            })



                        })
                    })
                });
              })
          })
      })
  }

}
