import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterVeiculosComponent } from './manter-veiculos.component';

describe('ManterVeiculosComponent', () => {
  let component: ManterVeiculosComponent;
  let fixture: ComponentFixture<ManterVeiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManterVeiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManterVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
