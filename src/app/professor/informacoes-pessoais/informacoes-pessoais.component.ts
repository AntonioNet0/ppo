import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfessorBD } from 'src/app/services/professor-bd.service';
import { Professor } from 'src/app/shared/professor.model';
import { GenericValidator } from 'src/app/shared/cpfValidator';

@Component({
  selector: 'app-informacoes-pessoais',
  templateUrl: './informacoes-pessoais.component.html',
  styleUrls: ['./informacoes-pessoais.component.css'],
  providers: [ProfessorBD]
})
export class InformacoesPessoaisComponent implements OnInit {

  public professor: Professor = new Professor('', '', '', '', '')

  public estadoForm: boolean = false

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required]),
    'matricula': new FormControl(null),
    'email': new FormControl(null, [Validators.required]),
    'cpf': new FormControl(null, [Validators.required, GenericValidator.isValidCpf()])
  })

  constructor(
    private professorBD: ProfessorBD
  ) { }

  ngOnInit() {
    this.professorBD.listProfessores()
      .then((professores: any) => {
        this.professorBD.getProfessor()
          .then((professor: any) => {
            this.professor = professor
          })
      })

  }

  public editarInformacoes(): void {
    this.estadoForm = !this.estadoForm
  }

  public atualizarInformacoes(): void {
    if (this.formulario.invalid) {
      this.formulario.get('nome').markAsTouched()
      this.formulario.get('cpf').markAsTouched()
      this.formulario.get('email').markAsTouched()
      
    } else {

      let professor: Professor = new Professor(
        this.formulario.value.nome+''.trim(),
        this.professor.matricula+''.trim(),
        '',
        this.formulario.value.email+''.trim(),
        this.formulario.value.cpf+''.trim()
      )

      this.professorBD.atualizarInformacoesProfessor(professor)
        .then(() =>{
          alert("Sucesso!")
          window.location.reload()
        },
        () => alert("Erro desconhecido!") )

    }
  }

}
