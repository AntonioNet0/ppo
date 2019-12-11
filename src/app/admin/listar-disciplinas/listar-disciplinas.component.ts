import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { Observable, Subject, of, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-listar-disciplinas',
  templateUrl: './listar-disciplinas.component.html',
  styleUrls: ['./listar-disciplinas.component.css'],
  providers: [ DisciplinaBD ]
})
export class ListarDisciplinasComponent implements OnInit {

  public paginacao: any
  public paginaAtual: number = 1
  public disciplinas: Disciplina[]
  public disciplinasPagina: Disciplina[] = null

  public pesquisado: boolean = false

  public ofertas: Observable<Disciplina[]>

  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(
    private disciplinaBD: DisciplinaBD
  ) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
    .pipe(debounceTime(1000))
    .pipe(distinctUntilChanged())
    .pipe(
      switchMap((termo: string) => {
        if(termo.trim() === ''){
          return of<Disciplina[]>(this.disciplinasPagina)
        }
        return from(this.disciplinaBD.pesquisaDisciplinas(termo))
      })
    )
    .pipe(catchError((err: any) => {
      console.log(err)
      return of<Disciplina[]>(this.disciplinasPagina)
    }))

    this.disciplinaBD.listaDisciplinas()
      .then((disciplinas: any) => {
        this.disciplinas = disciplinas
        this.paginacao = this.criarPaginacao()
        this.exibirDisciplinaPaginacao(1)
      })
  }

  public pesquisa(termoDaPesquisa: string): void{
    this.pesquisado = true
    this.subjectPesquisa.next(termoDaPesquisa)
  }

  private criarPaginacao(): any {
    let paginacao: any[] = []
    let numPaginacao = this.disciplinas.length / 5
    paginacao.push({ val: 1 })
    if (numPaginacao !== 0) {
      numPaginacao++
    }
    for (let i = 2; i <= numPaginacao; i++) {
      paginacao.push({ val: i })
    }
    return paginacao
  }

  public exibirDisciplinaPaginacao(pagina: number): void {
    if (pagina <= this.paginacao.length && pagina !== 0) {

      let num = this.disciplinas.length
      let max = pagina * 5
      let disciplinas: Disciplina[] = []
      if (num < max) {
        max = num
      }
      for (let i = (pagina - 1) * 5; i < max; i++) {
        disciplinas.push(this.disciplinas[i])
      }

      this.paginaAtual = pagina
      this.disciplinasPagina = disciplinas
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


  public disciplinaTemp: Disciplina = new Disciplina()


  public modalUsuario(disciplina: Disciplina): void {
    let elemento = document.getElementById('body-modal') as HTMLInputElement
    elemento.innerHTML = "Você tem certeza que deseja excluir a Disciplina: " + disciplina.nome
    this.setDisciplinaTemp(disciplina)
  }

  public setDisciplinaTemp(disciplina: Disciplina): void{
    this.disciplinaTemp = disciplina
  }


}
