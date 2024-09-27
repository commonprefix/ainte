## cast codesize

### NAME

cast-codesize - Get the runtime bytecode size of a contract.

### SYNOPSIS

``cast codesize`` [*options*] *address*

### DESCRIPTION

Get the runtime bytecode size of a contract.

The contract (*address*) can be an ENS name or an address.

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the runtime bytecode size of the WETH contract.
```sh
cast codesize 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
```

### SEE ALSO

[cast](./cast.md), [cast code](./cast-code.md)


## cast code

### NAME

cast-code - Get the bytecode of a contract.

### SYNOPSIS

``cast code`` [*options*] *address*

### DESCRIPTION

Get the bytecode of a contract.

The contract (*address*) can be an ENS name or an address.

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the bytecode of the WETH contract.
    ```sh
    cast code 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    ```

### SEE ALSO

[cast](./cast.md), [cast proof](./cast-proof.md)


## cast nonce

### NAME

cast-nonce - Get the nonce for an account.

### SYNOPSIS

``cast nonce`` [*options*] *who*

### DESCRIPTION

Get the nonce of an account.

The argument *who* can be an ENS name or an address.

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the nonce of beer.eth
    ```sh
    cast nonce beer.eth
    ```

### SEE ALSO

[cast](./cast.md), [cast balance](./cast-balance.md)


## cast proof

### NAME

cast-proof - Generate a storage proof for a given storage slot.

### SYNOPSIS

``cast proof`` [*options*] *address* [*slots...*]

### DESCRIPTION

Generate a storage proof for a given storage slot.

The address (*address*) can be an ENS name or an address.

The displayed output is a JSON object with the following keys:

- `accountProof`: Proof for the account itself
- `address`: The address of the account
- `balance`: The balance of the account
- `codeHash`: A hash of the account's code
- `nonce`: The nonce of the account
- `storageHash`: A hash of the account's storage
- `storageProof`: An array of storage proofs, one for each requested slot
- `storageProof.key`: The slot
- `storageProof.proof`: The proof for the slot
- `storageProof.value`: The value of the slot

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include ../common/display-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the proof for storage slot 0 on the WETH contract:
    ```sh
    cast proof 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 0
    ```

### SEE ALSO

[cast](./cast.md), [cast storage](./cast-storage.md)


## cast storage

### NAME

cast-storage - Get the raw value of a contract's storage slot or its full storage layout.

### SYNOPSIS

``cast storage`` [*options*] *address* *slot*

### DESCRIPTION

Get the raw value of a contract's storage slot. (Slot locations greater than 18446744073709551615 (u64::MAX) should be given as hex. Use `cast index` to compute mapping slots.)

Emit the slot number to get the full storage layout (requires contract to be verified on Etherscan with a Solidity version > 0.6.5 or you must be in a Forge project with a local contract matching the deployed bytecode).

The address (*address*) can be an ENS name or an address.

### OPTIONS

#### Query Options

`-B` *block*
`--block` *block*
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the value of slot 0 on the WETH contract.
    ```sh
    cast storage 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 0
    ```

2. Get the full storage layout of the Milady contract.
    ```sh
    cast storage 0x5Af0D9827E0c53E4799BB226655A1de152A425a5
    ```
### SEE ALSO

[cast](./cast.md), [cast proof](./cast-proof.md)


## cast balance

### NAME

cast-balance - Get the balance of an account in wei.

### SYNOPSIS

``cast balance`` [*options*] *who*

### DESCRIPTION

Get the balance of an account.

The argument *who* can be an ENS name or an address.

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

`-e` *ether*  
`--ether` *ether*  
&nbsp;&nbsp;&nbsp;&nbsp; If this flag is used then balance will be shown in ether

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the balance of beer.eth
    ```sh
    cast balance beer.eth
    ```
2. Get the ERC20 balance of any address using RPC URL
    ```sh
    # To load the variables in the .env file
    source .env

    # To get the USDT balance of Binance
    cast balance --erc20 0xdAC17F958D2ee523a2206206994597C13D831ec7 0xF977814e90dA44bFA03b6295A0616a897441aceC --rpc-url $MAINNET_RPC_URL
    ```

### SEE ALSO

[cast](./cast.md), [cast nonce](./cast-nonce.md)
