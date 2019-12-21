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
  providers: [AlunoBD, TurmaBD, DisciplinaBD]
})
export class HorarioAlunoComponent implements OnInit {

  public aluno: Aluno = new Aluno()
  public disciplinas: string[] = []

  public horarioaluno: HorarioAluno = {
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
    private disciplinaBD: DisciplinaBD,
    private alunoBD: AlunoBD,
    private turmaBD: TurmaBD
  ) { }

  ngOnInit() {
    this.alunoBD.listarAlunos()
      .then((alunos: any) => {
        this.alunoBD.getAluno()
          .then((aluno: any) => {
            this.aluno = aluno
            this.turmaBD.getHorario(aluno.turma)
            .then((resp: any) => {
              resp.forEach(element => {
                this.horarioBuilder(element)
                 })
                })
              })
          }
      )}
  
  private horarioBuilder(disciplina: any): void {
    if (disciplina.horarioaluno !== undefined) {
      this.horarioaluno.segunda = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      this.horarioaluno.terca = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      this.horarioaluno.quarta = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      this.horarioaluno.quinta = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      this.horarioaluno.sexta = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
    

      if (disciplina.horarioaluno.segunda === undefined) {

        this.horarioaluno.segunda = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      
      } else {

        if (disciplina.horario.segunda[0] !== undefined) {

          this.horarioaluno.segunda[0] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        }  
        if (disciplina.horarioaluno.segunda[1] !== undefined) {

          this.horarioaluno.segunda[1] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        }   
        
        if (disciplina.horarioaluno.segunda[2] !== undefined) {

          this.horarioaluno.segunda[2] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        if (disciplina.horarioaluno.segunda[3] !== undefined) {

          this.horarioaluno.segunda[3] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horarioaluno.segunda[4] !== undefined) {

          this.horarioaluno.segunda[4] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        
        }   
        
        if (disciplina.horario.segunda[5] !== undefined) {

          this.horarioaluno.segunda[5] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }   

      }

      if (disciplina.horarioaluno.terca === undefined) {

        this.horarioaluno.terca = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
     
      } else {
        
        if (disciplina.horarioaluno.terca[0] !== undefined) {

          this.horarioaluno.terca[0] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }    

        if (disciplina.horarioaluno.terca[1] !== undefined) {

          this.horarioaluno.terca[1] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }  
        
        if (disciplina.horarioaluno.terca[2] !== undefined) {

          this.horarioaluno.terca[2] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }  
        
        if (disciplina.horarioaluno.terca[3] !== undefined) {

          this.horarioaluno.terca[3] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }  
        
        if (disciplina.horarioaluno.terca[4] !== undefined) {

          this.horarioaluno.terca[4] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        
        }  
        if (disciplina.horarioaluno.terca[5] !== undefined) {

          this.horarioaluno.terca[5] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 

      }

      if (disciplina.horarioaluno.quarta === undefined) {
        this.horarioaluno.quarta = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      } else {

        if (disciplina.horarioaluno.quarta[0] !== undefined) {

          this.horarioaluno.quarta[0] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        }  

        if (disciplina.horarioaluno.quarta[1] !== undefined) {

          this.horarioaluno.quarta[1] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }   
        
        if (disciplina.horarioaluno.quarta[2] !== undefined) {

          this.horarioaluno.quarta[2] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horarioaluno.quarta[3] !== undefined) {

          this.horarioaluno.quarta[3] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horarioaluno.quarta[4] !== undefined) {

          this.horarioaluno.quarta[4] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        
        } 
        
        if (disciplina.horarioaluno.quarta[5] !== undefined) {

          this.horarioaluno.quarta[5] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }

      }

      if (disciplina.horarioaluno.quinta === undefined) {
        this.horarioaluno.quinta = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      } else {
        
        if (disciplina.horarioaluno.quinta[0] !== undefined) {

          this.horarioaluno.quinta[0] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }  

        if (disciplina.horarioaluno.quinta[1] !== undefined) {

          this.horarioaluno.quinta[1] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }  
        
        if (disciplina.horarioaluno.quinta[2] !== undefined) {

          this.horarioaluno.quinta[2] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horarioaluno.quinta[3] !== undefined) {

          this.horarioaluno.quinta[3] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horarioaluno.quinta[4] !== undefined) {

          this.horarioaluno.quinta[4] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        
        } 
        
        if (disciplina.horarioaluno.quinta[5] !== undefined) {

          this.horarioaluno.quinta[5] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }

      }

      if (disciplina.horarioaluno.sexta === undefined) {
        this.horarioaluno.sexta = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      } else {
        console.log(disciplina.horarioaluno.sexta)
        if (disciplina.horarioaluno.sexta[0] !== undefined) {

          this.horarioaluno.sexta[0] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 

        if (disciplina.horarioaluno.sexta[1] !== undefined) {

          this.horarioaluno.sexta[1] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horarioaluno.sexta[2] !== undefined) {

          this.horarioaluno.sexta[2] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        console.log(disciplina.horarioaluno.sexta[3] !== undefined)
        if (disciplina.horarioaluno.sexta[3] !== undefined) {

          this.horarioaluno.sexta[3] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
          console.log(this.horarioaluno.sexta[3])
        } 
        
        if (disciplina.horarioaluno.sexta[4] !== undefined) {

          this.horarioaluno.sexta[4] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        
        } 
        if (disciplina.horarioaluno.sexta[5] !== undefined) {

          this.horarioaluno.sexta[5] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 

      }

    }
  }

}
