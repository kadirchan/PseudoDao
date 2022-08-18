import { Component, OnInit } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent implements OnInit {
  private delegation!: string;
  voteCount!: number;
  private provider!: any;
  private Dao!: any;
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
      this.Vote();
    } else {
      this.Invalid();
    }
  }

  async checkInput(input: string) {
    let count = await this.Dao['ProposalCount']();
    this.dservice.setProposalCount(count.toNumber());
    console.log(count.toNumber());
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

  getDelegation(delegation: string) {
    if (delegation == 'Approve') {
      this.delegation = delegation;
      this.Delegate();
    } else this.notDelegate();
    console.log(delegation);
  }

  async castVote() {
    if (this.delegation == 'Approve') {
      let transactionResponse = await this.Dao['castVote'](
        this.proposalId,
        this.delegation,
        { gasLimit: 500000 }
      );
      await transactionResponse.wait(1);
      this.voteCount = await this.Dao['numberOfVotes'](
        BigNumber.from(this.proposalId)
      );
    }
  }
  notDelegate() {
    var x = document.getElementById('Delegate');
    if (x?.style.display == 'none') x.style.display = 'block';
  }
  Delegate() {
    var x = document.getElementById('Delegate');
    if (x?.style.display == 'block') x.style.display = 'none';
  }

  Invalid() {
    var x = document.getElementById('Invalid');
    if (x?.style.display == 'none') x.style.display = 'block';
    x = document.getElementById('Vote');
    if (x?.style.display == 'block') x.style.display = 'none';
  }
  Vote() {
    var x = document.getElementById('Vote');
    if (x?.style.display == 'none') x.style.display = 'block';
    x = document.getElementById('Invalid');
    if (x?.style.display == 'block') x.style.display = 'none';
  }
}
