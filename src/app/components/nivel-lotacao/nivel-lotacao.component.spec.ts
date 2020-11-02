import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelLotacaoComponent } from './nivel-lotacao.component';

describe('NivelLotacaoComponent', () => {
  let component: NivelLotacaoComponent;
  let fixture: ComponentFixture<NivelLotacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NivelLotacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelLotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
