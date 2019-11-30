import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Professor } from 'src/app/shared/professor.model';
import { GenericValidator } from 'src/app/shared/cpfValidator';
import { ProfessorBD } from 'src/app/services/professor-bd.service';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css'],
  providers: [ ProfessorBD ]
})
export class CadastroProfessorComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [ Validators.required, Validators.maxLength(40) ]),
    'matricula': new FormControl(null, [ Validators.required ]),
    'senha': new FormControl(null, [ Validators.required, Validators.minLength(8) ]),
    'email': new FormControl(null, [ Validators.required, Validators.email ]),
    'cpf': new FormControl(null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11), GenericValidator.isValidCpf() ]),
   
  }) 

  public estadoButton: boolean = false

  constructor(
    private professorBD: ProfessorBD
  ) { }

  ngOnInit() {
  }

  public cadastro(): void {
    if (!this.formulario.valid) {

      this.formulario.get('nome').markAsTouched()
      this.formulario.get('matricula').markAsTouched()
      this.formulario.get('senha').markAsTouched()
      this.formulario.get('email').markAsTouched()

    }else {

      let professor: Professor = new Professor(
        this.formulario.get('nome').value,
        this.formulario.get('matricula').value,
        this.formulario.get('senha').value,
        this.formulario.get('email').value,
        this.formulario.get('cpf').value
        )
      
      this.professorBD.cadastroProfessor(professor)
        .then(()=> {
          //if(this.erroMessagem === undefined){}
          this.estadoButton = true
        })

      


    }
  }

}