import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from 'src/app/components/excluir/excluir.component';
import { Funcionario } from 'src/app/models/Funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private funcionarioService: FuncionarioService,
    public dialog: MatDialog
  ) {}

  funcionarios: Funcionario[] = [];
  FuncionarioGeral: Funcionario[] = [];

  colunas = [
    'Situacao',
    'Nome',
    'Sobrenome',
    'Departamento',
    'Ações',
    'Excluir',
  ];

  ngOnInit(): void {
    this.funcionarioService.GetFuncionarios().subscribe((data) => {
      const dados = data.dados;

      dados.map((item) => {
        item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleDateString(
          'pt-BR'
        );
        item.dataDeAlteracao = new Date(
          item.dataDeAlteracao!
        ).toLocaleDateString('pt-BR');
      });

      this.funcionarios = data.dados;
      this.FuncionarioGeral = data.dados;
    });
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();

    this.funcionarios = this.FuncionarioGeral.filter((funcionario) => {
      return funcionario.nome.toLocaleLowerCase().includes(value);
    });
  }

  OpenDialog(id: number) {
    this.dialog.open(ExcluirComponent, {
      width: '450px',
      height: '450px',
      data: {
        id: id,
      },
    });
  }
}
