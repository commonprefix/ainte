## cast wallet

### NAME

cast-wallet - Wallet management utilities.

### SYNOPSIS

`cast wallet` [*options*] *command* [*args*]  
`cast wallet` [*options*] `--version`  
`cast wallet` [*options*] `--help`

### DESCRIPTION

This program is a set of tools to use, create and manage wallets.

### COMMANDS

[cast wallet new](./cast-wallet-new.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Create a new random keypair.

[cast wallet address](./cast-wallet-address.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Convert a private key to an address.

[cast wallet sign](./cast-wallet-sign.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Sign a message.

[cast wallet vanity](./cast-wallet-vanity.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Generate a vanity address.

[cast wallet verify](./cast-wallet-verify.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Verify the signature of a message.

[cast wallet import](./cast-wallet-import.md)  
&nbsp;&nbsp;&nbsp;&nbsp;Import a private key into an encrypted keystore.

[cast wallet list](./cast-wallet-list.md)  
&nbsp;&nbsp;&nbsp;&nbsp;List all the accounts in the keystore default directory.

### OPTIONS

#### Special Options

`-V`  
`--version`  
&nbsp;&nbsp;&nbsp;&nbsp;Print version info and exit.

{{#include common-options.md}}


## cast wallet address

### NAME

cast-wallet-address - Convert a private key to an address.

### SYNOPSIS

``cast wallet address`` [*options*]

### DESCRIPTION

Convert a private key to an address.

### OPTIONS

#### Keystore Options

{{#include ../common/wallet-options-raw.md}}

{{#include ../common/wallet-options-keystore.md}}

{{#include ../common/wallet-options-hardware.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the address of the keypair in `keystore.json`:
    ```sh
    cast wallet address --keystore keystore.json
    ```

### SEE ALSO

[cast](./cast.md), [cast wallet](./cast-wallet.md)


## cast wallet new

### NAME

cast-wallet-new - Create a new random keypair.

### SYNOPSIS

``cast wallet new`` [*options*] [*path*]

### DESCRIPTION

Create a new random keypair.

If *path* is specified, then the new keypair will be written to a JSON keystore encrypted with a password.
(*path* should be an existing directory.)

### OPTIONS

#### Keystore Options

`-p`  
`--password`  
&nbsp;&nbsp;&nbsp;&nbsp;Triggers a hidden password prompt for the JSON keystore.  
&nbsp;&nbsp;&nbsp;&nbsp;**Deprecated: prompting for a hidden password is now the default.**

`--unsafe-password` *password*  
&nbsp;&nbsp;&nbsp;&nbsp;Password for the JSON keystore in cleartext.

&nbsp;&nbsp;&nbsp;&nbsp;This is **unsafe** to use and we recommend using `--password` instead.  
&nbsp;&nbsp;&nbsp;&nbsp;Environment: `CAST_PASSWORD`

{{#include common-options.md}}

### EXAMPLES

1. Create a new keypair without saving it to a keystore:
    ```sh
    cast wallet new
    ```

2. Create a new keypair and save it in the `keystore` directory:
    ```sh
    cast wallet new keystore
    ```

### SEE ALSO

[cast](./cast.md), [cast wallet](./cast-wallet.md)


## cast wallet sign

### NAME

cast-wallet-sign - Sign a message.

### SYNOPSIS

``cast wallet sign`` [*options*] *message*

### DESCRIPTION

Sign a message.

### OPTIONS

{{#include ../common/wallet-options-raw.md}}

{{#include ../common/wallet-options-keystore.md}}

{{#include ../common/wallet-options-hardware.md}}

{{#include common-options.md}}

### EXAMPLES

1. Sign a message using a keystore:
    ```sh
    cast wallet sign --keystore keystore.json --interactive "hello"
    ```

2. Sign a message using a raw private key:
    ```sh
    cast wallet sign --private-key $PRIV_KEY "hello"
    ```

### SEE ALSO

[cast](./cast.md), [cast wallet](./cast-wallet.md)


## cast wallet vanity

### NAME

cast-wallet-vanity - Generate a vanity address.

### SYNOPSIS

``cast wallet vanity`` [*options*]

### DESCRIPTION

Generate a vanity address.

If `--nonce` is specified, then the command will try to generate a vanity contract address. The `--save-path` option allows specifying a custom file path to save the generated wallet details.

### OPTIONS

#### Keystore Options

`--starts-with` *hex*  
&nbsp;&nbsp;&nbsp;&nbsp;Prefix for the vanity address.

`--ends-with` *hex*  
&nbsp;&nbsp;&nbsp;&nbsp;Suffix for the vanity address.

`--nonce` *nonce*  
&nbsp;&nbsp;&nbsp;&nbsp;Generate a vanity contract address created by the generated keypair with the specified nonce.

`--save-path` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;Path to save the generated vanity wallet. If provided, the wallet details will be saved in a JSON file at this location.

{{#include common-options.md}}

### EXAMPLES

1. Create a new keypair that starts with `dead`:
    ```sh
    cast wallet vanity --starts-with dead
    ```

2. Create a new keypair ends with `beef`:
    ```sh
    cast wallet vanity --ends-with beef
    ```

3. Create a new keypair that starts with `dead` and save the details to a specific path:
    ```sh
    cast wallet vanity --starts-with dead --save-path /path/to/save
    ```

### SEE ALSO

[cast](./cast.md), [cast wallet](./cast-wallet.md)


## cast wallet verify

### NAME

cast-wallet-verify - Verify the signature of a message.

### SYNOPSIS

``cast wallet verify`` [*options*] `--address` *address* *message* *signature*

### DESCRIPTION

Verify the signature of a message.

### OPTIONS

#### Signature Options

`-a` *address*  
`--address` *address*  
&nbsp;&nbsp;&nbsp;&nbsp;The address of the message signer.

{{#include common-options.md}}

### SEE ALSO

[cast](./cast.md), [cast wallet](./cast-wallet.md)


## cast wallet import

### NAME

cast-wallet-import - Import a private key into an encrypted keystore

### SYNOPSIS

`cast wallet import` [*options*] _account_name_

### DESCRIPTION

Import a private key into an encrypted keystore.

If no _keystore-dir_ is specified, it will be saved in the default `~/.foundry/keystores`, so it can be accessed through the `--account` option in methods like `forge script`, `cast send` or any other that requires a private key.

### OPTIONS

#### Directory Options

`-k`  
`--keystore-dir`

&nbsp;&nbsp;&nbsp;&nbsp;The path to store the encrypted keystore.  
&nbsp;&nbsp;&nbsp;&nbsp;Defaults to `~/.foundry/keystores`.

{{#include ../common/wallet-options-raw.md}}

{{#include common-options.md}}

### EXAMPLES

1. Create a keystore from a private key:

   ```sh
   cast wallet import BOB --interactive
   ```

2. Create a keystore from a mnemonic:

   ```sh
   cast wallet import ALICE --mnemonic "test test test test test test test test test test test test"
   ```

3. Create a keystore from a mnemonic with a specific mnemonic index:
   ```sh
   cast wallet import ALICE --mnemonic "test test test test test test test test test test test test" --mnemonic-index 1
   ```

### SEE ALSO

[cast](./cast.md), [cast wallet](./cast-wallet.md)
