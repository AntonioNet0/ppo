import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { PeriodoLetivoBD } from 'src/app/services/periodo-letivo-db.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AvaliacaoBD } from 'src/app/services/avaliacao-bd.service';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.css'],
  providers: [DisciplinaBD, PeriodoLetivoBD, AvaliacaoBD]
})
export class AvaliacoesComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'data': new FormControl({ value: '' }, [Validators.required, Validators.minLength(1)]),
    'peso': new FormControl({ value: '' }, [Validators.required]),
    'tipo': new FormControl(null, [Validators.required]),
    'descricao': new FormControl(null, [Validators.required])
  })

  public estadoBotao: boolean = true

  public bimestresDias: any[] = []
  public bimestre: number = 0
  public titulo: string = ''

  public periodoSelecionado: boolean = false

  public diaAula: string = ''
  public disciplina: Disciplina = new Disciplina()
  public avaliacoes: any = {}
  public avaliacoesBimestre: any = []

  constructor(
    private route: ActivatedRoute,
    private disciplinaBD: DisciplinaBD,
    private periodoBD: PeriodoLetivoBD,
    private avaliacaoBD: AvaliacaoBD
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
          this.avaliacaoBD.getAvaliacoes(disciplina.nome)
            .then((resp: any) => {
              this.avaliacoes = resp
            })
        })

    })
  }

  public mudaBimestre(val: number): void {
    this.periodoSelecionado = true
    this.avaliacoesBimestre = this.avaliacoes[val]
    this.titulo = val + 1 + "º Bimestre"
    this.bimestre = val
  }


  //Modal Metodos

  public formValido(): void {
    if (this.formulario.valid) {

      this.estadoBotao = false
    } else {
      this.estadoBotao = true
    }
  }

  public criarAvaliacao(): void {
    let avaliacao: any = {}
    avaliacao.data = this.formulario.value.data
    avaliacao.tipo = this.formulario.value.tipo
    avaliacao.peso = this.formulario.value.peso
    avaliacao.descricao = this.formulario.value.descricao
    if (this.avaliacoesBimestre === undefined) {
      avaliacao.id = 0
    } else {
      avaliacao.id = this.avaliacoesBimestre.length
    }

    this.formulario.reset()
    this.avaliacaoBD.cadastroAvaliacao(avaliacao, this.disciplina.nome, this.bimestre)
      .then(() => {
        this.atualizarTabela()
      })


  }

  private atualizarTabela(): void {
    this.avaliacaoBD.getAvaliacoes(this.disciplina.nome)
      .then((resp: any) => {
        this.avaliacoes = resp
        this.avaliacoesBimestre = this.avaliacoes[this.bimestre]
      })
  }

}
