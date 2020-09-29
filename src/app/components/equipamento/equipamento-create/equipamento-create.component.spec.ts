import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoCreateComponent } from './equipamento-create.component';

describe('EquipamentoCreateComponent', () => {
  let component: EquipamentoCreateComponent;
  let fixture: ComponentFixture<EquipamentoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
