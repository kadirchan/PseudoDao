import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private contractOwner!: string;
  private httpProvider: string;
  private member_rank!: number;
  private ABI!: any;
  private contractAddress!: string;
  private proposalCount!: number;
  private memberCount!: number;

  constructor() {
    this.memberCount = 0;
    this.proposalCount = 0;
    this.httpProvider =
      'https://ropsten.infura.io/v3/5073568d7c044755a82e22f4e1081f64';
    this.ABI = [
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
        name: 'alreadyVoted_or_Canceled',
        type: 'error',
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
        inputs: [],
        name: 'run_renounceOwnership_instead',
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
            internalType: 'uint256',
            name: 'blockNumber',
            type: 'uint256',
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
    ];
    this.contractAddress = '0xb24d69beCc704CDA419dbaE4BAb6315ed3EC9557';
  }
  //getters
  getProvider(): string {
    return this.httpProvider;
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
  getMemberRank() {
    return this.member_rank;
  }
  getContractAddress() {
    return this.contractAddress;
  }
  getOwner() {
    return this.contractOwner;
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
}
