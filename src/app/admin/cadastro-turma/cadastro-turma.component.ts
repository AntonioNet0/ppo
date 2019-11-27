import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-turma',
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.css']
})
export class CadastroTurmaComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'codigo': new FormControl(null, [ Validators.required ]),
    'nome': new FormControl(null, [ Validators.required ]),
    'sala': new FormControl(null, [ Validators.required ]),
    'disciplinas': new FormControl(null, [ Validators.required ]),
    'turno': new FormControl('Turno', [ Validators.required ])
  })

  constructor() { }

  ngOnInit() {
  }

  public a(): void{

  }

}
