import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ethers } from 'ethers';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css'],
})
export class ConnectWalletComponent implements OnInit {
  Dao!: any;
  provider!: any;
  signerAddress!: any;
  button_status!: string;

  constructor(private dservice: DataService) {
    this.button_status = 'Connect';
  }

  ngOnInit(): void {}

  async connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      await this.provider.send('eth_requestAccounts', []);
      this.button_status = 'Connected';
      this.signerAddress = await this.provider.getSigner().getAddress();
      await this.getRank(this.signerAddress);
    } else {
      this.InstallMetamask();
      console.log('MetaMask not installed!');
    }
  }
  async getRank(signerAddress: string) {
    this.Dao = new ethers.Contract(
      this.dservice.getContractAddress(),
      this.dservice.getABI(),
      this.provider.getSigner()
    );

    let owner = await this.Dao['owner']();
    this.dservice.setOwner(owner);
    let isMember = await this.Dao['isMember'](signerAddress);
    let count = await this.Dao['ProposalCount']();
    this.dservice.setProposalCount(count.toNumber());

    if (owner == signerAddress) {
      this.dservice.setMemberRank(2);
      this.Owner();
    } else if (isMember) {
      this.dservice.setMemberRank(1);
      this.Member();
    } else {
      this.dservice.setMemberRank(0);
      this.Visitor();
    }
  }

  Owner() {
    var x = document.getElementById('admin');
    if (x?.style.display == 'none') x.style.display = 'block';
    x = document.getElementById('member');
    if (x?.style.display == 'block') x.style.display = 'none';
    x = document.getElementById('visitor');
    if (x?.style.display == 'block') x.style.display = 'none';
  }
  Member() {
    var x = document.getElementById('member');
    if (x?.style.display == 'none') x.style.display = 'block';
    x = document.getElementById('admin');
    if (x?.style.display == 'block') x.style.display = 'none';
    x = document.getElementById('visitor');
    if (x?.style.display == 'block') x.style.display = 'none';
  }
  Visitor() {
    var x = document.getElementById('visitor');
    if (x?.style.display == 'none') x.style.display = 'block';
    x = document.getElementById('member');
    if (x?.style.display == 'block') x.style.display = 'none';
    x = document.getElementById('admin');
    if (x?.style.display == 'block') x.style.display = 'none';
  }
  InstallMetamask() {}
}
declare global {
  interface Window {
    ethereum: any;
  }
}
