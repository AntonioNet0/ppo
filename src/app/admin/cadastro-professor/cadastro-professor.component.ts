import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css'],
})
export class CadastroProfessorComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'matricula': new FormControl(null, [ Validators.required ])
  }) 



  constructor() { }

  ngOnInit() {
  }

}