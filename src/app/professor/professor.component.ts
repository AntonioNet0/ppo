import { Component, OnInit } from '@angular/core';
import { TurmaBD } from '../services/turma-bd.service';
import { AlunoBD } from '../services/aluno-bd.service';
import { Aluno } from '../shared/aluno.model';
import { AtaAlunoPDF } from '../services/atas-aluno.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css'],

})
export class ProfessorComponent implements OnInit {

  constructor(

  ) { }

  public alunos: Aluno[]

  ngOnInit() {
  }

}
