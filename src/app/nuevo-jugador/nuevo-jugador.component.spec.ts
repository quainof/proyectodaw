import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoJugadorComponent } from './nuevo-jugador.component';

describe('NuevoJugadorComponent', () => {
  let component: NuevoJugadorComponent;
  let fixture: ComponentFixture<NuevoJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoJugadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
