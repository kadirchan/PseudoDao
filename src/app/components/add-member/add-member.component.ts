import { Component, OnInit } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class AddMemberComponent implements OnInit {
  memberCount!: number;
  private Dao!: any;
  private provider!: any;
  constructor(private dservice: DataService) {}
  panelOpenState = false;
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
      this.closeAll();
      if (await this.Dao['isMember'](memberAddress)) {
        let confirmation = await this.Dao['deleteMember'](memberAddress);
        await confirmation.wait(1);
        await this.getMemberCount();
        this.Deleted();
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
      this.closeAll();
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
  closeAll() {
    var x = document.getElementById('AlreadyMember');
    if (x?.style.display == 'block') x.style.display = 'none';
    x = document.getElementById('Added');
    if (x?.style.display == 'block') x.style.display = 'none';
    x = document.getElementById('NotMember');
    if (x?.style.display == 'block') x.style.display = 'none';
    x = document.getElementById('Deleted');
    if (x?.style.display == 'block') x.style.display = 'none';
    x = document.getElementById('NotAdmin');
    if (x?.style.display == 'block') x.style.display = 'none';
  }
  AlreadyMember() {
    this.closeAll();
    var x = document.getElementById('AlreadyMember');
    if (x?.style.display == 'none') x.style.display = 'block';
  }
  Added() {
    this.closeAll();
    var x = document.getElementById('Added');
    if (x?.style.display == 'none') x.style.display = 'block';
  }
  NotAdmin() {
    this.closeAll();
    var x = document.getElementById('NotAdmin');
    if (x?.style.display == 'none') x.style.display = 'block';
  }
  Deleted() {
    this.closeAll();
    var x = document.getElementById('Deleted');
    if (x?.style.display == 'none') x.style.display = 'block';
  }
  NotMember() {
    this.closeAll();
    var x = document.getElementById('NotMember');
    if (x?.style.display == 'none') x.style.display = 'block';
  }
}
