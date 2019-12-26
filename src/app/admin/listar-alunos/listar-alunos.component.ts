import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/shared/aluno.model';
import { AlunoBD } from 'src/app/services/aluno-bd.service';
import { Observable, Subject, of, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-listar-alunos',
  templateUrl: './listar-alunos.component.html',
  styleUrls: ['./listar-alunos.component.css'],
  providers: [ AlunoBD ]
})
export class ListarAlunosComponent implements OnInit {
  
  public paginacao: any
  public paginaAtual: number = 1
  public alunos: Aluno[]
  public alunosPagina: Aluno[] = null

  public pesquisado: boolean = false

  public ofertas: Observable<Aluno[]>

  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(
    private alunoBD: AlunoBD
  ) { }


  ngOnInit() {

    this.ofertas = this.subjectPesquisa
    .pipe(debounceTime(1000))
    .pipe(distinctUntilChanged())
    .pipe(
      switchMap((termo: string) => {
        if(termo.trim() === ''){
          return of<Aluno[]>(this.alunosPagina)
        }
        return from(this.alunoBD.pesquisaAlunos(termo))
      })
    )
    .pipe(catchError((err: any) => {
      console.log(err)
      return of<Aluno[]>(this.alunosPagina)
    }))

    this.alunoBD.listarAlunos()
      .then((alunos: any) => {
        this.alunos = alunos
        this.paginacao = this.criarPaginacao()
        this.exibirAlunoPaginacao(1)
      })
  }

  public pesquisa(termoDaPesquisa: string): void{
    this.pesquisado = true
    this.subjectPesquisa.next(termoDaPesquisa)
  }

  private criarPaginacao(): any {
    let paginacao: any[] = []
    let numPaginacao = this.alunos.length / 10
    paginacao.push({ val: 1 })
    if (numPaginacao !== 0) {
      numPaginacao++
    }
    for (let i = 2; i < numPaginacao; i++) {
      paginacao.push({ val: i })
    }
    return paginacao
  }

  public exibirAlunoPaginacao(pagina: number): void {
    if (pagina <= this.paginacao.length && pagina !== 0) {

      let num = this.alunos.length
      let max = pagina * 10
      let alunos: Aluno[] = []
      if (num < max) {
        max = num
      }
      for (let i = (pagina - 1) * 10; i < max; i++) {
        alunos.push(this.alunos[i])
      }

      this.paginaAtual = pagina
      this.alunosPagina = alunos
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


  public alunoTemp: Aluno = new Aluno()


  public modalUsuario(aluno: Aluno): void {
    let elemento = document.getElementById('body-modal') as HTMLInputElement
    elemento.innerHTML = "Você tem certeza que deseja excluir o Aluno: " + aluno.nome
    this.setAlunoTemp(aluno)
  }

  public setAlunoTemp(aluno: Aluno): void{
    this.alunoTemp = aluno
  }

}
