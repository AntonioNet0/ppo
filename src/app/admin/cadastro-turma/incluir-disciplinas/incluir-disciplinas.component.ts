import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-incluir-disciplinas',
  templateUrl: './incluir-disciplinas.component.html',
  styleUrls: ['./incluir-disciplinas.component.css']
})
export class IncluirDisciplinasComponent implements OnInit {

  public subFormulario: FormGroup = new FormGroup({
    
  })

  public disciplinas: any[] = [{nome: 'disciplina 1'}, {nome: 'disciplina 2'}]
  public disciplinasSelecionadas: any[] = []
// 
  constructor() { }

  ngOnInit() {
  }

  public adicionarDisciplina(valor: string): void{
    this.disciplinasSelecionadas.push({nome: valor})
    this.disciplinas.splice(this.disciplinas.findIndex(d => d.nome == valor), 1)  
  }

  public removerDisciplina(valor: string): void{
    this.disciplinas.push({nome: valor})
    this.disciplinasSelecionadas.splice(this.disciplinasSelecionadas.findIndex(d => d.nome === valor), 1)
  }

}
