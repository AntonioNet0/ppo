import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';

@Component({
  selector: 'app-incluir-disciplinas',
  templateUrl: './incluir-disciplinas.component.html',
  styleUrls: ['./incluir-disciplinas.component.css'],
  providers: [ DisciplinaBD ]
})
export class IncluirDisciplinasComponent implements OnInit {

  public subFormulario: FormGroup = new FormGroup({
    
  })

  @Output() public disciplinasOutput: EventEmitter<string> = new EventEmitter()

  public disciplinasText: any 

  public disciplinas: any[] = []
  public disciplinasSelecionadas: any[] = []
// 
  constructor(
    private discplinaBD: DisciplinaBD
  ) { }

  ngOnInit() {
    this.discplinaBD.listaDisciplinas()
      .then((disciplinas: any) => {
        this.disciplinas = disciplinas
      })
  }

  public adicionarDisciplina(valor: string): void{
    this.disciplinasSelecionadas.push({nome: valor})
    this.disciplinas.splice(this.disciplinas.findIndex(d => d.nome == valor), 1)  
  }

  public removerDisciplina(valor: string): void{
    this.disciplinas.push({nome: valor})
    this.disciplinasSelecionadas.splice(this.disciplinasSelecionadas.findIndex(d => d.nome === valor), 1)
  }

  public adicionarDisciplinas(): void{
    this.disciplinasText = ''
    this.disciplinasSelecionadas.forEach(d => {
      this.disciplinasText += d.nome + '_'

    });
    this.disciplinasOutput.emit(this.disciplinasText)
  }

}
