## cast logs

### NAME

cast logs - Get logs by signature or topic.

### SYNOPSIS

``cast logs`` [*options*] *sig_or_topic* [*topics_or_args...*]


### DESCRIPTION

Get logs by signature or topic.

The (*sig_or_topic*) may either be the event signature or its hashed topic (located at topics[0]).

If using a signature, remaining arguments must be in their ordinary form. If using a topic, the arguments must be as they themselves appear as topics.

### OPTIONS

### Query Options

`--from-block` *from_block*
&nbsp;&nbsp;&nbsp;&nbsp;The block height to start query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can also be the tags: `earliest`, `finalized`, `safe`, `latest`, or `pending`.

`--to-block` *to_block*
&nbsp;&nbsp;&nbsp;&nbsp;The block height to stop query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can also be the tags: `earliest`, `finalized`, `safe`, `latest`, or `pending`.

`--address` *address*
&nbsp;&nbsp;&nbsp;&nbsp;The contract address to filter on

{{#include ../common/wallet-options.md}}

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

### EXAMPLES

1. Get logs using a signature:
    ```sh
    cast logs --from-block 15537393 --to-block latest 'Transfer (address indexed from, address indexed to, uint256 value)' --address 0x2e8ABfE042886E4938201101A63730D04F160A82
    ```
2. Get logs using a topic:
    ```sh
    cast logs --from-block 15537393 --to-block latest 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef --address 0x0000000000000000000000002e8abfe042886e4938201101a63730d04f160a82
    ```

### SEE ALSO

[cast](./cast.md)


## cast access-list

### NAME

cast-access-list - Create an access list for a transaction.

### SYNOPSIS

``cast access-list`` [*options*] *to* *sig* [*args...*]

### DESCRIPTION

Create an access list for a transaction.

The destination (*to*) can be an ENS name or an address.

{{#include sig-description.md}}

### OPTIONS

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

{{#include ../common/wallet-options.md}}

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md), [cast send](./cast-send.md), [cast publish](./cast-publish.md), [cast call](./cast-call.md)


## cast estimate

### NAME

cast-estimate - Estimate the gas cost of a transaction.

### SYNOPSIS

``cast estimate`` [*options*] *to* *sig* [*args...*]

### DESCRIPTION

Estimate the gas cost of a transaction.

The destination (*to*) can be an ENS name or an address.

{{#include sig-description.md}}

### OPTIONS

#### Transaction Options

{{#include ../common/tx-value-option.md}}

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Estimate the gas cost of calling `deposit()` on the WETH contract:
    ```sh
    cast estimate 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 \
      --value 0.1ether "deposit()"
    ```

### SEE ALSO

[cast](./cast.md), [cast send](./cast-send.md), [cast publish](./cast-publish.md), [cast receipt](./cast-receipt.md)


## cast run

### NAME

cast-run - Runs a published transaction in a local environment and prints the trace.

### SYNOPSIS

``cast run`` [*options*] `--rpc-url` *url* *tx_hash*

### DESCRIPTION

Runs a published transaction in a local environment and prints the trace.

By default, all transactions in the block prior to the transaction you want to replay are also replayed.
If you want a quicker result, you can use `--quick`, however, results may differ from the live execution.

You can also open the transaction in a debugger by passing `--debug`.

### OPTIONS

#### Run Options

`--label` *label*  
&nbsp;&nbsp;&nbsp;&nbsp;Labels an address in the trace.  
&nbsp;&nbsp;&nbsp;&nbsp;The format is `<address>:<label>`. Can be passed multiple times.

`-q`  
`--quick`  
&nbsp;&nbsp;&nbsp;&nbsp;Executes the transaction only with the state from the previous block.  
&nbsp;&nbsp;&nbsp;&nbsp;May result in different results than the live execution!

`-v`  
`--verbose`  
&nbsp;&nbsp;&nbsp;&nbsp;Addresses are fully displayed instead of being truncated.

`-d`  
`--debug`  
&nbsp;&nbsp;&nbsp;&nbsp;Open the script in the [debugger][debugger].

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Replay a transaction (a simple transfer):
    ```sh
    cast run 0xd15e0237413d7b824b784e1bbc3926e52f4726e5e5af30418803b8b327b4f8ca
    ```

2. Replay a transaction, applied on top of the state of the previous block:
    ```sh
    cast run --quick \
      0xd15e0237413d7b824b784e1bbc3926e52f4726e5e5af30418803b8b327b4f8ca
    ```

3. Replay a transaction with address labels:
    ```sh
    cast run \
      --label 0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe:sender \
      --label 0x40950267d12e979ad42974be5ac9a7e452f9505e:recipient \
      --label 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2:weth \
      0xd15e0237413d7b824b784e1bbc3926e52f4726e5e5af30418803b8b327b4f8ca
    ```

4. Replay a transaction in the debugger:
    ```sh
    cast run --debug \
      0xd15e0237413d7b824b784e1bbc3926e52f4726e5e5af30418803b8b327b4f8ca
    ```

### SEE ALSO

[cast](./cast.md)

[debugger]: ../../forge/debugger.md


## cast tx

### NAME

cast-tx - Get information about a transaction.

### SYNOPSIS

``cast tx`` [*options*] *tx_hash* [*field*]

### DESCRIPTION

Get information about a transaction.

If *field* is specified, then only the given field of the transaction is displayed.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include ../common/display-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get information about a transaction:
    ```sh
    cast tx $TX_HASH
    ```

2. Get the sender of a transaction:
    ```sh
    cast tx $TX_HASH from
    ```

### SEE ALSO

[cast](./cast.md), [cast receipt](./cast-receipt.md)


## cast rpc

### NAME

cast-rpc -  Perform a raw JSON-RPC request

### SYNOPSIS

``cast rpc`` [*options*] *METHOD* [*PARAMS...*]

### DESCRIPTION

Perform a simple JSON-RPC POST request for the given method and with the params

### OPTIONS

#### Query Options

`-r` *url*  
`--rpc-url` *url*  
&nbsp;&nbsp;&nbsp;&nbsp;The URL of the provider

`-w`  
`--raw`  
&nbsp;&nbsp;&nbsp;&nbsp;Pass the "params" as is
&nbsp;&nbsp;&nbsp;&nbsp; If --raw is passed the first PARAM will be taken as the value of "params". If no params are given, stdin will be used. For example:
&nbsp;&nbsp;&nbsp;&nbsp; rpc eth_getBlockByNumber '["0x123", false]' --raw
&nbsp;&nbsp;&nbsp;&nbsp;   => {"method": "eth_getBlockByNumber", "params": ["0x123", false] ... }

### EXAMPLES

1. Get latest `eth_getBlockByNumber` on localhost:

    ```sh
    cast rpc eth_getBlockByNumber "latest" "false"
    ```

2. Get `eth_getTransactionByHash` on localhost:

    ```sh
    cast rpc eth_getTransactionByHash 0x2642e960d3150244e298d52b5b0f024782253e6d0b2c9a01dd4858f7b4665a3f
    ```
    
3. Get latest `eth_getBlockByNumber` on etherum mainnet:

   ```sh
   cast rpc --rpc-url https://mainnet.infura.io/v3/ eth_getBlockByNumber "latest" "false"
   ```


## cast call

### NAME

cast-call - Perform a call on an account without publishing a transaction.

### SYNOPSIS

``cast call`` [*options*] *to* *sig* [*args...*]

### DESCRIPTION

Perform a call on an account without publishing a transaction.

The destination (*to*) can be an ENS name or an address.

{{#include sig-description.md}}

### OPTIONS

`--trace`  
&nbsp;&nbsp;&nbsp;&nbsp;Prints traces for the transaction.

`--debug`  
&nbsp;&nbsp;&nbsp;&nbsp;Opens an interactive debugger with the transaction. Needs `--trace`.

`--labels <address:label>`  
&nbsp;&nbsp;&nbsp;&nbsp;Labels to apply to the traces, with the format `address:label`. Needs `--trace`.

`--evm-version`  
&nbsp;&nbsp;&nbsp;&nbsp;The EVM version to use. Needs `--trace`.

`--data` data\
&nbsp;&nbsp;&nbsp;&nbsp;Allows setting the data field directly without providing
sig [args…].\
&nbsp;&nbsp;&nbsp;&nbsp;Data needs to be in hexadecimal format.

#### Query Options

`-B` *block*  
`--block` *block*  
&nbsp;&nbsp;&nbsp;&nbsp;The block height you want to query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`.

{{#include ../common/wallet-options.md}}

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Call `balanceOf(address)` on the WETH contract:

    ```sh
    cast call 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 \
      "balanceOf(address)(uint256)" 0x...
    ```

2. Call `tokenURI(uint256)(string)` on the Tubby Cats NFT contract:

    ```sh
    export CONTRACT=0xca7ca7bcc765f77339be2d648ba53ce9c8a262bd
    export TOKEN_ID=19938
    cast call $CONTRACT "tokenURI(uint256)(string)" $TOKEN_ID
   ```

3. Call ``getAmountsOut(uint,address[])`` on the Uniswap v2 router contract:

    ```sh
   cast call 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D \
     "getAmountsOut(uint,address[])" 1 "[0x6b...0f,0xc0...c2]"
    ```

### SEE ALSO

[cast](./cast.md), [cast send](./cast-send.md), [cast publish](./cast-publish.md), [cast receipt](./cast-receipt.md)


## cast mktx

### NAME

cast-mktx - Build and sign a transaction.

### SYNOPSIS

``cast mktx`` [*options*] *to* [*sig*] [*args...*]

### DESCRIPTION

Build and sign a transaction, without publishing it.

The destination (*to*) can be an ENS name or an address.

{{#include sig-description.md}}

### OPTIONS

{{#include ../common/transaction-options.md}}

`--create` *code* [*sig* *args...*]  
&nbsp;&nbsp;&nbsp;&nbsp;Deploy a contract by specifying raw bytecode, in place of specifying a *to* address.

{{#include ../common/wallet-options-raw.md}}

{{#include ../common/wallet-options-keystore.md}}

{{#include ../common/wallet-options-hardware.md}}

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Sign a transaction that sends some ether to Vitalik using your Ledger:
    ```sh
    cast mktx --ledger vitalik.eth --value 0.1ether
    ```

2. Sign a transaction that calls `deposit(address token, uint256 amount)` on a contract:
    ```sh
    cast mktx --ledger 0x... "deposit(address,uint256)" 0x... 1
    ```

3. Sign a transaction that calls a function that expects a `struct`:

    ```solidity
    contract Test {
        struct MyStruct {
            address addr;
            uint256 amount;
        }
        function myfunction(MyStruct memory t) public pure {}
    }
    ```

    Structs are encoded as tuples (see [struct encoding](../../misc/struct-encoding.md))

    ```sh
    cast mktx 0x... "myfunction((address,uint256))" "(0x...,1)"
    ```

4. Sign a transaction with hex data in the `input` field of the transaction object:
    ```sh
    cast mktx 0x... 0x68656c6c6f20776f726c64
    ```

### SEE ALSO

[cast](./cast.md), [cast publish](./cast-publish.md), [cast send](./cast-send.md), [struct encoding](../../misc/struct-encoding.md)


## cast send

### NAME

cast-send - Sign and publish a transaction.

### SYNOPSIS

``cast send`` [*options*] *to* [*sig*] [*args...*]

### DESCRIPTION

Sign and publish a transaction.

The destination (*to*) can be an ENS name or an address.

{{#include sig-description.md}}

### OPTIONS

{{#include ../common/transaction-options.md}}

`--resend`  
&nbsp;&nbsp;&nbsp;&nbsp;Reuse the latest nonce of the sending account.

`--create` *code* [*sig* *args...*]  
&nbsp;&nbsp;&nbsp;&nbsp;Deploy a contract by specifying raw bytecode, in place of specifying a *to* address.

#### Receipt Options

`--async`  
`--cast-async`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not wait for the transaction receipt if it does not exist yet.  
&nbsp;&nbsp;&nbsp;&nbsp;Environment: `CAST_ASYNC`

`-c` *confirmations*  
`--confirmations` *confirmations*  
&nbsp;&nbsp;&nbsp;&nbsp;Wait a number of confirmations before exiting. Default: `1`.

{{#include ../common/wallet-options.md}}

`--unlocked`  
&nbsp;&nbsp;&nbsp;&nbsp;Send via `eth_sendTransaction` using the `--from` argument or `$ETH_FROM` as sender.

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

{{#include ../common/display-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Send some ether to Vitalik using your Ledger:
    ```sh
    cast send --ledger vitalik.eth --value 0.1ether
    ```

2. Call `deposit(address token, uint256 amount)` on a contract:
    ```sh
    cast send --ledger 0x... "deposit(address,uint256)" 0x... 1
    ```

3. Call a function that expects a `struct`:

    ```solidity
    contract Test {
        struct MyStruct {
            address addr;
            uint256 amount;
        }
        function myfunction(MyStruct memory t) public pure {}
    }
    ```

    Structs are encoded as tuples (see [struct encoding](../../misc/struct-encoding.md))

    ```sh
    cast send 0x... "myfunction((address,uint256))" "(0x...,1)"
    ```

4. Send a transaction with hex data in the `input` field of the transaction object:
    ```sh
    cast send 0x... 0x68656c6c6f20776f726c64
    ```

5. Sign an EIP-7702 authorization and attach it to a transaction from a different sender:
    ```sh
    cast send $(cast az) --private-key <sender-pk> --auth $(cast wallet sign-auth <address> --private-key <delegator-pk>)
    ```

6. Send an EIP-7702 transaction delegating the sender to `<address>`:
    ```sh
    cast send $(cast az) --auth <address>
    ```


### SEE ALSO

[cast](./cast.md), [cast call](./cast-call.md), [cast publish](./cast-publish.md), [cast receipt](./cast-receipt.md), [cast mktx](./cast-mktx.md), [struct encoding](../../misc/struct-encoding.md)


## cast receipt

### NAME

cast-receipt - Get the transaction receipt for a transaction.

### SYNOPSIS

``cast receipt`` [*options*] *tx_hash* [*field*]

### DESCRIPTION

Get the transaction receipt for a transaction.

If *field* is specified, then only the given field of the receipt is displayed.

### OPTIONS

#### Receipt Options

`--async`  
`--cast-async`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not wait for the transaction receipt if it does not exist yet.  
&nbsp;&nbsp;&nbsp;&nbsp;Environment: `CAST_ASYNC`

`-c` *confirmations*  
`--confirmations` *confirmations*  
&nbsp;&nbsp;&nbsp;&nbsp;Wait a number of confirmations before exiting. Default: `1`.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include ../common/display-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get a transaction receipt:
    ```sh
    cast receipt $TX_HASH
    ```

2. Get the block number the transaction was included in:
    ```sh
    cast receipt $TX_HASH blockNumber
    ```

### SEE ALSO

[cast](./cast.md), [cast call](./cast-call.md), [cast send](./cast-send.md), [cast publish](./cast-publish.md)


## cast publish

### NAME

cast-publish - Publish a raw transaction to the network.

### SYNOPSIS

``cast publish`` [*options*] *tx*

### DESCRIPTION

Publish a raw pre-signed transaction to the network.

### OPTIONS

#### Publish Options

`--async`  
`--cast-async`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not wait for a transaction receipt.  
&nbsp;&nbsp;&nbsp;&nbsp;Environment: `CAST_ASYNC`

{{#include ../common/rpc-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Publish a pre-signed transaction:
    ```sh
    cast publish --rpc-url $RPC $TX
    ```

2. Publish a pre-signed transaction with flashbots.
    ```sh
    cast publish --flashbots $TX
    ```

### SEE ALSO

[cast](./cast.md), [cast call](./cast-call.md), [cast send](./cast-send.md), [cast receipt](./cast-receipt.md), [cast mktx](./cast-mktx.md)
