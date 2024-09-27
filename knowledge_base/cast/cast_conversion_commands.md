## cast format-bytes32-string

### NAME

cast-format-bytes32-string - Formats a string into bytes32 encoding.

### SYNOPSIS

``cast format-bytes32-string`` [*options*] *string*

### DESCRIPTION

Formats a string into bytes32 encoding.

Note that this command is for formatting a [Solidity string literal](https://docs.soliditylang.org/en/v0.8.16/types.html#string-literals-and-types) into `bytes32` only. If you're looking to pad a byte string, use [to-bytes32](./cast-to-bytes32.md) instead.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Turn string "hello" into bytes32 hex:
    ```sh
    cast format-bytes32-string "hello"
    ```

### SEE ALSO

[cast](./cast.md)


## cast from-bin

### NAME

cast-from-bin - Convert binary data into hex data.

### SYNOPSIS

``cast from-bin`` [*options*]

### DESCRIPTION

Convert binary data into hex data.

The input is taken from stdin.

### OPTIONS

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md)


## cast from-fixed-point

### NAME

cast-from-fixed-point - Convert a fixed point number into an integer.

### SYNOPSIS

``cast from-fixed-point`` [*options*] *decimals* *value*

### DESCRIPTION

Convert a fixed point number into an integer.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Convert 10.55 to an integer:
    ```sh
    cast from-fixed-point 2 10.55
    ```

### SEE ALSO

[cast](./cast.md)


## cast from-rlp

### NAME

cast-from-rlp - Decodes RLP-encoded data.

### SYNOPSIS

``cast from-rlp`` *data*

### DESCRIPTION

Decodes RLP-encoded data.

The *data* is a hexadecimal string with optional 0x prefix.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Decode RLP data:
    ```sh
    cast from-rlp 0xc481f181f2

    cast from-rlp c481f181f2
    ```


## cast from-utf8

### NAME

cast-from-utf8 - Convert UTF8 text to hex.

### SYNOPSIS

``cast from-utf8`` [*options*] *text*

### DESCRIPTION

Convert UTF8 text to hex.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Convert UTF8 text to hex:
    ```sh
    cast from-utf8 "hello"
    ```

### SEE ALSO

[cast](./cast.md)


## cast from-wei

### NAME

cast-from-wei - Convert wei into an ETH amount.

### SYNOPSIS

``cast from-wei`` [*options*] *value* [*unit*]

### DESCRIPTION

Convert wei into an ETH amount.

Consider using [`cast to-unit`](./cast-to-unit.md).

### OPTIONS

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md), [cast calldata](./cast-to-unit.md)


## cast parse-bytes32-address

### NAME

cast-parse-bytes32-address - Parses a checksummed address from bytes32 encoding.

### SYNOPSIS

``cast parse-bytes32-address`` [*options*] *bytes*

### DESCRIPTION

Parses a checksummed address from its bytes32 encoding representation.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Parse the bytes32 encoding of the WETH9 contract address to its address representation:
    ```sh
    cast parse-bytes32-address 0x000000000000000000000000C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    ```

### SEE ALSO

[cast](./cast.md)


## cast parse-bytes32-string

### NAME

cast-parse-bytes32-string - Parses a string from bytes32 encoding.

### SYNOPSIS

``cast parse-bytes32-string`` [*options*] *bytes*

### DESCRIPTION

Parses a [Solidity string literal](https://docs.soliditylang.org/en/v0.8.16/types.html#string-literals-and-types) from its bytes32 encoding representation mostly by interpreting bytes as ASCII characters. This command undos the encoding in [--format-bytes32-string](./cast-format-bytes32-string.md).

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Parse bytes32 string encoding of "hello" back to the string representation:
    ```sh
    cast parse-bytes32-string "0x68656c6c6f000000000000000000000000000000000000000000000000000000"
    ```

### SEE ALSO

[cast](./cast.md)


## cast to-ascii

### NAME

cast-to-ascii - Convert hex data to an ASCII string.

### SYNOPSIS

``cast to-ascii`` [*options*] *text*

### DESCRIPTION

Convert hex data to an ASCII string.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Convert hex data to an ASCII string:
    ```sh
    cast to-ascii "0x68656c6c6f"
    ```

### SEE ALSO

[cast](./cast.md)


## cast to-base

### NAME

cast-to-base - Convert a number of one base to another.

### SYNOPSIS

``cast to-base`` [*options*] *value* *base*

### DESCRIPTION

Convert a number of one base to another.

### OPTIONS

#### Base Options

`--base-in` *base*
&nbsp;&nbsp;&nbsp;&nbsp;The base of the input number. Available options:

&nbsp;&nbsp;&nbsp;&nbsp;10, d, dec, decimal

&nbsp;&nbsp;&nbsp;&nbsp;16, h, hex, hexadecimal

{{#include common-options.md}}

### EXAMPLES

1. Convert the decimal number 64 to hexadecimal
    ```sh
    cast to-base 64 hex
    ```

2. Convert the hexadecimal number 100 to binary
    ```sh
    cast to-base 0x100 2
    ```

> Note: The --base-in parameter is not enforced but will be needed if the input is ambiguous.

### SEE ALSO

[cast](./cast.md)


## cast to-bytes32

### NAME

cast-to-bytes32 - Right-pads hex data to 32 bytes.

### SYNOPSIS

``cast to-bytes32`` [*options*] *bytes*

### DESCRIPTION

Right-pads hex data to 32 bytes.

Note that this command is for padding a byte string only. If you're looking to format a [Solidity string literal](https://docs.soliditylang.org/en/v0.8.16/types.html#string-literals-and-types) into `bytes32`, use [format-bytes32-string](./cast-format-bytes32-string.md) instead.

### OPTIONS

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md)


## cast to-dec

### NAME

cast-to-dec - Converts a number of one base to decimal

### SYNOPSIS

``cast to-dec`` [*options*] *value*

### DESCRIPTION

Converts a number of one base to decimal

### OPTIONS

`--base-in` *base_in*
&nbsp;&nbsp;&nbsp;&nbsp;The input base.

{{#include common-options.md}}

### EXAMPLES

1. Convert ff in hexadecimal to decimal
    ```sh
    cast to-dec ff
    ```

### SEE ALSO

[cast](./cast.md)

## cast to-fixed-point

### NAME

cast-to-fixed-point - Convert an integer into a fixed point number.

### SYNOPSIS

``cast to-fixed-point`` [*options*] *decimals* *value*

### DESCRIPTION

Convert an integer into a fixed point number.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Convert 250 to a fixed point number with 2 decimals:
    ```sh
    cast to-fixed-point 2 250
    ```

### SEE ALSO

[cast](./cast.md)


## cast to-hex

### NAME

cast-to-hex - Converts a number of one base to another

### SYNOPSIS

``cast to-hex`` [*options*] *value*

### DESCRIPTION

Converts a number of one base to another

### OPTIONS

`--base-in` *base_in*
&nbsp;&nbsp;&nbsp;&nbsp;The input base.

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md)

## cast to-hexdata

### NAME

cast-to-hexdata - Normalize the input to lowercase, 0x-prefixed hex.

### SYNOPSIS

``cast to-hexdata`` [*options*] *input*

### DESCRIPTION

Normalize the input to lowercase, 0x-prefixed hex.

The input data (*input*) can either be:

- Mixed case hex with or without the 0x prefix.
- 0x prefixed hex that should be concatenated, separated by `:`.
- An absolute path to a file containing hex.
- A `@tag`, where the tag is defined in an environment variable.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Add 0x prefix:
    ```sh
    cast to-hexdata deadbeef
    ```

2. Concatenate hex values:
    ```sh
    cast to-hexdata "deadbeef:0xbeef"
    ```

3. Normalize hex value in `MY_VAR`:
    ```sh
    cast to-hexdata "@MY_VAR"
    ```

### SEE ALSO

[cast](./cast.md)


## cast to-int256

### NAME

cast-to-int256 - Convert a number to a hex-encoded int256.

### SYNOPSIS

``cast to-int256`` [*options*] *value*

### DESCRIPTION

Convert a number to a hex-encoded int256.

### OPTIONS

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md)


## cast to-rlp

### NAME

cast-to-rlp - Encodes hex data to RLP.

### SYNOPSIS

``cast to-rlp`` *array*

### DESCRIPTION

RLP encodes a hex string or a JSON array of hex strings.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Encoding RLP data:
    ```sh
    cast to-rlp '["0xaa","0xbb","cc"]'
   
    cast to-rlp f0a9     
    ```


## cast to-uint256

### NAME

cast-to-uint256 - Convert a number to a hex-encoded uint256.

### SYNOPSIS

``cast to-uint256`` [*options*] *value*

### DESCRIPTION

Convert a number to a hex-encoded uint256.

### OPTIONS

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md)


## cast to-unit

### NAME

cast-to-unit - Convert an eth amount to another unit.

### SYNOPSIS

``cast to-unit`` [*options*] *value* [*unit*]

### DESCRIPTION

Convert an eth amount to another unit.

The value to convert (*value*) can be a quantity of eth (in wei), or a number with a unit attached to it.

Valid units are:

- `ether`
- `gwei`
- `wei`

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Convert 1000 wei to gwei
    ```sh
    cast to-unit 1000 gwei
    ```

2. Convert 1 eth to gwei
    ```sh
    cast to-unit 1ether gwei
    ```

### SEE ALSO

[cast](./cast.md)


## cast to-wei

### NAME

cast-to-wei - Convert an eth amount to wei.

### SYNOPSIS

``cast to-wei`` [*options*] *value* [*unit*]

### DESCRIPTION

Convert an eth amount to wei.

Consider using [`cast to-unit`](./cast-to-unit.md).

### OPTIONS

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md), [cast calldata](./cast-to-unit.md)


## cast shl

### NAME

cast-shl - Perform a left shifting operation.

### SYNOPSIS

``cast shl`` [*options*] *value* *shift*

### DESCRIPTION

Perform a left shifting operation.

### OPTIONS

{{#include ../common/base-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Perform a 3 position left bit shift of the number 61
    ```sh
    cast shl --base-in 10 61 3
    ```

> Note: The --base-in parameter is not enforced but will be needed if the input is ambiguous.

### SEE ALSO

[cast](./cast.md), [cast shr](./cast-shr.md)


## cast shr

### NAME

cast-shr - Perform a right shifting operation.

### SYNOPSIS

``cast shr`` [*options*] *value* *shift*

### DESCRIPTION

Perform a right shifting operation.

### OPTIONS

{{#include ../common/base-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Perform a single right bit shift of 0x12
    ```sh
    cast shr --base-in 16 0x12 1
    ```

> Note: The --base-in parameter is not enforced but will be needed if the input is ambiguous.

### SEE ALSO

[cast](./cast.md), [cast shl](./cast-shl.md)
