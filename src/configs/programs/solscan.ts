type SolanaSolclan = {
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
          name: 'id';
          type: 'u64';
        },
        {
          name: 'name';
          type: 'string';
        },
        {
          name: 'leader';
          type: 'publicKey';
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
      args: [];
    },
  ];
  accounts: [
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
            name: 'name';
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
            name: 'key';
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
          name: 'name';
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
  ];
};

export const solClanIDL: SolanaSolclan = {
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
          name: 'id',
          type: 'u64',
        },
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'leader',
          type: 'publicKey',
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
      args: [],
    },
  ],
  accounts: [
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
            name: 'name',
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
            name: 'key',
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
          name: 'name',
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
  ],
};