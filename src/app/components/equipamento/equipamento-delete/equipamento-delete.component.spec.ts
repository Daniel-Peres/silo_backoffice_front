import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoDeleteComponent } from './equipamento-delete.component';

describe('EquipamentoDeleteComponent', () => {
  let component: EquipamentoDeleteComponent;
  let fixture: ComponentFixture<EquipamentoDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentoDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
