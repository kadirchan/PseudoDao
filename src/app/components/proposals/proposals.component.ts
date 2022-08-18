import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ethers } from 'ethers';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css'],
})
export class ProposalsComponent implements OnInit {
  provider!: any;
  signer!: any;

  constructor(private dservice: DataService) {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  ngOnInit(): void {}
}
