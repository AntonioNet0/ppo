import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from 'src/app/services/auth.service';
import { Administrador } from 'src/app/shared/admin.model';
import { AdminDB } from 'src/app/services/Admin-db.service';


@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.component.html',
  styleUrls: ['./cadastro-admin.component.css'],
  providers: [AdminDB]
})
export class CadastroAdminComponent implements OnInit {

  public estadoButton: boolean = false

  //public paginacao: any
 // public paginaAtual: number = 1

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl({ value: '', disabled: false }, [Validators.required]),
    'login': new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(6)]),
    'senha': new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(6)]),
    'email': new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(6), Validators.email])
  })

  public erroMessage: string
 

  constructor(
    private adminBD: AdminDB
  ) {

  }

  ngOnInit() {

  }

  public cadastro(): void {
    if (!this.formulario.valid) {

      this.formulario.get('nome').markAsTouched()
      this.formulario.get('login').markAsTouched()
      this.formulario.get('senha').markAsTouched()
      this.formulario.get('email').markAsTouched()

    }else {

      this.estadoButton = true

      let admin: Administrador = new Administrador(
        this.formulario.value.nome,
        this.formulario.value.login,
        this.formulario.value.senha,
        this.formulario.value.email
      )

      this.adminBD.cadastroAdmin(admin)
        .then(() => {
          this.erroMessage = this.adminBD.errorMessage
          if (this.erroMessage === undefined) {
            
          } else {

          }
        })
    }
  }



}
