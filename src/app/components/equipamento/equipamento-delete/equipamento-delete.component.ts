import { EquipamentoService } from './../../../services/equipamento.service';
import { Equipamento } from './../../../models/equipamento.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipamento-delete',
  templateUrl: './equipamento-delete.component.html',
  styleUrls: ['./equipamento-delete.component.css']
})
export class EquipamentoDeleteComponent implements OnInit {

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
    const id = +this.route.snapshot.paramMap.get('id');
    this.equipamentoService.readById(id).subscribe(equipamento => {
      this.equipamento = equipamento;
    })
  }

  deleteEquipamento(): void {
    this.equipamentoService.delete(this.equipamento.id).subscribe(() => {
      this.router.navigate(['/manter_equipamentos']);
      this.equipamentoService.showMessage('Equipamento excluído com sucesso!');
    })
  }

  cancel(): void {
    this.router.navigate(['/manter_equipamentos']);
  }

}
