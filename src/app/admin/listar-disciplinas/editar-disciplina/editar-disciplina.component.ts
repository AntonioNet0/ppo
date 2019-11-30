import { Component, OnInit, Input } from '@angular/core';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfessorBD } from 'src/app/services/professor-bd.service';
import { Professor } from 'src/app/shared/professor.model';

@Component({
  selector: 'app-editar-disciplina',
  templateUrl: './editar-disciplina.component.html',
  styleUrls: ['./editar-disciplina.component.css'],
  providers: [DisciplinaBD, ProfessorBD]
})
export class EditarDisciplinaComponent implements OnInit {

  @Input() public disciplina: Disciplina

  public estadoBotao: boolean = true

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl({ value: '', disabled: true }),
    'codigo': new FormControl({ value: '', disabled: true }),
    'professor': new FormControl(null, [Validators.required]),
    'cargaHoraria': new FormControl(null, [Validators.required]),
    //'horaInicio': new FormControl(null, [Validators.required]),
   // 'horaFim': new FormControl(null, [Validators.required]),
    'periodo': new FormControl(null, [Validators.required])
  })

  public professores: Professor[] = []

  constructor(
    private disciplinaBD: DisciplinaBD,
    private professorBD: ProfessorBD
  ) { }



  ngOnInit() {
    this.professorBD.listProfessores()
      .then((professores: any) => {
        this.professores = professores
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

      this.formulario.get('professor').markAsTouched()
      this.formulario.get('cargaHoraria').markAsTouched()
      //this.formulario.get('horaInicio').markAsTouched()
     // this.formulario.get('horaFim').markAsTouched()
      this.formulario.get('periodo').markAsTouched()

    } else {

      let disciplina: Disciplina = new Disciplina()
      disciplina.nome = this.disciplina.nome
      disciplina.codigo = this.disciplina.codigo
      disciplina.professorMatricula = this.formulario.get('professor').value
      disciplina.cargaHoraria = this.formulario.get('cargaHoraria').value
      //disciplina.horaInicio = this.formulario.get('horaInicio').value
     // disciplina.horaFim = this.formulario.get('horaFim').value
      disciplina.periodo = this.formulario.get('periodo').value

      this.disciplinaBD.editarDisciplina(disciplina, this.disciplina.nome)
        .then(() => {
          alert('Sucesso!')
          window.location.reload()
        },
          (error: any) => {
            alert(error)
          })




    }
  }

}
