import { Component, OnInit } from '@angular/core';
import { Turma } from 'src/app/shared/turma.model';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Observable, Subject, of, from } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-listar-turmas',
  templateUrl: './listar-turmas.component.html',
  styleUrls: ['./listar-turmas.component.css'],
  providers: [ TurmaBD ]
})
export class ListarTurmasComponent implements OnInit {
  public paginacao: any
  public paginaAtual: number = 1
  public turmas: Turma[]
  public turmasPagina: Turma[] = null

  public pesquisado: boolean = false

  public ofertas: Observable<Turma[]>

  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(
    private turmaBD: TurmaBD
  ) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
    .pipe(debounceTime(1000))
    .pipe(distinctUntilChanged())
    .pipe(
      switchMap((termo: string) => {
        if(termo.trim() === ''){
          return of<Turma[]>(this.turmasPagina)
        }
        return from(this.turmaBD.pesquisaTurmas(termo))
      })
    )
    .pipe(catchError((err: any) => {
      console.log(err)
      return of<Turma[]>(this.turmasPagina)
    }))

    this.turmaBD.listarTurmas()
      .then((turmas: any) => {
        this.turmas = turmas
        this.paginacao = this.criarPaginacao()
        this.exibirTurmaPaginacao(1)
      })
  }

  public pesquisa(termoDaPesquisa: string): void{
    this.pesquisado = true
    this.subjectPesquisa.next(termoDaPesquisa)
  }

  private criarPaginacao(): any {
    let paginacao: any[] = []
    let numPaginacao = this.turmas.length / 5
    paginacao.push({ val: 1 })
    if (numPaginacao !== 0) {
      numPaginacao++
    }
    for (let i = 2; i <= numPaginacao; i++) {
      paginacao.push({ val: i })
    }
    return paginacao
  }

  public exibirTurmaPaginacao(pagina: number): void {
    if (pagina <= this.paginacao.length && pagina !== 0) {

      let num = this.turmas.length
      let max = pagina * 5
      let turmas: Turma[] = []
      if (num < max) {
        max = num
      }
      for (let i = (pagina - 1) * 5; i < max; i++) {
        turmas.push(this.turmas[i])
      }

      this.paginaAtual = pagina
      this.turmasPagina = turmas
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

  public turmaTemp: Turma = {codigo: '', nome: '', alunos: [], disciplinas: '', sala: '', turno: '' }

  public modalUsuario(turma: Turma): void {
    let elemento = document.getElementById('body-modal') as HTMLInputElement
    elemento.innerHTML = "Você tem certeza que deseja excluir o Professor: " + turma.nome
    this.setTurmaTemp(turma)
  }

  public setTurmaTemp(turma: Turma): void{
    this.turmaTemp = turma
  }

  public inserirDisciplanas(turma: Turma): void{
    console.log(turma)
    this.turmaBD.editarTurma(turma, turma.codigo)
    .then(() => {
      alert("Sucesso!")
      window.location.reload()
    },
      (error: any) => {
        alert("Erro!")
      })
  }

}
