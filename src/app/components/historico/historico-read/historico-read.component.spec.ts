import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoReadComponent } from './historico-read.component';

describe('HistoricoReadComponent', () => {
  let component: HistoricoReadComponent;
  let fixture: ComponentFixture<HistoricoReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
