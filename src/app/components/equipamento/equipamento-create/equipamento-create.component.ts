import { Equipamento } from './../../../models/equipamento.model';
import { EquipamentoService } from './../../../services/equipamento.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipamento-create',
  templateUrl: './equipamento-create.component.html',
  styleUrls: ['./equipamento-create.component.css']
})
export class EquipamentoCreateComponent implements OnInit {

  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;

  selectedEquipamento: string;

  equipamentosEmpresa = { content: [] };
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];


  equipamento: Equipamento = {
    id: null,
    codEquipamento: '',
    descricaoEquipamento: '',
    statusEquipamento: 'INATIVO',
    empresa: {
      id: null,
      empresa_nome: ''
    }
  }

  constructor(private equipamentoService: EquipamentoService,
    private router: Router
  ) {
    // atribuindo valor retirado do JWT
    this.equipamento.empresa.id = JSON.parse(localStorage.getItem('usuario')).empresa.id;
    this.equipamento.empresa.empresa_nome = JSON.parse(localStorage.getItem('usuario')).empresa.empresa_nome;
  }


  ngOnInit(): void {
   
  }

  createEquipamento(): void {
    if (this.checkCampos()) {
      this.equipamentoService.showMessage2('Campos obrigatórios não preenchidos!');
    } else {
      this.equipamentoService.create(this.equipamento).subscribe(() => {
        this.equipamentoService.showMessage('Equipamento cadastrado com sucesso!');
        this.router.navigate(['/manter_equipamentos']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/manter_equipamentos']);
  }

  // checar campos obrigatórios vazios
  checkCampos(): Boolean {
    if (this.equipamento.codEquipamento === '' ||
      this.equipamento.descricaoEquipamento === '' ||
      this.equipamento.empresa.id === null ||
      this.equipamento.empresa.empresa_nome === '' ||
      this.equipamento.statusEquipamento === ''
      // this.equipamento.empresa === null
    ) { return true; } else { return false; }
  }
}
