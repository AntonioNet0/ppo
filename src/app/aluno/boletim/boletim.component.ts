import { Component, OnInit } from '@angular/core';
import { AlunoBD } from 'src/app/services/aluno-bd.service';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Aluno } from 'src/app/shared/aluno.model';
import { NotasBD } from 'src/app/services/notas-bd.service';

@Component({
  selector: 'app-boletim',
  templateUrl: './boletim.component.html',
  styleUrls: ['./boletim.component.css'],
  providers: [AlunoBD, TurmaBD, NotasBD]
})
export class BoletimComponent implements OnInit {

  public aluno: Aluno = new Aluno()
  public disciplinas: string[] = []
  public notas: any = [{}, {}, {}, {}, {}, {}, {}, {}]

  constructor(
    private alunoBD: AlunoBD,
    private turmaBD: TurmaBD,
    private notasBD: NotasBD
  ) { }
  ngOnInit() {
    this.alunoBD.listarAlunos()
      .then((alunos: any) => {
        this.alunoBD.getAluno()
          .then((aluno: any) => {
            this.aluno = aluno
            this.turmaBD.getTurmaPorCodigo(aluno.turma)
              .then((resp: any) => {
                this.disciplinas = resp.disciplinas.split("_")
                this.disciplinas.forEach(d => {
                  this.notasBD.getNotasAluno(d, this.aluno.matricula)
                    .then((resp: any) => {
                      let pos = this.disciplinas.indexOf(d)
                      this.notas[pos] = (resp)
                    })
                })
              })
          })
      })
  }

  public estado(notas: any): any {
    let media = 0, cont = 0
    
    if(notas[0] !== undefined){
      media += notas[0].mediaBimestre
      cont++
    }
    if(notas[1] !== undefined){
      media += notas[1].mediaBimestre
      cont++
    }
    if(notas[2] !== undefined){
      media += notas[2].mediaBimestre
      cont++
    }
    if(notas[3] !== undefined){
      media += notas[3].mediaBimestre
      cont++
    }

    if (cont === 4) {
      if (media/4 >= 6){
        return "Aprovado"
      } 
      return "Reprovado"
    } else {
      return "Cursando"
    }

  }

}
