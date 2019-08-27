import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

import { ReactiveFormsModule } from '@angular/forms';
import { Autenticacao } from './services/auth.service';
import { AutenticacaoGuard } from './services/auth-guard.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { AcessoComponent } from './acesso/acesso.component';
import { TopoComponent } from './acesso/topo/topo.component';
import { LoginProfessorComponent } from './acesso/login-professor/login-professor.component';
import { LoginAlunoComponent } from './acesso/login-aluno/login-aluno.component';
import { HomeAlunoComponent } from './homes/home-aluno/home-aluno.component';
import { HomeProfessorComponent } from './homes/home-professor/home-professor.component';
import { HomeAdmComponent } from './admin/home-adm/home-adm.component';
import { TopoAdmComponent } from './admin/home-adm/topo-adm/topo-adm.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    AcessoComponent,
    TopoComponent,
    LoginProfessorComponent,
    LoginAlunoComponent,
    HomeAlunoComponent,
    HomeProfessorComponent,
    HomeAdmComponent,
    TopoAdmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ Autenticacao, AutenticacaoGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
