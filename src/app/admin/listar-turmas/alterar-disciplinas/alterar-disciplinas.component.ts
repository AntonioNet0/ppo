import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Turma } from 'src/app/shared/turma.model';

import {  debounceTime, switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-alterar-disciplinas',
  templateUrl: './alterar-disciplinas.component.html',
  styleUrls: ['./alterar-disciplinas.component.css'],
  providers: [ DisciplinaBD, TurmaBD ]
})
export class AlterarDisciplinasComponent implements OnInit {

  @Input() public disciplinasInput: string[]
  @Input() public turma: Turma

  @Output() public disciplinasOutput: EventEmitter<Turma> = new EventEmitter()

  public disciplinasText: any 

  public disciplinas: any[] = []
  public disciplinasTurma: any[] 
 
  constructor(
    private discplinaBD: DisciplinaBD
  ) { }

  ngOnInit() {
    this.discplinaBD.listaDisciplinas()
      .then((disciplinas: any) => {
        disciplinas.forEach((d: any) => {
          this.disciplinas.push(d.nome)
        });
      })
    
  }

  public adicionarDisciplina(valor: string): void{
    if(this.disciplinasTurma === undefined) {
      this.disciplinasTurma = this.disciplinasInput
    }
    if( this.disciplinasTurma.findIndex(d => d === valor) === -1){
      this.disciplinasTurma.push(valor)
    }
    this.disciplinas.splice(this.disciplinas.findIndex(d => d === valor), 1)
    
  }

  public removerDisciplina(valor: string): void{
    if(this.disciplinasTurma === undefined) {
      this.disciplinasTurma = this.disciplinasInput
    }
    if(this.disciplinas.findIndex(d => d === valor) === -1){
      this.disciplinas.push(valor)
    }
    this.disciplinasTurma.splice(this.disciplinasTurma.findIndex(d => d === valor), 1)
  }

  public adicionarDisciplinas(): void{
    this.disciplinasText = ''
    console.log("ESSA MERDA: ",this.disciplinasTurma)
    this.disciplinasTurma.forEach(d => {
      if(this.disciplinasTurma[this.disciplinasTurma.length-1] === d) {
        this.disciplinasText += d
      }else{
         this.disciplinasText += d + '_'
      }
    });
    let turma = this.turma
    turma.disciplinas = this.disciplinasText
    console.log("A outra merda" + this.disciplinasText)
    this.disciplinasOutput.emit(turma)
  }

}
