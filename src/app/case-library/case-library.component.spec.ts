import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseLibraryComponent } from './case-library.component';

describe('CaseLibraryComponent', () => {
  let component: CaseLibraryComponent;
  let fixture: ComponentFixture<CaseLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
