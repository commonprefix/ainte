## Forkchoicestatev1
### Title
Forkchoice state object V1
### Type
object
### Required
* headBlockHash
* safeBlockHash
* finalizedBlockHash
### Properties
#### Headblockhash
##### Title
Head block hash
##### $Ref
#/components/schemas/hash32

#### Safeblockhash
##### Title
Safe block hash
##### $Ref
#/components/schemas/hash32

#### Finalizedblockhash
##### Title
Finalized block hash
##### $Ref
#/components/schemas/hash32



## Forkchoiceupdatedresponsev1
### Title
Forkchoice updated response
### Type
object
### Required
* payloadStatus
### Properties
#### Payloadstatus
##### Title
Payload status
##### $Ref
#/components/schemas/RestrictedPayloadStatusV1

#### Payloadid
##### Title
Payload id
##### $Ref
#/components/schemas/bytes8



## Payloadattributesv1
### Title
Payload attributes object V1
### Type
object
### Required
* timestamp
* prevRandao
* suggestedFeeRecipient
### Properties
#### Timestamp
##### Title
Timestamp
##### $Ref
#/components/schemas/uint64

#### Prevrandao
##### Title
Previous randao value
##### $Ref
#/components/schemas/bytes32

#### Suggestedfeerecipient
##### Title
Suggested fee recipient
##### $Ref
#/components/schemas/address



## Payloadattributesv2
### Title
Payload attributes object V2
### Type
object
### Required
* timestamp
* prevRandao
* suggestedFeeRecipient
* withdrawals
### Properties
#### Timestamp
##### $Ref
#/components/schemas/PayloadAttributesV1/properties/timestamp

#### Prevrandao
##### $Ref
#/components/schemas/PayloadAttributesV1/properties/prevRandao

#### Suggestedfeerecipient
##### $Ref
#/components/schemas/PayloadAttributesV1/properties/suggestedFeeRecipient

#### Withdrawals
##### Title
Withdrawals
##### Type
array
##### Items
###### $Ref
#/components/schemas/WithdrawalV1




## Payloadattributesv3
### Title
Payload attributes object V3
### Type
object
### Required
* timestamp
* prevRandao
* suggestedFeeRecipient
* withdrawals
* parentBeaconBlockRoot
### Properties
#### Timestamp
##### $Ref
#/components/schemas/PayloadAttributesV2/properties/timestamp

#### Prevrandao
##### $Ref
#/components/schemas/PayloadAttributesV2/properties/prevRandao

#### Suggestedfeerecipient
##### $Ref
#/components/schemas/PayloadAttributesV2/properties/suggestedFeeRecipient

#### Withdrawals
##### $Ref
#/components/schemas/PayloadAttributesV2/properties/withdrawals

#### Parentbeaconblockroot
##### Title
Parent beacon block root
##### $Ref
#/components/schemas/hash32





## Payloadstatusv1
### Title
Payload status object V1
### Type
object
### Required
* status
### Properties
#### Status
##### Title
Payload validation status
##### Type
string
##### Enum
* VALID
* INVALID
* SYNCING
* ACCEPTED
* INVALID_BLOCK_HASH

#### Latestvalidhash
##### Title
The hash of the most recent valid block
##### $Ref
#/components/schemas/hash32

#### Validationerror
##### Title
Validation error message
##### Type
string



## Restrictedpayloadstatusv1
### $Ref
#/components/schemas/PayloadStatusV1
### Properties
#### Status
##### $Ref
#/components/schemas/PayloadStatusV1/properties/status
##### Description
Set of possible values is restricted to VALID, INVALID, SYNCING
##### Enum
* VALID
* INVALID
* SYNCING

#### Latestvalidhash
##### $Ref
#/components/schemas/PayloadStatusV1/properties/latestValidHash

#### Validationerror
##### $Ref
#/components/schemas/PayloadStatusV1/properties/validationError



## Payloadstatusnoinvalidblockhash
### $Ref
#/components/schemas/PayloadStatusV1
### Title
Payload status object deprecating INVALID_BLOCK_HASH status
### Properties
#### Status
##### $Ref
#/components/schemas/PayloadStatusV1/properties/status
##### Enum
* VALID
* INVALID
* SYNCING
* ACCEPTED

#### Latestvalidhash
##### $Ref
#/components/schemas/PayloadStatusV1/properties/latestValidHash

#### Validationerror
##### $Ref
#/components/schemas/PayloadStatusV1/properties/validationError



## Executionpayloadv1
### Title
Execution payload object V1
### Type
object
### Required
* parentHash
* feeRecipient
* stateRoot
* receiptsRoot
* logsBloom
* prevRandao
* blockNumber
* gasLimit
* gasUsed
* timestamp
* extraData
* baseFeePerGas
* blockHash
* transactions
### Properties
#### Parenthash
##### Title
Parent block hash
##### $Ref
#/components/schemas/hash32

#### Feerecipient
##### Title
Recipient of transaction priority fees
##### $Ref
#/components/schemas/address

#### Stateroot
##### Title
State root
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

#### Prevrandao
##### Title
Previous randao value
##### $Ref
#/components/schemas/bytes32

#### Blocknumber
##### Title
Block number
##### $Ref
#/components/schemas/uint64

#### Gaslimit
##### Title
Gas limit
##### $Ref
#/components/schemas/uint64

#### Gasused
##### Title
Gas used
##### $Ref
#/components/schemas/uint64

#### Timestamp
##### Title
Timestamp
##### $Ref
#/components/schemas/uint64

#### Extradata
##### Title
Extra data
##### $Ref
#/components/schemas/bytesMax32

#### Basefeepergas
##### Title
Base fee per gas
##### $Ref
#/components/schemas/uint256

#### Blockhash
##### Title
Block hash
##### $Ref
#/components/schemas/hash32

#### Transactions
##### Title
Transactions
##### Type
array
##### Items
###### $Ref
#/components/schemas/bytes




## Withdrawalv1
### Title
Withdrawal object V1
### Type
object
### Required
* index
* validatorIndex
* address
* amount
### Properties
#### Index
##### Title
Withdrawal index
##### $Ref
#/components/schemas/uint64

#### Validatorindex
##### Title
Validator index
##### $Ref
#/components/schemas/uint64

#### Address
##### Title
Withdrawal address
##### $Ref
#/components/schemas/address

#### Amount
##### Title
Withdrawal amount
##### $Ref
#/components/schemas/uint64



## Executionpayloadv2
### Title
Execution payload object V2
### Type
object
### Required
* parentHash
* feeRecipient
* stateRoot
* receiptsRoot
* logsBloom
* prevRandao
* blockNumber
* gasLimit
* gasUsed
* timestamp
* extraData
* baseFeePerGas
* blockHash
* transactions
* withdrawals
### Properties
#### Parenthash
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/parentHash

#### Feerecipient
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/feeRecipient

#### Stateroot
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/stateRoot

#### Receiptsroot
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/receiptsRoot

#### Logsbloom
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/logsBloom

#### Prevrandao
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/prevRandao

#### Blocknumber
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/blockNumber

#### Gaslimit
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/gasLimit

#### Gasused
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/gasUsed

#### Timestamp
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/timestamp

#### Extradata
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/extraData

#### Basefeepergas
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/baseFeePerGas

#### Blockhash
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/blockHash

#### Transactions
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/transactions

#### Withdrawals
##### Title
Withdrawals
##### Type
array
##### Items
###### $Ref
#/components/schemas/WithdrawalV1




## Executionpayloadv3
### Title
Execution payload object V3
### Type
object
### Required
* parentHash
* feeRecipient
* stateRoot
* receiptsRoot
* logsBloom
* prevRandao
* blockNumber
* gasLimit
* gasUsed
* timestamp
* extraData
* baseFeePerGas
* blockHash
* transactions
* withdrawals
* blobGasUsed
* excessBlobGas
### Properties
#### Parenthash
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/parentHash

#### Feerecipient
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/feeRecipient

#### Stateroot
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/stateRoot

#### Receiptsroot
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/receiptsRoot

#### Logsbloom
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/logsBloom

#### Prevrandao
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/prevRandao

#### Blocknumber
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/blockNumber

#### Gaslimit
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/gasLimit

#### Gasused
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/gasUsed

#### Timestamp
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/timestamp

#### Extradata
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/extraData

#### Basefeepergas
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/baseFeePerGas

#### Blockhash
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/blockHash

#### Transactions
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/transactions

#### Withdrawals
##### $Ref
#/components/schemas/ExecutionPayloadV2/properties/withdrawals

#### Blobgasused
##### Title
Blob gas used
##### $Ref
#/components/schemas/uint64

#### Excessblobgas
##### Title
Excess blob gas
##### $Ref
#/components/schemas/uint64



## Executionpayloadv4
### Title
Execution payload object V4
### Type
object
### Required
* parentHash
* feeRecipient
* stateRoot
* receiptsRoot
* logsBloom
* prevRandao
* blockNumber
* gasLimit
* gasUsed
* timestamp
* extraData
* baseFeePerGas
* blockHash
* transactions
* withdrawals
* blobGasUsed
* excessBlobGas
* depositRequests
* withdrawalRequests
* consolidationRequests
### Properties
#### Parenthash
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/parentHash

#### Feerecipient
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/feeRecipient

#### Stateroot
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/stateRoot

#### Receiptsroot
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/receiptsRoot

#### Logsbloom
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/logsBloom

#### Prevrandao
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/prevRandao

#### Blocknumber
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/blockNumber

#### Gaslimit
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/gasLimit

#### Gasused
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/gasUsed

#### Timestamp
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/timestamp

#### Extradata
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/extraData

#### Basefeepergas
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/baseFeePerGas

#### Blockhash
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/blockHash

#### Transactions
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/transactions

#### Withdrawals
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/withdrawals

#### Blobgasused
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/blobGasUsed

#### Excessblobgas
##### $Ref
#/components/schemas/ExecutionPayloadV3/properties/excessBlobGas

#### Depositrequests
##### Title
Deposit requests
##### Type
array
##### Items
###### $Ref
#/components/schemas/DepositRequestV1


#### Withdrawalrequests
##### Title
Withdrawals requests
##### Type
array
##### Items
###### $Ref
#/components/schemas/WithdrawalRequestV1


#### Consolidationrequests
##### Title
Consolidation requests
##### Type
array
##### Items
###### $Ref
#/components/schemas/ConsolidationRequestV1




## Executionpayloadbodyv1
### Title
Execution payload body object V1
### Type
object
### Required
* transactions
### Properties
#### Transactions
##### $Ref
#/components/schemas/ExecutionPayloadV1/properties/transactions

#### Withdrawals
##### Title
Withdrawals
##### Type
* array
* null
##### Items
###### $Ref
#/components/schemas/WithdrawalV1




## Executionpayloadbodyv2
### Title
Execution payload body object V2
### Type
object
### Required
* transactions
### Properties
#### Transactions
##### Title
Transactions
##### Type
array
##### Items
###### $Ref
#/components/schemas/bytes


#### Withdrawals
##### Title
Withdrawals
##### Type
* array
* null
##### Items
###### $Ref
#/components/schemas/WithdrawalV1


#### Depositrequests
##### Title
Deposit requests
##### Type
* array
* null
##### Items
###### $Ref
#/components/schemas/DepositRequestV1


#### Withdrawalrequests
##### Title
Withdrawals requests
##### Type
* array
* null
##### Items
###### $Ref
#/components/schemas/WithdrawalRequestV1


#### Consolidationrequests
##### Title
Consolidation requests - array - 'null'
##### Items
###### $Ref
#/components/schemas/ConsolidationRequestV1




## Blobsbundlev1
### Title
Blobs bundle object V1
### Type
object
### Required
* commitments
* proofs
* blobs
### Properties
#### Commitments
##### Title
Commitments
##### Type
array
##### Items
###### $Ref
#/components/schemas/bytes48


#### Proofs
##### Title
Proofs
##### Type
array
##### Items
###### $Ref
#/components/schemas/bytes48


#### Blobs
##### Title
Blobs
##### Type
array
##### Items
###### $Ref
#/components/schemas/bytes




## Depositrequestv1
### Title
Deposit request object V1
### Type
object
### Required
* pubkey
* withdrawalCredentials
* amount
* signature
* index
### Properties
#### Pubkey
##### Title
Public key
##### $Ref
#/components/schemas/bytes48

#### Withdrawalcredentials
##### Title
Withdrawal credentials
##### $Ref
#/components/schemas/bytes32

#### Amount
##### Title
Deposit amount
##### $Ref
#/components/schemas/uint64

#### Signature
##### Title
Deposit signature
##### $Ref
#/components/schemas/bytes96

#### Index
##### Title
Deposit index
##### $Ref
#/components/schemas/uint64



## Withdrawalrequestv1
### Title
Withdrawal request object V1
### Type
object
### Required
* sourceAddress
* validatorPubkey
* amount
### Properties
#### Sourceaddress
##### Title
Source address
##### $Ref
#/components/schemas/address

#### Validatorpubkey
##### Title
Validator public key
##### $Ref
#/components/schemas/bytes48

#### Amount
##### Title
Withdraw amount
##### $Ref
#/components/schemas/uint64



## Consolidationrequestv1
### Title
Consolidation request object V1
### Type
object
### Required
* sourceAddress
* sourcePubkey
* targetPubkey
### Properties
#### Sourceaddress
##### Title
Source address
##### $Ref
#/components/schemas/address

#### Sourcepubkey
##### Title
Source validator public key
##### $Ref
#/components/schemas/bytes48

#### Targetpubkey
##### Title
Target validator public key
##### $Ref
#/components/schemas/bytes48





## Transitionconfigurationv1
### Title
Transition configuration object
### Type
object
### Required
* terminalTotalDifficulty
* terminalBlockHash
* terminalBlockNumber
### Properties
#### Terminaltotaldifficulty
##### Title
Terminal total difficulty
##### $Ref
#/components/schemas/uint256

#### Terminalblockhash
##### Title
Terminal block hash
##### $Ref
#/components/schemas/hash32

#### Terminalblocknumber
##### Title
Terminal block number
##### $Ref
#/components/schemas/uint64



