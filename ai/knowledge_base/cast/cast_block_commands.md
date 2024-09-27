## cast age

### NAME

cast-age - Get the timestamp of a block.

### SYNOPSIS

``cast age`` [*options*] [*block*]

### DESCRIPTION

Get the timestamp of a block.

The specified *block* can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`. Default to `latest`.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the timestamp of the latest block:
    ```sh
    cast age
    ```

2. Get the timestamp of the genesis block:
    ```sh
    cast age 1
    ```

### SEE ALSO

[cast](./cast.md), [cast block](./cast-block.md), [cast basefee](./cast-basefee.md)


## cast block

### NAME

cast-block - Get information about a block.

### SYNOPSIS

``cast block`` [*options*] [*block*]

### DESCRIPTION

Get information about a block.

The specified *block* can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`. Default to `latest`.

### OPTIONS

`-f` *field*  
`--field` *field*  
&nbsp;&nbsp;&nbsp;&nbsp; If specified, only get the given field of the block.

{{#include ../common/display-options.md}}

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the latest block:
    ```sh
    cast block
    ```

2. Get the `finalized` block:
    ```sh
    cast block finalized
    ```

3. Get the hash of the latest block:
    ```sh
    cast block latest -f hash
    ```

### SEE ALSO

[cast](./cast.md), [cast basefee](./cast-basefee.md), [cast age](./cast-age.md)


## cast basefee

### NAME

cast-base-fee - Get the basefee of a block.

### SYNOPSIS

``cast base-fee`` [*options*] [*block*]

### DESCRIPTION

Get the basefee of a block.

The specified *block* can be a block number, or any of the tags: `earliest`, `finalized`, `safe`, `latest` or `pending`. Default to `latest`.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the basefee of the latest block:
    ```sh
    cast base-fee
    ```

2. Get the basefee of the genesis block:
    ```sh
    cast base-fee 1
    ```

### SEE ALSO

[cast](./cast.md), [cast block](./cast-block.md), [cast age](./cast-age.md)


## cast block-number

### NAME

cast-block-number - Get the latest block number.

### SYNOPSIS

``cast block-number`` [*options*]

### DESCRIPTION

Get the latest block number.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the latest block number:
    ```sh
    cast block-number
    ```

### SEE ALSO

[cast](./cast.md), [cast block](./cast-block.md)


## cast gas-price

### NAME

cast-gas-price - Get the current gas price.

### SYNOPSIS

``cast gas-price`` [*options*]

### DESCRIPTION

Get the current gas price.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the current gas price:
    ```sh
    cast gas-price
    ```

### SEE ALSO

[cast](./cast.md), [cast basefee](./cast-basefee.md)


## cast find-block

### NAME

cast-find-block - Get the block number closest to the provided timestamp.

### SYNOPSIS

``cast find-block`` [*options*] *timestamp*

### DESCRIPTION

Get the block number closest to the provided timestamp.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the block number closest to New Years 2021
    ```sh
    cast find-block 1609459200
    ```

### SEE ALSO

[cast](./cast.md)
