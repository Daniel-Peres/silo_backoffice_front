import { Equipamento } from './../../../models/equipamento.model';
import { EquipamentoService } from './../../../services/equipamento.service';
import { Router } from '@angular/router';
import { VeiculoService } from './../../../services/veiculo.service';
import { Component, OnInit } from '@angular/core';
import { Veiculo } from 'src/app/models/veiculo.model';

@Component({
  selector: 'app-equipamento-create',
  templateUrl: './equipamento-create.component.html',
  styleUrls: ['./equipamento-create.component.css']
})
export class EquipamentoCreateComponent implements OnInit {

  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresaId;

  selectedEquipamento: string;

  // equipamentos = { content: [] };

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
    empresa: '',
    empresaId: null,
  }

  constructor(private equipamentoService: EquipamentoService,
    private router: Router
  ) {
    // atribuindo valor retirado do JWT
    this.equipamento.empresaId = JSON.parse(localStorage.getItem('usuario')).empresaId;
  }


  ngOnInit(): void {
    // this.listarTodosEquipamentos();
    this.preencheEmpresa()
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
      this.equipamento.empresaId === null ||
      this.equipamento.empresa === '' ||
      this.equipamento.statusEquipamento === ''
      // this.equipamento.empresa === null
    ) { return true; } else { return false; }
  }

  preencheEmpresa(): void {
    if (JSON.parse(localStorage.getItem('usuario')).empresaId === 1) {
      this.equipamento.empresa = 'SPTrans';
    } else if (JSON.parse(localStorage.getItem('usuario')).empresaId === 2) {
      this.equipamento.empresa = 'ViaSul';
    } else if (JSON.parse(localStorage.getItem('usuario')).empresaId === 3) {
      this.equipamento.empresa = 'MoveBus';
    } else {
      this.equipamento.empresa = 'TransUniao';
    }
  }

  // listarTodosEquipamentos(): void {
  //   this.equipamentoService.read('', this.pageSize, this.currentPage).subscribe(equipamento => {
  //     this.equipamentos = equipamento;
  //     this.totalSize = equipamento.totalElements;

  //     // armazenando em equipamentosEmpresa apenas equipamentos da mesma empresa do usuário
  //     this.equipamentosEmpresa.content = this.equipamentos.content.filter(x => x.empresaId == this.userEmpresaId);
  //   })
  // }
}
