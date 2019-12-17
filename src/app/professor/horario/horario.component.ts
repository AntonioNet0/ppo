import { Component, OnInit } from '@angular/core';
import { HorarioAluno } from 'src/app/shared/horario.model';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
  providers: [DisciplinaBD]
})
export class HorarioComponent implements OnInit {

  public horario: HorarioAluno = {
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
    private disciplinaBD: DisciplinaBD
  ) { }

  ngOnInit() {
    this.disciplinaBD.listaDisciplinas()
      .then(() => {
        this.disciplinaBD.listaDisciplinasProfessor()
          .then((resp: any) => {
            resp.forEach(element => {
              this.horarioBuilder(element)
            });
          })
      })
  }

  private horarioBuilder(disciplina: any): void {
    if (disciplina.horario === undefined) {
      this.horario.segunda = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      this.horario.terca = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      this.horario.quarta = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      this.horario.quinta = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      this.horario.sexta = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
    } else {

      if (disciplina.horario.segunda === undefined) {

        this.horario.segunda = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      
      } else {

        if (disciplina.horario.segunda[0] !== undefined) {

          this.horario.segunda[0] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        }  
        if (disciplina.horario.segunda[1] !== undefined) {

          this.horario.segunda[1] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        }   
        
        if (disciplina.horario.segunda[2] !== undefined) {

          this.horario.segunda[2] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        if (disciplina.horario.segunda[3] !== undefined) {

          this.horario.segunda[3] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horario.segunda[4] !== undefined) {

          this.horario.segunda[4] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        
        }   
        
        if (disciplina.horario.segunda[5] !== undefined) {

          this.horario.segunda[5] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }   

      }

      if (disciplina.horario.terca === undefined) {

        this.horario.terca = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
     
      } else {
        
        if (disciplina.horario.terca[0] !== undefined) {

          this.horario.terca[0] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }    

        if (disciplina.horario.terca[1] !== undefined) {

          this.horario.terca[1] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }  
        
        if (disciplina.horario.terca[2] !== undefined) {

          this.horario.terca[2] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }  
        
        if (disciplina.horario.terca[3] !== undefined) {

          this.horario.terca[3] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }  
        
        if (disciplina.horario.terca[4] !== undefined) {

          this.horario.terca[4] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        
        }  
        if (disciplina.horario.terca[5] !== undefined) {

          this.horario.terca[5] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 

      }

      if (disciplina.horario.quarta === undefined) {
        this.horario.quarta = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      } else {

        if (disciplina.horario.quarta[0] !== undefined) {

          this.horario.quarta[0] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        }  

        if (disciplina.horario.quarta[1] !== undefined) {

          this.horario.quarta[1] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }   
        
        if (disciplina.horario.quarta[2] !== undefined) {

          this.horario.quarta[2] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horario.quarta[3] !== undefined) {

          this.horario.quarta[3] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horario.quarta[4] !== undefined) {

          this.horario.quarta[4] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        
        } 
        
        if (disciplina.horario.quarta[5] !== undefined) {

          this.horario.quarta[5] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }

      }

      if (disciplina.horario.quinta === undefined) {
        this.horario.quinta = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      } else {
        
        if (disciplina.horario.quinta[0] !== undefined) {

          this.horario.quinta[0] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }  

        if (disciplina.horario.quinta[1] !== undefined) {

          this.horario.quinta[1] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }  
        
        if (disciplina.horario.quinta[2] !== undefined) {

          this.horario.quinta[2] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horario.quinta[3] !== undefined) {

          this.horario.quinta[3] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horario.quinta[4] !== undefined) {

          this.horario.quinta[4] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        
        } 
        
        if (disciplina.horario.quinta[5] !== undefined) {

          this.horario.quinta[5] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        }

      }

      if (disciplina.horario.sexta === undefined) {
        this.horario.sexta = [{ disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }, { disciplina: '' }]
      } else {
      
        if (disciplina.horario.sexta[0] !== undefined) {

          this.horario.sexta[0] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 

        if (disciplina.horario.sexta[1] !== undefined) {

          this.horario.sexta[1] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horario.sexta[2] !== undefined) {

          this.horario.sexta[2] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 
        
        if (disciplina.horario.sexta[3] !== undefined) {

          this.horario.sexta[3] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
          
        } 
        
        if (disciplina.horario.sexta[4] !== undefined) {

          this.horario.sexta[4] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}
        
        } 
        if (disciplina.horario.sexta[5] !== undefined) {

          this.horario.sexta[5] = {disciplina: disciplina.nome, nomeTurma: disciplina.turma}

        } 

      }

    }
  }

}
