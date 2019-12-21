import { Component, OnInit, Input } from '@angular/core';
import { AvaliacaoBD } from 'src/app/services/avaliacao-bd.service';
import { AvaliacoesComponent } from '../avaliacoes.component';

@Component({
  selector: 'app-remover-avaliacao',
  templateUrl: './remover-avaliacao.component.html',
  styleUrls: ['./remover-avaliacao.component.css'],
  providers: [AvaliacaoBD]
})
export class RemoverAvaliacaoComponent implements OnInit {

  @Input() public avaliacao: any 

  @Input() public rota: any

  constructor(
    private avaliacaoBD: AvaliacaoBD,
    private AvalComp: AvaliacoesComponent
  ) {}

  ngOnInit() {
  }

  public excluir(): void{
    this.avaliacaoBD.removerAvaliacao(this.avaliacao, this.rota)
      .then(() => {
        alert('Sucesso!')
        this.AvalComp.atualizarTabela()
      })
  }

}
