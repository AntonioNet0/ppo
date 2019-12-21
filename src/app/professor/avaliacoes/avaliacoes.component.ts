import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { PeriodoLetivoBD } from 'src/app/services/periodo-letivo-db.service';
import { FrequenciaBD } from 'src/app/services/frequencia.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.css'],
  providers: [DisciplinaBD, TurmaBD, PeriodoLetivoBD, FrequenciaBD]
})
export class AvaliacoesComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'data': new FormControl({ value: '' }),
    'peso': new FormControl({ value: ''}),
    'professor': new FormControl(null, [Validators.required]),
    'cargaHoraria': new FormControl(null, [Validators.required]),
    'periodo': new FormControl(null, [Validators.required]),
  })

  public bimestresDias: any[] = []
  public bimestre: number = 0
  public titulo: string = ''

  public periodoSelecionado: boolean = false

  public diaAula: string = ''
  public disciplina: Disciplina = new Disciplina()

  constructor(
    private route: ActivatedRoute,
    private disciplinaBD: DisciplinaBD,
    private turmaBD: TurmaBD,
    private periodoBD: PeriodoLetivoBD,
    private frequenciaBD: FrequenciaBD
  ) { }

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {
      this.disciplinaBD.getHorario(parametros.idDisciplina)
        .then((resp: any) => {
          this.diaAula = resp
          this.periodoBD.getBimestresPorDia(this.diaAula)
            .then((resp: any) => {
              this.bimestresDias = resp
            })
        })

      this.disciplinaBD.getDisciplina(parametros.idDisciplina)
        .then((disciplina: Disciplina) => {
          this.disciplina = disciplina
        })

    })
  }

  public mudaBimestre(val: number): void {
    this.periodoSelecionado = true
    this.titulo = val+1+ "º Bimestre"
    this.bimestre = val
  }

}
