import { Component, OnInit, Input } from '@angular/core';
import { Turma } from 'src/app/shared/turma.model';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-turma',
  templateUrl: './editar-turma.component.html',
  styleUrls: ['./editar-turma.component.css'],
  providers: [TurmaBD]
})
export class EditarTurmaComponent implements OnInit {

  @Input() public turma: Turma

  public estadoBotao: boolean = true

  public formulario: FormGroup = new FormGroup({
    'codigo': new FormControl({ value: '', disabled: true }),
    'nome': new FormControl(null, [Validators.required]),
    'sala': new FormControl(null, [Validators.required]),
    'turno': new FormControl(null, [Validators.required])
  })

  constructor(
    private turmaBD: TurmaBD
  ) { }

  ngOnInit() {
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
      this.formulario.get('codigo').markAsTouched()
      this.formulario.get('nome').markAsTouched()
      this.formulario.get('sala').markAsTouched()
      this.formulario.get('turno').markAsTouched()
    }

    let turma: Turma = new Turma()
    turma.codigo = this.turma.codigo
    turma.nome = this.formulario.get('nome').value
    turma.sala = this.formulario.get('sala').value
    turma.turno = this.formulario.get('turno').value
    turma.disciplinas = this.turma.disciplinas

    this.turmaBD.editarTurma(turma, this.turma.codigo)
      .then(() => {
        alert("Sucesso!")
        window.location.reload()
      },
        (error: any) => {
          alert("Erro!")
        })
  }
}


