import { Component, OnInit } from '@angular/core';
import { HorarioAluno } from 'src/app/shared/horario.model';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { AlunoBD } from 'src/app/services/aluno-bd.service';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Aluno } from 'src/app/shared/aluno.model';


@Component({
  selector: 'app-horario-aluno',
  templateUrl: './horario-aluno.component.html',
  styleUrls: ['./horario-aluno.component.css'],
  providers: [AlunoBD, TurmaBD]
})
export class HorarioAlunoComponent implements OnInit {

  public horarioAluno: any = {
                        segunda: [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }],
                        terca: [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }],
                        quarta: [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }],
                        quinta: [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }],
                        sexta: [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
                      }

  public hora: string[] = [
         '07:00 - 07:50',
         '07:50 - 08:40',
         '08:40 - 09:30',
         '09:45 - 10:35',
         '10:35 - 11:25',
         '11:25 - 12:15'
       ]

  constructor(
    private alunoBD: AlunoBD,
    private turmaBD: TurmaBD
  ){}

  ngOnInit(){
    this.alunoBD.listarAlunos()
      .then(()=> {
        this.alunoBD.getAluno()
          .then((resp: any) => {
            this.turmaBD.getHorario(resp.turma)
              .then((horario: any) => {
                this.horarioAluno = horario
              })
          })
      })
  }

}
