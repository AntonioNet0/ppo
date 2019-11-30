import { Component, OnInit, Input } from '@angular/core';
import { Professor } from 'src/app/shared/professor.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/cpfValidator';
import { ProfessorBD } from 'src/app/services/professor-bd.service';

@Component({
  selector: 'app-editar-professor',
  templateUrl: './editar-professor.component.html',
  styleUrls: ['./editar-professor.component.css'],
  providers: [ ProfessorBD ]
})
export class EditarProfessorComponent implements OnInit {

  @Input() public professor: Professor

  public estadoBotao: boolean = true

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [ Validators.required, Validators.maxLength(40) ]),
    'matricula': new FormControl({ value: '', disabled: true }),
    'senha': new FormControl({ value: '', disabled: true }),
    'email': new FormControl(null, [ Validators.required, Validators.email ]),
    'cpf': new FormControl(null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11), GenericValidator.isValidCpf() ]),
   
  }) 

  constructor(
    private professorBD: ProfessorBD
  ) { }

  ngOnInit() {
  }

  public formValido(): void{
    if(this.formulario.valid){
      this.estadoBotao = false
    }else{
      this.estadoBotao = true
    }
  }

  public confirmarAlteracoes(): void {
    if (!this.formulario.valid) {

      this.formulario.get('nome').markAsTouched()
      this.formulario.get('email').markAsTouched()

    }else {

      let professor: Professor = new Professor(
        this.formulario.get('nome').value,
        this.professor.matricula,
        this.professor.senha,
        this.formulario.get('email').value,
        this.formulario.get('cpf').value
        )
      
      this.professorBD.editarProfessor(professor, this.professor.matricula)
        .then(() => {
          alert('Sucesso!')
          window.location.reload()
        },
        (error: any) => {
          alert(error)
        })

      


    }
  }

}
