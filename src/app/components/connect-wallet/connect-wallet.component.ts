import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ethers } from 'ethers';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css'],
})
export class ConnectWalletComponent implements OnInit {
  button_status!: string;
  constructor(private dservice: DataService) {
    this.button_status = 'Connect';
  }

  ngOnInit(): void {}

  async connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      this.button_status = 'Connected';
      const signerAddress = await provider.getSigner().getAddress();
      await this.getRank(signerAddress);
    } else {
      console.log('MetaMask not installed!');
    }
  }
  async getRank(signerAddress: string) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const Dao = new ethers.Contract(
      this.dservice.getContractAddress(),
      this.dservice.getABI(),
      provider.getSigner()
    );

    let owner = await Dao['owner']();
    this.dservice.setOwner(owner);
    let isMember = await Dao['isMember'](signerAddress);
    let count = await Dao['ProposalCount']();
    this.dservice.setProposalCount(count.toNumber());
    // console.log(count.toNumber());
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
}
declare global {
  interface Window {
    ethereum: any;
  }
}
