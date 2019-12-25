import { Component, OnInit } from '@angular/core';
import { AvaliacaoBD } from 'src/app/services/avaliacao-bd.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DisciplinaBD } from 'src/app/services/disciplina-bd.service';
import { TurmaBD } from 'src/app/services/turma-bd.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NotasBD } from 'src/app/services/notas-bd.service';

@Component({
  selector: 'app-media-etapa',
  templateUrl: './media-etapa.component.html',
  styleUrls: ['./media-etapa.component.css'],
  providers: [AvaliacaoBD, DisciplinaBD, TurmaBD, NotasBD]
})
export class MediaEtapaComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    media: new FormControl(null)
  })

  public avaliacoes: any[] = []
  public notas: any[] = []
  public notasRecu: any[] = []
  public alunos: any[] = []
  public numAval: any[] = []
  public disciplinaNome: string = ''
  public bimestre: any = 0

  public mediaCadastradas: any = []

  public notasDisciplinaBimestre: any = []

  constructor(
    private avaliacaoBD: AvaliacaoBD,
    private route: ActivatedRoute,
    private disciplinaBD: DisciplinaBD,
    private turmaBD: TurmaBD,
    private notasBD: NotasBD
  ) { }

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {
      this.disciplinaNome = parametros.idDisciplina
      this.bimestre = parametros.bimestre
      this.notasBD.getNotasDiscipilinaBimestre(parametros.idDisciplina, parametros.bimestre)
        .then((resp: any) => {
          this.mediaCadastradas = resp
          this.notasDisciplinaBimestre= resp
        })
      this.avaliacaoBD.getAvaliacoesBimestre(parametros.idDisciplina, parametros.bimestre)
        .then((resp) => {
          let i = 0
          this.avaliacoes = resp
          resp.forEach((item: any) => {
            if (item.notas !== undefined && item.tipo !== 'recuperacao') {
              this.numAval.push(i++)
              this.notas.push(item.notas)
            } else if (item.notas !== undefined && item.tipo === 'recuperacao') {
              this.notasRecu.push(item.notas)
            }

          });
          this.numAval.pop()
        })

      this.disciplinaBD.getDisciplina(parametros.idDisciplina)
        .then((disciplina: any) => {
          this.turmaBD.getAlunos(disciplina.turma)
            .then((alunos: any) => {
              this.alunos = alunos
            })
        })
    })
  }

  public calculaMedia(matricula: string, comp: any): any {
    if (this.notasRecu.length !== 0) {
      let media = 0
      let nota = { nome: '', matricula: '', mediaBimestre: 0 }
      this.notasRecu.forEach((item) => {
        item.forEach(aluno => {
          if (aluno.matricula === matricula && aluno.nota != 0) {
            nota.nome = aluno.nome
            nota.matricula = aluno.matricula
            media = parseFloat(aluno.nota)
            nota.mediaBimestre = media
          }
          if (this.formulario.value.media === 'ponderada') {
            if (media < this.calculaMediaPonderada(matricula, comp)) {
              media = this.calculaMediaPonderada(matricula, comp)
              nota.mediaBimestre = media
            }
          } else if (this.formulario.value.media === 'aritmetica') {
            if (media < this.calculaMediaAritmetica(matricula, comp)) {
              media = this.calculaMediaAritmetica(matricula, comp)
              nota.mediaBimestre = media
            }
          }

        })
      })
      this.notasDisciplinaBimestre[comp.id] = nota
      return media
    } else if (this.formulario.value.media === 'ponderada') {
      return this.calculaMediaPonderada(matricula, comp)
    } else if (this.formulario.value.media === 'aritmetica') {
      return this.calculaMediaAritmetica(matricula, comp)
    }
  }

  public calculaMediaPonderada(matricula: string, comp: any): any {
    let media: number = 0
    let cont: number = 0
    let contAval: number = 0
    let nota = { nome: '', matricula: '', mediaBimestre: 0 }
    nota.mediaBimestre = 1
    this.notas.forEach((avaliacao: any) => {
      contAval++
      avaliacao.forEach((aluno: any) => {
        if (aluno.matricula === matricula) {
          nota.nome = aluno.nome
          nota.matricula = aluno.matricula
          media = (parseFloat(aluno.nota) * parseFloat(this.avaliacoes[contAval].peso)) + media
          cont = cont + parseFloat(this.avaliacoes[contAval].peso)
        }
      })
    })
    nota.mediaBimestre = media / cont
    this.notasDisciplinaBimestre[comp.id] = nota
    return media / cont
  }

  public calculaMediaAritmetica(matricula: string, comp: any): any {
    let media: number = 0
    let cont: number = 0
    let nota = { nome: '', matricula: '', mediaBimestre: 0 }
    this.notas.forEach((avaliacao: any) => {
      avaliacao.forEach((aluno: any) => {
        if (aluno.matricula === matricula) {
          nota.nome = aluno.nome
          nota.matricula = aluno.matricula
          media = parseFloat(aluno.nota) + media
          cont++
        }
      })
    })
    nota.mediaBimestre = media / cont
    this.notasDisciplinaBimestre[comp.id] = nota
    return media / cont
  }

  public salvarNotas(): void {
    if (this.notasDisciplinaBimestre.length === this.notas[0].length) {
      this.notasDisciplinaBimestre.disciplina = this.disciplinaNome
      this.notasDisciplinaBimestre.bimestre = this.bimestre
      this.notasBD.cadastrarNotas(this.notasDisciplinaBimestre)
        .then(() => alert("Sucesso"))
    }

  }

}
