import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPokemonComponent } from './preview-pokemon.component';

describe('PreviewPokemonComponent', () => {
  let component: PreviewPokemonComponent;
  let fixture: ComponentFixture<PreviewPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
