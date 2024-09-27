# Engine API -- Shanghai

Engine API changes introduced in Shanghai.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Structures](#structures)
  - [WithdrawalV1](#withdrawalv1)
  - [ExecutionPayloadV2](#executionpayloadv2)
  - [ExecutionPayloadBodyV1](#executionpayloadbodyv1)
  - [PayloadAttributesV2](#payloadattributesv2)
- [Methods](#methods)
  - [engine_newPayloadV2](#engine_newpayloadv2)
    - [Request](#request)
    - [Response](#response)
    - [Specification](#specification)
  - [engine_forkchoiceUpdatedV2](#engine_forkchoiceupdatedv2)
    - [Request](#request-1)
    - [Response](#response-1)
    - [Specification](#specification-1)
  - [engine_getPayloadV2](#engine_getpayloadv2)
    - [Request](#request-2)
    - [Response](#response-2)
    - [Specification](#specification-2)
  - [engine_getPayloadBodiesByHashV1](#engine_getpayloadbodiesbyhashv1)
    - [Request](#request-3)
    - [Response](#response-3)
    - [Specification](#specification-3)
  - [engine_getPayloadBodiesByRangeV1](#engine_getpayloadbodiesbyrangev1)
    - [Request](#request-4)
    - [Response](#response-4)
    - [Specification](#specification-4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Structures

### WithdrawalV1

This structure maps onto the validator withdrawal object from the beacon chain spec.
The fields are encoded as follows:

- `index`: `QUANTITY`, 64 Bits
- `validatorIndex`: `QUANTITY`, 64 Bits
- `address`: `DATA`, 20 Bytes
- `amount`: `QUANTITY`, 64 Bits

*Note*: the `amount` value is represented on the beacon chain as a little-endian value in units of Gwei, whereas the
`amount` in this structure *MUST* be converted to a big-endian value in units of Gwei.

### ExecutionPayloadV2

This structure has the syntax of `ExecutionPayloadV1` and appends a single field: `withdrawals`.

- `parentHash`: `DATA`, 32 Bytes
- `feeRecipient`:  `DATA`, 20 Bytes
- `stateRoot`: `DATA`, 32 Bytes
- `receiptsRoot`: `DATA`, 32 Bytes
- `logsBloom`: `DATA`, 256 Bytes
- `prevRandao`: `DATA`, 32 Bytes
- `blockNumber`: `QUANTITY`, 64 Bits
- `gasLimit`: `QUANTITY`, 64 Bits
- `gasUsed`: `QUANTITY`, 64 Bits
- `timestamp`: `QUANTITY`, 64 Bits
- `extraData`: `DATA`, 0 to 32 Bytes
- `baseFeePerGas`: `QUANTITY`, 256 Bits
- `blockHash`: `DATA`, 32 Bytes
- `transactions`: `Array of DATA` - Array of transaction objects, each object is a byte list (`DATA`) representing `TransactionType || TransactionPayload` or `LegacyTransaction` as defined in [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)
- `withdrawals`: `Array of WithdrawalV1` - Array of withdrawals, each object is an `OBJECT` containing the fields of a `WithdrawalV1` structure.

### ExecutionPayloadBodyV1
This structure contains a body of an execution payload. The fields are encoded as follows:
- `transactions`: `Array of DATA` - Array of transaction objects, each object is a byte list (`DATA`) representing `TransactionType || TransactionPayload` or `LegacyTransaction` as defined in [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)
- `withdrawals`: `Array of WithdrawalV1` - Array of withdrawals, each object is an `OBJECT` containing the fields of a `WithdrawalV1` structure.

### PayloadAttributesV2

This structure has the syntax of `PayloadAttributesV1` and appends a single field: `withdrawals`.

- `timestamp`: `QUANTITY`, 64 Bits - value for the `timestamp` field of the new payload
- `prevRandao`: `DATA`, 32 Bytes - value for the `prevRandao` field of the new payload
- `suggestedFeeRecipient`: `DATA`, 20 Bytes - suggested value for the `feeRecipient` field of the new payload
- `withdrawals`: `Array of WithdrawalV1` - Array of withdrawals, each object is an `OBJECT` containing the fields of a `WithdrawalV1` structure.

## Methods

### engine_newPayloadV2

#### Request

* method: `engine_newPayloadV2`
* params:
  1. [`ExecutionPayloadV1`](./paris.md#ExecutionPayloadV1) | [`ExecutionPayloadV2`](#ExecutionPayloadV2), where:
      - `ExecutionPayloadV1` **MUST** be used if the `timestamp` value is lower than the Shanghai timestamp,
      - `ExecutionPayloadV2` **MUST** be used if the `timestamp` value is greater or equal to the Shanghai timestamp,
      - Client software **MUST** return `-32602: Invalid params` error if the wrong version of the structure is used in the method call.
* timeout: 8s

#### Response

* result: [`PayloadStatusV1`](./paris.md#payloadstatusv1), values of the `status` field are restricted in the following way:
  - `INVALID_BLOCK_HASH` status value is supplanted by `INVALID`.
* error: code and message set in case an exception happens while processing the payload.

#### Specification

This method follows the same specification as [`engine_newPayloadV1`](./paris.md#engine_newpayloadv1) with the exception of the following:

1. Client software **MAY NOT** validate terminal PoW block conditions during payload validation (point (2) in the [Payload validation](./paris.md#payload-validation) routine).
2. Client software **MUST** return `{status: INVALID, latestValidHash: null, validationError: errorMessage | null}` if the `blockHash` validation has failed.
3. Consensus layer client **MUST** call this method instead of `engine_newPayloadV1` if `timestamp` value of a payload is greater or equal to the Shanghai timestamp.

### engine_forkchoiceUpdatedV2

#### Request

* method: "engine_forkchoiceUpdatedV2"
* params:
  1. `forkchoiceState`: `Object` - instance of [`ForkchoiceStateV1`](./paris.md#ForkchoiceStateV1)
  2. `payloadAttributes`: `Object|null` - instance of [`PayloadAttributesV1`](./paris.md#PayloadAttributesV1) | [`PayloadAttributesV2`](#PayloadAttributesV2) or `null`, where:
      - `PayloadAttributesV1` **MUST** be used to build a payload with the `timestamp` value lower than the Shanghai timestamp,
      - `PayloadAttributesV2` **MUST** be used to build a payload with the `timestamp` value greater or equal to the Shanghai timestamp,
      - Client software **MUST** return `-32602: Invalid params` error if the wrong version of the structure is used in the method call.
* timeout: 8s

#### Response

Refer to the response for [`engine_forkchoiceUpdatedV1`](./paris.md#engine_forkchoiceupdatedv1).

#### Specification

This method follows the same specification as [`engine_forkchoiceUpdatedV1`](./paris.md#engine_forkchoiceupdatedv1) with the exception of the following:

1. Client software **MAY NOT** validate terminal PoW block conditions in the following places:
    - during payload validation (point (2) in the [Payload validation](./paris.md#payload-validation) routine specification),
    - when updating the forkchoice state (point (3) in the [`engine_forkchoiceUpdatedV1`](./paris.md#engine_forkchoiceupdatedv1) method specification).
2. Consensus layer client **MUST** call this method instead of `engine_forkchoiceUpdatedV1` under any of the following conditions:
    - `headBlockHash` references a block which `timestamp` is greater or equal to the Shanghai timestamp,
    - `payloadAttributes` is not `null` and `payloadAttributes.timestamp` is greater or equal to the Shanghai timestamp.

### engine_getPayloadV2

#### Request

* method: `engine_getPayloadV2`
* params:
  1. `payloadId`: `DATA`, 8 Bytes - Identifier of the payload build process
* timeout: 1s

#### Response

* result: `object`
  - `executionPayload`: [`ExecutionPayloadV1`](./paris.md#ExecutionPayloadV1) | [`ExecutionPayloadV2`](#ExecutionPayloadV2) where:
      - `ExecutionPayloadV1` **MUST** be returned if the payload `timestamp` is lower than the Shanghai timestamp
      - `ExecutionPayloadV2` **MUST** be returned if the payload `timestamp` is greater or equal to the Shanghai timestamp
  - `blockValue` : `QUANTITY`, 256 Bits - The expected value to be received by the `feeRecipient` in wei
* error: code and message set in case an exception happens while getting the payload.

#### Specification

This method follows the same specification as [`engine_getPayloadV1`](./paris.md#engine_getpayloadv1) with the addition of the following:

  1. Client software **SHOULD** use the sum of the block's priority fees or any other algorithm to determine `blockValue`.

### engine_getPayloadBodiesByHashV1

#### Request

* method: `engine_getPayloadBodiesByHashV1`
* params:
  1. `Array of DATA`, 32 Bytes - Array of `block_hash` field values of the `ExecutionPayload` structure
* timeout: 10s

#### Response

* result: `Array of ExecutionPayloadBodyV1` - Array of [`ExecutionPayloadBodyV1`](#ExecutionPayloadBodyV1) objects.
* error: code and message set in case an exception happens while processing the method call.

#### Specification

1. Given array of block hashes client software **MUST** respond with array of `ExecutionPayloadBodyV1` objects with the corresponding hashes respecting the order of block hashes in the input array.

1. Client software **MUST** place responses in the order given in the request, using `null` for any missing blocks. For instance, if the request is `[A.block_hash, B.block_hash, C.block_hash]` and client software has data of payloads `A` and `C`, but doesn't have data of `B`, the response **MUST** be `[A.body, null, C.body]`.

1. Client software **MUST** support request sizes of at least 32 block hashes. The call **MUST** return `-38004: Too large request` error if the number of requested payload bodies is too large.

1. Client software **MAY NOT** respond to requests for finalized blocks by hash.

1. Client software **MUST** set `withdrawals` field to `null` for bodies of pre-Shanghai blocks.

1. This request maps to [`BeaconBlocksByRoot`](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#beaconblocksbyroot) in the consensus layer `p2p` specification. Callers must be careful to use the execution block hash, instead of the beacon block root.

1. Callers must consider that syncing execution layer client may not serve any block bodies, including those that were supplied by `engine_newPayload` calls.

### engine_getPayloadBodiesByRangeV1

#### Request

* method: `engine_getPayloadBodiesByRangeV1`
* params:
  1. `start`: `QUANTITY`, 64 bits - Starting block number
  1. `count`: `QUANTITY`, 64 bits - Number of blocks to return
* timeout: 10s

#### Response

* result: `Array of ExecutionPayloadBodyV1` - Array of [`ExecutionPayloadBodyV1`](#ExecutionPayloadBodyV1) objects.
* error: code and message set in case an exception happens while processing the method call.

#### Specification

1. Given a `start` and a `count`, the client software **MUST** respond with array of `ExecutionPayloadBodyV1` objects with the corresponding execution block number respecting the order of blocks in the canonical chain, as selected by the latest `engine_forkchoiceUpdated` call.

1. Client software **MUST** support `count` values of at least 32 blocks. The call **MUST** return `-38004: Too large request` error if the requested range is too large.

1. Client software **MUST** return `-32602: Invalid params` error if either `start` or `count` value is less than `1`.

1. Client software **MUST** place `null` in the response array for unavailable blocks which numbers are lower than a number of the latest known block. Client software **MUST NOT** return trailing `null` values if the request extends past the current latest known block. Execution Layer client software is expected to download and carry the full block history until EIP-4444 or a similar proposal takes into effect. Consider the following response examples:
    * `[B1.body, B2.body, ..., Bn.body]` -- entire requested range is filled with block bodies,
    * `[null, null, B3.body, ..., Bn.body]` -- first two blocks are unavailable (either pruned or not yet downloaded),
    * `[null, null, ..., null]` -- requested range is behind the latest known block and all blocks are unavailable,
    * `[B1.body, B2.body, B3.body, B4.body]` -- `B4` is the latest known block and trailing `null` values are trimmed,
    * `[]` -- entire requested range is beyond the latest known block,
    * `[null, null, B3.body, B4.body]` -- first two blocks are unavailable, `B4` is the latest known block.

1. Client software **MUST** set `withdrawals` field to `null` for bodies of pre-Shanghai blocks.

1. This request maps to [`BeaconBlocksByRange`](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#beaconblocksbyrange) in the consensus layer `p2p` specification.

1. Callers must be careful to not confuse `start` with a slot number, instead mapping the slot to a block number. Callers must also be careful to request non-finalized blocks by hash in order to avoid race conditions around the current view of the canonical chain.

1. Callers must be careful to verify the hash of the received blocks when requesting non-finalized parts of the chain since the response is prone to being re-orged.

1. Callers must consider that syncing execution layer client may not serve any block bodies, including those that were supplied by `engine_newPayload` calls.


# Engine API -- Prague

Engine API changes introduced in Prague.

This specification is based on and extends [Engine API - Cancun](./cancun.md) specification.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Structures](#structures)
  - [DepositRequestV1](#depositrequestv1)
  - [WithdrawalRequestV1](#withdrawalrequestv1)
  - [ConsolidationRequestV1](#consolidationrequestv1)
  - [ExecutionPayloadV4](#executionpayloadv4)
  - [ExecutionPayloadBodyV2](#executionpayloadbodyv2)
- [Methods](#methods)
  - [engine_newPayloadV4](#engine_newpayloadv4)
    - [Request](#request)
    - [Response](#response)
    - [Specification](#specification)
  - [engine_getPayloadV4](#engine_getpayloadv4)
    - [Request](#request-1)
    - [Response](#response-1)
    - [Specification](#specification-1)
  - [engine_getPayloadBodiesByHashV2](#engine_getpayloadbodiesbyhashv2)
    - [Request](#request-2)
    - [Response](#response-2)
    - [Specification](#specification-2)
  - [engine_getPayloadBodiesByRangeV2](#engine_getpayloadbodiesbyrangev2)
    - [Request](#request-3)
    - [Response](#response-3)
    - [Specification](#specification-3)
  - [Update the methods of previous forks](#update-the-methods-of-previous-forks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Structures

### DepositRequestV1
This structure maps onto the deposit object from [EIP-6110](https://eips.ethereum.org/EIPS/eip-6110).
The fields are encoded as follows:

- `pubkey`: `DATA`, 48 Bytes
- `withdrawalCredentials`: `DATA`, 32 Bytes
- `amount`: `QUANTITY`, 64 Bits
- `signature`: `DATA`, 96 Bytes
- `index`: `QUANTITY`, 64 Bits

*Note:* The `amount` value is represented in Gwei.

### WithdrawalRequestV1
This structure maps onto the withdrawal request from [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002).
The fields are encoded as follows:

- `sourceAddress`: `DATA`, 20 Bytes
- `validatorPubkey`: `DATA`, 48 Bytes
- `amount`: `QUANTITY`, 64 Bits

*Note:* The `amount` value is represented in Gwei.

### ConsolidationRequestV1
This structure maps onto the consolidation request from [EIP-7251](https://eips.ethereum.org/EIPS/eip-7251).
The fields are encoded as follows:

- `sourceAddress`: `DATA`, 20 Bytes
- `sourcePubkey`: `DATA`, 48 Bytes
- `targetPubkey`: `DATA`, 48 Bytes

### ExecutionPayloadV4

This structure has the syntax of [`ExecutionPayloadV3`](./cancun.md#executionpayloadv3) and appends the new fields: `depositRequests` and `withdrawalRequests`.

- `parentHash`: `DATA`, 32 Bytes
- `feeRecipient`:  `DATA`, 20 Bytes
- `stateRoot`: `DATA`, 32 Bytes
- `receiptsRoot`: `DATA`, 32 Bytes
- `logsBloom`: `DATA`, 256 Bytes
- `prevRandao`: `DATA`, 32 Bytes
- `blockNumber`: `QUANTITY`, 64 Bits
- `gasLimit`: `QUANTITY`, 64 Bits
- `gasUsed`: `QUANTITY`, 64 Bits
- `timestamp`: `QUANTITY`, 64 Bits
- `extraData`: `DATA`, 0 to 32 Bytes
- `baseFeePerGas`: `QUANTITY`, 256 Bits
- `blockHash`: `DATA`, 32 Bytes
- `transactions`: `Array of DATA` - Array of transaction objects, each object is a byte list (`DATA`) representing `TransactionType || TransactionPayload` or `LegacyTransaction` as defined in [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)
- `withdrawals`: `Array of WithdrawalV1` - Array of withdrawals, each object is an `OBJECT` containing the fields of a `WithdrawalV1` structure.
- `blobGasUsed`: `QUANTITY`, 64 Bits
- `excessBlobGas`: `QUANTITY`, 64 Bits
- `depositRequests`: `Array of DepositRequestV1` - Array of deposits, each object is an `OBJECT` containing the fields of a `DepositRequestV1` structure.
- `withdrawalRequests`: `Array of WithdrawalRequestV1` - Array of withdrawal requests, each object is an `OBJECT` containing the fields of a `WithdrawalRequestV1` structure.
- `consolidationRequests`: `Array of ConsolidationRequestV1` - Array of consolidation requests, each object is an `OBJECT` containing the fields of a `ConsolidationRequestV1` structure.

### ExecutionPayloadBodyV2

This structure has the syntax of [`ExecutionPayloadBodyV1`](./shanghai.md#executionpayloadv1) and appends the new fields: `depositRequests`, `withdrawalRequests` and `consolidationRequests`.

- `transactions`: `Array of DATA` - Array of transaction objects, each object is a byte list (`DATA`) representing `TransactionType || TransactionPayload` or `LegacyTransaction` as defined in [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)
- `withdrawals`: `Array of WithdrawalV1` - Array of withdrawals, each object is an `OBJECT` containing the fields of a `WithdrawalV1` structure.
- `depositRequests`: `Array of DepositRequestV1` - Array of deposits, each object is an `OBJECT` containing the fields of a `DepositRequestV1` structure.
- `withdrawalRequests`: `Array of WithdrawalRequestV1` - Array of withdrawal requests, each object is an `OBJECT` containing the fields of a `WithdrawalRequestV1` structure.
- `consolidationRequests`: `Array of ConsolidationRequestV1` - Array of consolidation requests, each object is an `OBJECT` containing the fields of a `ConsolidationRequestV1` structure.

## Methods

### engine_newPayloadV4

The request of this method is updated with [`ExecutionPayloadV4`](#ExecutionPayloadV4).

#### Request

* method: `engine_newPayloadV4`
* params:
  1. `executionPayload`: [`ExecutionPayloadV4`](#ExecutionPayloadV4).
  2. `expectedBlobVersionedHashes`: `Array of DATA`, 32 Bytes - Array of expected blob versioned hashes to validate.
  3. `parentBeaconBlockRoot`: `DATA`, 32 Bytes - Root of the parent beacon block.

#### Response

Refer to the response for [`engine_newPayloadV3`](./cancun.md#engine_newpayloadv3).

#### Specification

This method follows the same specification as [`engine_newPayloadV3`](./cancun.md#engine_newpayloadv3) with the following changes:

1. Client software **MUST** return `-38005: Unsupported fork` error if the `timestamp` of the payload does not fall within the time frame of the Prague fork.

### engine_getPayloadV4

The response of this method is updated with [`ExecutionPayloadV4`](#ExecutionPayloadV4).

#### Request

* method: `engine_getPayloadV4`
* params:
  1. `payloadId`: `DATA`, 8 Bytes - Identifier of the payload build process
* timeout: 1s

#### Response

* result: `object`
  - `executionPayload`: [`ExecutionPayloadV4`](#ExecutionPayloadV4)
  - `blockValue` : `QUANTITY`, 256 Bits - The expected value to be received by the `feeRecipient` in wei
  - `blobsBundle`: [`BlobsBundleV1`](#BlobsBundleV1) - Bundle with data corresponding to blob transactions included into `executionPayload`
  - `shouldOverrideBuilder` : `BOOLEAN` - Suggestion from the execution layer to use this `executionPayload` instead of an externally provided one
* error: code and message set in case an exception happens while getting the payload.

#### Specification

This method follows the same specification as [`engine_getPayloadV3`](./cancun.md#engine_getpayloadv3) with the following changes:

1. Client software **MUST** return `-38005: Unsupported fork` error if the `timestamp` of the built payload does not fall within the time frame of the Prague fork.

### engine_getPayloadBodiesByHashV2

The response of this method is updated with [`ExecutionPayloadBodyV2`](#executionpayloadbodyv2).

#### Request

* method: `engine_getPayloadBodiesByHashV2`
* params:
  1. `Array of DATA`, 32 Bytes - Array of `block_hash` field values of the `ExecutionPayload` structure
* timeout: 10s

#### Response

* result: `Array of ExecutionPayloadBodyV2` - Array of [`ExecutionPayloadBodyV2`](#executionpayloadbodyv2) objects.
* error: code and message set in case an exception happens while processing the method call.

#### Specification

This method follows the same specification as [`engine_getPayloadBodiesByHashV1`](./shanghai.md#engine_getpayloadbodiesbyhashv1) with the addition of the following:

1. Client software **MUST** set `depositRequests`, `withdrawalRequests` and `consolidationRequests` fields to `null` for bodies of pre-Prague blocks.

### engine_getPayloadBodiesByRangeV2

The response of this method is updated with [`ExecutionPayloadBodyV2`](#executionpayloadbodyv2).

#### Request

* method: `engine_getPayloadBodiesByRangeV2`
* params:
  1. `start`: `QUANTITY`, 64 bits - Starting block number
  1. `count`: `QUANTITY`, 64 bits - Number of blocks to return
* timeout: 10s

#### Response

* result: `Array of ExecutionPayloadBodyV2` - Array of [`ExecutionPayloadBodyV2`](#executionpayloadbodyv2) objects.
* error: code and message set in case an exception happens while processing the method call.

#### Specification

This method follows the same specification as [`engine_getPayloadBodiesByRangeV2`](./shanghai.md#engine_getpayloadbodiesbyrangev1) with the addition of the following:

1. Client software **MUST** set `depositRequests`, `withdrawalRequests` and `consolidationRequests` fields to `null` for bodies of pre-Prague blocks.

### Update the methods of previous forks

This document defines how Prague payload should be handled by the [`Cancun API`](./cancun.md).

For the following methods:

- [`engine_newPayloadV3`](./cancun.md#engine_newpayloadV3)
- [`engine_getPayloadV3`](./cancun.md#engine_getpayloadv3)

a validation **MUST** be added:

1. Client software **MUST** return `-38005: Unsupported fork` error if the `timestamp` of payload or payloadAttributes greater or equal to the Prague activation timestamp.


# Engine API -- Paris

Engine API structures and methods specified for Paris.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Structures](#structures)
  - [ExecutionPayloadV1](#executionpayloadv1)
  - [ForkchoiceStateV1](#forkchoicestatev1)
  - [PayloadAttributesV1](#payloadattributesv1)
  - [PayloadStatusV1](#payloadstatusv1)
  - [TransitionConfigurationV1](#transitionconfigurationv1)
- [Routines](#routines)
  - [Payload validation](#payload-validation)
  - [Sync](#sync)
  - [Payload building](#payload-building)
- [Methods](#methods)
  - [engine_newPayloadV1](#engine_newpayloadv1)
    - [Request](#request)
    - [Response](#response)
    - [Specification](#specification)
  - [engine_forkchoiceUpdatedV1](#engine_forkchoiceupdatedv1)
    - [Request](#request-1)
    - [Response](#response-1)
    - [Specification](#specification-1)
  - [engine_getPayloadV1](#engine_getpayloadv1)
    - [Request](#request-2)
    - [Response](#response-2)
    - [Specification](#specification-2)
  - [engine_exchangeTransitionConfigurationV1](#engine_exchangetransitionconfigurationv1)
    - [Request](#request-3)
    - [Response](#response-3)
    - [Specification](#specification-3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## Structures

### ExecutionPayloadV1

This structure maps on the [`ExecutionPayload`](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/beacon-chain.md#ExecutionPayload) structure of the beacon chain spec. The fields are encoded as follows:

- `parentHash`: `DATA`, 32 Bytes
- `feeRecipient`:  `DATA`, 20 Bytes
- `stateRoot`: `DATA`, 32 Bytes
- `receiptsRoot`: `DATA`, 32 Bytes
- `logsBloom`: `DATA`, 256 Bytes
- `prevRandao`: `DATA`, 32 Bytes
- `blockNumber`: `QUANTITY`, 64 Bits
- `gasLimit`: `QUANTITY`, 64 Bits
- `gasUsed`: `QUANTITY`, 64 Bits
- `timestamp`: `QUANTITY`, 64 Bits
- `extraData`: `DATA`, 0 to 32 Bytes
- `baseFeePerGas`: `QUANTITY`, 256 Bits
- `blockHash`: `DATA`, 32 Bytes
- `transactions`: `Array of DATA` - Array of transaction objects, each object is a byte list (`DATA`) representing `TransactionType || TransactionPayload` or `LegacyTransaction` as defined in [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)

### ForkchoiceStateV1

This structure encapsulates the fork choice state. The fields are encoded as follows:

- `headBlockHash`: `DATA`, 32 Bytes - block hash of the head of the canonical chain
- `safeBlockHash`: `DATA`, 32 Bytes - the "safe" block hash of the canonical chain under certain synchrony and honesty assumptions. This value **MUST** be either equal to or an ancestor of `headBlockHash`
- `finalizedBlockHash`: `DATA`, 32 Bytes - block hash of the most recent finalized block

*Note:* `safeBlockHash` and `finalizedBlockHash` fields are allowed to have `0x0000000000000000000000000000000000000000000000000000000000000000` value unless transition block is finalized.

### PayloadAttributesV1

This structure contains the attributes required to initiate a payload build process in the context of an `engine_forkchoiceUpdated` call. The fields are encoded as follows:

- `timestamp`: `QUANTITY`, 64 Bits - value for the `timestamp` field of the new payload
- `prevRandao`: `DATA`, 32 Bytes - value for the `prevRandao` field of the new payload
- `suggestedFeeRecipient`: `DATA`, 20 Bytes - suggested value for the `feeRecipient` field of the new payload

### PayloadStatusV1

This structure contains the result of processing a payload. The fields are encoded as follows:

- `status`: `enum` - `"VALID" | "INVALID" | "SYNCING" | "ACCEPTED" | "INVALID_BLOCK_HASH"`
- `latestValidHash`: `DATA|null`, 32 Bytes - the hash of the most recent *valid* block in the branch defined by payload and its ancestors
- `validationError`: `String|null` - a message providing additional details on the validation error if the payload is classified as `INVALID` or `INVALID_BLOCK_HASH`.

### TransitionConfigurationV1

This structure contains configurable settings of the transition process. The fields are encoded as follows:
- `terminalTotalDifficulty`: `QUANTITY`, 256 Bits - maps on the `TERMINAL_TOTAL_DIFFICULTY` parameter of [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675#client-software-configuration)
- `terminalBlockHash`: `DATA`, 32 Bytes - maps on `TERMINAL_BLOCK_HASH` parameter of [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675#client-software-configuration)
- `terminalBlockNumber`: `QUANTITY`, 64 Bits - maps on `TERMINAL_BLOCK_NUMBER` parameter of [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675#client-software-configuration)

## Routines

### Payload validation

Payload validation process consists of validating a payload with respect to the block header and execution environment rule sets. The process is specified as follows:

1. Client software **MAY** obtain a parent state by executing ancestors of a payload as a part of the validation process. In this case each ancestor **MUST** also pass payload validation process.

2. Client software **MUST** validate that the most recent PoW block in the chain of a payload ancestors satisfies terminal block conditions according to [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675#transition-block-validity). This check maps to the transition block validity section of the EIP. If this validation fails, the response **MUST** contain `{status: INVALID, latestValidHash: 0x0000000000000000000000000000000000000000000000000000000000000000}`. Additionally, each block in a tree of descendants of an invalid terminal block **MUST** be deemed `INVALID`.

3. Client software **MUST** validate a payload according to the block header and execution environment rule set with modifications to these rule sets defined in the [Block Validity](https://eips.ethereum.org/EIPS/eip-3675#block-validity) section of [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675#specification):
  * If validation succeeds, the response **MUST** contain `{status: VALID, latestValidHash: payload.blockHash}`
  * If validation fails, the response **MUST** contain `{status: INVALID, latestValidHash: validHash}` where `validHash` **MUST** be:
    - The block hash of the ancestor of the invalid payload satisfying the following two conditions:
      - It is fully validated and deemed `VALID`
      - Any other ancestor of the invalid payload with a higher `blockNumber` is `INVALID`
    - `0x0000000000000000000000000000000000000000000000000000000000000000` if the above conditions are satisfied by a PoW block.
    - `null` if client software cannot determine the ancestor of the invalid
      payload satisfying the above conditions.
  * Client software **MUST NOT** surface an `INVALID` payload over any API endpoint and p2p interface.

4. Payload validation process **MUST** be idempotent with respect to payload's validity status (`VALID | INVALID`), i.e. a payload which validity status is `INVALID (INVALID_BLOCK_HASH)` **MUST NOT** become `VALID` and vice versa at any point in time when it subsequently runs through the validation process. Client software **MAY** change payload status from `INVALID` to `SYNCING | ACCEPTED` as long as the payload remains `INVALID` as a result of any further run of the validation process.

5. Client software **MAY** provide additional details on the validation error if a payload is deemed `INVALID` by assigning the corresponding message to the `validationError` field.

6. The process of validating a payload on the canonical chain **MUST NOT** be affected by an active sync process on a side branch of the block tree. For example, if side branch `B` is `SYNCING` but the requisite data for validating a payload from canonical branch `A` is available, client software **MUST** run full validation of the payload and respond accordingly.

### Sync

In the context of this specification, the sync is understood as the process of obtaining data required to validate a payload. The sync process may consist of the following stages:

1. Pulling data from remote peers in the network.
2. Passing ancestors of a payload through the [Payload validation](#payload-validation) and obtaining a parent state.

*Note:* Each of these stages is optional. Exact behavior of client software during the sync process is implementation dependent.

### Payload building

The payload build process is specified as follows:

1. Client software **MUST** set the payload field values according to the set of parameters passed into this method with exception of the `suggestedFeeRecipient`. The built `ExecutionPayload` **MAY** deviate the `feeRecipient` field value from what is specified by the `suggestedFeeRecipient` parameter.

2. Client software **SHOULD** build the initial version of the payload which has an empty transaction set.

3. Client software **SHOULD** start the process of updating the payload. The strategy of this process is implementation dependent. The default strategy is to keep the transaction set up-to-date with the state of local mempool.

4. Client software **SHOULD** stop the updating process when either a call to `engine_getPayload` with the build process's `payloadId` is made or [`SECONDS_PER_SLOT`](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#time-parameters-1) (12s in the Mainnet configuration) have passed since the point in time identified by the `timestamp` parameter.

5. Client software **MUST** begin a new build process if given `PayloadAttributes` doesn't match payload attributes of an existing build process.
   Every new build process **MUST** be uniquely identified by the returned `payloadId` value.

6. If a build process with given `PayloadAttributes` already exists, client software **SHOULD NOT** restart it.

## Methods

### engine_newPayloadV1

#### Request

* method: `engine_newPayloadV1`
* params:
  1. [`ExecutionPayloadV1`](#ExecutionPayloadV1)
* timeout: 8s

#### Response

* result: [`PayloadStatusV1`](#PayloadStatusV1)
* error: code and message set in case an exception happens while processing the payload.

#### Specification

1. Client software **MUST** validate `blockHash` value as being equivalent to `Keccak256(RLP(ExecutionBlockHeader))`, where `ExecutionBlockHeader` is the execution layer block header (the former PoW block header structure). Fields of this object are set to the corresponding payload values and constant values according to the Block structure section of [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675#block-structure), extended with the corresponding section of [EIP-4399](https://eips.ethereum.org/EIPS/eip-4399#block-structure). Client software **MUST** run this validation in all cases even if this branch or any other branches of the block tree are in an active sync process.

2. Client software **MAY** initiate a sync process if requisite data for payload validation is missing. Sync process is specified in the [Sync](#sync) section.

3. Client software **MUST** validate the payload if it extends the canonical chain and requisite data for the validation is locally available. The validation process is specified in the [Payload validation](#payload-validation) section.

4. Client software **MAY NOT** validate the payload if the payload doesn't belong to the canonical chain.

5. Client software **MUST** respond to this method call in the following way:
  * `{status: INVALID_BLOCK_HASH, latestValidHash: null, validationError: errorMessage | null}` if the `blockHash` validation has failed
  * `{status: INVALID, latestValidHash: 0x0000000000000000000000000000000000000000000000000000000000000000, validationError: errorMessage | null}` if terminal block conditions are not satisfied
  * `{status: SYNCING, latestValidHash: null, validationError: null}` if requisite data for the payload's acceptance or validation is missing
  * with the payload status obtained from the [Payload validation](#payload-validation) process if the payload has been fully validated while processing the call
  * `{status: ACCEPTED, latestValidHash: null, validationError: null}` if the following conditions are met:
    - the `blockHash` of the payload is valid
    - the payload doesn't extend the canonical chain
    - the payload hasn't been fully validated
    - ancestors of a payload are known and comprise a well-formed chain.

6. If any of the above fails due to errors unrelated to the normal processing flow of the method, client software **MUST** respond with an error object.

### engine_forkchoiceUpdatedV1

#### Request

* method: "engine_forkchoiceUpdatedV1"
* params:
  1. `forkchoiceState`: `Object` - instance of [`ForkchoiceStateV1`](#ForkchoiceStateV1)
  2. `payloadAttributes`: `Object|null` - instance of [`PayloadAttributesV1`](#PayloadAttributesV1) or `null`
* timeout: 8s

#### Response

* result: `object`
  - `payloadStatus`: [`PayloadStatusV1`](#PayloadStatusV1); values of the `status` field in the context of this method are restricted to the following subset:
    * `"VALID"`
    * `"INVALID"`
    * `"SYNCING"`
  - `payloadId`: `DATA|null`, 8 Bytes - identifier of the payload build process or `null`
* error: code and message set in case an exception happens while the validating payload, updating the forkchoice or initiating the payload build process.

#### Specification

1. Client software **MAY** initiate a sync process if `forkchoiceState.headBlockHash` references an unknown payload or a payload that can't be validated because data that are requisite for the validation is missing. The sync process is specified in the [Sync](#sync) section.

2. Client software **MAY** skip an update of the forkchoice state and **MUST NOT** begin a payload build process if `forkchoiceState.headBlockHash` references a `VALID` ancestor of the head of canonical chain, i.e. the ancestor passed [payload validation](#payload-validation) process and deemed `VALID`. In the case of such an event, client software **MUST** return `{payloadStatus: {status: VALID, latestValidHash: forkchoiceState.headBlockHash, validationError: null}, payloadId: null}`.

3. If `forkchoiceState.headBlockHash` references a PoW block, client software **MUST** validate this block with respect to terminal block conditions according to [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675#transition-block-validity). This check maps to the transition block validity section of the EIP. Additionally, if this validation fails, client software **MUST NOT** update the forkchoice state and **MUST NOT** begin a payload build process.

4. Before updating the forkchoice state, client software **MUST** ensure the validity of the payload referenced by `forkchoiceState.headBlockHash`, and **MAY** validate the payload while processing the call. The validation process is specified in the [Payload validation](#payload-validation) section. If the validation process fails, client software **MUST NOT** update the forkchoice state and **MUST NOT** begin a payload build process.

5. Client software **MUST** update its forkchoice state if payloads referenced by `forkchoiceState.headBlockHash` and `forkchoiceState.finalizedBlockHash` are `VALID`. The update is specified as follows:
  * The values `(forkchoiceState.headBlockHash, forkchoiceState.finalizedBlockHash)` of this method call map on the `POS_FORKCHOICE_UPDATED` event of [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675#block-validity) and **MUST** be processed according to the specification defined in the EIP
  * All updates to the forkchoice state resulting from this call **MUST** be made atomically.

6. Client software **MUST** return `-38002: Invalid forkchoice state` error if the payload referenced by `forkchoiceState.headBlockHash` is `VALID` and a payload referenced by either `forkchoiceState.finalizedBlockHash` or `forkchoiceState.safeBlockHash` does not belong to the chain defined by `forkchoiceState.headBlockHash`.

7. Client software **MUST** process provided `payloadAttributes` after successfully applying the `forkchoiceState` and only if the payload referenced by `forkchoiceState.headBlockHash` is `VALID`. The processing flow is as follows:

    1. Verify that `payloadAttributes.timestamp` is greater than `timestamp` of a block referenced by `forkchoiceState.headBlockHash` and return `-38003: Invalid payload attributes` on failure.

    2. If `payloadAttributes` passes all validation steps, begin a payload build process building on top of `forkchoiceState.headBlockHash` and identified via `buildProcessId` value. The build process is specified in the [Payload building](#payload-building) section.

    3. If `payloadAttributes` validation fails, the `forkchoiceState` update **MUST NOT** be rolled back.

8. Client software **MUST** respond to this method call in the following way:
  * `{payloadStatus: {status: SYNCING, latestValidHash: null, validationError: null}, payloadId: null}` if `forkchoiceState.headBlockHash` references an unknown payload or a payload that can't be validated because requisite data for the validation is missing
  * `{payloadStatus: {status: INVALID, latestValidHash: validHash, validationError: errorMessage | null}, payloadId: null}` obtained from the [Payload validation](#payload-validation) process if the payload is deemed `INVALID`
  * `{payloadStatus: {status: INVALID, latestValidHash: 0x0000000000000000000000000000000000000000000000000000000000000000, validationError: errorMessage | null}, payloadId: null}` obtained either from the [Payload validation](#payload-validation) process or as a result of validating a terminal PoW block referenced by `forkchoiceState.headBlockHash`
  * `{payloadStatus: {status: VALID, latestValidHash: forkchoiceState.headBlockHash, validationError: null}, payloadId: null}` if the payload is deemed `VALID` and a build process hasn't been started
  * `{payloadStatus: {status: VALID, latestValidHash: forkchoiceState.headBlockHash, validationError: null}, payloadId: buildProcessId}` if the payload is deemed `VALID` and the build process has begun
  * `{error: {code: -38002, message: "Invalid forkchoice state"}}` if `forkchoiceState` is either invalid or inconsistent
  * `{error: {code: -38003, message: "Invalid payload attributes"}}` if the payload is deemed `VALID` and `forkchoiceState` has been applied successfully, but no build process has been started due to invalid `payloadAttributes`.

9. If any of the above fails due to errors unrelated to the normal processing flow of the method, client software **MUST** respond with an error object.

### engine_getPayloadV1

#### Request

* method: `engine_getPayloadV1`
* params:
  1. `payloadId`: `DATA`, 8 Bytes - Identifier of the payload build process
* timeout: 1s

#### Response

* result: [`ExecutionPayloadV1`](#ExecutionPayloadV1)
* error: code and message set in case an exception happens while getting the payload.

#### Specification

1. Given the `payloadId` client software **MUST** return the most recent version of the payload that is available in the corresponding build process at the time of receiving the call.

2. The call **MUST** return `-38001: Unknown payload` error if the build process identified by the `payloadId` does not exist.

3. Client software **MAY** stop the corresponding build process after serving this call.

### engine_exchangeTransitionConfigurationV1

#### Request

* method: `engine_exchangeTransitionConfigurationV1`
* params:
  1. `transitionConfiguration`: `Object` - instance of [`TransitionConfigurationV1`](#TransitionConfigurationV1)
* timeout: 1s

#### Response

* result: [`TransitionConfigurationV1`](#TransitionConfigurationV1)
* error: code and message set in case an exception happens while getting a transition configuration.

#### Specification

1. Execution Layer client software **MUST** respond with configurable setting values that are set according to the Client software configuration section of [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675#client-software-configuration).

2. Execution Layer client software **SHOULD** surface an error to the user if local configuration settings mismatch corresponding values received in the call of this method, with exception for `terminalBlockNumber` value.

3. Consensus Layer client software **SHOULD** surface an error to the user if local configuration settings mismatch corresponding values obtained from the response to the call of this method.

4. Consensus Layer client software **SHOULD** poll this endpoint every 60 seconds.

5. Execution Layer client software **SHOULD** surface an error to the user if it does not receive a request on this endpoint at least once every 120 seconds.

6. Considering the absence of the `TERMINAL_BLOCK_NUMBER` setting, Consensus Layer client software **MAY** use `0` value for the `terminalBlockNumber` field in the input parameters of this call.

7. Considering the absence of the `TERMINAL_TOTAL_DIFFICULTY` value (i.e. when a value has not been decided), Consensus Layer and Execution Layer client software **MUST** use `115792089237316195423570985008687907853269984665640564039457584007913129638912` value (equal to`2**256-2**10`) for the `terminalTotalDifficulty` input parameter of this call.


# Engine API -- Client Version Specification

Engine API structures and methods specified for client version specification.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Client Version Specification](#client-version-specification)
- [Structures](#structures)
  - [ClientCode](#clientcode)
  - [ClientVersionV1](#clientversionv1)
- [Methods](#methods)
  - [engine_getClientVersionV1](#engine_getclientversionv1)
    - [Request](#request)
    - [Response](#response)
    - [Specification](#specification)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Client Version Specification

To facilitate a more accurate measurement of execution layer client diversity statistics, execution clients **SHOULD** support the methods described in this document.

## Structures

### ClientCode

This enum defines a standard for specifying a client with just two letters. Clients teams which have a code reserved in this list **MUST** use this code when identifying themselves. The code is specified here only to facilitate standardization and NOT to imply that these are the only supported Ethereum clients. Any clients not listed here are free to use any two letters which don't collide with an existing client code. They are encouraged to make a PR to this repo to reserve their own code. Existing codes are as follows:

 - `BU`: besu
 - `EJ`: ethereumJS
 - `EG`: erigon
 - `GE`: go-ethereum
 - `GR`: grandine
 - `LH`: lighthouse
 - `LS`: lodestar
 - `NM`: nethermind
 - `NB`: nimbus
 - `TK`: teku
 - `PM`: prysm
 - `RH`: reth

### ClientVersionV1

This structure contains information which identifies a client implementation. The fields are encoded as follows:

- `code`: `ClientCode`, e.g. `NB` or `BU`
- `name`: `string`, Human-readable name of the client, e.g. `Lighthouse` or `go-ethereum`
- `version`: `string`, the version string of the current implementation e.g. `v4.6.0` or `1.0.0-alpha.1` or `1.0.0+20130313144700`
- `commit`: `DATA`, 4 bytes - first four bytes of the latest commit hash of this build e.g. `fa4ff922`

Rationale: Human-readable fields like `clientName` and `version` are useful for log messages while fields like `code` and `commit` are useful for uniquely specifying clients within a limited space (e.g. in block `graffiti`).

## Methods

### engine_getClientVersionV1

#### Request

* method: `engine_getClientVersionV1`
* params:
  1. [`ClientVersionV1`](#ClientVersionV1) - identifies the consensus client
* timeout: 1s

#### Response
* result: `Array of ClientVersionV1` - Array of [`ClientVersionV1`](#ClientVersionV1)

#### Specification

1. Consensus and execution layer clients **MAY** exchange `ClientVersionV1` objects. Execution clients **MUST NOT** log any error messages if this method has either never been called or hasn't been called for a significant amount of time.
2. Clients **MUST** accommodate receiving any two-letter `ClientCode`, even if they are not reserved in the list above. Clients **MAY** log messages upon receiving an unlisted client code.
3. When connected to a single execution client, the consensus client **MUST** receive an array with a single
`ClientVersionV1` object. When connected to multiple execution clients via a multiplexer, the multiplexer **MUST** concatenate the responses from each execution client into a single, flat array before returning the
response to the consensus client.

# Engine API -- Common Definitions

This document specifies common definitions and requirements affecting Engine API specification in general.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Underlying protocol](#underlying-protocol)
  - [Authentication](#authentication)
- [Versioning](#versioning)
- [Message ordering](#message-ordering)
- [Load-balancing and advanced configurations](#load-balancing-and-advanced-configurations)
- [Errors](#errors)
- [Timeouts](#timeouts)
- [Encoding](#encoding)
- [Capabilities](#capabilities)
  - [engine_exchangeCapabilities](#engine_exchangecapabilities)
    - [Request](#request)
    - [Response](#response)
    - [Specification](#specification)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Underlying protocol

Message format and encoding notation used by this specification are inherited
from [Ethereum JSON-RPC Specification][json-rpc-spec].

Client software **MUST** expose Engine API at a port independent from JSON-RPC API.
The default port for the Engine API is 8551.
The Engine API is exposed under the `engine` namespace.

To facilitate an Engine API consumer to access state and logs (e.g. proof-of-stake deposits) through the same connection,
the client **MUST** also expose the following subset of `eth` methods:
* `eth_blockNumber`
* `eth_call`
* `eth_chainId`
* `eth_getCode`
* `eth_getBlockByHash`
* `eth_getBlockByNumber`
* `eth_getLogs`
* `eth_sendRawTransaction`
* `eth_syncing`

These methods are described in [Ethereum JSON-RPC Specification][json-rpc-spec].

### Authentication

Engine API uses JWT authentication enabled by default.
JWT authentication is specified in [Authentication](./authentication.md) document.

## Versioning

The versioning of the Engine API is defined as follows:

* The version of each method and structure is independent from versions of other methods and structures.
* The `VX`, where the `X` is the number of the version, is suffixed to the name of each method and structure.
* The version of a method or a structure **MUST** be incremented by one if any of the following is changed:
  * a set of method parameters
  * a method response value
  * a method behavior
  * a set of structure fields
* The specification **MAY** reference a method or a structure without the version suffix e.g. `engine_newPayload`. These statements should be read as related to all versions of the referenced method or structure.

## Message ordering

Consensus Layer client software **MUST** respect the order of the corresponding fork choice update events
when making calls to the `engine_forkchoiceUpdated` method.

Execution Layer client software **MUST** process `engine_forkchoiceUpdated` method calls
in the same order as they have been received.

## Load-balancing and advanced configurations

The Engine API supports a one-to-many Consensus Layer to Execution Layer configuration.
Intuitively this is because the Consensus Layer drives the Execution Layer and thus can drive many of them independently.

On the other hand, generic many-to-one Consensus Layer to Execution Layer configurations are not supported out-of-the-box.
The Execution Layer, by default, only supports one chain head at a time and thus has undefined behavior when multiple Consensus Layers simultaneously control the head.
The Engine API does work properly, if in such a many-to-one configuration, only one Consensus Layer instantiation is able to *write* to the Execution Layer's chain head and initiate the payload build process (i.e. call `engine_forkchoiceUpdated` ),
while other Consensus Layers can only safely insert payloads (i.e. `engine_newPayload`) and read from the Execution Layer.

## Errors

The list of error codes introduced by this specification can be found below.

| Code | Message | Meaning |
| - | - | - |
| -32700 | Parse error | Invalid JSON was received by the server. |
| -32600 | Invalid Request | The JSON sent is not a valid Request object. |
| -32601 | Method not found | The method does not exist / is not available. |
| -32602 | Invalid params | Invalid method parameter(s). |
| -32603 | Internal error | Internal JSON-RPC error. |
| -32000 | Server error | Generic client error while processing request. |
| -38001 | Unknown payload | Payload does not exist / is not available. |
| -38002 | Invalid forkchoice state | Forkchoice state is invalid / inconsistent. |
| -38003 | Invalid payload attributes | Payload attributes are invalid / inconsistent. |
| -38004 | Too large request | Number of requested entities is too large. |
| -38005 | Unsupported fork | Payload belongs to a fork that is not supported. |

Each error returns a `null` `data` value, except `-32000` which returns the `data` object with a `err` member that explains the error encountered.

For example:

```console
$ curl https://localhost:8551 \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"engine_getPayloadV1","params": ["0x1"],"id":1}'
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32000,
    "message": "Server error",
    "data": {
        "err": "Database corrupted"
    }
  }
}
```

## Timeouts

Consensus Layer client software **MUST** wait for a specified `timeout` before aborting the call. In such an event, the Consensus Layer client software **SHOULD** retry the call when it is needed to keep progressing.

Consensus Layer client software **MAY** wait for response longer than it is specified by the `timeout` parameter.

## Encoding

Values of a field of `DATA` type **MUST** be encoded as a hexadecimal string with a `0x` prefix matching the regular expression `^0x(?:[a-fA-F0-9]{2})*$`.

Values of a field of `QUANTITY` type **MUST** be encoded as a hexadecimal string with a `0x` prefix and the leading 0s stripped (except for the case of encoding the value `0`) matching the regular expression `^0x(?:0|(?:[a-fA-F1-9][a-fA-F0-9]*))$`.

*Note:* Byte order of encoded value having `QUANTITY` type is big-endian.

[json-rpc-spec]: https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/execution-apis/assembled-spec/openrpc.json&uiSchema[appBar][ui:splitView]=false&uiSchema[appBar][ui:input]=false&uiSchema[appBar][ui:examplesDropdown]=false

## Capabilities

Execution and consensus layer client software may exchange with a list of supported Engine API methods by calling `engine_exchangeCapabilities` method.

Execution layer clients **MUST** support `engine_exchangeCapabilities` method, while consensus layer clients are free to choose whether to call it or not.

*Note:* The method itself doesn't have a version suffix.

### engine_exchangeCapabilities

#### Request

* method: `engine_exchangeCapabilities`
* params:
    1. `Array of string` -- Array of strings, each string is a name of a method supported by consensus layer client software.
* timeout: 1s

#### Response

`Array of string` -- Array of strings, each string is a name of a method supported by execution layer client software.

#### Specification

1. Consensus and execution layer client software **MAY** exchange with a list of currently supported Engine API methods. Execution layer client software **MUST NOT** log any error messages if this method has either never been called or hasn't been called for a significant amount of time.

2. Request and response lists **MUST** contain Engine API methods that are currently supported by consensus and execution client software respectively. Name of each method in both lists **MUST** include suffixed version. Consider the following examples:
    * Client software of both layers currently supports `V1` and `V2` versions of `engine_newPayload` method:
        * params: `[["engine_newPayloadV1", "engine_newPayloadV2", ...]]`,
        * response: `["engine_newPayloadV1", "engine_newPayloadV2", ...]`.
    * `V1` method has been deprecated and `V3` method has been introduced on execution layer side since the last call:
        * params: `[["engine_newPayloadV1", "engine_newPayloadV2", ...]]`,
        * response: `["engine_newPayloadV2", "engine_newPayloadV3", ...]`.
    * The same capabilities modification has happened in consensus layer client, so, both clients have the same capability set again:
        * params: `[["engine_newPayloadV2", "engine_newPayloadV3", ...]]`,
        * response: `["engine_newPayloadV2", "engine_newPayloadV3", ...]`.

3. The `engine_exchangeCapabilities` method **MUST NOT** be returned in the response list.


# Engine API -- Cancun

Engine API changes introduced in Cancun.

This specification is based on and extends [Engine API - Shanghai](./shanghai.md) specification.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Structures](#structures)
  - [ExecutionPayloadV3](#executionpayloadv3)
  - [BlobsBundleV1](#blobsbundlev1)
  - [PayloadAttributesV3](#payloadattributesv3)
- [Methods](#methods)
  - [engine_newPayloadV3](#engine_newpayloadv3)
    - [Request](#request)
    - [Response](#response)
    - [Specification](#specification)
  - [engine_forkchoiceUpdatedV3](#engine_forkchoiceupdatedv3)
    - [Request](#request-1)
    - [Response](#response-1)
    - [Specification](#specification-1)
  - [engine_getPayloadV3](#engine_getpayloadv3)
    - [Request](#request-2)
    - [Response](#response-2)
    - [Specification](#specification-2)
  - [Deprecate `engine_exchangeTransitionConfigurationV1`](#deprecate-engine_exchangetransitionconfigurationv1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Structures

### ExecutionPayloadV3

This structure has the syntax of [`ExecutionPayloadV2`](./shanghai.md#executionpayloadv2) and appends the new fields: `blobGasUsed` and `excessBlobGas`.

- `parentHash`: `DATA`, 32 Bytes
- `feeRecipient`:  `DATA`, 20 Bytes
- `stateRoot`: `DATA`, 32 Bytes
- `receiptsRoot`: `DATA`, 32 Bytes
- `logsBloom`: `DATA`, 256 Bytes
- `prevRandao`: `DATA`, 32 Bytes
- `blockNumber`: `QUANTITY`, 64 Bits
- `gasLimit`: `QUANTITY`, 64 Bits
- `gasUsed`: `QUANTITY`, 64 Bits
- `timestamp`: `QUANTITY`, 64 Bits
- `extraData`: `DATA`, 0 to 32 Bytes
- `baseFeePerGas`: `QUANTITY`, 256 Bits
- `blockHash`: `DATA`, 32 Bytes
- `transactions`: `Array of DATA` - Array of transaction objects, each object is a byte list (`DATA`) representing `TransactionType || TransactionPayload` or `LegacyTransaction` as defined in [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)
- `withdrawals`: `Array of WithdrawalV1` - Array of withdrawals, each object is an `OBJECT` containing the fields of a `WithdrawalV1` structure.
- `blobGasUsed`: `QUANTITY`, 64 Bits
- `excessBlobGas`: `QUANTITY`, 64 Bits

### BlobsBundleV1

The fields are encoded as follows:

- `commitments`: `Array of DATA` - Array of `KZGCommitment` as defined in [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), 48 bytes each (`DATA`).
- `proofs`: `Array of DATA` - Array of `KZGProof` as defined in [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), 48 bytes each (`DATA`).
- `blobs`: `Array of DATA` - Array of blobs, each blob is `FIELD_ELEMENTS_PER_BLOB * BYTES_PER_FIELD_ELEMENT = 4096 * 32 = 131072` bytes (`DATA`) representing a SSZ-encoded `Blob` as defined in [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)

All of the above three arrays **MUST** be of same length.

### PayloadAttributesV3

This structure has the syntax of [`PayloadAttributesV2`](./shanghai.md#payloadattributesv2) and appends a single field: `parentBeaconBlockRoot`.

- `timestamp`: `QUANTITY`, 64 Bits - value for the `timestamp` field of the new payload
- `prevRandao`: `DATA`, 32 Bytes - value for the `prevRandao` field of the new payload
- `suggestedFeeRecipient`: `DATA`, 20 Bytes - suggested value for the `feeRecipient` field of the new payload
- `withdrawals`: `Array of WithdrawalV1` - Array of withdrawals, each object is an `OBJECT` containing the fields of a `WithdrawalV1` structure.
- `parentBeaconBlockRoot`: `DATA`, 32 Bytes - Root of the parent beacon block.

## Methods

### engine_newPayloadV3

#### Request

* method: `engine_newPayloadV3`
* params:
  1. `executionPayload`: [`ExecutionPayloadV3`](#ExecutionPayloadV3).
  2. `expectedBlobVersionedHashes`: `Array of DATA`, 32 Bytes - Array of expected blob versioned hashes to validate.
  3. `parentBeaconBlockRoot`: `DATA`, 32 Bytes - Root of the parent beacon block.

#### Response

Refer to the response for [`engine_newPayloadV2`](./shanghai.md#engine_newpayloadv2).

#### Specification

This method follows the same specification as [`engine_newPayloadV2`](./shanghai.md#engine_newpayloadv2) with the addition of the following:

1. Client software **MUST** check that provided set of parameters and their fields strictly matches the expected one and return `-32602: Invalid params` error if this check fails. Any field having `null` value **MUST** be considered as not provided.

2. Client software **MUST** return `-38005: Unsupported fork` error if the `timestamp` of the payload does not fall within the time frame of the Cancun fork.

3. Given the expected array of blob versioned hashes client software **MUST** run its validation by taking the following steps:
    1. Obtain the actual array by concatenating blob versioned hashes lists (`tx.blob_versioned_hashes`) of each [blob transaction](https://eips.ethereum.org/EIPS/eip-4844#new-transaction-type) included in the payload, respecting the order of inclusion. If the payload has no blob transactions the expected array **MUST** be `[]`.
    2. Return `{status: INVALID, latestValidHash: null, validationError: errorMessage | null}` if the expected and the actual arrays don't match.

    This validation **MUST** be instantly run in all cases even during active sync process.

### engine_forkchoiceUpdatedV3

#### Request

* method: `engine_forkchoiceUpdatedV3`
* params:
  1. `forkchoiceState`: [`ForkchoiceStateV1`](./paris.md#ForkchoiceStateV1).
  2. `payloadAttributes`: `Object|null` - Instance of [`PayloadAttributesV3`](#payloadattributesv3) or `null`.
* timeout: 8s

#### Response

Refer to the response for [`engine_forkchoiceUpdatedV2`](./shanghai.md#engine_forkchoiceupdatedv2).

#### Specification

This method follows the same specification as [`engine_forkchoiceUpdatedV2`](./shanghai.md#engine_forkchoiceupdatedv2) with the following changes to the processing flow:

1. Client software **MUST** verify that `forkchoiceState` matches the [`ForkchoiceStateV1`](./paris.md#ForkchoiceStateV1) structure and return `-32602: Invalid params` on failure.

2. Extend point (7) of the `engine_forkchoiceUpdatedV1` [specification](./paris.md#specification-1) by defining the following sequence of checks that **MUST** be run over `payloadAttributes`:

    1. `payloadAttributes` matches the [`PayloadAttributesV3`](#payloadattributesv3) structure, return `-38003: Invalid payload attributes` on failure.

    2. `payloadAttributes.timestamp` falls within the time frame of the Cancun fork, return `-38005: Unsupported fork` on failure.

    3. `payloadAttributes.timestamp` is greater than `timestamp` of a block referenced by `forkchoiceState.headBlockHash`, return `-38003: Invalid payload attributes` on failure.

    4. If any of the above checks fails, the `forkchoiceState` update **MUST NOT** be rolled back.

### engine_getPayloadV3

The response of this method is extended with [`BlobsBundleV1`](#blobsbundlev1) containing the blobs, their respective KZG commitments
and proofs corresponding to the `versioned_hashes` included in the blob transactions of the execution payload.

#### Request

* method: `engine_getPayloadV3`
* params:
  1. `payloadId`: `DATA`, 8 Bytes - Identifier of the payload build process
* timeout: 1s

#### Response

* result: `object`
  - `executionPayload`: [`ExecutionPayloadV3`](#ExecutionPayloadV3)
  - `blockValue` : `QUANTITY`, 256 Bits - The expected value to be received by the `feeRecipient` in wei
  - `blobsBundle`: [`BlobsBundleV1`](#BlobsBundleV1) - Bundle with data corresponding to blob transactions included into `executionPayload`
  - `shouldOverrideBuilder` : `BOOLEAN` - Suggestion from the execution layer to use this `executionPayload` instead of an externally provided one
* error: code and message set in case an exception happens while getting the payload.

#### Specification

Refer to the specification for [`engine_getPayloadV2`](./shanghai.md#engine_getpayloadv2) with addition of the following:

1. Client software **MUST** return `-38005: Unsupported fork` error if the `timestamp` of the built payload does not fall within the time frame of the Cancun fork.

2. The call **MUST** return `blobsBundle` with empty `blobs`, `commitments` and `proofs` if the payload doesn't contain any blob transactions.

3. The call **MUST** return `commitments` matching the versioned hashes of the transactions list of the execution payload, in the same order,
   i.e. `assert verify_kzg_commitments_against_transactions(payload.transactions, blobsBundle.commitments)` (see EIP-4844 consensus-specs).

4. The call **MUST** return `blobs` and `proofs` that match the `commitments` list, i.e. `assert len(blobsBundle.commitments) == len(blobsBundle.blobs) == len(blobsBundle.proofs)` and `assert verify_blob_kzg_proof_batch(blobsBundle.blobs, blobsBundle.commitments, blobsBundle.proofs)`.

5. Client software **MAY** use any heuristics to decide whether to set `shouldOverrideBuilder` flag or not. If client software does not implement any heuristic this flag **SHOULD** be set to `false`.

### Deprecate `engine_exchangeTransitionConfigurationV1`

This document introduces deprecation of [`engine_exchangeTransitionConfigurationV1`](./paris.md#engine_exchangetransitionconfigurationv1). The deprecation is specified as follows:

1. Consensus layer clients **MUST NOT** call this method.

2. Execution layer clients **MUST NOT** surface an error message to the user if this method is not called.

3. Consensus and execution layer clients **MAY** remove support of this method after Cancun. If no longer supported, this method **MUST** be removed from the [`engine_exchangeCapabilities`](./common.md#engine_exchangecapabilities) request or response list depending on whether it is consensus or execution layer client.

### Update the methods of previous forks

This document defines how Cancun payload should be handled by the [`Shanghai API`](./shanghai.md).

For the following methods:

- [`engine_forkchoiceUpdatedV2`](./shanghai.md#engine_forkchoiceupdatedv2)
- [`engine_newPayloadV2`](./shanghai.md#engine_newpayloadV2)
- [`engine_getPayloadV2`](./shanghai.md#engine_getpayloadv2)

a validation **MUST** be added:

1. Client software **MUST** return `-38005: Unsupported fork` error if the `timestamp` of payload or payloadAttributes greater or equal to the Cancun activation timestamp.

# Authentication

The `engine` JSON-RPC interface, exposed by execution layer clients and consumed by consensus layer clients, needs to be authenticated. The authentication scheme chosen for this purpose is [JWT](https://jwt.io/).

The type of attacks that this authentication scheme attempts to protect against are the following:

- RPC port exposed towards the internet, allowing attackers to exchange messages with execution layer engine API.
- RPC port exposed towards the browser, allowing malicious webpages to submit messages to the execution layer engine API.

The authentication scheme is _not_ designed to

- Prevent attackers with capability to read ('sniff') network traffic from reading the traffic,
- Prevent attackers with capability to read ('sniff') network traffic from performing replay-attacks of earlier messages.

Authentication is performed as follows:

- For `HTTP` dialogue, each `jsonrpc` request is individually authenticated by supplying `JWT` token in the HTTP header.
- For a WebSocket dialogue, only the initial handshake is authenticated, after which the message dialogue proceeds without further use of JWT.
  - Clarification: The websocket handshake starts with the consensus layer client performing a websocket upgrade request. This is a regular http GET request, and the actual
parameters for the WS-handshake are carried in the http headers.
- For `inproc`, a.k.a raw ipc communication, no authentication is required, under the assumption that a process able to access `ipc` channels for the process, which usually means local file access, is already sufficiently permissioned that further authentication requirements do not add security.


## JWT specifications

- The execution layer client **MUST** expose the authenticated Engine API at a port independent from existing JSON-RPC API.
  - The default port for the authenticated Engine API is `8551`. The Engine API is exposed under the `engine` namespace.
- The execution layer client **MUST** support at least the following `alg` `HMAC + SHA256` (`HS256`)
- The execution layer client **MUST** reject the `alg` `none`.


The HMAC algorithm implies that several consensus layer clients will be able to use the same key, and from an authentication perspective, be able to impersonate each other. From a deployment perspective, it means that an EL does not need to be provisioned with individual keys for each consensus layer client.

## Key distribution

The execution layer and consensus layer clients **SHOULD** accept a configuration parameter: `jwt-secret`, which designates a file containing the hex-encoded 256 bit secret key to be used for verifying/generating JWT tokens.

If such a parameter is not given, the client **SHOULD** generate such a token, valid for the duration of the execution, and **SHOULD** store the hex-encoded secret as a `jwt.hex` file on the filesystem.  This file can then be used to provision the counterpart client.

If such a parameter _is_ given, but the file cannot be read, or does not contain a hex-encoded key of `256` bits, the client **SHOULD** treat this as an error: either abort the startup, or show error and continue without exposing the authenticated port.

## JWT Claims

This specification utilizes the following list of JWT claims:

- Required: `iat` (issued-at) claim. The execution layer client **SHOULD** only accept `iat` timestamps which are within +-60 seconds from the current time.
- Optional: `id` claim. The consensus layer client **MAY** use this to communicate a unique identifier for the individual consensus layer client.
- Optional: `clv` claim. The consensus layer client **MAY** use this to communicate the consensus layer client type/version.

Other claims **MAY** be included in the JWT payload. If the execution layer client sees claims it does not recognize, these **MUST** be ignored.

## Examples

Todo, add some examples of JWT authentication here.


# Engine JSON-RPC API

The Engine JSON-RPC API is a collection of methods that all execution clients implement.
This interface allows the communication between consensus and execution layers of the two-component post-Merge Ethereum Client.

This API is in *active development* and currently specified in markdown documents specified by fork scopes ([Paris](./paris.md), [Shanghai](./shanghai.md), [Cancun](./cancun.md), [Prague](./prague.md)).

## References
* [Engine API: A Visual Guide](https://hackmd.io/@danielrachi/engine_api)
