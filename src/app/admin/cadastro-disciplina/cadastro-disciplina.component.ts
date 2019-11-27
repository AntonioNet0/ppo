import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-disciplina',
  templateUrl: './cadastro-disciplina.component.html',
  styleUrls: ['./cadastro-disciplina.component.css']
})
export class CadastroDisciplinaComponent implements OnInit {
  
  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [ Validators.required]),
    'codigo': new FormControl(null, [ Validators.required ]),
    'professor': new FormControl(null, [ Validators.required ]),
    'cargaHoraria': new FormControl(null, [ Validators.required ])
  })
  constructor() { }

  ngOnInit() {
  }

}
