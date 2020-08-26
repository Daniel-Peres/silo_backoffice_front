import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarNivelLotacaoComponent } from './mostrar-nivel-lotacao.component';

describe('MostrarNivelLotacaoComponent', () => {
  let component: MostrarNivelLotacaoComponent;
  let fixture: ComponentFixture<MostrarNivelLotacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarNivelLotacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarNivelLotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
