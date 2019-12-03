import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/cpfValidator';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Turma } from 'src/app/shared/turma.model';
import { Aluno } from 'src/app/shared/aluno.model';
import { AlunoBD } from 'src/app/services/aluno-bd.service';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css'],
  providers: [ TurmaBD, AlunoBD ]
})
export class CadastroAlunoComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [ Validators.required ]),
    'matricula': new FormControl(null, [ Validators.required ]),
    'senha': new FormControl(null, [ Validators.required ]),
    'email': new FormControl(null, [ Validators.required ]),
    'cpf': new FormControl(null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11), GenericValidator.isValidCpf ]),
    'turma': new FormControl(null, [ Validators.required ])
  }) 

  public turmas: Turma[] = []

  constructor(
    private turmaBD: TurmaBD,
    private alunoBD: AlunoBD
  ) { }

  ngOnInit() {
    this.turmaBD.listarTurmas()
      .then((turmas: any) => {
        this.turmas = turmas
      })
  }

  public cadastro(): void{
    if(!this.formulario.valid){

      this.formulario.get('nome').markAsTouched()
      this.formulario.get('matricula').markAsTouched()
      this.formulario.get('senha').markAsTouched()
      this.formulario.get('email').markAsTouched()
      this.formulario.get('turma').markAsTouched()
      this.formulario.get('cpf').markAsTouched()

    }else{

      let aluno: Aluno = new Aluno()
      aluno.nome = this.formulario.get('nome').value
      aluno.matricula = this.formulario.get('matricula').value
      aluno.senha = this.formulario.get('senha').value
      aluno.email = this.formulario.get('email').value
      aluno.turma = this.formulario.get('turma').value
      aluno.cpf = this.formulario.get('cpf').value

      this.alunoBD.cadastroAluno(aluno)
      .then(()=>{
        this.turmaBD.adicionarAluno(aluno.turma, {nome: aluno.nome, matricula: aluno.matricula})
        .then(()=>{
           alert("Sucesso!")
        }),
        (error: any) => {
          alert("ERRO!")
        }
       
      },
      (error: any) => {
        alert("Erro!")
      })

    }
  }

}
