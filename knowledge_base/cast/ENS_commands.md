## cast namehash

### NAME

cast-namehash - Calculate the ENS namehash of a name.

### SYNOPSIS

``cast namehash`` [*options*] *name*

### DESCRIPTION

Calculate the ENS namehash of a name.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Calculate the namehash of an ENS name.
    ```sh
    cast namehash vitalik.eth
    ```

### SEE ALSO

[cast](./cast.md), [cast lookup-address](./cast-lookup-address.md), [cast resolve-name](./cast-resolve-name.md)


## cast resolve-name

### NAME

cast-resolve-name - Perform an ENS lookup.

### SYNOPSIS

``cast resolve-name`` [*options*] *who*

### DESCRIPTION

Perform an ENS lookup.

If `--verify` is passed, then a reverse lookup is performed after the normal lookup to verify that the name is correct.

### OPTIONS

#### Lookup Options

`-v`  
`--verify`  
&nbsp;&nbsp;&nbsp;&nbsp;Perform a reverse lookup to verify that the name is correct.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the address for an ENS name.
    ```sh
    cast resolve-name vitalik.eth
    ```

2. Perform both a normal and a reverse lookup:
    ```sh
    cast resolve-name --verify vitalik.eth
    ```

### SEE ALSO

[cast](./cast.md), [cast lookup-address](./cast-lookup-address.md)


## cast lookup-address

### NAME

cast-lookup-address - Perform an ENS reverse lookup.

### SYNOPSIS

``cast lookup-address`` [*options*] *who*

### DESCRIPTION

Perform an ENS reverse lookup.

If `--verify` is passed, then a normal lookup is performed after the reverse lookup to verify that the address is correct.

### OPTIONS

#### Lookup Options

`-v`  
`--verify`  
&nbsp;&nbsp;&nbsp;&nbsp;Perform a normal lookup to verify that the address is correct.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the ENS name for an address.
    ```sh
    cast lookup-address $ADDRESS
    ```

2. Perform both a reverse and a normal lookup:
    ```sh
    cast lookup-address --verify $ADDRESS
    ```

### SEE ALSO

[cast](./cast.md), [cast resolve-name](./cast-resolve-name.md)
