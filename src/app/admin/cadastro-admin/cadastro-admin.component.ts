import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from 'src/app/services/auth.service';
import { Administrador } from 'src/app/shared/admin.model';
import { AdminDB } from 'src/app/services/Admin-db.service';


@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.component.html',
  styleUrls: ['./cadastro-admin.component.css'],
  providers: [AdminDB]
})
export class CadastroAdminComponent implements OnInit {

  public estadoButton: boolean = true

  public paginacao: any
  public paginaAtual: number = 1

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl({ value: '', disabled: true }, [Validators.required]),
    'login': new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]),
    'senha': new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]),
    'email': new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(6), Validators.email])
  })

  public erroMessage: string
  public admins: Administrador[]
  public adminsPagina: Administrador[]

  constructor(
    private adminBD: AdminDB
  ) {

  }

  ngOnInit() {
    this.adminBD.listAdmin()
      .then((admins: any) => {
        this.admins = admins
        this.paginacao = this.criarPaginacao()
        this.exibriAdminPaginacao(1)
      })
  }


  public novo(): void {
    this.formulario.enable()
    this.formulario.reset()
    this.estadoButton = false
  }

  public cancelar(): void {

    this.formulario.disable()
    this.formulario.reset()
    this.estadoButton = true
  }

  public cadastro(): void {
    if (this.formulario.valid) {
      let admin: Administrador = new Administrador(
        this.formulario.value.nome,
        this.formulario.value.login,
        this.formulario.value.senha,
        this.formulario.value.email
      )

      this.adminBD.cadastroAdmin(admin)
        .then(() => {
          this.erroMessage = this.adminBD.errorMessage
          if (this.erroMessage === undefined) {
            this.adminBD.listAdmin()
              .then((admins: any) => {
                this.admins = admins
                this.paginacao = this.criarPaginacao()
              })
          } else {

          }
        })
    }
  }

  private criarPaginacao(): any {
    let paginacao: any[] = []
    let numPaginacao = this.admins.length % 5
    paginacao.push({val:1})
    if (numPaginacao !== 0) {
      numPaginacao++
    }
    for (let i = 2; i <= numPaginacao; i++) {
      paginacao.push({ val: i })
    }
    return paginacao
  }

  public exibriAdminPaginacao(pagina: number): void{
    let num = this.admins.length
    let max
    let admins: Administrador[] = []
    if(num < pagina*5){
      max= num 
    }else{
      max = pagina*5
    }
    for(let i = (pagina-1)*5; i < max; i++){
      admins.push(this.admins[i])
    }
    
    this.adminsPagina = admins
  }


}
