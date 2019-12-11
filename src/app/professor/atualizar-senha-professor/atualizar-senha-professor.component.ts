import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfessorBD } from 'src/app/services/professor-bd.service';

@Component({
  selector: 'app-atualizar-senha-professor',
  templateUrl: './atualizar-senha-professor.component.html',
  styleUrls: ['./atualizar-senha-professor.component.css'],
  providers: [ProfessorBD]
})
export class AtualizarSenhaProfessorComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'senhaAntiga': new FormControl(null, [Validators.required]),
    'novaSenha': new FormControl(null, [Validators.required]),
    'confirmarSenha': new FormControl(null, [Validators.required])
  })

  constructor(
    private professorBD: ProfessorBD
  ) { }

  ngOnInit() {
  }

  public mudarSenha(): void {
    if (!this.formulario.valid) {

      this.formulario.get('senhaAntiga').markAsTouched()
      this.formulario.get('novaSenha').markAsTouched()
      this.formulario.get('confirmarSenha').markAsTouched()

    } else {
      if (this.formulario.value.novaSenha === this.formulario.value.confirmarSenha) {
        this.professorBD.confirmarSenha(this.formulario.value.senhaAntiga).then((b: boolean) => {
          if (b) {
            this.professorBD.mudarSenha(this.formulario.value.novaSenha)
              .then(() => alert("Sucesso!"))
          }
        })
      } else {
        alert('As senhas não batem.')
        //Animação
      }

    }
  }

}
