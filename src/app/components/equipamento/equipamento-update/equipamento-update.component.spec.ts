import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoUpdateComponent } from './equipamento-update.component';

describe('EquipamentoUpdateComponent', () => {
  let component: EquipamentoUpdateComponent;
  let fixture: ComponentFixture<EquipamentoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
