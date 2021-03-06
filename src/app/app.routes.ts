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
import { ListarAdminsComponent } from './admin/listar-admins/listar-admins.component';
import { ListarProfessoresComponent } from './admin/listar-professores/listar-professores.component';
import { ListarDisciplinasComponent } from './admin/listar-disciplinas/listar-disciplinas.component';
import { ListarTurmasComponent } from './admin/listar-turmas/listar-turmas.component';
import { ListarAlunosComponent } from './admin/listar-alunos/listar-alunos.component';
import { HomeProfessorComponent } from './professor/home-professor/home-professor.component';
import { ProfessorComponent } from './professor/professor.component';
import { AtualizarSenhaProfessorComponent } from './professor/atualizar-senha-professor/atualizar-senha-professor.component';
import { InformacoesPessoaisComponent } from './professor/informacoes-pessoais/informacoes-pessoais.component';
import { TurmasComponent } from './professor/turmas/turmas.component';
import { CadastroCalendarioAcademicoComponent } from './admin/cadastro-calendario-academico/cadastro-calendario-academico.component';
import { CadastroHorarioTurmaComponent } from './admin/cadastro-horario-turma/cadastro-horario-turma.component';
import { PerfilComponent } from './aluno/perfil/perfil.component';
import { AlunoComponent } from './aluno/aluno.component';
import { BoletimComponent } from './aluno/boletim/boletim.component';
import { EditarHorarioTurmaComponent } from './admin/editar-horario-turma/editar-horario-turma.component';
import { HorarioComponent } from './professor/horario/horario.component';
import { DiarioComponent } from './professor/diario/diario.component';
import { FrequenciaComponent } from './professor/frequencia/frequencia.component';
import { TrocarSenhaComponent } from './acesso/trocar-senha/trocar-senha.component';
import { HorarioAlunoComponent } from './aluno/horario-aluno/horario-aluno.component';
import { AvaliacoesComponent } from './professor/avaliacoes/avaliacoes.component';
import { LancarNotasComponent } from './professor/lancar-notas/lancar-notas.component';
import { MediaEtapaComponent } from './professor/media-etapa/media-etapa.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { DisciplinasComponent } from './aluno/disciplinas/disciplinas.component';

export const ROUTES: Routes = [
    { path: '', component: AcessoComponent },
    { path: 'trocar-senha', component: TrocarSenhaComponent },
    { path: 'home-aluno', component: AlunoComponent, canActivate: [ AutenticacaoGuard ], children:[
        { path: '', component: HomeAlunoComponent },
        { path: 'aluno/perfil', component: PerfilComponent },
        { path: 'aluno/boletim', component: BoletimComponent},
        { path: 'aluno/horarioaluno', component: HorarioAlunoComponent},
        { path: 'aluno/disciplinas', component: DisciplinasComponent}
    ]},
    { path: 'home-admin', component: AdminComponent, canActivate: [ AutenticacaoGuard ], children:[
        { path: '', component: HomeAdmComponent },
        { path: 'admin', children:[
            { path: '', component: CadastroAdminComponent },
            { path: 'listar', component: ListarAdminsComponent}
        ] },
        { path: 'aluno', children: [
            { path: '', component: CadastroAlunoComponent },
            { path: 'listar', component: ListarAlunosComponent }
        ] },
        { path: 'disciplina', children: [
            { path: '', component: CadastroDisciplinaComponent},
            { path: 'listar', component: ListarDisciplinasComponent } 
        ] },
        { path: 'professor', children:[
            { path: '', component: CadastroProfessorComponent },
            { path: 'listar', component: ListarProfessoresComponent }
        ] },
        { path: 'turma', children: [
            { path: '', component: CadastroTurmaComponent },
            { path: 'listar', children: [
                { path: '', component: ListarTurmasComponent },
                { path: 'turma-horario/:id', component: EditarHorarioTurmaComponent }
            ] },
            { path: 'cadastro-horario/:id', component: CadastroHorarioTurmaComponent }
        ] },
        { path: 'periodo-letivo', component: CadastroCalendarioAcademicoComponent }
    ] },
    { path: 'home-professor', component: ProfessorComponent,  canActivate: [ AutenticacaoGuard ], children: [
        { path: '', component: HomeProfessorComponent },
        { path: 'professor/seguranca', component: AtualizarSenhaProfessorComponent },
        { path: 'professor/dados-pessoais', component: InformacoesPessoaisComponent },
        { path: 'professor/turmas', children: [
            { path: '', component: TurmasComponent },
            { path: 'diario/:idDisciplina', children: [
                { path:'', component: DiarioComponent },
                { path: 'frequencia', component: FrequenciaComponent },
                { path: 'avaliacoes', children: [
                    { path: '', component: AvaliacoesComponent },
                    { path: 'lancar-notas/:idAvaliacao', component: LancarNotasComponent },
                    { path: 'media-etapa/:bimestre', component: MediaEtapaComponent },
                ] },
                
            ] }
        ] },
        { path: 'professor/horario', component: HorarioComponent },
        
    ]},
    { path: '**', component: PaginaNaoEncontradaComponent}
]