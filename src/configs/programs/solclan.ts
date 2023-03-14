export type SolanaSolclan = {
  version: '0.1.0';
  name: 'solana_solclan';
  instructions: [
    {
      name: 'createClan';
      accounts: [
        {
          name: 'clan';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'member';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'card';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'metadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'masterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'id';
          type: 'u64';
        },
        {
          name: 'name';
          type: 'string';
        },
        {
          name: 'symbol';
          type: 'string';
        },
        {
          name: 'uri';
          type: 'string';
        },
      ];
    },
    {
      name: 'joinClan';
      accounts: [
        {
          name: 'member';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clan';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'card';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'metadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'masterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'clan';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'depositToClan';
      accounts: [
        {
          name: 'member';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clan';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treasurer';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        },
      ];
    },
    {
      name: 'leaveClan';
      accounts: [
        {
          name: 'member';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clan';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treasurer';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'card';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'metadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'masterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'createProposal';
      accounts: [
        {
          name: 'proposal';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'vault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clan';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'member';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'id';
          type: 'u64';
        },
        {
          name: 'title';
          type: 'string';
        },
        {
          name: 'description';
          type: 'string';
        },
        {
          name: 'startAt';
          type: 'i64';
        },
        {
          name: 'endAt';
          type: 'i64';
        },
        {
          name: 'amount';
          type: 'u64';
        },
      ];
    },
    {
      name: 'updateProposalVault';
      accounts: [
        {
          name: 'proposal';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
      ];
      args: [
        {
          name: 'vault';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'updateProposalAmount';
      accounts: [
        {
          name: 'proposal';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        },
      ];
    },
    {
      name: 'vote';
      accounts: [
        {
          name: 'proposal';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clan';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'member';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'ballot';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'vote';
          type: 'bool';
        },
      ];
    },
    {
      name: 'executeProposal';
      accounts: [
        {
          name: 'proposal';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'member';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clan';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treasurer';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'vault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'claimVault';
      accounts: [
        {
          name: 'vault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'proposal';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
  ];
  accounts: [
    {
      name: 'ballot';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'proposal';
            type: 'publicKey';
          },
          {
            name: 'member';
            type: 'publicKey';
          },
          {
            name: 'vote';
            type: 'bool';
          },
          {
            name: 'amount';
            type: 'u64';
          },
          {
            name: 'createdAt';
            type: 'i64';
          },
          {
            name: 'updatedAt';
            type: 'i64';
          },
        ];
      };
    },
    {
      name: 'clan';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'id';
            type: 'u64';
          },
          {
            name: 'creator';
            type: 'publicKey';
          },
          {
            name: 'leader';
            type: 'publicKey';
          },
          {
            name: 'status';
            type: {
              defined: 'ClanStatus';
            };
          },
          {
            name: 'memberCount';
            type: 'u64';
          },
          {
            name: 'power';
            type: 'u64';
          },
          {
            name: 'symbol';
            type: 'string';
          },
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'uri';
            type: 'string';
          },
          {
            name: 'createdAt';
            type: 'i64';
          },
          {
            name: 'updatedAt';
            type: 'i64';
          },
        ];
      };
    },
    {
      name: 'member';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'clan';
            type: 'publicKey';
          },
          {
            name: 'wallet';
            type: 'publicKey';
          },
          {
            name: 'mintAccount';
            type: 'publicKey';
          },
          {
            name: 'status';
            type: {
              defined: 'MemberStatus';
            };
          },
          {
            name: 'power';
            type: 'u64';
          },
          {
            name: 'timestamp';
            type: 'i64';
          },
        ];
      };
    },
    {
      name: 'proposal';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'id';
            type: 'u64';
          },
          {
            name: 'clan';
            type: 'publicKey';
          },
          {
            name: 'author';
            type: 'publicKey';
          },
          {
            name: 'amount';
            type: 'u64';
          },
          {
            name: 'vault';
            type: 'publicKey';
          },
          {
            name: 'executed';
            type: 'bool';
          },
          {
            name: 'executedBy';
            type: {
              option: 'publicKey';
            };
          },
          {
            name: 'votes';
            type: 'u64';
          },
          {
            name: 'yesVotes';
            type: 'u64';
          },
          {
            name: 'noVotes';
            type: 'u64';
          },
          {
            name: 'title';
            type: 'string';
          },
          {
            name: 'description';
            type: 'string';
          },
          {
            name: 'startAt';
            type: 'i64';
          },
          {
            name: 'endAt';
            type: 'i64';
          },
          {
            name: 'createdAt';
            type: 'i64';
          },
          {
            name: 'executedAt';
            type: {
              option: 'i64';
            };
          },
        ];
      };
    },
  ];
  types: [
    {
      name: 'ClanStatus';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'Inactive';
          },
          {
            name: 'Active';
          },
        ];
      };
    },
    {
      name: 'MemberStatus';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'Inactive';
          },
          {
            name: 'Active';
          },
          {
            name: 'Banned';
          },
        ];
      };
    },
  ];
  events: [
    {
      name: 'ClanCreatedEvent';
      fields: [
        {
          name: 'clanId';
          type: 'u64';
          index: false;
        },
        {
          name: 'creator';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'leader';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'status';
          type: {
            defined: 'ClanStatus';
          };
          index: false;
        },
        {
          name: 'memberCount';
          type: 'u64';
          index: false;
        },
        {
          name: 'power';
          type: 'u64';
          index: false;
        },
        {
          name: 'symbol';
          type: 'string';
          index: false;
        },
        {
          name: 'name';
          type: 'string';
          index: false;
        },
        {
          name: 'uri';
          type: 'string';
          index: false;
        },
        {
          name: 'createdAt';
          type: 'i64';
          index: false;
        },
        {
          name: 'updatedAt';
          type: 'i64';
          index: false;
        },
      ];
    },
    {
      name: 'ProposalAmountUpdated';
      fields: [
        {
          name: 'proposal';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'author';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'executor';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'oldAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'newAmount';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'ProposalVaultUpdated';
      fields: [
        {
          name: 'proposal';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'author';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'executor';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'oldVault';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'newVault';
          type: 'publicKey';
          index: false;
        },
      ];
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'InvalidAmount';
      msg: 'Invalid amount';
    },
    {
      code: 6001;
      name: 'ClanInactive';
      msg: 'Clan is inactive';
    },
    {
      code: 6002;
      name: 'MemberInactive';
      msg: 'User is not a member of clan or member is inactive ';
    },
    {
      code: 6003;
      name: 'MemberInactiveOrBanned';
      msg: 'Member is inactive or banned from clan';
    },
    {
      code: 6004;
      name: 'AlreadyMember';
      msg: 'Member is already in a clan';
    },
    {
      code: 6005;
      name: 'MemberIsBanned';
      msg: 'Member is banned from clan';
    },
    {
      code: 6006;
      name: 'NotMember';
      msg: 'User is not a member of clan';
    },
    {
      code: 6007;
      name: 'NotAuthorize';
      msg: 'User is not authorized to perform this action';
    },
    {
      code: 6008;
      name: 'LeaderCannotLeave';
      msg: 'Leader cannot leave clan';
    },
    {
      code: 6009;
      name: 'ClanAlreadyExists';
      msg: 'Clan already exists';
    },
    {
      code: 6010;
      name: 'ClanNameTooLong';
      msg: 'Name is too long';
    },
    {
      code: 6011;
      name: 'ClanSymbolTooLong';
      msg: 'Symbol is too long';
    },
    {
      code: 6012;
      name: 'InvalidTokenAccount';
      msg: 'Invalid token account';
    },
    {
      code: 6013;
      name: 'InvalidMasterEdition';
      msg: 'Invalid master edition';
    },
    {
      code: 6014;
      name: 'TitleTooLong';
      msg: 'Title is too long';
    },
    {
      code: 6015;
      name: 'DescriptionTooLong';
      msg: 'Description is too long';
    },
    {
      code: 6016;
      name: 'ProposalStartAfterEnd';
      msg: 'Proposal start date must be after end date';
    },
    {
      code: 6017;
      name: 'ProposalStartInPast';
      msg: 'Proposal start date must be in the future';
    },
    {
      code: 6018;
      name: 'ProposalAmountZero';
      msg: 'Proposal amount must be greater than 0';
    },
    {
      code: 6019;
      name: 'ProposalAlreadyStarted';
      msg: 'Proposal already started. Cannot update';
    },
    {
      code: 6020;
      name: 'ProposalNotStarted';
      msg: 'Proposal not started yet. Cannot vote';
    },
    {
      code: 6021;
      name: 'ProposalAlreadyEnded';
      msg: 'Proposal already ended. Cannot vote';
    },
    {
      code: 6022;
      name: 'ProposalNotPassed';
      msg: 'Proposal not passed. Cannot execute';
    },
    {
      code: 6023;
      name: 'ProposalAlreadyExecuted';
      msg: 'Proposal already executed';
    },
    {
      code: 6024;
      name: 'NotEnoughPower';
      msg: 'Not enough power to execute proposal';
    },
    {
      code: 6025;
      name: 'ProposalNotEnded';
      msg: 'Proposal not ended';
    },
    {
      code: 6026;
      name: 'UserClaimed';
      msg: 'User already claimed';
    },
  ];
};

export const IDL: SolanaSolclan = {
  version: '0.1.0',
  name: 'solana_solclan',
  instructions: [
    {
      name: 'createClan',
      accounts: [
        {
          name: 'clan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'member',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'card',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'masterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'id',
          type: 'u64',
        },
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'symbol',
          type: 'string',
        },
        {
          name: 'uri',
          type: 'string',
        },
      ],
    },
    {
      name: 'joinClan',
      accounts: [
        {
          name: 'member',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'card',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'masterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'clan',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'depositToClan',
      accounts: [
        {
          name: 'member',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'leaveClan',
      accounts: [
        {
          name: 'member',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'card',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'masterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createProposal',
      accounts: [
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'member',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'id',
          type: 'u64',
        },
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'description',
          type: 'string',
        },
        {
          name: 'startAt',
          type: 'i64',
        },
        {
          name: 'endAt',
          type: 'i64',
        },
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'updateProposalVault',
      accounts: [
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'vault',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'updateProposalAmount',
      accounts: [
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'vote',
      accounts: [
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'member',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ballot',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'vote',
          type: 'bool',
        },
      ],
    },
    {
      name: 'executeProposal',
      accounts: [
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'member',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'claimVault',
      accounts: [
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'ballot',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'proposal',
            type: 'publicKey',
          },
          {
            name: 'member',
            type: 'publicKey',
          },
          {
            name: 'vote',
            type: 'bool',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'createdAt',
            type: 'i64',
          },
          {
            name: 'updatedAt',
            type: 'i64',
          },
        ],
      },
    },
    {
      name: 'clan',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'id',
            type: 'u64',
          },
          {
            name: 'creator',
            type: 'publicKey',
          },
          {
            name: 'leader',
            type: 'publicKey',
          },
          {
            name: 'status',
            type: {
              defined: 'ClanStatus',
            },
          },
          {
            name: 'memberCount',
            type: 'u64',
          },
          {
            name: 'power',
            type: 'u64',
          },
          {
            name: 'symbol',
            type: 'string',
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'uri',
            type: 'string',
          },
          {
            name: 'createdAt',
            type: 'i64',
          },
          {
            name: 'updatedAt',
            type: 'i64',
          },
        ],
      },
    },
    {
      name: 'member',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'clan',
            type: 'publicKey',
          },
          {
            name: 'wallet',
            type: 'publicKey',
          },
          {
            name: 'mintAccount',
            type: 'publicKey',
          },
          {
            name: 'status',
            type: {
              defined: 'MemberStatus',
            },
          },
          {
            name: 'power',
            type: 'u64',
          },
          {
            name: 'timestamp',
            type: 'i64',
          },
        ],
      },
    },
    {
      name: 'proposal',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'id',
            type: 'u64',
          },
          {
            name: 'clan',
            type: 'publicKey',
          },
          {
            name: 'author',
            type: 'publicKey',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'vault',
            type: 'publicKey',
          },
          {
            name: 'executed',
            type: 'bool',
          },
          {
            name: 'executedBy',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'votes',
            type: 'u64',
          },
          {
            name: 'yesVotes',
            type: 'u64',
          },
          {
            name: 'noVotes',
            type: 'u64',
          },
          {
            name: 'title',
            type: 'string',
          },
          {
            name: 'description',
            type: 'string',
          },
          {
            name: 'startAt',
            type: 'i64',
          },
          {
            name: 'endAt',
            type: 'i64',
          },
          {
            name: 'createdAt',
            type: 'i64',
          },
          {
            name: 'executedAt',
            type: {
              option: 'i64',
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'ClanStatus',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Inactive',
          },
          {
            name: 'Active',
          },
        ],
      },
    },
    {
      name: 'MemberStatus',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Inactive',
          },
          {
            name: 'Active',
          },
          {
            name: 'Banned',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'ClanCreatedEvent',
      fields: [
        {
          name: 'clanId',
          type: 'u64',
          index: false,
        },
        {
          name: 'creator',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'leader',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'status',
          type: {
            defined: 'ClanStatus',
          },
          index: false,
        },
        {
          name: 'memberCount',
          type: 'u64',
          index: false,
        },
        {
          name: 'power',
          type: 'u64',
          index: false,
        },
        {
          name: 'symbol',
          type: 'string',
          index: false,
        },
        {
          name: 'name',
          type: 'string',
          index: false,
        },
        {
          name: 'uri',
          type: 'string',
          index: false,
        },
        {
          name: 'createdAt',
          type: 'i64',
          index: false,
        },
        {
          name: 'updatedAt',
          type: 'i64',
          index: false,
        },
      ],
    },
    {
      name: 'ProposalAmountUpdated',
      fields: [
        {
          name: 'proposal',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'author',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'executor',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'oldAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'newAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'ProposalVaultUpdated',
      fields: [
        {
          name: 'proposal',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'author',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'executor',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'oldVault',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'newVault',
          type: 'publicKey',
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidAmount',
      msg: 'Invalid amount',
    },
    {
      code: 6001,
      name: 'ClanInactive',
      msg: 'Clan is inactive',
    },
    {
      code: 6002,
      name: 'MemberInactive',
      msg: 'User is not a member of clan or member is inactive ',
    },
    {
      code: 6003,
      name: 'MemberInactiveOrBanned',
      msg: 'Member is inactive or banned from clan',
    },
    {
      code: 6004,
      name: 'AlreadyMember',
      msg: 'Member is already in a clan',
    },
    {
      code: 6005,
      name: 'MemberIsBanned',
      msg: 'Member is banned from clan',
    },
    {
      code: 6006,
      name: 'NotMember',
      msg: 'User is not a member of clan',
    },
    {
      code: 6007,
      name: 'NotAuthorize',
      msg: 'User is not authorized to perform this action',
    },
    {
      code: 6008,
      name: 'LeaderCannotLeave',
      msg: 'Leader cannot leave clan',
    },
    {
      code: 6009,
      name: 'ClanAlreadyExists',
      msg: 'Clan already exists',
    },
    {
      code: 6010,
      name: 'ClanNameTooLong',
      msg: 'Name is too long',
    },
    {
      code: 6011,
      name: 'ClanSymbolTooLong',
      msg: 'Symbol is too long',
    },
    {
      code: 6012,
      name: 'InvalidTokenAccount',
      msg: 'Invalid token account',
    },
    {
      code: 6013,
      name: 'InvalidMasterEdition',
      msg: 'Invalid master edition',
    },
    {
      code: 6014,
      name: 'TitleTooLong',
      msg: 'Title is too long',
    },
    {
      code: 6015,
      name: 'DescriptionTooLong',
      msg: 'Description is too long',
    },
    {
      code: 6016,
      name: 'ProposalStartAfterEnd',
      msg: 'Proposal start date must be after end date',
    },
    {
      code: 6017,
      name: 'ProposalStartInPast',
      msg: 'Proposal start date must be in the future',
    },
    {
      code: 6018,
      name: 'ProposalAmountZero',
      msg: 'Proposal amount must be greater than 0',
    },
    {
      code: 6019,
      name: 'ProposalAlreadyStarted',
      msg: 'Proposal already started. Cannot update',
    },
    {
      code: 6020,
      name: 'ProposalNotStarted',
      msg: 'Proposal not started yet. Cannot vote',
    },
    {
      code: 6021,
      name: 'ProposalAlreadyEnded',
      msg: 'Proposal already ended. Cannot vote',
    },
    {
      code: 6022,
      name: 'ProposalNotPassed',
      msg: 'Proposal not passed. Cannot execute',
    },
    {
      code: 6023,
      name: 'ProposalAlreadyExecuted',
      msg: 'Proposal already executed',
    },
    {
      code: 6024,
      name: 'NotEnoughPower',
      msg: 'Not enough power to execute proposal',
    },
    {
      code: 6025,
      name: 'ProposalNotEnded',
      msg: 'Proposal not ended',
    },
    {
      code: 6026,
      name: 'UserClaimed',
      msg: 'User already claimed',
    },
  ],
};
