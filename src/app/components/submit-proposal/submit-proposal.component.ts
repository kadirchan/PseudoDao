import { Component, OnInit } from '@angular/core';
import { BigNumber, ethers, utils } from 'ethers';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-submit-proposal',
  templateUrl: './submit-proposal.component.html',
  styleUrls: ['./submit-proposal.component.css'],
})
export class SubmitProposalComponent implements OnInit {
  private provider!: any;
  private Dao!: any;
  Status!: string;

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
    let signer = await this.provider.getSigner().getAddress();
    if (await this.Dao['isMember'](signer)) {
      try {
        this.Pending();
        const TransactionResponse = await this.Dao['submitProposal'](
          address,
          ethers.utils.parseEther(value),
          { gasLimit: 500000 }
        );
        const TransactionReceipt = await TransactionResponse.wait(1);
        this.Submitted();
      } catch (err) {
        console.log(err);
        this.Error();
      }
    } else {
      this.NotMember();
    }
  }
  Pending() {
    var x = document.getElementById('Status');
    if (x?.style.display == 'none') x.style.display = 'block';
    this.Status = 'Pending';
  }
  NotMember() {
    var x = document.getElementById('Status');
    if (x?.style.display == 'none') x.style.display = 'block';
    this.Status = 'Member Only';
  }
  Submitted() {
    var x = document.getElementById('Status');
    if (x?.style.display == 'none') x.style.display = 'block';
    this.Status = 'Submitted';
  }
  Error() {
    var x = document.getElementById('Status');
    if (x?.style.display == 'none') x.style.display = 'block';
    this.Status = 'Error';
  }
}
