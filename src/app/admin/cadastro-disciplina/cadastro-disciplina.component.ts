import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfessorBD } from 'src/app/services/professor-bd.service';
import { Professor } from 'src/app/shared/professor.model';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Turma } from 'src/app/shared/turma.model';

@Component({
  selector: 'app-cadastro-disciplina',
  templateUrl: './cadastro-disciplina.component.html',
  styleUrls: ['./cadastro-disciplina.component.css'],
  providers: [ProfessorBD, DisciplinaBD, TurmaBD]
})
export class CadastroDisciplinaComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required]),
    'codigo': new FormControl(null, [Validators.required]),
    'professor': new FormControl(null, [Validators.required]),
    'cargaHoraria': new FormControl(null, [Validators.required]),
    'turma': new FormControl(null, [ Validators.required ]),
    'periodo': new FormControl(null, [Validators.required])
  })

  public professores: Professor[] = []
  public turmas: Turma[] = []

  constructor(
    private professorBD: ProfessorBD,
    private disciplinaBD: DisciplinaBD,
    private turmaBD: TurmaBD
  ) { }

  ngOnInit() {
    this.professorBD.listProfessores()
      .then((professores: any) => {
        this.professores = professores
      })
    this.turmaBD.listarTurmas()
      .then((turmas: any) => {
        this.turmas = turmas
      })
  }

  public cadastro(): void {

    if (!this.formulario.valid) {

      this.formulario.get('nome').markAsTouched()
      this.formulario.get('codigo').markAsTouched()
      this.formulario.get('professor').markAsTouched()
      this.formulario.get('cargaHoraria').markAsTouched()
      this.formulario.get('periodo').markAsTouched()
      this.formulario.get('turma').markAsTouched()

    } else {

      let disciplina: Disciplina = new Disciplina()
      disciplina.nome = this.formulario.get('nome').value
      disciplina.codigo = this.formulario.get('codigo').value
      disciplina.professorMatricula = this.formulario.get('professor').value
      disciplina.cargaHoraria = this.formulario.get('cargaHoraria').value
      disciplina.periodo = this.formulario.get('periodo').value
      disciplina.turma= this.formulario.value.turma

      this.disciplinaBD.cadastroDisciplina(disciplina)
        .then(()=>{
          this.professorBD.adicionarDisciplina(disciplina)
          alert("Sucesso!")
        },
        (error: any) => {
          alert("Erro!")
        })


    }


  }

}
