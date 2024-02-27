import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyCreateComponent } from './technology-create.component';

describe('TechnologyCreateComponent', () => {
  let component: TechnologyCreateComponent;
  let fixture: ComponentFixture<TechnologyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechnologyCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechnologyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
