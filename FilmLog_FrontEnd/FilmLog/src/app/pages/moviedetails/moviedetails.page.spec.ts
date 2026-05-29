import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviedetailsPage } from './moviedetails.page';

describe('MoviedetailsPage', () => {
  let component: MoviedetailsPage;
  let fixture: ComponentFixture<MoviedetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviedetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
