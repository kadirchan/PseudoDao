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
  Status!: string;
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
  async Execute() {}
  Invalid() {}
}
