import { Component, OnInit } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-submit-proposal',
  templateUrl: './submit-proposal.component.html',
  styleUrls: ['./submit-proposal.component.css'],
})
export class SubmitProposalComponent implements OnInit {
  private provider!: any;
  private Dao!: any;
  constructor(private dservice: DataService) {}

  ngOnInit(): void {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    this.Dao = new ethers.Contract(
      this.dservice.getContractAddress(),
      this.dservice.getABI(),
      this.provider.getSigner()
    );
  }
  async submitProposal(address: string, value: string) {
    let signer = this.provider.getSigner().getAddress();
    if (await this.Dao['isMember'](signer)) {
    } else {
      this.NotMember();
    }
  }
  NotMember() {}
}
