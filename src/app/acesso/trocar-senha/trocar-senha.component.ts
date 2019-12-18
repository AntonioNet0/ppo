import { Component, OnInit } from '@angular/core';
// import { TrocarSenha } from 'src/app/shared/trocar-senha';
// import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.css'],
  // providers: [ TrocarSenha ]
})
export class TrocarSenhaComponent implements OnInit {

  // public estadoButton: boolean = false

  // public formulario: FormGroup = new FormGroup({
  //   'email': new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(6), Validators.email])
  // })
  // public erroMessage: string

  constructor(
    // private TrocarSenha: TrocarSenha
  ) { }

  ngOnInit() {
  }
  // public trocarSenha(): void {
  //   if (!this.formulario.valid) {
  //     this.formulario.get('email').markAsTouched()

  //   }else {

  //     this.estadoButton = true

      // let trocar: TrocarSenha = new TrocarSenha(
      //   this.formulario.value.email
      // )

      // this.trocarSenha.sendPasswordResetEmail(trocar)
      //   .then(() => {
      //     this.erroMessage = this.trocarSenha.errorMessage
      //     if (this.erroMessage === undefined) {
            
      //     } else {

      //     }
      //   })
    // }
}


// }
