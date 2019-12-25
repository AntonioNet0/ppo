import { Component, OnInit } from '@angular/core';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { Aluno } from 'src/app/shared/aluno.model';
import { Disciplina } from 'src/app/shared/disciplina.model';
import { AvaliacaoBD } from 'src/app/services/avaliacao-bd.service';

@Component({
  selector: 'app-lancar-notas',
  templateUrl: './lancar-notas.component.html',
  styleUrls: ['./lancar-notas.component.css'],
  providers: [DisciplinaBD, TurmaBD, AvaliacaoBD]
})
export class LancarNotasComponent implements OnInit {

  public alunos: Aluno[] = []
  public disciplina: Disciplina = new Disciplina()

  public notasAvaliacao: any[] = []
  public rota: any = {bimestre: null, avaliacao: null, disciplina: null}

  public notasCadastradas: any[] = []

  constructor(
    private route: ActivatedRoute,
    private disciplinaBD: DisciplinaBD,
    private turmaBD: TurmaBD,
    private avaliacaoBD: AvaliacaoBD
  ) { }

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {

      this.rota.disciplina = parametros.idDisciplina
      this.rota.bimestre = parametros.idAvaliacao[0]
      this.rota.avaliacao = parametros.idAvaliacao[2]

      this.avaliacaoBD.getNotasAvaliacao(this.rota)
        .then((resp: any) => {
          this.notasCadastradas = resp
        })

      this.disciplinaBD.getDisciplina(parametros.idDisciplina)
        .then((disciplina: Disciplina) => {
          this.disciplina = disciplina
          this.turmaBD.getAlunos(disciplina.turma)
            .then((alunos: any) => {
              this.alunos = alunos
            })
        })
    })
  }

  public adicionarVal(valor: any): void {
    if (valor.value <= 10 && valor.value >= 0) {
      document.getElementById(valor.id).className = document.getElementById(valor.id).className.replace('invalido', '')
      this.notasAvaliacao[valor.id] = { nome: this.alunos[valor.id].nome, matricula: this.alunos[valor.id].matricula, nota: valor.value }
    } else {
      document.getElementById(valor.id).className += " invalido"
    }
  }

  public lancarNotas(): void {
    console.log(this.alunos.length)
    console.log(this.notasAvaliacao.length)
    if (this.alunos.length === this.notasAvaliacao.length) {

      this.avaliacaoBD.adicionarNotas(this.notasAvaliacao, this.rota)
        .then(()=> alert("Sucesso!"))
    } else {
      alert("Preencha todos os campos corretamente!")
    }
  }

}
