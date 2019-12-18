import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlunoBD } from 'src/app/services/aluno-bd.service';
import { Aluno } from 'src/app/shared/aluno.model';
import { GenericValidator } from 'src/app/shared/cpfValidator';
import { Turma } from 'src/app/shared/turma.model';
import { Boletim } from 'src/app/shared/boletim.model';
import { TurmaBD } from 'src/app/services/turma-bd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [AlunoBD, TurmaBD]
})
export class PerfilComponent implements OnInit {

  public aluno: Aluno = new Aluno()
  public estadoForm: boolean = false
  public disciplinas: string[] = []

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required]),
    'matricula': new FormControl(null),
    'email': new FormControl(null, [Validators.required]),
    'cpf': new FormControl(null, [Validators.required, GenericValidator.isValidCpf()]),
    'turma': new FormControl(null)
  })

  constructor(
    private alunoBD: AlunoBD,
    private turmaBD: TurmaBD
  ) { }

  ngOnInit() {
    this.alunoBD.listarAlunos()
      .then((alunos: any) => {
        this.alunoBD.getAluno()
          .then((aluno: any) => {
            this.aluno = aluno
            this.turmaBD.getTurmaPorCodigo(aluno.turma)
              .then((resp: any) => {
                this.disciplinas = resp.disciplinas.split("_")
              })
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
      
    } else{
      let aluno: Aluno = new Aluno()
        aluno.nome = this.formulario.value.nome+''.trim(),
        aluno.matricula = this.aluno.matricula+''.trim(),
        aluno.email = this.formulario.value.email+''.trim(),
        aluno.cpf = this.formulario.value.cpf+''.trim(),
        aluno.turma = this.aluno.turma+''.trim(),

      this.alunoBD.atualizarPerfil(aluno)
        .then(() =>{
          alert("Sucesso!")
          window.location.reload()
        },
        () => alert("Erro desconhecido!") )

    }
  }

}