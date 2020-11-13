import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPassChangeComponent } from './user-pass-change.component';

describe('UserPassChangeComponent', () => {
  let component: UserPassChangeComponent;
  let fixture: ComponentFixture<UserPassChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPassChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPassChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
