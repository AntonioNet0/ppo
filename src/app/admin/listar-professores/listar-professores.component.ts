import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/shared/professor.model';
import { ProfessorBD } from 'src/app/services/professor-bd.service';

@Component({
  selector: 'app-listar-professores',
  templateUrl: './listar-professores.component.html',
  styleUrls: ['./listar-professores.component.css'], 
  providers: [ ProfessorBD ]
})
export class ListarProfessoresComponent implements OnInit {
  public paginacao: any
  public paginaAtual: number = 1
  public professores: Professor[]
  public professoresPagina: Professor[] = null

  constructor(
    private professorBD: ProfessorBD
  ) { }



  ngOnInit() {
    this.professorBD.listProfessores()
      .then((professores: any) => {
        this.professores = professores
        this.paginacao = this.criarPaginacao()
        this.exibirProfessorPaginacao(1)
      })
  }

  private criarPaginacao(): any {
    let paginacao: any[] = []
    let numPaginacao = this.professores.length / 5
    paginacao.push({ val: 1 })
    if (numPaginacao !== 0) {
      numPaginacao++
    }
    for (let i = 2; i <= numPaginacao; i++) {
      paginacao.push({ val: i })
    }
    return paginacao
  }

  public exibirProfessorPaginacao(pagina: number): void {
    if (pagina <= this.paginacao.length && pagina !== 0) {

      let num = this.professores.length
      let max = pagina * 5
      let professores: Professor[] = []
      if (num < max) {
        max = num
      }
      for (let i = (pagina - 1) * 5; i < max; i++) {
        professores.push(this.professores[i])
      }

      this.paginaAtual = pagina
      this.professoresPagina = professores
      this.paginacaoEmFoco()

    }
  }

  private paginacaoEmFoco(): void {

    let elementos = document.getElementsByClassName('page-item')
    for (let i = 0; i < elementos.length; i++) {
      if (elementos[i].getAttribute('value') === '' + this.paginaAtual) {
        elementos[i].classList.add('active')
      } else {
        elementos[i].classList.remove('active')
      }
    }

  }


  public professorTemp: Professor = new Professor('nome', 'matricula', 'senha', 'email', 'cpf')


  public modalUsuario(professor: Professor): void {
    let elemento = document.getElementById('body-modal') as HTMLInputElement
    elemento.innerHTML = "Você tem certeza que deseja excluir o Professor: " + professor.nome
    this.setProfTemp(professor)
  }

  public setProfTemp(professor: Professor): void{
    this.professorTemp = professor
  }


}
