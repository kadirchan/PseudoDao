import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private contractOwner!: string;
  private httpProvider: string;
  private member_rank!: number;
  private ABI!: any;
  private ERC20_ABI!: any;
  private contractAddress!: string;
  private proposalCount!: number;
  private memberCount!: number;
  private OSMAN_address!: string;
  private SAFIYE_address!: string;
  private RECEP_address!: string;
  private tokens!: string[];

  constructor() {
    this.memberCount = 0;
    this.proposalCount = 0;
    this.httpProvider =
      'https://ropsten.infura.io/v3/5073568d7c044755a82e22f4e1081f64';
    this.ABI = [
      {
        inputs: [],
        stateMutability: 'payable',
        type: 'constructor',
      },
      {
        inputs: [],
        name: 'alreadyExist',
        type: 'error',
      },
      {
        inputs: [],
        name: 'alreadyMember',
        type: 'error',
      },
      {
        inputs: [],
        name: 'alreadyVoted',
        type: 'error',
      },
      {
        inputs: [],
        name: 'notDelegated',
        type: 'error',
      },
      {
        inputs: [],
        name: 'notMember',
        type: 'error',
      },
      {
        inputs: [],
        name: 'notOwner',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'proposalNumber',
            type: 'uint256',
          },
        ],
        name: 'proposalNotActive',
        type: 'error',
      },
      {
        inputs: [],
        name: 'run_renounceOwnership_instead',
        type: 'error',
      },
      {
        inputs: [],
        name: 'transferFailed',
        type: 'error',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'member_address',
            type: 'address',
          },
        ],
        name: 'deletedMember',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'deposit',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'member_address',
            type: 'address',
          },
        ],
        name: 'newMember',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'ERC20_contract',
            type: 'address',
          },
        ],
        name: 'newProposal',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256',
          },
        ],
        name: 'proposalExecuted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256',
          },
        ],
        name: 'proposalPassThreshold',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'voter',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256',
          },
        ],
        name: 'voteCast',
        type: 'event',
      },
      {
        stateMutability: 'payable',
        type: 'fallback',
      },
      {
        inputs: [],
        name: 'MemberCount',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'ProposalCount',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'memberAddress',
            type: 'address',
          },
        ],
        name: 'addMember',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256',
          },
        ],
        name: 'cancelProposal',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'declaration',
            type: 'string',
          },
        ],
        name: 'castVote',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'memberAddress',
            type: 'address',
          },
        ],
        name: 'deleteMember',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256',
          },
        ],
        name: 'execute',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'existProposals',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256',
          },
        ],
        name: 'isActive',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'isMember',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256',
          },
        ],
        name: 'numberOfVotes',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'blockNumber',
            type: 'uint256',
          },
        ],
        name: 'proposalHash',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'blockNumber',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenContract',
            type: 'address',
          },
        ],
        name: 'proposalHash',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenContract',
            type: 'address',
          },
        ],
        name: 'submitProposal',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'submitProposal',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        stateMutability: 'payable',
        type: 'receive',
      },
    ];
    this.ERC20_ABI = [
      {
        inputs: [
          {
            internalType: 'string',
            name: 'name_',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol_',
            type: 'string',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'subtractedValue',
            type: 'uint256',
          },
        ],
        name: 'decreaseallowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'addedValue',
            type: 'uint256',
          },
        ],
        name: 'increaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];
    this.contractAddress = '0xb7b4844c8AbF598bD68dbB9ae587A19Fd0571dEa';
    this.OSMAN_address = '0x7614aD4B540Ac6B84e2bA4613472959DdB0Bd039';
    this.SAFIYE_address = '0x756F19957f3D2a72BfDEB2B5a96fdfA5e7330fB9';
    this.RECEP_address = '0xD6363e4E6b7a4873b58DC705C0116C49C3067394';
    this.tokens = [
      '0x7614aD4B540Ac6B84e2bA4613472959DdB0Bd039',
      '0x756F19957f3D2a72BfDEB2B5a96fdfA5e7330fB9',
      '0xD6363e4E6b7a4873b58DC705C0116C49C3067394',
    ];
  }
  //getters
  getProvider(): string {
    return this.httpProvider;
  }
  getTokens(): string[] {
    return this.tokens;
  }

  getProposalCount(): number {
    return this.proposalCount;
  }
  getMemberCount(): number {
    return this.memberCount;
  }
  getABI() {
    return this.ABI;
  }
  getERC20ABI() {
    return this.ERC20_ABI;
  }
  getMemberRank() {
    return this.member_rank;
  }
  getContractAddress() {
    return this.contractAddress;
  }
  getOwner() {
    return this.contractOwner;
  }
  getERC20Address(currency: string) {
    if (currency == 'USD') return this.OSMAN_address;
    else if (currency == 'UYY') return this.SAFIYE_address;
    else if (currency == 'BOHOYT') return this.RECEP_address;
    else return this.contractAddress;
  }
  getERC20Symbol(address: string) {
    if (address == this.OSMAN_address) return 'USD';
    else if (address == this.SAFIYE_address) return 'UYY';
    else if (address == this.RECEP_address) return 'BOHOYT';
    else return 'ETH';
  }
  //setters
  setMemberRank(rank: number) {
    this.member_rank = rank;
  }
  setOwner(owner: string) {
    this.contractOwner = owner;
  }
  setProposalCount(count: number) {
    this.proposalCount = count;
  }
  setMemberCount(count: number) {
    this.memberCount = count;
  }

  //tokens
  addToken(address: string) {
    this.tokens.push(address);
  }
}
