## cast 4byte

### NAME

cast-4byte - Get the function signatures for the given selector from <https://sig.eth.samczsun.com>.

### SYNOPSIS

``cast 4byte`` [*options*] *sig*

### DESCRIPTION

Get the function signatures for the given selector from <https://sig.eth.samczsun.com>.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Get the function signature for the selector `0x8cc5ce99`:
    ```sh
    cast 4byte 0x8cc5ce99
    ```

### SEE ALSO

[cast](./cast.md), [cast 4byte-decode](./cast-4byte-decode.md), [cast 4byte-event](./cast-4byte-event.md), [cast selectors](./cast-selectors.md)


## cast 4byte-decode

### NAME

cast-4byte-decode - Decode ABI-encoded calldata using <https://sig.eth.samczsun.com>.

### SYNOPSIS

``cast 4byte-decode`` [*options*] *calldata*

### DESCRIPTION

Decode ABI-encoded calldata using <https://sig.eth.samczsun.com>.

### OPTIONS

#### 4byte Options

`--id` *id*  
&nbsp;&nbsp;&nbsp;&nbsp;The index of the resolved signature to use.
&nbsp;&nbsp;&nbsp;&nbsp;  
&nbsp;&nbsp;&nbsp;&nbsp;<https://sig.eth.samczsun.com> can have multiple possible signatures for a given selector.  
&nbsp;&nbsp;&nbsp;&nbsp;The index can be an integer, or the tags "earliest" and "latest".

{{#include common-options.md}}

### EXAMPLES

1. Decode calldata for a `transfer` call:
    ```sh
    cast 4byte-decode 0xa9059cbb000000000000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d00000000000000000000000000000000000000000000000000174b37380cea000
    ```

### SEE ALSO

[cast](./cast.md), [cast 4byte](./cast-4byte.md), [cast 4byte-event](./cast-4byte-event.md)


## cast 4byte-event

### NAME

cast-4byte-event - Get the event signature for a given topic 0 from <https://sig.eth.samczsun.com>.

### SYNOPSIS

``cast 4byte-event`` [*options*] *topic_0*

### DESCRIPTION

Get the event signature for a given topic 0 from <https://sig.eth.samczsun.com>.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Get the event signature for a topic 0 of `0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef`:
    ```sh
    cast 4byte-event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
    ```

### SEE ALSO

[cast](./cast.md), [cast 4byte](./cast-4byte.md), [cast 4byte-decode](./cast-4byte-decode.md)


## cast abi-decode

### NAME

cast-abi-decode - Decode ABI-encoded input or output data.

### SYNOPSIS

``cast abi-decode`` [*options*] *sig* *calldata*

### DESCRIPTION

Decode ABI-encoded input or output data.

By default, the command will decode output data. To decode input data, pass `--input` or use [`cast calldata-decode`](./cast-calldata-decode.md).

The signature (*sig*) is a fragment in the form `<function name>(<types...>)(<types...>)`.

### OPTIONS

#### Decoder Options

`-i`  
`--input`  
&nbsp;&nbsp;&nbsp;&nbsp;Decode input data.

{{#include common-options.md}}

### EXAMPLES

1. Decode output data for a `balanceOf` call:
    ```sh
    cast abi-decode "balanceOf(address)(uint256)" \
      0x000000000000000000000000000000000000000000000000000000000000000a
    ```

2. Decode input data for a `transfer` call:
    ```sh
    cast abi-decode --input "transfer(address,uint256)" \
      0xa9059cbb000000000000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0000000000000000000000000000000000000000000000000008a8e4b1a3d8000
    ```

### SEE ALSO

[cast](./cast.md), [cast calldata-decode](./cast-calldata-decode.md)


## cast abi-encode

### NAME

cast-abi-encode - ABI encode the given function arguments, excluding the selector.

### SYNOPSIS

``cast abi-encode`` [*options*] *sig* [*args...*]

### DESCRIPTION

ABI encode the given function, excluding the selector.

The signature (*sig*) is a fragment in the form `<function name>(<types...>)`.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. ABI-encode the arguments for a call to `someFunc(address,uint256)`:
    ```sh
    cast abi-encode "someFunc(address,uint256)" 0x... 1
    ```

2. For encoding a type with components (as a tuple, or custom struct):

    ```sh
    cast abi-encode "someFunc((string,uint256))" "(myString,1)"
    ```

### SEE ALSO

[cast](./cast.md), [cast calldata](./cast-calldata.md)


## cast calldata

### NAME

cast-calldata - ABI-encode a function with arguments.

### SYNOPSIS

``cast calldata`` [*options*] *sig* [*args...*]

### DESCRIPTION

ABI-encode a function with arguments.

The signature (*sig*) is a fragment in the form `<function name>(<types...>)`.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. ABI-encode the arguments for a call to `someFunc(address,uint256)`:
    ```sh
    cast calldata "someFunc(address,uint256)" 0x... 1
    ```

### SEE ALSO

[cast](./cast.md), [cast abi-encode](./cast-abi-encode.md)


## cast calldata-decode

### NAME

cast-calldata-decode - Decode ABI-encoded input data.

### SYNOPSIS

``cast calldata-decode`` [*options*] *sig* *calldata*

### DESCRIPTION

Decode ABI-encoded input data.

The signature (*sig*) is a fragment in the form `<function name>(<types...>)`.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Decode input data for a `transfer` call:
    ```sh
    cast calldata-decode "transfer(address,uint256)" \
      0xa9059cbb000000000000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0000000000000000000000000000000000000000000000000008a8e4b1a3d8000
    ```

### SEE ALSO

[cast](./cast.md), [cast abi-decode](./cast-abi-decode.md)


## cast pretty-calldata

### NAME

cast-pretty-calldata - Pretty print calldata.

### SYNOPSIS

``cast pretty-calldata`` [*options*] *calldata*

### DESCRIPTION

Pretty print calldata.

Tries to decode the calldata using <https://sig.eth.samczsun.com> unless `--offline` is passed.

### OPTIONS

#### 4byte Options

`-o`  
`--offline`  
&nbsp;&nbsp;&nbsp;&nbsp;Skip the <https://sig.eth.samczsun.com> lookup.

{{#include common-options.md}}

### EXAMPLES

1. Decode calldata for a `transfer` call:
    ```sh
    cast pretty-calldata 0xa9059cbb000000000000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d00000000000000000000000000000000000000000000000000174b37380cea000
    ```

### SEE ALSO

[cast](./cast.md), [cast 4byte-decode](./cast-4byte-decode.md)


## cast selectors

### NAME

cast-selectors - Extracts function selectors and arguments from bytecode

### SYNOPSIS

``cast selectors`` [*options*] *bytecode*

### DESCRIPTION

Extracts function selectors and arguments from bytecode using the [EVMole library](https://github.com/cdump/evmole)

### OPTIONS

`-r`  
`--resolve`  
&nbsp;&nbsp;&nbsp;&nbsp;Resolve the function signatures for the extracted selectors using https://openchain.xyz

{{#include common-options.md}}

### EXAMPLES

1. Get WETH's contract function signatures & arguments:
    ```sh
    cast selectors $(cast code 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
    ```

### SEE ALSO

[cast](./cast.md), [cast 4byte](./cast-4byte.md)


## cast upload-signature

### NAME

cast-upload-signature

### SYNOPSIS

`cast upload-signature` [*signatures...*]

### DESCRIPTION

Upload the given signatures to [https://sig.eth.samczsun.com](https://sig.eth.samczsun.com).

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Upload signatures
    ```sh
    cast upload-signature 'function approve(address,uint256)' \
   'transfer(uint256)' 'event Transfer(uint256,address)'
    ```