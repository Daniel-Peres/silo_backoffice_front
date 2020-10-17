import { EquipamentoService } from './../../../services/equipamento.service';
import { Equipamento } from './../../../models/equipamento.model';
import { Router, ActivatedRoute } from '@angular/router';
import { VeiculoService } from './../../../services/veiculo.service';
import { Component, OnInit } from '@angular/core';
import { Veiculo } from 'src/app/models/veiculo.model';

@Component({
  selector: 'app-equipamento-update',
  templateUrl: './equipamento-update.component.html',
  styleUrls: ['./equipamento-update.component.css']
})
export class EquipamentoUpdateComponent implements OnInit {

  userEmpresaId = JSON.parse(localStorage.getItem('usuario')).empresa.id;

  selectedEquipamento: string;

  equipamentos = { content: [] };
  equipamentosEmpresa = { content: [] };
  
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  equipamento: Equipamento = {
    id: null,
    codEquipamento: '',
    descricaoEquipamento: '',
    statusEquipamento: '',
    empresa: {
      id: null,
      empresa_nome: ''
    }    
  }

  constructor(
    private equipamentoService: EquipamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.equipamentoService.readById(id).subscribe(equipamento => {
      this.equipamento = equipamento;
    });
    this.listarTodosEquipamentos();
  }

  updateEquipamento(): void {
    // if (this.checkCampos()) { // checando campos não preenchidos
    //   this.equipamentoService.showMessage2('Campos obrigatórios não podem estar vazios!');
    // } else {
    this.equipamentoService.update(this.equipamento).subscribe(() => {
      this.router.navigate(['/manter_equipamentos']);
      this.equipamentoService.showMessage('Equipamento atualizado com sucesso!');
    });
    // }
  }

  cancel(): void {
    this.router.navigate(['/manter_equipamentos']);
  }

  // checar campos obrigatórios vazios
  checkCampos(): Boolean {
    if (this.equipamento.codEquipamento === '' ||
      this.equipamento.descricaoEquipamento === '' ||
      this.equipamento.empresa.id === null ||
      this.equipamento.empresa === '' ||
      this.equipamento.statusEquipamento === ''
      // this.equipamento.empresa === null
    ) { return true; } else { return false; }
  }

  listarTodosEquipamentos(): void {    
    this.equipamentoService.read('', this.pageSize, this.currentPage).subscribe(equipamento => {
      this.equipamentos = equipamento;
      this.totalSize = equipamento.totalElements;

      // armazenando em equipamentosEmpresa apenas equipamentos da mesma empresa do usuário
      this.equipamentosEmpresa.content = this.equipamentos.content.filter(x => x.empresa.id == this.userEmpresaId);
    })
  }
}