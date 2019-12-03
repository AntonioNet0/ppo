import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/cpfValidator';
import { Aluno } from 'src/app/shared/aluno.model';
import { Turma } from 'src/app/shared/turma.model';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { AlunoBD } from 'src/app/services/aluno-bd.service';
import { Observable } from 'rxjs';

import { switchMap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.css'],
  providers: [ TurmaBD, AlunoBD ]
})
export class EditarAlunoComponent implements OnInit {

  @Input() public aluno: Aluno

  public estadoBotao: boolean = true

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [ Validators.required ]),
    'matricula': new FormControl({ value: '', disabled: true }),
    'senha': new FormControl({value: '', disabled: true}),
    'email': new FormControl(null, [ Validators.required ]),
    'cpf': new FormControl(null, [ Validators.required, GenericValidator.isValidCpf() ]),
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

      let aluno: Aluno = new Aluno()
      aluno.nome = this.formulario.get('nome').value
      aluno.matricula = this.aluno.matricula
      aluno.senha = this.aluno.senha
      aluno.email = this.formulario.get('email').value
      aluno.cpf = this.formulario.get('cpf').value
      aluno.turma = this.formulario.get('turma').value
      
      this.alunoBD.editarAluno(aluno, this.aluno.matricula)
        .then(() => {
          if(this.aluno.turma !== aluno.turma){
            this.turmaBD.removerAluno(this.aluno.turma, {nome: aluno.nome, matricula: aluno.matricula})
              .then(()=> {
                this.turmaBD.adicionarAluno(aluno.turma, {nome: aluno.nome, matricula: aluno.matricula})
              })
          }
          alert('Sucesso!')
          window.location.reload()
        },
        (error: any) => {
          alert('Um erro desconhecido aconteceu!')
        })
    }
  }

}
