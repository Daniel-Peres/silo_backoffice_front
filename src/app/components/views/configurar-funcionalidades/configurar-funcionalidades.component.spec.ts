import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarFuncionalidadesComponent } from './configurar-funcionalidades.component';

describe('ConfigurarFuncionalidadesComponent', () => {
  let component: ConfigurarFuncionalidadesComponent;
  let fixture: ComponentFixture<ConfigurarFuncionalidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarFuncionalidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarFuncionalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
