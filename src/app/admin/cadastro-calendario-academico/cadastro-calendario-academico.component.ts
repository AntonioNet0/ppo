import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeriodoLetivo } from 'src/app/shared/periodo-letivo.model';
import { PeriodoLetivoBD } from 'src/app/services/periodo-letivo-db.service';

@Component({
  selector: 'app-cadastro-calendario-academico',
  templateUrl: './cadastro-calendario-academico.component.html',
  styleUrls: ['./cadastro-calendario-academico.component.css'],
  providers: [ PeriodoLetivoBD ]
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
      this.periodoLetivo.inicioRecesso= this.formulario.value.inicioRecesso
      this.periodoLetivo.fimRecesso = this.formulario.value.fimRecesso

      this.periodoBD.cadastroPeriodoLetivo(this.periodoLetivo)
        .then(() => {
          alert("Suceso!")
        },
        () => {
          alert("Um erro desconhecido ocorreu!")
        })
      
    }
  }

}
