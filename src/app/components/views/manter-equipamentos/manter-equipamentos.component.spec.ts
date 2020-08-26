import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterEquipamentosComponent } from './manter-equipamentos.component';

describe('ManterEquipamentosComponent', () => {
  let component: ManterEquipamentosComponent;
  let fixture: ComponentFixture<ManterEquipamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManterEquipamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManterEquipamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
