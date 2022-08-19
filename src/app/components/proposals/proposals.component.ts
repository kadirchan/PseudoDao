import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BigNumber, ethers, utils } from 'ethers';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css'],
})
export class ProposalsComponent implements OnInit {
  provider!: any;
  signer!: any;
  Dao!: any;
  logs!: any;
  proposals!: string[];
  iface!: any;

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
    let abi = [
      'event newProposal(address indexed to,uint256 indexed value,uint256 indexed blockNumber)',
    ];

    this.iface = new ethers.utils.Interface(abi);
  }

  async logMessage(log: any) {
    return (
      ' Send ' +
      ethers.utils.formatEther(this.iface.parseLog(log)['args'][1]) +
      ' ETH to ' +
      this.iface.parseLog(log)['args'][0]
    );
  }

  async getLogs() {
    const filter = [utils.id('newProposal(address,uint256,uint256)')];
    this.logs = await this.provider.getLogs({
      fromBlock: 12820310,
      toBlock: 'latest',
      address: this.Dao.address,
      topics: filter,
    });

    //off yapcan ngondestroyda
    this.Dao.on(filter, async () => {
      this.logs = await this.provider.getLogs({
        fromBlock: 12794325,
        toBlock: 'latest',
        address: this.Dao.address,
        topics: filter,
      });
    });
  }
}
