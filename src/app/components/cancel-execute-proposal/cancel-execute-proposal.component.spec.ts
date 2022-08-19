import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelExecuteProposalComponent } from './cancel-execute-proposal.component';

describe('CancelExecuteProposalComponent', () => {
  let component: CancelExecuteProposalComponent;
  let fixture: ComponentFixture<CancelExecuteProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelExecuteProposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelExecuteProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
