import { Component, OnInit, Input } from '@angular/core';
import { Aluno } from 'src/app/shared/aluno.model';
import { AlunoBD } from 'src/app/services/aluno-bd.service';

@Component({
  selector: 'app-remover-aluno',
  templateUrl: './remover-aluno.component.html',
  styleUrls: ['./remover-aluno.component.css'],
  providers: [ AlunoBD ]
})
export class RemoverAlunoComponent implements OnInit {

  @Input() public aluno: Aluno

  constructor(
    private alunoBD: AlunoBD
  ) { }

  ngOnInit() {
  }

  public excluir(): void{
    this.alunoBD.removeAluno(this.aluno)
      .then(() => {
        alert('Sucesso!')
        window.location.reload()
      })
  }  

}
