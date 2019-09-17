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
import { HomeAlunoComponent } from './aluno/home-aluno/home-aluno.component';
import { HomeProfessorComponent } from './homes/home-professor/home-professor.component';
import { HomeAdmComponent } from './admin/home-adm/home-adm.component';
import { TopoAdmComponent } from './admin/topo-adm/topo-adm.component';
import { TopoAlunoComponent } from './aluno/topo-aluno/topo-aluno.component';
import { CadastroAlunoComponent } from './admin/cadastro-aluno/cadastro-aluno.component';
import { AdminComponent } from './admin/admin.component';
import { CadastroTurmaComponent } from './admin/cadastro-turma/cadastro-turma.component';
import { CadastroDisciplinaComponent } from './admin/cadastro-disciplina/cadastro-disciplina.component';
import { CadastroProfessorComponent } from './admin/cadastro-professor/cadastro-professor.component';
import { CadastroAdminComponent } from './admin/cadastro-admin/cadastro-admin.component';
import { IncluirDisciplinasComponent } from './admin/cadastro-turma/incluir-disciplinas/incluir-disciplinas.component';


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
    TopoAlunoComponent,
    CadastroAlunoComponent,
    AdminComponent,
    CadastroTurmaComponent,
    CadastroDisciplinaComponent,
    CadastroProfessorComponent,
    CadastroAdminComponent,
    IncluirDisciplinasComponent,
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
