import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Turma } from 'src/app/shared/turma.model';

@Component({
  selector: 'app-cadastro-turma',
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.css'],
  providers: [TurmaBD]
})
export class CadastroTurmaComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'codigo': new FormControl(null, [Validators.required]),
    'nome': new FormControl(null, [Validators.required]),
    'sala': new FormControl(null, [Validators.required]),
    'disciplinas': new FormControl(null),
    'turno': new FormControl(null, [Validators.required])
  })

  constructor(
    private turmaBD: TurmaBD
  ) { }

  ngOnInit() {
  }

  public inserirDisciplanas(disciplinas: string): void {
    this.formulario.get('disciplinas').setValue(disciplinas)
  }

  public cadastrar(): void {
    
    if (!this.formulario.valid) {
      this.formulario.get('codigo').markAsTouched()
      this.formulario.get('nome').markAsTouched()
      this.formulario.get('sala').markAsTouched()
      this.formulario.get('disciplinas').markAsTouched()
      this.formulario.get('turno').markAsTouched()
    } else if (this.formulario.get('disciplinas').value === null) {
      alert("Nenhuma Disciplina Selecionada!")
    } else {

      let turma: Turma = new Turma()
      turma.codigo = this.formulario.get('codigo').value
      turma.nome = this.formulario.get('nome').value
      turma.sala = this.formulario.get('sala').value
      turma.turno = this.formulario.get('turno').value
      turma.disciplinas = this.formulario.get('disciplinas').value

      this.turmaBD.cadastroTurma(turma)
        .then(() => {
          alert("Sucesso!")
        },
          (error: any) => {
            alert("Erro!")
          })
    }
  }

}
