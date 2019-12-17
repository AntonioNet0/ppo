import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public formulario: FormGroup = new FormGroup({
    'matricula': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  public errorMessage: string

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() {
  }

  public autenticar(): void {
    this.errorMessage = ''
    if (this.formulario.valid) {

      this.autenticacao.autenticar(this.formulario.value.matricula, this.formulario.value.senha)
        .then(() => this.errorMessage = this.autenticacao.errorMessage)
      
    } else {
      this.errorMessage = "Matrícula ou senha são inválidas. Por favor tente novamente."
    }
  }

}
