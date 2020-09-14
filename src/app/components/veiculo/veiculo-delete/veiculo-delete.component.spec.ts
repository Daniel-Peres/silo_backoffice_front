import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoDeleteComponent } from './veiculo-delete.component';

describe('VeiculoDeleteComponent', () => {
  let component: VeiculoDeleteComponent;
  let fixture: ComponentFixture<VeiculoDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculoDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
