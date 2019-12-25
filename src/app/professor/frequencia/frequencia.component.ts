import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { Aluno } from 'src/app/shared/aluno.model';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { PeriodoLetivoBD } from 'src/app/services/periodo-letivo-db.service';
import { FrequenciaBD } from 'src/app/services/frequencia.service';

@Component({
  selector: 'app-frequencia',
  templateUrl: './frequencia.component.html',
  styleUrls: ['./frequencia.component.css'],
  providers: [DisciplinaBD, TurmaBD, PeriodoLetivoBD, FrequenciaBD]
})
export class FrequenciaComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    data: new FormControl(null, [Validators.required])
  })

  public dataSelecionada: boolean = false

  public diaAula: string = ''
  public alunos: any[] = []
  public disciplina: Disciplina = new Disciplina()
  public contadorDeFrequencia: number = 0

  public disciplinaFrequencia: any[] = []
  public freqCadastradas: any[] = []
  public bimestresDias: any[] = []
  public bimestre: number = 0

  public estadoForm: boolean = true

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
          this.turmaBD.getAlunos(disciplina.turma)
            .then((alunos: any) => {
              this.alunos = alunos
            })
        })

    })

  }

  public adicionarVal(valor: any): void {
    if (valor.value <= 4 && valor.value >= 0) {
      document.getElementById(valor.id).className += " valido"
      this.contadorDeFrequencia ++
      this.disciplinaFrequencia[valor.id] = { nome: this.alunos[valor.id].nome, faltas: valor.value, data: '', matricula: this.alunos[valor.id].matricula }
    } else {
      document.getElementById(valor.id).className.replace('valido', '')
      document.getElementById(valor.id).className += " invalido"
    }


  }

  public finalizarFrequencia(): void {
    if (this.alunos.length === this.disciplinaFrequencia.length && this.formulario.valid && this.alunos.length === this.contadorDeFrequencia) {
      let frequencias: any[] = []
      let data = ''
      this.disciplinaFrequencia.forEach(d => {
        d.data = this.formulario.value.data.replace('/', '-')
        data = d.data
        frequencias.push(d)
      })
      this.frequenciaBD.adicionarFrequencia(frequencias, this.disciplina.nome, data)

    } else if(this.formulario.invalid){
      alert("Defina a data referente a frequência")
    } else {
      alert("Preencha todos os campos corretamente")
    }
    console.log(this.disciplinaFrequencia)
  }

  public mudaBimestre(val: number): void {
    this.bimestre = val
  }


  public mostrarFrequencia(val: any): void{
    if(val.value !== '' && val.value !== undefined){
       this.frequenciaBD.getFrequenciaPorDisciplina(val.value, this.disciplina.nome)
         .then((resp) => {
          this.freqCadastradas = resp
          //this.disciplinaFrequencia = resp
        })
      this.dataSelecionada = true
    }
  }

  public voltar(): void {
    this.router.navigate(['home-professor/professor/turmas/diario/', this.disciplina.nome])
  }

}
