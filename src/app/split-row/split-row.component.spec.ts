import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitRowComponent } from './split-row.component';

describe('SplitRowComponent', () => {
  let component: SplitRowComponent;
  let fixture: ComponentFixture<SplitRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
