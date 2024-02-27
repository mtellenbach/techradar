import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationCreateComponent } from './organisation-create.component';

describe('OrganisationCreateComponent', () => {
  let component: OrganisationCreateComponent;
  let fixture: ComponentFixture<OrganisationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganisationCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganisationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
