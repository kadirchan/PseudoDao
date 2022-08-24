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
  connect_status!: string;

  constructor(private dservice: DataService) {
    this.button_status = 'Connect';
  }

  ngOnInit(): void {}

  async connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      await this.provider.send('eth_requestAccounts', []);
      if (window.ethereum.isConnected()) this.button_status = 'Connected';
      else this.button_status = 'Error';

      let chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId != '0x3') {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x3' }],
          });
        } catch (error: any) {
          if (error.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x3',
                    rpcUrl: 'https://ropsten.infura.io/v3/',
                  },
                ],
              });
            } catch (addError) {
              console.error(addError);
            }
          }
        }
      }

      //reload window when change chain
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      //reload member details when change account or log out
      window.ethereum.on('accountsChanged', async (accounts: Array<string>) => {
        if (accounts.length == 0) {
          window.location.reload();
          console.log('disconnected');
        } else {
          this.signerAddress = await this.provider.getSigner().getAddress();
          await this.getRank(this.signerAddress);
        }
      });

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

    var x = document.getElementById('Connect');
    if (x?.style.display == 'none') x.style.display = 'block';

    if (owner == signerAddress) {
      this.dservice.setMemberRank(2);
      this.connect_status = 'Welcome! Admin';
    } else if (isMember) {
      this.dservice.setMemberRank(1);
      this.connect_status = 'Welcome! Member';
    } else {
      this.dservice.setMemberRank(0);
      this.connect_status = 'Welcome! Visitor';
    }
  }

  InstallMetamask() {}
}
declare global {
  interface Window {
    ethereum: any;
  }
}

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
