import { Component, OnInit, Input } from '@angular/core';
import { Professor } from 'src/app/shared/professor.model';
import { ProfessorBD } from 'src/app/services/professor-bd.service';

@Component({
  selector: 'app-remover-professor',
  templateUrl: './remover-professor.component.html',
  styleUrls: ['./remover-professor.component.css'],
  providers: [ ProfessorBD ]
})
export class RemoverProfessorComponent implements OnInit {

  @Input() public professor: Professor

  constructor(
    private professorBD: ProfessorBD
  ) { }

  ngOnInit() {
  }

  public excluir(): void{
    this.professorBD.removeAdmin(this.professor)
      .then(() => {
        alert('Sucesso!')
        window.location.reload()
      })
  }  


}
