import { Component, OnInit } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cancel-execute-proposal',
  templateUrl: './cancel-execute-proposal.component.html',
  styleUrls: ['./cancel-execute-proposal.component.css'],
})
export class CancelExecuteProposalComponent implements OnInit {
  private provider!: any;
  private Dao!: any;
  status!: string;
  voteCount!: number;
  private proposalId!: string;

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

  async getInput(input: string) {
    console.log(input);
    if (await this.checkInput(input)) {
      this.voteCount = await this.Dao['numberOfVotes'](
        BigNumber.from(this.proposalId)
      );
      this.Valid();
    } else {
      this.Invalid();
    }
  }
  async checkInput(input: string) {
    let count = await this.Dao['ProposalCount']();
    this.dservice.setProposalCount(count.toNumber());

    if (input.length > 10) {
      let bigNumber = BigNumber.from(input);

      let hexString = bigNumber.toHexString();
      console.log(hexString.toString());
      if (hexString.length == 66) {
        this.proposalId = input;
        return true;
      } else {
        return false;
      }
    } else {
      let number = parseInt(input);

      if (this.dservice.getProposalCount() - 1 < number) {
        return false;
      } else {
        this.proposalId = await this.Dao['existProposals'](
          BigNumber.from(number)
        );
        return true;
      }
    }
  }
  async Execute() {
    let signer = await this.provider.getSigner().getAddress();
    if (signer == this.dservice.getOwner()) {
      this.status = 'Waiting';
      try {
        let transactionResponse = await this.Dao['execute'](this.proposalId, {
          gasLimit: 500000,
        });
        await transactionResponse.wait(1);
        this.status = 'Executed!';
      } catch (error) {
        console.log(error);
      }
    } else {
      this.status = 'Only Admin!';
    }
  }
  Valid() {
    var x = document.getElementById('Execute');
    if (x?.style.display == 'none') x.style.display = 'block';
    this.status = 'Waiting';
  }
  Invalid() {
    var x = document.getElementById('Status');
    if (x?.style.display == 'none') x.style.display = 'block';
    x = document.getElementById('Execute');
    if (x?.style.display == 'block') x.style.display = 'none';
    this.status = 'Invalid number or Id';
  }
}
