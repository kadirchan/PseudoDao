import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitProposalComponent } from './submit-proposal.component';

describe('SubmitProposalComponent', () => {
  let component: SubmitProposalComponent;
  let fixture: ComponentFixture<SubmitProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitProposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
