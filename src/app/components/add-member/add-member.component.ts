import { Component, OnInit } from '@angular/core';
import { BigNumber, ethers, utils } from 'ethers';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class AddMemberComponent implements OnInit {
  memberCount!: number;
  private Dao!: any;
  status!: string;
  private provider!: any;
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
    this.getMemberCount();
  }

  async deleteMember(memberAddress: string) {
    let signer = await this.provider.getSigner().getAddress();
    if (signer == this.dservice.getOwner()) {
      if (await this.Dao['isMember'](memberAddress)) {
        let confirmation = await this.Dao['deleteMember'](memberAddress);
        await confirmation.wait(1);
        await this.getMemberCount();
        this.Deleted(memberAddress);
      } else {
        this.NotMember();
      }
    } else {
      this.NotAdmin();
    }
  }

  async addMember(memberAddress: string) {
    let signer = await this.provider.getSigner().getAddress();
    if (signer == this.dservice.getOwner()) {
      if (await this.Dao['isMember'](memberAddress)) {
        this.AlreadyMember();
      } else {
        let confirmation = await this.Dao['addMember'](memberAddress);
        await confirmation.wait(1);
        await this.getMemberCount();
        this.Added();
      }
    } else {
      this.NotAdmin();
    }
  }

  async getMemberCount() {
    this.memberCount = await this.Dao['MemberCount']();
    this.dservice.setMemberCount(this.memberCount);
  }

  AlreadyMember() {
    this.status = 'Already Member';
  }
  Added() {
    this.status = 'Member Added';
  }
  NotAdmin() {
    this.status = 'Only Admin';
  }
  Deleted(memberAddress: string) {
    this.status = memberAddress + 'Member Deleted';
  }
  NotMember() {
    this.status = 'Not Member';
  }
}
