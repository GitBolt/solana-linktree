export type IDLType = {
  "version": "0.1.0",
  "name": "linktree",
  "instructions": [
    {
      "name": "createAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "linktreeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "accountId",
          "type": "u32"
        },
        {
          "name": "profileLink",
          "type": "string"
        }
      ]
    },
    {
      "name": "addLink",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "linkAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "linktreeId",
          "type": "u32"
        },
        {
          "name": "linkName",
          "type": "string"
        },
        {
          "name": "linkUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "removeLink",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "linkAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "linktreeId",
          "type": "u32"
        },
        {
          "name": "linkName",
          "type": "string"
        },
        {
          "name": "linkUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "linktreeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "accountId",
          "type": "u32"
        },
        {
          "name": "profileLink",
          "type": "string"
        },
        {
          "name": "bgColor",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "LinktreeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "profileLink",
            "type": "string"
          },
          {
            "name": "bgColor",
            "type": "string"
          },
          {
            "name": "linkCount",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "IndividualLink",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "linktreeId",
            "type": "u32"
          },
          {
            "name": "linkName",
            "type": "string"
          },
          {
            "name": "linkUrl",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "OptionMustBeInFourIndex",
      "msg": "Selected option must be either 1,2,3,4"
    },
    {
      "code": 6001,
      "name": "PollEndedError",
      "msg": "Poll already ended"
    },
    {
      "code": 6002,
      "name": "AlreadyAnsweredError",
      "msg": "You Already Answered"
    }
  ],
  "metadata": {
    "address": "EDNrxi9eR9Lr7TYUVdb7ugza8FXyG65sXwzrM6Es2sih"
  }
}


export const IDLData: IDLType = {
  "version": "0.1.0",
  "name": "linktree",
  "instructions": [
    {
      "name": "createAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "linktreeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "accountId",
          "type": "u32"
        },
        {
          "name": "profileLink",
          "type": "string"
        }
      ]
    },
    {
      "name": "addLink",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "linkAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "linktreeId",
          "type": "u32"
        },
        {
          "name": "linkName",
          "type": "string"
        },
        {
          "name": "linkUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "removeLink",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "linkAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "linktreeId",
          "type": "u32"
        },
        {
          "name": "linkName",
          "type": "string"
        },
        {
          "name": "linkUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "linktreeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "accountId",
          "type": "u32"
        },
        {
          "name": "profileLink",
          "type": "string"
        },
        {
          "name": "bgColor",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "LinktreeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "profileLink",
            "type": "string"
          },
          {
            "name": "bgColor",
            "type": "string"
          },
          {
            "name": "linkCount",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "IndividualLink",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "linktreeId",
            "type": "u32"
          },
          {
            "name": "linkName",
            "type": "string"
          },
          {
            "name": "linkUrl",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "OptionMustBeInFourIndex",
      "msg": "Selected option must be either 1,2,3,4"
    },
    {
      "code": 6001,
      "name": "PollEndedError",
      "msg": "Poll already ended"
    },
    {
      "code": 6002,
      "name": "AlreadyAnsweredError",
      "msg": "You Already Answered"
    }
  ],
  "metadata": {
    "address": "EDNrxi9eR9Lr7TYUVdb7ugza8FXyG65sXwzrM6Es2sih"
  }
}
