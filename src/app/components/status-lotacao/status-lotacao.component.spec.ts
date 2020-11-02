import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLotacaoComponent } from './status-lotacao.component';

describe('StatusLotacaoComponent', () => {
  let component: StatusLotacaoComponent;
  let fixture: ComponentFixture<StatusLotacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusLotacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusLotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
