import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeriodoLetivo } from 'src/app/shared/periodo-letivo.model';
import { PeriodoLetivoBD } from 'src/app/services/periodo-letivo-db.service';

@Component({
  selector: 'app-cadastro-calendario-academico',
  templateUrl: './cadastro-calendario-academico.component.html',
  styleUrls: ['./cadastro-calendario-academico.component.css'],
  providers: [PeriodoLetivoBD]
})
export class CadastroCalendarioAcademicoComponent implements OnInit {

  public periodoLetivo: PeriodoLetivo = new PeriodoLetivo()

  public formulario: FormGroup = new FormGroup({
    'inicioAulas': new FormControl(null, [Validators.required]),
    'fimAulas': new FormControl(null, [Validators.required]),
    'inicioRecesso': new FormControl(null, [Validators.required]),
    'fimRecesso': new FormControl(null, [Validators.required])
  })

  constructor(
    private periodoBD: PeriodoLetivoBD
  ) { }

  ngOnInit() {
  }

  public cadastraPeriodoLetivo(): void {
    if (this.formulario.invalid) {

      this.formulario.get('inicioAulas').markAsTouched()
      this.formulario.get('fimAulas').markAsTouched()
      this.formulario.get('inicioRecesso').markAsTouched()
      this.formulario.get('fimRecesso').markAsTouched()

    } else {

      this.periodoLetivo.inicioAulas = this.formulario.value.inicioAulas
      this.periodoLetivo.fimAulas = this.formulario.value.fimAulas
      this.periodoLetivo.inicioRecesso = this.formulario.value.inicioRecesso
      this.periodoLetivo.fimRecesso = this.formulario.value.fimRecesso

      // this.periodoBD.cadastroPeriodoLetivo(this.periodoLetivo)
      //   .then(() => {
      //     alert("Suceso!")
      //   },
      //     () => {
      //       alert("Um erro desconhecido ocorreu!")
      //     })
      this.builderCalendarioAcademico(this.periodoLetivo)
    }
  }

  public segundas: string[] = []
  public tercas: string[] = []
  public quartas: string[] = []
  public quintas: string[] = []
  public sextas: string[] = []

  public builderCalendarioAcademico(periodo: PeriodoLetivo): void {
    let dataInicio: Date = new Date(periodo.inicioAulas + "T12:00:00")
    let dataFim: Date = new Date(periodo.fimAulas + "T12:00:00")
    let recessoInicio: Date = new Date(periodo.inicioRecesso + "T12:00:00")
    let recessoFim: Date = new Date(periodo.fimRecesso + "T12:00:00")

    let diaInicio = dataInicio.getDate()
    let mesInicio = dataInicio.getMonth()

    let diaFim = dataFim.getDate()
    let mesFim = dataFim.getMonth()

    let feriasInicio = recessoInicio.getDate()
    let feriasIM = recessoInicio.getMonth()

    let feriasFim = recessoFim.getDate()
    let feriasFM = recessoFim.getMonth()

    while ((mesInicio < feriasIM) || (mesInicio === feriasIM && diaInicio < feriasInicio) ||
      (mesInicio === feriasIM && diaInicio > feriasFim) || (mesInicio > feriasFM && mesInicio < mesFim) ||
      (mesInicio === mesFim && diaInicio <= diaFim)) {

      if (dataInicio.getDay() === 1) {
        let data: string = ''
        if (diaInicio < 10) {
          data += '0' + diaInicio +'/'
        } else {
          data += diaInicio +'/'
        }
        if (mesInicio < 9) {
          data += '0' + (mesInicio + 1) 
        } else {
          data += (mesInicio + 1) 
        }
        
        this.segundas.push(data)
      } else if (dataInicio.getDay() === 2) {
        let data: string = ''
        if (diaInicio < 10) {
          data += '0' + diaInicio +'/'
        } else {
          data += diaInicio +'/'
        }
        if (mesInicio < 9) {
          data += '0' + (mesInicio + 1) 
        } else {
          data += (mesInicio + 1) 
        }
        this.tercas.push(data)
      } else if (dataInicio.getDay() === 3) {
        let data: string = ''
        if (diaInicio < 10) {
          data += '0' + diaInicio +'/'
        } else {
          data += diaInicio +'/'
        }
        if (mesInicio < 9) {
          data += '0' + (mesInicio + 1) 
        } else {
          data += (mesInicio + 1) 
        }
        this.quartas.push(data)
      } else if (dataInicio.getDay() === 4) {
        let data: string = ''
        if (diaInicio < 10) {
          data += '0' + diaInicio +'/'
        } else {
          data += diaInicio +'/'
        }
        if (mesInicio < 9) {
          data += '0' + (mesInicio + 1) 
        } else {
          data += (mesInicio + 1) 
        }
        this.quintas.push(data)
      } else if (dataInicio.getDay() === 5) {
        let data: string = ''
        if (diaInicio < 10) {
          data += '0' + diaInicio +'/'
        } else {
          data += diaInicio +'/'
        }
        if (mesInicio < 9) {
          data += '0' + (mesInicio + 1) 
        } else {
          data += (mesInicio + 1) 
        }
        this.sextas.push(data)
      }
      if ((mesInicio === 0 || mesInicio === 2 || mesInicio === 4 || mesInicio === 6 || mesInicio === 7 || mesInicio === 9 || mesInicio === 11) && diaInicio === 31) {
        diaInicio = 1
        mesInicio++
      } else if (mesInicio === 1 && dataInicio.getFullYear() % 4 === 0 && diaInicio === 29 || (diaInicio === 28 && dataInicio.getFullYear() % 4 !== 0 && mesInicio === 1)) {
        diaInicio = 1
        mesInicio++

      } else if ((mesInicio === 3 || mesInicio === 5 || mesInicio === 8 || mesInicio === 10) && diaInicio === 30) {
        diaInicio = 1
        mesInicio++
      } else {
        diaInicio++
      }
      if (diaInicio === feriasInicio && mesInicio === feriasIM) {
        if ((feriasFim === 30 && (feriasFM === 3 || feriasFM === 5 || feriasFM === 8 || feriasFM === 10))
          || (feriasFim === 31 && (feriasFM === 0 || feriasFM === 2 || feriasFM === 4 || feriasFM === 6 || feriasFM === 7 || feriasFM === 9 || feriasFM === 11))
          || (feriasFim === 29 && feriasFM === 1) || (feriasFim === 28 && feriasFM === 1)) {
          diaInicio = 1
          mesInicio = feriasFM + 1
        } else {
          diaInicio = feriasFim + 1
          mesInicio = feriasFM
        }
      }
      dataInicio = this.setDataInicio(diaInicio, mesInicio, dataInicio.getFullYear())

    }
    this.periodoBD.limpaBimestre()
      .then(() => {
        this.bimestresBuilder(this.segundas, 'segundas')
        this.bimestresBuilder(this.tercas, 'tercas')
        this.bimestresBuilder(this.quartas, 'quartas')
        this.bimestresBuilder(this.quintas, 'quintas')
        this.bimestresBuilder(this.sextas, 'sextas')
      })

     this.periodoBD.cadastroDiasLetivos(this.segundas, this.tercas, this.quartas, this.quintas, this.sextas)
       .then(() => alert("Sucesso"))

  }

  private setDataInicio(dia: number, mes: number, ano: number): Date {
    let data: string = ano + '-'
    if (mes < 9) {
      data += '0' + (mes + 1) + '-'
    } else {
      data += (mes + 1) + '-'
    }
    if (dia < 10) {
      data += '0' + dia + 'T12:00:00'
    } else {
      data += dia + 'T12:00:00'
    }

    return new Date(data)
  }

  private bimestresBuilder(segundas: string[], diaSemana: string): void {
    let segundaBimestres: any[] = []
    let tamanho = segundas.length
    let segundas1B: string[] = []
    let segundas2B: string[] = []
    let segundas3B: string[] = []
    let segundas4B: string[] = []

    for (let i = 0; i < tamanho; i++) {
      if (tamanho / 4 > i) {
        segundas1B.push(segundas[i])
      } else if (tamanho / 2 > i) {
        segundas2B.push(segundas[i])
      } else if ((tamanho / 4) * 3 > i) {
        segundas3B.push(segundas[i])
      } else {
        segundas4B.push(segundas[i])
      }
    }
    segundaBimestres.push(segundas1B)
    segundaBimestres.push(segundas2B)
    segundaBimestres.push(segundas3B)
    segundaBimestres.push(segundas4B)

    this.periodoBD.cadastroBimestres(segundaBimestres, diaSemana)


  }

}
