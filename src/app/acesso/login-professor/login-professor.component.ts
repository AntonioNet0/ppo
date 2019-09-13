import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login-professor',
  templateUrl: './login-professor.component.html',
  styleUrls: ['./login-professor.component.css']
})
export class LoginProfessorComponent implements OnInit {
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
    
  }

}
