import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterUsuariosComponent } from './manter-usuarios.component';

describe('ManterUsuariosComponent', () => {
  let component: ManterUsuariosComponent;
  let fixture: ComponentFixture<ManterUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManterUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManterUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
