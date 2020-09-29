import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoReadComponent } from './equipamento-read.component';

describe('EquipamentoReadComponent', () => {
  let component: EquipamentoReadComponent;
  let fixture: ComponentFixture<EquipamentoReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentoReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
