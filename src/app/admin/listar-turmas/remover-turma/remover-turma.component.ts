import { Component, OnInit, Input } from '@angular/core';
import { Turma } from 'src/app/shared/turma.model';
import { TurmaBD } from 'src/app/services/turma-bd.service';

@Component({
  selector: 'app-remover-turma',
  templateUrl: './remover-turma.component.html',
  styleUrls: ['./remover-turma.component.css'],
  providers: [ TurmaBD ]
})
export class RemoverTurmaComponent implements OnInit {

  @Input() public turma: Turma

  constructor(
    private turmaBD: TurmaBD
  ) { }

  ngOnInit() {
  }

  public excluir(): void{
    this.turmaBD.removeTurma(this.turma)
      .then(() => {
        alert('Sucesso!')
        window.location.reload()
      })
  }

}
