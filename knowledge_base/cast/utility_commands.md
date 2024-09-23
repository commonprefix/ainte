## cast address-zero

### NAME

cast address-zero - Prints the zero address. 

### SYNOPSIS

``cast address-zero``

### DESCRIPTION

Prints the zero address.

### OPTIONS

{{#include common-options.md}}

[cast](./cast.md)


## cast sig

### NAME

cast-sig - Get the selector for a function.

### SYNOPSIS

``cast sig`` [*options*] *sig*

### DESCRIPTION

Get the selector for a function.

The signature (*sig*) is a fragment in the form `<function name>(<types...>)`.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Get the selector for the function `transfer(address,uint256)`:
    ```sh
    cast sig "transfer(address,uint256)"
    ```

2. Get the selector for a function that expects a `struct`:

    ```solidity
    contract Test {
        struct MyStruct {
            address addr;
            uint256 amount;
        }
        function myfunction(MyStruct memory t) public pure {}
    }
    ```

    Structs are encoded as tuples (see [struct encoding](../../misc/struct-encoding.md)).

    ```sh
    cast sig "myfunction((address,uint256))"
    ```
### SEE ALSO

[cast](./cast.md), [struct encoding](../../misc/struct-encoding.md)


## cast sig-event

### NAME

cast-sig-event - Generate event signatures from event string.

### SYNOPSIS

``cast sig-event`` [*options*] *event_string*

### DESCRIPTION

Generate event signatures from event string.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Get the hash for the log `Transfer(address indexed from, address indexed to, uint256 amount)`:
    ```sh
    cast sig-event "Transfer(address indexed from, address indexed to, uint256 amount)"
    ```

### SEE ALSO

[cast](./cast.md)


## cast keccak

### NAME

cast-keccak - Hash arbitrary data using keccak-256.

### SYNOPSIS

``cast keccak`` [*options*] *data*

### DESCRIPTION

Hash arbitrary data using keccak-256.

### OPTIONS

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md)


## cast compute-address

### NAME

cast-compute-address - Compute the contract address from a given nonce and deployer address.

### SYNOPSIS

``cast compute-address`` [*options*] *address*

### DESCRIPTION

Compute the contract address from a given nonce and deployer address.

### OPTIONS

#### Compute Options

`--nonce` *nonce*  
&nbsp;&nbsp;&nbsp;&nbsp;The nonce of the account. Defaults to the latest nonce, fetched from the RPC.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md), [cast proof](./cast-proof.md), [cast create2](./cast-create2.md)


## cast create2

### NAME

cast-create2 - Generate a deterministic contract address using CREATE2

### SYNOPSIS

``cast create2`` [*options*]

### DESCRIPTION

Generate a deterministic contract address using CREATE2

### OPTIONS

`--starts-with` *hex*
&nbsp;&nbsp;&nbsp;&nbsp;Prefix for the contract address.

`--ends-with` *hex*
&nbsp;&nbsp;&nbsp;&nbsp;Suffix for the contract address

`--matching` *hex*
&nbsp;&nbsp;&nbsp;&nbsp;Sequence that the address has to match

`--case-sensitive`
&nbsp;&nbsp;&nbsp;&nbsp;Case sensitive matching

`--deployer` *address*
&nbsp;&nbsp;&nbsp;&nbsp;Address of the contract deployer [default: `0x4e59b44847b379578588920ca78fbf26c0b4956c`]

`--init-code` *hex*
&nbsp;&nbsp;&nbsp;&nbsp;Init code of the contract to be deployed

`--init-code-hash` *hash*
&nbsp;&nbsp;&nbsp;&nbsp;Init code hash of the contract to be deployed

`--jobs` *jobs*
&nbsp;&nbsp;&nbsp;&nbsp;Number of threads to use. Defaults to and caps at the number of logical cores

`--caller` *address*
&nbsp;&nbsp;&nbsp;&nbsp;Address of the caller. Used for the first 20 bytes of the salt

{{#include common-options.md}}

### EXAMPLES

1. Generate a contract address that starts with `dead`:
    ```sh
    cast create2 --starts-with dead
    ```
2. Generate a contract address that ends with `beef`:
    ```sh
    cast create2 --ends-with beef
    ```
3. A more complex example:
    ```sh
    cast create2 --starts-with dead --case-sensitive --deployer 0x0000000000FFe8B47B3e2130213B802212439497 --init-code-hash 0x0c591f26891d6443cf08c5be3584c1e6ae10a4c2f07c5c53218741e9755fb9cd
    ```

### SEE ALSO

[cast](./cast.md), [cast compute-address](./cast-compute-address.md)



## cast interface

### NAME

cast-interface - Generate a Solidity interface from a given ABI.

### SYNOPSIS

``cast interface`` [*options*] *address_or_path*

### DESCRIPTION

Generates a Solidity interface from a given ABI.

The argument (*address_or_path*) can either be the path to a file containing an ABI, or an address.

If an address is provided, then the interface is generated from the ABI of the account, which is fetched from Etherscan.

> ℹ️ **Note**
>
> This command does not currently support ABI encoder v2.

### OPTIONS

#### Interface Options

`-n` *name*  
`--name` *name*  
&nbsp;&nbsp;&nbsp;&nbsp;The name to use for the generated interface. The default name is `Interface`.

`-o` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The path to the output file. If not specified, the interface will be output to stdout.

`-p` *version*  
`--pragma` *version*  
&nbsp;&nbsp;&nbsp;&nbsp;The Solidity pragma version to use in the interface. Default: `^0.8.10`.

`-j`  
`--json`  
&nbsp;&nbsp;&nbsp;&nbsp;Output the contract's JSON ABI.

{{#include ../common/etherscan-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Generate an interface from a file:
    ```sh
    cast interface ./path/to/abi.json
    ```

2. Generate an interface using Etherscan:
    ```sh
    cast interface -o IWETH.sol 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    ```

3. Generate and name an interface from a file:
    ```sh
    cast interface -n LilENS ./path/to/abi.json
    ```

4. Fetch the JSON ABI of a contract on Etherscan:
    ```sh
    cast interface -o IWETH.sol -j 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    ```

### SEE ALSO

[cast](./cast.md), [cast proof](./cast-proof.md)


## cast index

### NAME

cast-index - Compute the storage slot location for an entry in a mapping.

### SYNOPSIS

``cast index`` *key_type* *key* *slot*

### DESCRIPTION

Compute the storage slot location for an entry in a mapping.

Use `cast storage` to get the value.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES
```solidity
// World.sol

mapping (address => uint256) public mapping1;
mapping (string => string) public mapping2;
```

1. Compute the storage slot of an entry (`hello`) in a mapping of type `mapping(string => string)`, located at slot 1:
    ```sh
    >> cast index string "hello" 1
    0x3556fc8e3c702d4479a1ab7928dd05d87508462a12f53307b5407c969223d1f8
    >> cast storage [address] 0x3556fc8e3c702d4479a1ab7928dd05d87508462a12f53307b5407c969223d1f8
    world
    ```

### SEE ALSO

[cast](./cast.md)


## cast concat-hex

### NAME

cast-concat-hex - Concatenate hex strings.

### SYNOPSIS

``cast concat-hex`` *data...*

### DESCRIPTION

Concatenate hex strings.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Concatenate hex strings:
    ```sh
    cast concat-hex 0xa 0xb 0xc
    ```

### SEE ALSO

[cast](./cast.md)


## cast max-int

### NAME

cast-max-int - Get the maximum i256 value.

### SYNOPSIS

``cast max-int``

### DESCRIPTION

Get the maximum i256 value.

### OPTIONS

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md), [cast min-int](./cast-min-int.md), [cast max-uint](./cast-max-uint.md)


## cast min-int

### NAME

cast-min-int - Get the minimum i256 value.

### SYNOPSIS

``cast min-int``

### DESCRIPTION

Get the minimum i256 value.

### OPTIONS

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md), [cast max-int](./cast-max-int.md)


## cast max-uint

### NAME

cast-max-uint - Get the maximum uint256 value.

### SYNOPSIS

``cast max-uint``

### DESCRIPTION

Get the maximum uint256 value.

### OPTIONS

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md), [cast max-int](./cast-max-int.md)


## cast to-check-sum-address

### NAME

cast-to-check-sum-address - Convert an address to a checksummed format ([EIP-55][eip55]).

### SYNOPSIS

``cast to-check-sum-address`` *address*

### DESCRIPTION

Convert an address to a checksummed format ([EIP-55][eip55]).

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Convert an address to its checksummed format:
    ```sh
    cast to-check-sum-address 0xDf99A0839818B3f120EBAC9B73f82B617Dc6A555
    ```

### SEE ALSO

[cast](./cast.md)

[eip55]: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md
