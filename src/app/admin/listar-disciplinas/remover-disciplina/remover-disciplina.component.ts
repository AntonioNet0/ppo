import { Component, OnInit, Input } from '@angular/core';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';

@Component({
  selector: 'app-remover-disciplina',
  templateUrl: './remover-disciplina.component.html',
  styleUrls: ['./remover-disciplina.component.css'],
  providers: [ DisciplinaBD ]
})
export class RemoverDisciplinaComponent implements OnInit {

  @Input() public disciplina: Disciplina

  constructor(
    private disciplinaBD: DisciplinaBD
  ) {}

  ngOnInit() {
  }

  public excluir(): void{
    this.disciplinaBD.removeDisciplina(this.disciplina)
      .then(() => {
        alert('Sucesso!')
        window.location.reload()
      })
  }

}
