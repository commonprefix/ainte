## Address
### Title
hex encoded address
### Type
string
### Pattern
^0x[0-9a-fA-F]{40}$

## Addresses
### Title
hex encoded address
### Type
array
### Items
#### $Ref
#/components/schemas/address


## Byte
### Title
hex encoded byte
### Type
string
### Pattern
^0x([0-9a-fA-F]?){1,2}$

## Bytes
### Title
hex encoded bytes
### Type
string
### Pattern
^0x[0-9a-f]*$

## Bytesmax32
### Title
32 hex encoded bytes
### Type
string
### Pattern
^0x[0-9a-f]{0,64}$

## Bytes8
### Title
8 hex encoded bytes
### Type
string
### Pattern
^0x[0-9a-f]{16}$

## Bytes32
### Title
32 hex encoded bytes
### Type
string
### Pattern
^0x[0-9a-f]{64}$

## Bytes48
### Title
48 hex encoded bytes
### Type
string
### Pattern
^0x[0-9a-f]{96}$

## Bytes96
### Title
96 hex encoded bytes
### Type
string
### Pattern
^0x[0-9a-f]{192}$

## Bytes256
### Title
256 hex encoded bytes
### Type
string
### Pattern
^0x[0-9a-f]{512}$

## Bytes65
### Title
65 hex encoded bytes
### Type
string
### Pattern
^0x[0-9a-f]{130}$

## Ratio
### Title
normalized ratio
### Type
number
### Minimum
0
### Maximum
1

## Uint
### Title
hex encoded unsigned integer
### Type
string
### Pattern
^0x([1-9a-f]+[0-9a-f]*|0)$

## Uint64
### Title
hex encoded 64 bit unsigned integer
### Type
string
### Pattern
^0x([1-9a-f]+[0-9a-f]{0,15})|0$

## Uint256
### Title
hex encoded 256 bit unsigned integer
### Type
string
### Pattern
^0x([1-9a-f]+[0-9a-f]{0,31})|0$

## Hash32
### Title
32 byte hex value
### Type
string
### Pattern
^0x[0-9a-f]{64}$

## Notfound
### Title
Not Found (null)
### Type
null



## Block
### Title
Block object
### Type
object
### Required
* hash
* parentHash
* sha3Uncles
* miner
* stateRoot
* transactionsRoot
* receiptsRoot
* logsBloom
* number
* gasLimit
* gasUsed
* timestamp
* extraData
* mixHash
* nonce
* size
* transactions
* uncles
### Additionalproperties
False
### Properties
#### Hash
##### Title
Hash
##### $Ref
#/components/schemas/hash32

#### Parenthash
##### Title
Parent block hash
##### $Ref
#/components/schemas/hash32

#### Sha3Uncles
##### Title
Ommers hash
##### $Ref
#/components/schemas/hash32

#### Miner
##### Title
Coinbase
##### $Ref
#/components/schemas/address

#### Stateroot
##### Title
State root
##### $Ref
#/components/schemas/hash32

#### Transactionsroot
##### Title
Transactions root
##### $Ref
#/components/schemas/hash32

#### Receiptsroot
##### Title
Receipts root
##### $Ref
#/components/schemas/hash32

#### Logsbloom
##### Title
Bloom filter
##### $Ref
#/components/schemas/bytes256

#### Difficulty
##### Title
Difficulty
##### $Ref
#/components/schemas/uint

#### Number
##### Title
Number
##### $Ref
#/components/schemas/uint

#### Gaslimit
##### Title
Gas limit
##### $Ref
#/components/schemas/uint

#### Gasused
##### Title
Gas used
##### $Ref
#/components/schemas/uint

#### Timestamp
##### Title
Timestamp
##### $Ref
#/components/schemas/uint

#### Extradata
##### Title
Extra data
##### $Ref
#/components/schemas/bytes

#### Mixhash
##### Title
Mix hash
##### $Ref
#/components/schemas/hash32

#### Nonce
##### Title
Nonce
##### $Ref
#/components/schemas/bytes8

#### Basefeepergas
##### Title
Base fee per gas
##### $Ref
#/components/schemas/uint

#### Withdrawalsroot
##### Title
Withdrawals root
##### $Ref
#/components/schemas/hash32

#### Blobgasused
##### Title
Blob gas used
##### $Ref
#/components/schemas/uint

#### Excessblobgas
##### Title
Excess blob gas
##### $Ref
#/components/schemas/uint

#### Parentbeaconblockroot
##### Title
Parent Beacon Block Root
##### $Ref
#/components/schemas/hash32

#### Size
##### Title
Block size
##### $Ref
#/components/schemas/uint

#### Transactions
##### Anyof
| Title | Type | Items |
| --- | --- | --- |
| Transaction hashes | array | {'$ref': '#/components/schemas/hash32'} |
| Full transactions | array | {'$ref': '#/components/schemas/TransactionInfo'} |

#### Withdrawals
##### Title
Withdrawals
##### Type
array
##### Items
###### $Ref
#/components/schemas/Withdrawal


#### Uncles
##### Title
Uncles
##### Type
array
##### Items
###### $Ref
#/components/schemas/hash32




## Blocktag
### Title
Block tag
### Type
string
### Enum
* earliest
* finalized
* safe
* latest
* pending
### Description
`earliest`: The lowest numbered block the client has available; `finalized`: The most recent crypto-economically secure block, cannot be re-orged outside of manual intervention driven by community coordination; `safe`: The most recent block that is safe from re-orgs under honest majority and certain synchronicity assumptions; `latest`: The most recent block in the canonical chain observed by the client, this block may be re-orged out of the canonical chain even under healthy/normal conditions; `pending`: A sample next block built by the client on top of `latest` and containing the set of transactions usually taken from local mempool. Before the merge transition is finalized, any call querying for `finalized` or `safe` block MUST be responded to with `-39001: Unknown block` error

## Blocknumberortag
### Title
Block number or tag
### Oneof
| Title | $Ref |
| --- | --- |
| Block number | #/components/schemas/uint |
| Block tag | #/components/schemas/BlockTag |

## Blocknumberortagorhash
### Title
Block number, tag, or block hash
### Anyof
| Title | $Ref |
| --- | --- |
| Block number | #/components/schemas/uint |
| Block tag | #/components/schemas/BlockTag |
| Block hash | #/components/schemas/hash32 |

## Badblock
### Title
Bad block
### Type
object
### Required
* block
* hash
* rlp
### Additionalproperties
False
### Properties
#### Block
##### Title
Block
##### $Ref
#/components/schemas/Block

#### Hash
##### Title
Hash
##### $Ref
#/components/schemas/hash32

#### Rlp
##### Title
RLP
##### $Ref
#/components/schemas/bytes





## Syncingstatus
### Title
Syncing status
### Oneof
| Title | Type | Additionalproperties | Properties | Description |
| --- | --- | --- | --- | --- |
| Syncing progress | object | False | {'startingBlock': {'title': 'Starting block', '$ref': '#/components/schemas/uint'}, 'currentBlock': {'title': 'Current block', '$ref': '#/components/schemas/uint'}, 'highestBlock': {'title': 'Highest block', '$ref': '#/components/schemas/uint'}} |  |
| Not syncing | boolean |  |  | Should always return false if not syncing. |



## Filterresults
### Title
Filter results
### Oneof
| Title | Type | Items |
| --- | --- | --- |
| new block or transaction hashes | array | {'$ref': '#/components/schemas/hash32'} |
| new logs | array | {'$ref': '#/components/schemas/Log'} |

## Filter
### Title
filter
### Type
object
### Additionalproperties
False
### Properties
#### Fromblock
##### Title
from block
##### $Ref
#/components/schemas/uint

#### Toblock
##### Title
to block
##### $Ref
#/components/schemas/uint

#### Address
##### Title
Address(es)
##### Oneof
| Title | Type | $Ref |
| --- | --- | --- |
| Any Address | null |  |
| Address |  | #/components/schemas/address |
| Addresses |  | #/components/schemas/addresses |

#### Topics
##### Title
Topics
##### $Ref
#/components/schemas/FilterTopics



## Filtertopics
### Title
Filter Topics
### Oneof
| Title | Type | Items |
| --- | --- | --- |
| Any Topic Match | null |  |
| Specified Filter Topics | array | {'$ref': '#/components/schemas/FilterTopic'} |

## Filtertopic
### Title
Filter Topic List Entry
### Oneof
| Title | $Ref | Type | Items |
| --- | --- | --- | --- |
| Single Topic Match | #/components/schemas/bytes32 |  |  |
| Multiple Topic Match |  | array | {'$ref': '#/components/schemas/bytes32'} |



## Log
### Title
log
### Type
object
### Required
* transactionHash
### Additionalproperties
False
### Properties
#### Removed
##### Title
removed
##### Type
boolean

#### Logindex
##### Title
log index
##### $Ref
#/components/schemas/uint

#### Transactionindex
##### Title
transaction index
##### $Ref
#/components/schemas/uint

#### Transactionhash
##### Title
transaction hash
##### $Ref
#/components/schemas/hash32

#### Blockhash
##### Title
block hash
##### $Ref
#/components/schemas/hash32

#### Blocknumber
##### Title
block number
##### $Ref
#/components/schemas/uint

#### Address
##### Title
address
##### $Ref
#/components/schemas/address

#### Data
##### Title
data
##### $Ref
#/components/schemas/bytes

#### Topics
##### Title
topics
##### Type
array
##### Items
###### $Ref
#/components/schemas/bytes32




## Receiptinfo
### Type
object
### Title
Receipt information
### Required
* blockHash
* blockNumber
* from
* cumulativeGasUsed
* gasUsed
* logs
* logsBloom
* transactionHash
* transactionIndex
* effectiveGasPrice
### Additionalproperties
False
### Properties
#### Type
##### Title
type
##### $Ref
#/components/schemas/byte

#### Transactionhash
##### Title
transaction hash
##### $Ref
#/components/schemas/hash32

#### Transactionindex
##### Title
transaction index
##### $Ref
#/components/schemas/uint

#### Blockhash
##### Title
block hash
##### $Ref
#/components/schemas/hash32

#### Blocknumber
##### Title
block number
##### $Ref
#/components/schemas/uint

#### From
##### Title
from
##### $Ref
#/components/schemas/address

#### To
##### Title
to
##### Description
Address of the receiver or null in a contract creation transaction.
##### Oneof
| Title | Type | $Ref |
| --- | --- | --- |
| Contract Creation (null) | null |  |
| Recipient Address |  | #/components/schemas/address |

#### Cumulativegasused
##### Title
cumulative gas used
##### Description
The sum of gas used by this transaction and all preceding transactions in the same block.
##### $Ref
#/components/schemas/uint

#### Gasused
##### Title
gas used
##### Description
The amount of gas used for this specific transaction alone.
##### $Ref
#/components/schemas/uint

#### Blobgasused
##### Title
blob gas used
##### Description
The amount of blob gas used for this specific transaction. Only specified for blob transactions as defined by EIP-4844.
##### $Ref
#/components/schemas/uint

#### Contractaddress
##### Title
contract address
##### Description
The contract address created, if the transaction was a contract creation, otherwise null.
##### Oneof
| $Ref | Title | Type |
| --- | --- | --- |
| #/components/schemas/address |  |  |
|  | Null | null |

#### Logs
##### Title
logs
##### Type
array
##### Items
###### $Ref
#/components/schemas/Log


#### Logsbloom
##### Title
logs bloom
##### $Ref
#/components/schemas/bytes256

#### Root
##### Title
state root
##### Description
The post-transaction state root. Only specified for transactions included before the Byzantium upgrade.
##### $Ref
#/components/schemas/hash32

#### Status
##### Title
status
##### Description
Either 1 (success) or 0 (failure). Only specified for transactions included after the Byzantium upgrade.
##### $Ref
#/components/schemas/uint

#### Effectivegasprice
##### Title
effective gas price
##### Description
The actual value per gas deducted from the sender's account. Before EIP-1559, this is equal to the transaction's gas price. After, it is equal to baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas).
##### $Ref
#/components/schemas/uint

#### Blobgasprice
##### Title
blob gas price
##### Description
The actual value per gas deducted from the sender's account for blob gas. Only specified for blob transactions as defined by EIP-4844.
##### $Ref
#/components/schemas/uint





## Accountproof
### Title
Account proof
### Type
object
### Required
* address
* accountProof
* balance
* codeHash
* nonce
* storageHash
* storageProof
### Additionalproperties
False
### Properties
#### Address
##### Title
address
##### $Ref
#/components/schemas/address

#### Accountproof
##### Title
accountProof
##### Type
array
##### Items
###### $Ref
#/components/schemas/bytes


#### Balance
##### Title
balance
##### $Ref
#/components/schemas/uint256

#### Codehash
##### Title
codeHash
##### $Ref
#/components/schemas/hash32

#### Nonce
##### Title
nonce
##### $Ref
#/components/schemas/uint64

#### Storagehash
##### Title
storageHash
##### $Ref
#/components/schemas/hash32

#### Storageproof
##### Title
Storage proofs
##### Type
array
##### Items
###### $Ref
#/components/schemas/StorageProof




## Storageproof
### Title
Storage proof
### Type
object
### Required
* key
* value
* proof
### Additionalproperties
False
### Properties
#### Key
##### Title
key
##### $Ref
#/components/schemas/bytesMax32

#### Value
##### Title
value
##### $Ref
#/components/schemas/uint256

#### Proof
##### Title
proof
##### Type
array
##### Items
###### $Ref
#/components/schemas/bytes






## Transaction4844Unsigned
### Type
object
### Title
EIP-4844 transaction.
### Required
* type
* nonce
* to
* gas
* value
* input
* maxPriorityFeePerGas
* maxFeePerGas
* maxFeePerBlobGas
* accessList
* blobVersionedHashes
* chainId
### Properties
#### Type
##### Title
type
##### $Ref
#/components/schemas/byte

#### Nonce
##### Title
nonce
##### $Ref
#/components/schemas/uint

#### To
##### Title
to address
##### $Ref
#/components/schemas/address

#### Gas
##### Title
gas limit
##### $Ref
#/components/schemas/uint

#### Value
##### Title
value
##### $Ref
#/components/schemas/uint

#### Input
##### Title
input data
##### $Ref
#/components/schemas/bytes

#### Maxpriorityfeepergas
##### Title
max priority fee per gas
##### Description
Maximum fee per gas the sender is willing to pay to miners in wei
##### $Ref
#/components/schemas/uint

#### Maxfeepergas
##### Title
max fee per gas
##### Description
The maximum total fee per gas the sender is willing to pay (includes the network / base fee and miner / priority fee) in wei
##### $Ref
#/components/schemas/uint

#### Maxfeeperblobgas
##### Title
max fee per blob gas
##### Description
The maximum total fee per gas the sender is willing to pay for blob gas in wei
##### $Ref
#/components/schemas/uint

#### Accesslist
##### Title
accessList
##### Description
EIP-2930 access list
##### $Ref
#/components/schemas/AccessList

#### Blobversionedhashes
##### Title
blobVersionedHashes
##### Description
List of versioned blob hashes associated with the transaction's EIP-4844 data blobs.
##### Type
array
##### Items
###### $Ref
#/components/schemas/hash32


#### Chainid
##### Title
chainId
##### Description
Chain ID that this transaction is valid on.
##### $Ref
#/components/schemas/uint



## Accesslistentry
### Title
Access list entry
### Type
object
### Additionalproperties
False
### Properties
#### Address
##### $Ref
#/components/schemas/address

#### Storagekeys
##### Type
array
##### Items
###### $Ref
#/components/schemas/hash32




## Accesslist
### Title
Access list
### Type
array
### Items
#### $Ref
#/components/schemas/AccessListEntry


## Transaction1559Unsigned
### Type
object
### Title
EIP-1559 transaction.
### Required
* type
* nonce
* gas
* value
* input
* maxFeePerGas
* maxPriorityFeePerGas
* gasPrice
* chainId
* accessList
### Properties
#### Type
##### Title
type
##### Type
string
##### Pattern
^0x2$

#### Nonce
##### Title
nonce
##### $Ref
#/components/schemas/uint

#### To
##### Title
to address
##### Oneof
| Title | Type | $Ref |
| --- | --- | --- |
| Contract Creation (null) | null |  |
| Address |  | #/components/schemas/address |

#### Gas
##### Title
gas limit
##### $Ref
#/components/schemas/uint

#### Value
##### Title
value
##### $Ref
#/components/schemas/uint

#### Input
##### Title
input data
##### $Ref
#/components/schemas/bytes

#### Maxpriorityfeepergas
##### Title
max priority fee per gas
##### Description
Maximum fee per gas the sender is willing to pay to miners in wei
##### $Ref
#/components/schemas/uint

#### Maxfeepergas
##### Title
max fee per gas
##### Description
The maximum total fee per gas the sender is willing to pay (includes the network / base fee and miner / priority fee) in wei
##### $Ref
#/components/schemas/uint

#### Gasprice
##### Title
gas price
##### Description
The effective gas price paid by the sender in wei. For transactions not yet included in a block, this value should be set equal to the max fee per gas. This field is DEPRECATED, please transition to using effectiveGasPrice in the receipt object going forward.
##### $Ref
#/components/schemas/uint

#### Accesslist
##### Title
accessList
##### Description
EIP-2930 access list
##### $Ref
#/components/schemas/AccessList

#### Chainid
##### Title
chainId
##### Description
Chain ID that this transaction is valid on.
##### $Ref
#/components/schemas/uint



## Transaction2930Unsigned
### Type
object
### Title
EIP-2930 transaction.
### Required
* type
* nonce
* gas
* value
* input
* gasPrice
* chainId
* accessList
### Properties
#### Type
##### Title
type
##### Type
string
##### Pattern
^0x1$

#### Nonce
##### Title
nonce
##### $Ref
#/components/schemas/uint

#### To
##### Title
to address
##### Oneof
| Title | Type | $Ref |
| --- | --- | --- |
| Contract Creation (null) | null |  |
| Address |  | #/components/schemas/address |

#### Gas
##### Title
gas limit
##### $Ref
#/components/schemas/uint

#### Value
##### Title
value
##### $Ref
#/components/schemas/uint

#### Input
##### Title
input data
##### $Ref
#/components/schemas/bytes

#### Gasprice
##### Title
gas price
##### Description
The gas price willing to be paid by the sender in wei
##### $Ref
#/components/schemas/uint

#### Accesslist
##### Title
accessList
##### Description
EIP-2930 access list
##### $Ref
#/components/schemas/AccessList

#### Chainid
##### Title
chainId
##### Description
Chain ID that this transaction is valid on.
##### $Ref
#/components/schemas/uint



## Transactionlegacyunsigned
### Type
object
### Title
Legacy transaction.
### Required
* type
* nonce
* gas
* value
* input
* gasPrice
### Properties
#### Type
##### Title
type
##### Type
string
##### Pattern
^0x0$

#### Nonce
##### Title
nonce
##### $Ref
#/components/schemas/uint

#### To
##### Title
to address
##### Oneof
| Title | Type | $Ref |
| --- | --- | --- |
| Contract Creation (null) | null |  |
| Address |  | #/components/schemas/address |

#### Gas
##### Title
gas limit
##### $Ref
#/components/schemas/uint

#### Value
##### Title
value
##### $Ref
#/components/schemas/uint

#### Input
##### Title
input data
##### $Ref
#/components/schemas/bytes

#### Gasprice
##### Title
gas price
##### Description
The gas price willing to be paid by the sender in wei
##### $Ref
#/components/schemas/uint

#### Chainid
##### Title
chainId
##### Description
Chain ID that this transaction is valid on.
##### $Ref
#/components/schemas/uint



## Transactionunsigned
### Oneof
| $Ref |
| --- |
| #/components/schemas/Transaction4844Unsigned |
| #/components/schemas/Transaction1559Unsigned |
| #/components/schemas/Transaction2930Unsigned |
| #/components/schemas/TransactionLegacyUnsigned |

## Transaction4844Signed
### Title
Signed 4844 Transaction
### Type
object
### Allof
| $Ref | Title | Required | Properties |
| --- | --- | --- | --- |
| #/components/schemas/Transaction4844Unsigned |  |  |  |
|  | EIP-4844 transaction signature properties. | <ul><li>yParity</li><li>r</li><li>s</li></ul> | {'yParity': {'title': 'yParity', 'description': 'The parity (0 for even, 1 for odd) of the y-value of the secp256k1 signature.', '$ref': '#/components/schemas/uint'}, 'r': {'title': 'r', '$ref': '#/components/schemas/uint'}, 's': {'title': 's', '$ref': '#/components/schemas/uint'}} |

## Transaction1559Signed
### Title
Signed 1559 Transaction
### Type
object
### Allof
| $Ref | Title | Required | Properties |
| --- | --- | --- | --- |
| #/components/schemas/Transaction1559Unsigned |  |  |  |
|  | EIP-1559 transaction signature properties. | <ul><li>yParity</li><li>r</li><li>s</li></ul> | {'yParity': {'title': 'yParity', 'description': 'The parity (0 for even, 1 for odd) of the y-value of the secp256k1 signature.', '$ref': '#/components/schemas/uint'}, 'v': {'title': 'v', 'description': 'For backwards compatibility, `v` is optionally provided as an alternative to `yParity`. This field is DEPRECATED and all use of it should migrate to `yParity`.', '$ref': '#/components/schemas/uint'}, 'r': {'title': 'r', '$ref': '#/components/schemas/uint'}, 's': {'title': 's', '$ref': '#/components/schemas/uint'}} |

## Transaction2930Signed
### Title
Signed 2930 Transaction
### Type
object
### Allof
| $Ref | Title | Required | Properties |
| --- | --- | --- | --- |
| #/components/schemas/Transaction2930Unsigned |  |  |  |
|  | EIP-2930 transaction signature properties. | <ul><li>yParity</li><li>r</li><li>s</li></ul> | {'yParity': {'title': 'yParity', 'description': 'The parity (0 for even, 1 for odd) of the y-value of the secp256k1 signature.', '$ref': '#/components/schemas/uint'}, 'v': {'title': 'v', 'description': 'For backwards compatibility, `v` is optionally provided as an alternative to `yParity`. This field is DEPRECATED and all use of it should migrate to `yParity`.', '$ref': '#/components/schemas/uint'}, 'r': {'title': 'r', '$ref': '#/components/schemas/uint'}, 's': {'title': 's', '$ref': '#/components/schemas/uint'}} |

## Transactionlegacysigned
### Title
Signed Legacy Transaction
### Type
object
### Allof
| $Ref | Title | Required | Properties |
| --- | --- | --- | --- |
| #/components/schemas/TransactionLegacyUnsigned |  |  |  |
|  | Legacy transaction signature properties. | <ul><li>v</li><li>r</li><li>s</li></ul> | {'v': {'title': 'v', '$ref': '#/components/schemas/uint'}, 'r': {'title': 'r', '$ref': '#/components/schemas/uint'}, 's': {'title': 's', '$ref': '#/components/schemas/uint'}} |

## Transactionsigned
### Oneof
| $Ref |
| --- |
| #/components/schemas/Transaction4844Signed |
| #/components/schemas/Transaction1559Signed |
| #/components/schemas/Transaction2930Signed |
| #/components/schemas/TransactionLegacySigned |

## Transactioninfo
### Type
object
### Title
Transaction information
### Allof
| Title | Required | Unevaluatedproperties | Properties | $Ref |
| --- | --- | --- | --- | --- |
| Contextual information | <ul><li>blockHash</li><li>blockNumber</li><li>from</li><li>hash</li><li>transactionIndex</li></ul> | False | {'blockHash': {'title': 'block hash', '$ref': '#/components/schemas/hash32'}, 'blockNumber': {'title': 'block number', '$ref': '#/components/schemas/uint'}, 'from': {'title': 'from address', '$ref': '#/components/schemas/address'}, 'hash': {'title': 'transaction hash', '$ref': '#/components/schemas/hash32'}, 'transactionIndex': {'title': 'transaction index', '$ref': '#/components/schemas/uint'}} |  |
|  |  |  |  | #/components/schemas/TransactionSigned |

## Generictransaction
### Type
object
### Title
Transaction object generic to all types
### Additionalproperties
False
### Properties
#### Type
##### Title
type
##### $Ref
#/components/schemas/byte

#### Nonce
##### Title
nonce
##### $Ref
#/components/schemas/uint

#### To
##### Title
to address
##### Oneof
| Title | Type | $Ref |
| --- | --- | --- |
| Contract Creation (null) | null |  |
| Address |  | #/components/schemas/address |

#### From
##### Title
from address
##### $Ref
#/components/schemas/address

#### Gas
##### Title
gas limit
##### $Ref
#/components/schemas/uint

#### Value
##### Title
value
##### $Ref
#/components/schemas/uint

#### Input
##### Title
input data
##### $Ref
#/components/schemas/bytes

#### Gasprice
##### Title
gas price
##### Description
The gas price willing to be paid by the sender in wei
##### $Ref
#/components/schemas/uint

#### Maxpriorityfeepergas
##### Title
max priority fee per gas
##### Description
Maximum fee per gas the sender is willing to pay to miners in wei
##### $Ref
#/components/schemas/uint

#### Maxfeepergas
##### Title
max fee per gas
##### Description
The maximum total fee per gas the sender is willing to pay (includes the network / base fee and miner / priority fee) in wei
##### $Ref
#/components/schemas/uint

#### Maxfeeperblobgas
##### Title
max fee per blob gas
##### Description
The maximum total fee per gas the sender is willing to pay for blob gas in wei
##### $Ref
#/components/schemas/uint

#### Accesslist
##### Title
accessList
##### Description
EIP-2930 access list
##### $Ref
#/components/schemas/AccessList

#### Blobversionedhashes
##### Title
blobVersionedHashes
##### Description
List of versioned blob hashes associated with the transaction's EIP-4844 data blobs.
##### Type
array
##### Items
###### $Ref
#/components/schemas/hash32


#### Blobs
##### Title
blobs
##### Description
Raw blob data.
##### Type
array
##### Items
###### $Ref
#/components/schemas/bytes


#### Chainid
##### Title
chainId
##### Description
Chain ID that this transaction is valid on.
##### $Ref
#/components/schemas/uint





## Withdrawal
### Type
object
### Title
Validator withdrawal
### Required
* index
* validatorIndex
* address
* amount
### Additionalproperties
False
### Properties
#### Index
##### Title
index of withdrawal
##### $Ref
#/components/schemas/uint64

#### Validatorindex
##### Title
index of validator that generated withdrawal
##### $Ref
#/components/schemas/uint64

#### Address
##### Title
recipient address for withdrawal value
##### $Ref
#/components/schemas/address

#### Amount
##### Title
value contained in withdrawal
##### $Ref
#/components/schemas/uint256



