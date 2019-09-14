import { Routes } from '@angular/router';
import { AcessoComponent } from './acesso/acesso.component';
import { HomeAlunoComponent } from './aluno/home-aluno/home-aluno.component';
import { AutenticacaoGuard } from './services/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { CadastroAlunoComponent } from './admin/cadastro-aluno/cadastro-aluno.component';
import { HomeAdmComponent } from './admin/home-adm/home-adm.component';
import { CadastroTurmaComponent } from './admin/cadastro-turma/cadastro-turma.component';
import { CadastroAdminComponent } from './admin/cadastro-admin/cadastro-admin.component';
import { CadastroDisciplinaComponent } from './admin/cadastro-disciplina/cadastro-disciplina.component';
import { CadastroProfessorComponent } from './admin/cadastro-professor/cadastro-professor.component';

export const ROUTES: Routes = [
    { path: '', component: AcessoComponent },
    { path: 'home-aluno', component: HomeAlunoComponent, canActivate: [ AutenticacaoGuard ]},
    { path: 'home-admin', component: AdminComponent, children:[
        { path: '', component: HomeAdmComponent },
        { path: 'admin', component: CadastroAdminComponent },
        { path: 'aluno', component: CadastroAlunoComponent },
        { path: 'disciplina', component: CadastroDisciplinaComponent },
        { path: 'professor', component: CadastroProfessorComponent },
        { path: 'turma', component: CadastroTurmaComponent },
        
        
    ] },
]