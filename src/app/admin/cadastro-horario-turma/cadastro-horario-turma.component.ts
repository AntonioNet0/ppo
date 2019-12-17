import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Turma } from 'src/app/shared/turma.model';
import { HorarioAluno } from 'src/app/shared/horario.model';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';

@Component({
  selector: 'app-cadastro-horario-turma',
  templateUrl: './cadastro-horario-turma.component.html',
  styleUrls: ['./cadastro-horario-turma.component.css'],
  providers: [TurmaBD, DisciplinaBD]
})
export class CadastroHorarioTurmaComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'segunda1': new FormControl(null),
    'segunda2': new FormControl(null),
    'segunda3': new FormControl(null),
    'segunda4': new FormControl(null),
    'segunda5': new FormControl(null),
    'segunda6': new FormControl(null),
    'terca1': new FormControl(null),
    'terca2': new FormControl(null),
    'terca3': new FormControl(null),
    'terca4': new FormControl(null),
    'terca5': new FormControl(null),
    'terca6': new FormControl(null),
    'quarta1': new FormControl(null),
    'quarta2': new FormControl(null),
    'quarta3': new FormControl(null),
    'quarta4': new FormControl(null),
    'quarta5': new FormControl(null),
    'quarta6': new FormControl(null),
    'quinta1': new FormControl(null),
    'quinta2': new FormControl(null),
    'quinta3': new FormControl(null),
    'quinta4': new FormControl(null),
    'quinta5': new FormControl(null),
    'quinta6': new FormControl(null),
    'sexta1': new FormControl(null),
    'sexta2': new FormControl(null),
    'sexta3': new FormControl(null),
    'sexta4': new FormControl(null),
    'sexta5': new FormControl(null),
    'sexta6': new FormControl(null),
  })

  public turma: Turma
  public disciplinas: string[] = []
  public horario: HorarioAluno = { segunda: [], terca: [], quarta: [], quinta: [], sexta: [] }

  public horas = ['', '', '', '', '', '']
  public horarioManha = ['07:00 - 07:50', '07:50 - 08:40', '08:40 - 09:30', '09:45 - 10:35', '10:35 - 11:25', '11:25 - 12:15']
  public horarioTarde = ['13:00 - 13:50', '13:50 - 14:40', '14:40 - 15:30', '15:45 - 16:35', '16:35 - 17:25', '17:25 - 18:15']


  constructor(
    private router: ActivatedRoute,
    private turmaBD: TurmaBD,
    private disciplinaBD: DisciplinaBD
  ) { }

  ngOnInit() {

    this.router.params.subscribe((parametros: Params) => {
      this.turmaBD.getTurmaPorCodigo(parametros.id)
        .then((resp: any) => {
          this.turma = resp
          this.disciplinas = this.turma.disciplinas.split('_')
          if (resp.turno === 'Manhã') {
            this.horas = this.horarioManha
          } else if (resp.turno === 'Tarde') {
            this.horas = this.horarioTarde
          }
        })
    })
  }

  public cadastro(): void {

    //Horario Segunda-feira
    this.horario.segunda.push({ periodo: this.horas[0], disciplina: this.formulario.value.segunda1 === null ? '' : this.formulario.value.segunda1 })
    this.horario.segunda.push({ periodo: this.horas[1], disciplina: this.formulario.value.segunda2 === null ? '' : this.formulario.value.segunda2 })
    this.horario.segunda.push({ periodo: this.horas[2], disciplina: this.formulario.value.segunda3 === null ? '' : this.formulario.value.segunda3 })
    this.horario.segunda.push({ periodo: this.horas[3], disciplina: this.formulario.value.segunda4 === null ? '' : this.formulario.value.segunda4 })
    this.horario.segunda.push({ periodo: this.horas[4], disciplina: this.formulario.value.segunda5 === null ? '' : this.formulario.value.segunda5 })
    this.horario.segunda.push({ periodo: this.horas[5], disciplina: this.formulario.value.segunda6 === null ? '' : this.formulario.value.segunda6 })

    //Horario Terca-feira
    this.horario.terca.push({ periodo: this.horas[0], disciplina: this.formulario.value.terca1 === null ? '' : this.formulario.value.terca1 })
    this.horario.terca.push({ periodo: this.horas[1], disciplina: this.formulario.value.terca2 === null ? '' : this.formulario.value.terca2 })
    this.horario.terca.push({ periodo: this.horas[2], disciplina: this.formulario.value.terca3 === null ? '' : this.formulario.value.terca3 })
    this.horario.terca.push({ periodo: this.horas[3], disciplina: this.formulario.value.terca4 === null ? '' : this.formulario.value.terca4 })
    this.horario.terca.push({ periodo: this.horas[4], disciplina: this.formulario.value.terca5 === null ? '' : this.formulario.value.terca5 })
    this.horario.terca.push({ periodo: this.horas[5], disciplina: this.formulario.value.terca6 === null ? '' : this.formulario.value.terca6 })

    //Horario Quarta-feria
    this.horario.quarta.push({ periodo: this.horas[0], disciplina: this.formulario.value.quarta1 === null ? '' : this.formulario.value.quarta1 })
    this.horario.quarta.push({ periodo: this.horas[1], disciplina: this.formulario.value.quarta2 === null ? '' : this.formulario.value.quarta2 })
    this.horario.quarta.push({ periodo: this.horas[2], disciplina: this.formulario.value.quarta3 === null ? '' : this.formulario.value.quarta3 })
    this.horario.quarta.push({ periodo: this.horas[3], disciplina: this.formulario.value.quarta4 === null ? '' : this.formulario.value.quarta4 })
    this.horario.quarta.push({ periodo: this.horas[4], disciplina: this.formulario.value.quarta5 === null ? '' : this.formulario.value.quarta5 })
    this.horario.quarta.push({ periodo: this.horas[5], disciplina: this.formulario.value.quarta6 === null ? '' : this.formulario.value.quarta6 })

    //Horario Quinta-feira
    this.horario.quinta.push({ periodo: this.horas[0], disciplina: this.formulario.value.quinta1 === null ? '' : this.formulario.value.quinta1 })
    this.horario.quinta.push({ periodo: this.horas[1], disciplina: this.formulario.value.quinta2 === null ? '' : this.formulario.value.quinta2 })
    this.horario.quinta.push({ periodo: this.horas[2], disciplina: this.formulario.value.quinta3 === null ? '' : this.formulario.value.quinta3 })
    this.horario.quinta.push({ periodo: this.horas[3], disciplina: this.formulario.value.quinta4 === null ? '' : this.formulario.value.quinta4 })
    this.horario.quinta.push({ periodo: this.horas[4], disciplina: this.formulario.value.quinta5 === null ? '' : this.formulario.value.quinta5 })
    this.horario.quinta.push({ periodo: this.horas[5], disciplina: this.formulario.value.quinta6 === null ? '' : this.formulario.value.quinta6 })

    //Horario Sexta-feira
    this.horario.sexta.push({ periodo: this.horas[0], disciplina: this.formulario.value.sexta1 === null ? '' : this.formulario.value.sexta1 })
    this.horario.sexta.push({ periodo: this.horas[1], disciplina: this.formulario.value.sexta2 === null ? '' : this.formulario.value.sexta2 })
    this.horario.sexta.push({ periodo: this.horas[2], disciplina: this.formulario.value.sexta3 === null ? '' : this.formulario.value.sexta3 })
    this.horario.sexta.push({ periodo: this.horas[3], disciplina: this.formulario.value.sexta4 === null ? '' : this.formulario.value.sexta4 })
    this.horario.sexta.push({ periodo: this.horas[4], disciplina: this.formulario.value.sexta5 === null ? '' : this.formulario.value.sexta5 })
    this.horario.sexta.push({ periodo: this.horas[5], disciplina: this.formulario.value.sexta6 === null ? '' : this.formulario.value.sexta6 })

    this.turmaBD.cadastroHorario(this.turma.codigo, this.horario)
      .then(() => alert("Sucesso!"))

    let disciplinasHorario: any = { horario: [], diaDaSemana: '', disciplina: '' }
    for (let i = 0; i < 5; i++) {
      if (i === 0) {
        this.horario.segunda.forEach(elemento => {
          if (elemento.disciplina !== '') {
            disciplinasHorario.diaDaSemana = 'Segunda'
            disciplinasHorario.horario = elemento.periodo
            disciplinasHorario.disciplina = elemento.disciplina
            this.disciplinaBD.adicionarHorario(disciplinasHorario)
          }
        })
      } else if (i === 1) {
        this.horario.terca.forEach(elemento => {
          if (elemento.disciplina !== '') {
            disciplinasHorario.diaDaSemana = 'terca'
            disciplinasHorario.horario = elemento.periodo
            disciplinasHorario.disciplina = elemento.disciplina
            this.disciplinaBD.adicionarHorario(disciplinasHorario)
          }
        })
      } else if (i === 2) {
        this.horario.quarta.forEach(elemento => {
          if (elemento.disciplina !== '') {
            disciplinasHorario.diaDaSemana = 'quarta'
            disciplinasHorario.horario = elemento.periodo
            disciplinasHorario.disciplina = elemento.disciplina
            this.disciplinaBD.adicionarHorario(disciplinasHorario)
          }
        })
      } else if(i === 3) {
        this.horario.quinta.forEach(elemento => {
          if (elemento.disciplina !== '') {
            disciplinasHorario.diaDaSemana = 'quinta'
            disciplinasHorario.horario = elemento.periodo
            disciplinasHorario.disciplina = elemento.disciplina
            this.disciplinaBD.adicionarHorario(disciplinasHorario)
          }
        })
      } else if(i === 4) {

        this.horario.sexta.forEach(elemento => {
          if (elemento.disciplina !== '') {
            disciplinasHorario.diaDaSemana = 'sexta'
            disciplinasHorario.horario = elemento.periodo
            disciplinasHorario.disciplina = elemento.disciplina

             this.disciplinaBD.adicionarHorario(disciplinasHorario)
          }
        })
       
      }
    }
  }

}
