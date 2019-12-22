import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvaliacaoBD } from 'src/app/services/avaliacao-bd.service';
import { AvaliacoesComponent } from '../avaliacoes.component';

@Component({
  selector: 'app-criar-avaliacao',
  templateUrl: './criar-avaliacao.component.html',
  styleUrls: ['./criar-avaliacao.component.css'],
  providers: [AvaliacaoBD]
})
export class CriarAvaliacaoComponent implements OnInit {

  @Input() public avaliacao: any
  @Input() public avaliacoesBimestre: any
  @Input() public bimestre: any
  @Input() public bimestresDias: any

  public formulario: FormGroup = new FormGroup({
    'data': new FormControl(null, [Validators.required, Validators.minLength(1)]),
    'peso': new FormControl(null, [Validators.required, Validators.minLength(1)]),
    'tipo': new FormControl(null, [Validators.required]),
    'descricao': new FormControl(null, [Validators.required])
  })

  public estadoBotao: boolean = true

  constructor(
    private avaliacaoBD: AvaliacaoBD,
    private avalComp: AvaliacoesComponent
  ) { }

  ngOnInit() {
  }

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
    avaliacao.bimestre = this.bimestre
    if (this.avaliacoesBimestre === undefined) {
      avaliacao.id = 0
    } else {
      avaliacao.id = this.avaliacoesBimestre.length
    }

    this.formulario.reset()
    this.avaliacaoBD.cadastroAvaliacao(avaliacao, this.avalComp.disciplina.nome, this.bimestre)
      .then(() => {
        this.avalComp.atualizarTabela()
      })
  }

}
