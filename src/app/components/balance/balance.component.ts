import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BigNumber, ethers, utils } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  provider!: any;
  Dao!: any;
  DaoAddress!: any;
  balances!: string[];

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
    this.DaoAddress = this.dservice.getContractAddress();
    this.getBalances();
  }

  async getBalances() {
    console.log('sa');
    this.balances = [];
    let tokens = this.dservice.getTokens();
    let ethBalance = await this.provider.getBalance(
      this.dservice.getContractAddress()
    );
    let balance = formatEther(ethBalance) + ' ETH';
    // console.log(balance);
    this.balances.push(balance);
    for (var i = 0, len = tokens.length; i < len; i++) {
      let tokenContract = new ethers.Contract(
        tokens[i],
        this.dservice.getERC20ABI(),
        this.provider.getSigner()
      );

      let tokenBalance = await tokenContract['balanceOf'](this.DaoAddress);
      let tokenSymbol = await tokenContract['symbol']();
      let balance = formatEther(tokenBalance) + ' ' + tokenSymbol;
      // console.log(balance);
      this.balances.push(balance);
    }

    // const filter = [
    //   utils.id('proposalExecuted(uint256)'),
    //   utils.id('deposit(address,uint)'),
    // ];
    const filter = [utils.id('proposalExecuted(uint256)')];
    this.Dao.on(filter, async () => {
      console.log('as');
      this.balances = [];
      let tokens = this.dservice.getTokens();
      let ethBalance = await this.provider.getBalance(
        this.dservice.getContractAddress()
      );
      let balance = formatEther(ethBalance) + ' ETH';
      this.balances.push(balance);
      for (var i = 0, len = tokens.length; i < len; i++) {
        let tokenContract = new ethers.Contract(
          tokens[i],
          this.dservice.getERC20ABI(),
          this.provider.getSigner()
        );

        let tokenBalance = await tokenContract['balanceOf'](this.DaoAddress);
        let tokenSymbol = await tokenContract['symbol']();
        let balance = formatEther(tokenBalance) + ' ' + tokenSymbol;
        this.balances.push(balance);
      }
    });
  }
}
