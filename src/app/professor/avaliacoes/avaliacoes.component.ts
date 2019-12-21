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

  
  public avaliacaoTemp: any = { data: '', tipo: '', peso: null, descricao: '' }
  public rota: any = { disciplina: '', bimestre: null}

  public modalUsuario(avaliacao: any): void{
  
    this.rota = {disciplina: this.disciplina.nome, bimestre: this.bimestre}
    this.avaliacaoTemp = avaliacao

  }

  public atualizarTabela(): void {
    this.avaliacaoBD.getAvaliacoes(this.disciplina.nome)
      .then((resp: any) => {
        this.avaliacoes = resp
        this.avaliacoesBimestre = this.avaliacoes[this.bimestre]
      })
  }

}
