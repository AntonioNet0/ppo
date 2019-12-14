import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlunoBD } from 'src/app/services/aluno-bd.service';
import { Aluno } from 'src/app/shared/aluno.model';
import { GenericValidator } from 'src/app/shared/cpfValidator';
import { Turma } from 'src/app/shared/turma.model';
import { Boletim } from 'src/app/shared/boletim.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [AlunoBD]
})
export class PerfilComponent implements OnInit {

  public aluno: Aluno = new Aluno()
  public estadoForm: boolean = false

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required]),
    'matricula': new FormControl(null),
    'email': new FormControl(null, [Validators.required]),
    'cpf': new FormControl(null, [Validators.required, GenericValidator.isValidCpf()])

  })

  constructor(
    private alunoBD: AlunoBD
  ) { }

  ngOnInit() {
    this.alunoBD.listarAlunos()
      .then((alunos: any) => {
        this.alunoBD.getAluno()
          .then((aluno: any) => {
            this.aluno = aluno
          })
      })

  }

  public editarPerfil(): void {
    this.estadoForm = !this.estadoForm
  }

  public atualizarPerfil(): void {
    if (this.formulario.invalid) {
      this.formulario.get('nome').markAsTouched()
      this.formulario.get('cpf').markAsTouched()
      this.formulario.get('email').markAsTouched()
    } else {

  
      let aluno: Aluno = new Aluno(
        this.formulario.value.nome+''.trim(),
        this.aluno.matricula+''.trim(),
        '',
        this.formulario.value.email+''.trim(),
        this.formulario.value.cpf+''.trim()
      )


      this.alunoBD.atualizarPerfil(aluno)
        .then(() =>{
          alert("Sucesso!")
          window.location.reload()
        },
        () => alert("Erro desconhecido!") )

    }
  }

}
//