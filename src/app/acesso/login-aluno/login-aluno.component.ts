import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-aluno',
  templateUrl: './login-aluno.component.html',
  styleUrls: ['./login-aluno.component.css']
})
export class LoginAlunoComponent implements OnInit {

  
  public formulario: FormGroup = new FormGroup({
    'matricula': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)]) 
  })

  public errorMessage: string

  constructor(
    private autenticacao: Autenticacao
  ) {}

  ngOnInit() {
  }

  public autenticar(): void{
    if(this.formulario.valid){
      this.autenticacao.autenticar(
        this.formulario.value.matricula,
        this.formulario.value.senha)
        .then(()=>{
          this.errorMessage = this.autenticacao.errorMessage
        })
    }else{
      this.errorMessage = "Um dos campos não estão correto"
    }
  }

}
