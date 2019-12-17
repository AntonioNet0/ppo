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
import { HomeAlunoComponent } from './aluno/home-aluno/home-aluno.component';
import { HomeAdmComponent } from './admin/home-adm/home-adm.component';
import { TopoAdmComponent } from './admin/topo-adm/topo-adm.component';
import { CadastroAlunoComponent } from './admin/cadastro-aluno/cadastro-aluno.component';
import { AdminComponent } from './admin/admin.component';
import { CadastroTurmaComponent } from './admin/cadastro-turma/cadastro-turma.component';
import { CadastroDisciplinaComponent } from './admin/cadastro-disciplina/cadastro-disciplina.component';
import { CadastroProfessorComponent } from './admin/cadastro-professor/cadastro-professor.component';
import { CadastroAdminComponent } from './admin/cadastro-admin/cadastro-admin.component';
import { IncluirDisciplinasComponent } from './admin/cadastro-turma/incluir-disciplinas/incluir-disciplinas.component';
import { LoginComponent } from './acesso/login/login.component';
import { ListarAdminsComponent } from './admin/listar-admins/listar-admins.component';
import { RemoverAdminComponent } from './admin/listar-admins/remover-admin/remover-admin.component';
import { EditarAdminComponent } from './admin/listar-admins/editar-admin/editar-admin.component';
import { ListarProfessoresComponent } from './admin/listar-professores/listar-professores.component';
import { EditarProfessorComponent } from './admin/listar-professores/editar-professor/editar-professor.component';
import { RemoverProfessorComponent } from './admin/listar-professores/remover-professor/remover-professor.component';
import { ListarDisciplinasComponent } from './admin/listar-disciplinas/listar-disciplinas.component';
import { RemoverDisciplinaComponent } from './admin/listar-disciplinas/remover-disciplina/remover-disciplina.component';
import { EditarDisciplinaComponent } from './admin/listar-disciplinas/editar-disciplina/editar-disciplina.component';
import { ListarTurmasComponent } from './admin/listar-turmas/listar-turmas.component';
import { ListarAlunosComponent } from './admin/listar-alunos/listar-alunos.component';
import { RemoverAlunoComponent } from './admin/listar-alunos/remover-aluno/remover-aluno.component';
import { EditarAlunoComponent } from './admin/listar-alunos/editar-aluno/editar-aluno.component';
import { RemoverTurmaComponent } from './admin/listar-turmas/remover-turma/remover-turma.component';
import { EditarTurmaComponent } from './admin/listar-turmas/editar-turma/editar-turma.component';
import { AlterarDisciplinasComponent } from './admin/listar-turmas/alterar-disciplinas/alterar-disciplinas.component';
import { ProfessorComponent } from './professor/professor.component';
import { TopoProfessorComponent } from './professor/topo-professor/topo-professor.component';
import { HomeProfessorComponent } from './professor/home-professor/home-professor.component';
import { AtualizarSenhaProfessorComponent } from './professor/atualizar-senha-professor/atualizar-senha-professor.component';
import { InformacoesPessoaisComponent } from './professor/informacoes-pessoais/informacoes-pessoais.component';
import { TurmasComponent } from './professor/turmas/turmas.component';
import { CadastroCalendarioAcademicoComponent } from './admin/cadastro-calendario-academico/cadastro-calendario-academico.component';
import { VisualizarCalendarioAcademicoComponent } from './admin/visualizar-calendario-academico/visualizar-calendario-academico.component';
import { CadastroHorarioTurmaComponent } from './admin/cadastro-horario-turma/cadastro-horario-turma.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopoAlunoComponent } from './aluno/topo-aluno/topo-aluno.component';
import { PerfilComponent } from './aluno/perfil/perfil.component';
import { AlunoComponent } from './aluno/aluno.component';
import { BoletimComponent } from './aluno/boletim/boletim.component';
import { EditarHorarioTurmaComponent } from './admin/editar-horario-turma/editar-horario-turma.component';
import { HorarioComponent } from './professor/horario/horario.component';
import { DiarioComponent } from './professor/diario/diario.component';
import { FrequenciaComponent } from './professor/frequencia/frequencia.component'




@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    AcessoComponent,
    TopoComponent,
    HomeAlunoComponent,
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
    LoginComponent,
    ListarAdminsComponent,
    RemoverAdminComponent,
    EditarAdminComponent,
    ListarProfessoresComponent,
    EditarProfessorComponent,
    RemoverProfessorComponent,
    ListarDisciplinasComponent,
    RemoverDisciplinaComponent,
    EditarDisciplinaComponent,
    ListarTurmasComponent,
    ListarAlunosComponent,
    RemoverAlunoComponent,
    EditarAlunoComponent,
    RemoverTurmaComponent,
    EditarTurmaComponent,
    AlterarDisciplinasComponent,
    ProfessorComponent,
    TopoProfessorComponent,
    HomeProfessorComponent,
    AtualizarSenhaProfessorComponent,
    InformacoesPessoaisComponent,
    TurmasComponent,
    CadastroCalendarioAcademicoComponent,
    VisualizarCalendarioAcademicoComponent,
    CadastroHorarioTurmaComponent,


    PerfilComponent,
    AlunoComponent,
    BoletimComponent,
    EditarHorarioTurmaComponent,
    HorarioComponent,
    DiarioComponent,
    FrequenciaComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
   

  ],
  providers: [ Autenticacao, AutenticacaoGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }



