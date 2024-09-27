# Geth/Parity Proxy

## eth_blockNumber

Returns the number of most recent block

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_blockNumber
   &apikey=YourApiKeyToken
```
### Request
#### Query Parameters
No parameters required.
### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "id":83,
   "result":"0xc36b29"
}
```

## eth_getBlockByNumber

Returns information about a block by block number.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_getBlockByNumber
   &tag=0x10d4f
   &boolean=true
   &apikey=YourApiKeyToken
```

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| tag | The block number, in hex (e.g., 0xC36B3C) |
| boolean | The boolean value to show full transaction objects. When true, returns full transaction objects and their information; when false, only returns a list of transactions. |
### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "baseFeePerGas":"0x5cfe76044",
      "difficulty":"0x1b4ac252b8a531",
      "extraData":"0xd883010a06846765746888676f312e31362e36856c696e7578",
      "gasLimit":"0x1caa87b",
      "gasUsed":"0x5f036a",
      "hash":"0x396288e0ad6690159d56b5502a172d54baea649698b4d7af2393cf5d98bf1bb3",
      "logsBloom":"0x5020418e211832c600000411c00098852850124700800500580d406984009104010420410c00420080414b044000012202448082084560844400d00002202b1209122000812091288804302910a246e25380282000e00002c00050009038cc205a018180028225218760100040820ac12302840050180448420420b000080000410448288400e0a2c2402050004024a240200415016c105844214060005009820302001420402003200452808508401014690208808409000033264a1b0d200c1200020280000cc0220090a8000801c00b0100a1040a8110420111870000250a22dc210a1a2002409c54140800c9804304b408053112804062088bd700900120",
      "miner":"0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c",
      "mixHash":"0xc547c797fb85c788ecfd4f5d24651bddf15805acbaad2c74b96b0b2a2317e66c",
      "nonce":"0x04a99df972bd8412",
      "number":"0xc63251",
      "parentHash":"0xbb2d43395f93dab5c424421be22d874f8c677e3f466dc993c218fa2cd90ef120",
      "receiptsRoot":"0x3de3b59d208e0fd441b6a2b3b1c814a2929f5a2d3016716465d320b4d48cc1e5",
      "sha3Uncles":"0xee2e81479a983dd3d583ab89ec7098f809f74485e3849afb58c2ea8e64dd0930",
      "size":"0x6cb6",
      "stateRoot":"0x60fdb78b92f0e621049e0aed52957971e226a11337f633856d8b953a56399510",
      "timestamp":"0x6110bab2",
      "totalDifficulty":"0x612789b0aba90e580f8",
      "transactions":[
         "0x40330c87750aa1ba1908a787b9a42d0828e53d73100ef61ae8a4d925329587b5",
         "0x6fa2208790f1154b81fc805dd7565679d8a8cc26112812ba1767e1af44c35dd4",
         "0xe31d8a1f28d4ba5a794e877d65f83032e3393809686f53fa805383ab5c2d3a3c",
         "0xa6a83df3ca7b01c5138ec05be48ff52c7293ba60c839daa55613f6f1c41fdace",
         "0x4e46edeb68a62dde4ed081fae5efffc1fb5f84957b5b3b558cdf2aa5c2621e17",
         "0x356ee444241ae2bb4ce9f77cdbf98cda9ffd6da244217f55465716300c425e82",
         "0x1a4ec2019a3f8b1934069fceff431e1370dcc13f7b2561fe0550cc50ab5f4bbc",
         "0xad7994bc966aed17be5d0b6252babef3f56e0b3f35833e9ac414b45ed80dac93"
      ],
      "transactionsRoot":"0xaceb14fcf363e67d6cdcec0d7808091b764b4428f5fd7e25fb18d222898ef779",
      "uncles":[
         "0x9e8622c7bf742bdeaf96c700c07151c1203edaf17a38ea8315b658c2e6d873cd"
      ]
   }
}
```

## eth_getUncleByBlockNumberAndIndex

Returns information about an uncle by block number.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_getUncleByBlockNumberAndIndex
   &tag=0xC63276
   &index=0x0
   &apikey=YourApiKeyToken
```

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| tag | The block number, in hex (e.g., 0xC36B3C) |
| index | The position of the uncle's index in the block, in hex (e.g., 0x5) |
### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "baseFeePerGas":"0x65a42b13c",
      "difficulty":"0x1b1457a8247bbb",
      "extraData":"0x486976656f6e2063612d68656176792059476f6e",
      "gasLimit":"0x1ca359a",
      "gasUsed":"0xb48fe1",
      "hash":"0x1da88e3581315d009f1cb600bf06f509cd27a68cb3d6437bda8698d04089f14a",
      "logsBloom":"0xf1a360ca505cdda510d810c1c81a03b51a8a508ed601811084833072945290235c8721e012182e40d57df552cf00f1f01bc498018da19e008681832b43762a30c26e11709948a9b96883a42ad02568e3fcc3000004ee12813e4296498261619992c40e22e60bd95107c5bd8462fcca570a0095d52a4c24720b00f13a2c3d62aca81e852017470c109643b15041fd69742406083d67654fc841a18b405ab380e06a8c14c0138b6602ea8f48b2cd90ac88c3478212011136802900264718a085047810221225080dfb2c214010091a6f233883bb0084fa1c197330a10bb0006686e678b80e50e4328000041c218d1458880181281765d28d51066058f3f80a7822",
      "miner":"0x1ad91ee08f21be3de0ba2ba6918e714da6b45836",
      "mixHash":"0xa8e1dbbf073614c7ed05f44b9e92fbdb3e1d52575ed8167fa57f934210bbb0a2",
      "nonce":"0x28cc3e5b7bee9866",
      "number":"0xc63274",
      "parentHash":"0x496dae3e722efdd9ee1eb69499bdc7ed0dca54e13cd1157a42811c442f01941f",
      "receiptsRoot":"0x9c9a7a99b4af7607691a7f2a50d474290385c0a6f39c391131ea0c67307213f4",
      "sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size":"0x224",
      "stateRoot":"0xde9a11f0ee321390c1a7843cab7b9ffd3779d438bc8f77de4361dfe2807d7dee",
      "timestamp":"0x6110bd1a",
      "transactionsRoot":"0xa04a79e531db3ec373cb63e9ebfbc9c95525de6347958918a273675d4f221575",
      "uncles":[
         
      ]
   }
}
```

## eth_getBlockTransactionCountByNumber

Returns the number of transactions in a block.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_getBlockTransactionCountByNumber
   &tag=0x10FB78
   &apikey=YourApiKeyToken
```

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| tag | The block number, in hex (e.g., 0x10FB78) |
### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x3"
}
```

## eth_getTransactionByHash

Returns the information about a transaction requested by transaction hash.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_getTransactionByHash
   &txhash=0xbc78ab8a9e9a0bca7d0321a27b2c03addeae08ba81ea98b03cd3dd237eabed44
   &apikey=YourApiKeyToken
```

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| txhash | The string representing the hash of the transaction |
### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "blockHash":"0xf850331061196b8f2b67e1f43aaa9e69504c059d3d3fb9547b04f9ed4d141ab7",
      "blockNumber":"0xcf2420",
      "from":"0x00192fb10df37c9fb26829eb2cc623cd1bf599e8",
      "gas":"0x5208",
      "gasPrice":"0x19f017ef49",
      "maxFeePerGas":"0x1f6ea08600",
      "maxPriorityFeePerGas":"0x3b9aca00",
      "hash":"0xbc78ab8a9e9a0bca7d0321a27b2c03addeae08ba81ea98b03cd3dd237eabed44",
      "input":"0x",
      "nonce":"0x33b79d",
      "to":"0xc67f4e626ee4d3f272c2fb31bad60761ab55ed9f",
      "transactionIndex":"0x5b",
      "value":"0x19755d4ce12c00",
      "type":"0x2",
      "accessList":[
         
      ],
      "chainId":"0x1",
      "v":"0x0",
      "r":"0xa681faea68ff81d191169010888bbbe90ec3eb903e31b0572cd34f13dae281b9",
      "s":"0x3f59b0fa5ce6cf38aff2cfeb68e7a503ceda2a72b4442c7e2844d63544383e3"
   }
}
```

## eth_getTransactionByBlockNumberAndIndex

Returns information about a transaction by block number and transaction index position.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_getTransactionByBlockNumberAndIndex
   &tag=0xC6331D
   &index=0x11A
   &apikey=YourApiKeyToken
```

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| tag | The block number, in hex (e.g., 0x10FB78) |
| index | The position of the uncle's index in the block, in hex (e.g., 0x0) |
### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "result":{
      "accessList":[
         
      ],
      "blockHash":"0xdce94191f861842c2786e3594da0c0109707fd78409cab5f38e10eb87d0f301c",
      "blockNumber":"0xa36e44",
      "chainId":"0x3",
      "condition":null,
      "creates":null,
      "from":"0xb910ae1db14a9fbc64ce175bdca6d3a743f690ab",
      "gas":"0x186a0",
      "gasPrice":"0x3b9aca09",
      "hash":"0xf96ff62ba5aaf46cd824b6766f7fa6f6b9595b1dd4ef1d31bcf1f765047c2835",
      "input":"0xd0e30db0",
      "maxFeePerGas":"0x3b9aca12",
      "maxPriorityFeePerGas":"0x3b9aca00",
      "nonce":"0xc6",
      "publicKey":"0x6dbf7068e19de8457c426a758a92ea54827ebd5b8467c3a1a5c4ac19bc7570457738fe496a40ea4e1f59d39d89636a430afdec0bf2a8060c6bf7d612bfe90ad3",
      "r":"0xdecdc48821a06bf116e82b355d520dc5a44d6df98234e5344c16565b0b3dfdba",
      "raw":"0x02f8750381c6843b9aca00843b9aca12830186a094c778417e063141139fce010982780140aa0cd5ab8502540be40084d0e30db0c001a0decdc48821a06bf116e82b355d520dc5a44d6df98234e5344c16565b0b3dfdbaa06b85bb6fd8153e86b50f0011787585e8c709a2a25e7ee3c2579572f07acfd42e",
      "s":"0x6b85bb6fd8153e86b50f0011787585e8c709a2a25e7ee3c2579572f07acfd42e",
      "to":"0xc778417e063141139fce010982780140aa0cd5ab",
      "transactionIndex":"0xd",
      "type":"0x2",
      "v":"0x1",
      "value":"0x2540be400"
   },
   "id":1
}
```

## eth_getTransactionCount

Returns the number of transactions performed by an address.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_getTransactionCount
   &address=0x4bd5900Cb274ef15b153066D736bf3e83A9ba44e
   &tag=latest
   &apikey=YourApiKeyToken
```

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| address | The string representing the address to get transaction count |
| tag | The string pre-defined block parameter, either earliest, pending or latest |
### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x44"
}
```

## eth_sendRawTransaction

Submits a pre-signed transaction for broadcast to the Ethereum network.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_sendRawTransaction
   &hex=0xf904808000831cfde080
   &apikey=YourApiKeyToken
```

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| hex | The string representing the signed raw transaction data to broadcast |

💡 Tip: Send a POST request if your hex string is particularly long.
### Response
#### Sample response
```json
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## eth_getTransactionReceipt

Returns the receipt of a transaction by transaction hash.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_getTransactionReceipt
   &txhash=0xadb8aec59e80db99811ac4a0235efa3e45da32928bcff557998552250fa672eb
   &apikey=YourApiKeyToken
```

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| txhash | The string representing the hash of the transaction |
### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "blockHash":"0x07c17710dbb7514e92341c9f83b4aab700c5dba7c4fb98caadd7926a32e47799",
      "blockNumber":"0xcf2427",
      "contractAddress":null,
      "cumulativeGasUsed":"0xeb67d5",
      "effectiveGasPrice":"0x1a96b24c26",
      "from":"0x292f04a44506c2fd49bac032e1ca148c35a478c8",
      "gasUsed":"0xb41d",
      "logs":[
         {
            "address":"0xdac17f958d2ee523a2206206994597c13d831ec7",
            "topics":[
               "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
               "0x000000000000000000000000292f04a44506c2fd49bac032e1ca148c35a478c8",
               "0x000000000000000000000000ab6960a6511ff18ed8b8c012cb91c7f637947fc0"
            ],
            "data":"0x00000000000000000000000000000000000000000000000000000000013f81a6",
            "blockNumber":"0xcf2427",
            "transactionHash":"0xadb8aec59e80db99811ac4a0235efa3e45da32928bcff557998552250fa672eb",
            "transactionIndex":"0x122",
            "blockHash":"0x07c17710dbb7514e92341c9f83b4aab700c5dba7c4fb98caadd7926a32e47799",
            "logIndex":"0xdb",
            "removed":false
         }
      ],
      "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000004000000000004000000000000000000010000000000000000000000000000000000000000000000000000000008000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000010000000001100000000000000000000000000000000000000000000000000000200100000000000000000000000000080000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "status":"0x1",
      "to":"0xdac17f958d2ee523a2206206994597c13d831ec7",
      "transactionHash":"0xadb8aec59e80db99811ac4a0235efa3e45da32928bcff557998552250fa672eb",
      "transactionIndex":"0x122",
      "type":"0x2"
   }
}
```

## eth_call

Executes a new message call immediately without creating a transaction on the blockchain.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_call
   &to=0xAEEF46DB4855E25702F8237E8f403FddcaF931C0
   &data=0x70a08231000000000000000000000000e16359506c028e51f16be38986ec5746251e9724
   &tag=latest
   &apikey=YourApiKeyToken
```

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| to | The string representing the address to interact with |
| data | The hash of the method signature and encoded parameters |
| tag | The string pre-defined block parameter, either earliest, pending or latest |

⛽ Note: The gas parameter is capped at 2x the current block gas limit.
### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x00000000000000000000000000000000000000000000000000601d8888141c00"
}
```
## eth_getCode

Returns code at a given address.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_getCode
   &address=0xf75e354c5edc8efed9b59ee9f67a80845ade7d0c
   &tag=latest
   &apikey=YourApiKeyToken
```

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| address | The string representing the address to get code |
| tag | The string pre-defined block parameter, either earliest, pending or latest |
### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x3660008037602060003660003473273930d21e01ee25e4c219b63259d214872220a261235a5a03f21560015760206000f3"
}
```
## eth_getStorageAt

Returns the value from a storage position at a given address.

This endpoint is still experimental and may have potential issues.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_getStorageAt
   &address=0x6e03d9cce9d60f3e9f2597e13cd4c54c55330cfd
   &position=0x0
   &tag=latest
   &apikey=YourApiKeyToken
```

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| address | The string representing the address to get code |
| position | The hex code of the position in storage (e.g., 0x0) |
| tag | The string pre-defined block parameter, either earliest, pending or latest |
### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x0000000000000000000000003d0768da09ce77d25e2d998e6a7b6ed4b9116c2d"
}
```
## eth_gasPrice

Returns the current price per gas in wei.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_gasPrice
   &apikey=YourApiKeyToken
```
### Request
#### Query Parameters
No parameters required.
### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "id":73,
   "result":"0x430e23400"
}
```
**Tip**: The `result` is returned in wei.
## eth_estimateGas

Makes a call or transaction, which won't be added to the blockchain and returns the used gas.

```
https://api.etherscan.io/api
   ?module=proxy
   &action=eth_estimateGas
   &data=0x4e71d92d
   &to=0xf0160428a8552ac9bb7e050d90eeade4ddd52843
   &value=0xff22
   &gasPrice=0x51da038cc
   &gas=0x5f5e0ff
   &apikey=YourApiKeyToken
```

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| data | The hash of the method signature and encoded parameters |
| to | The string representing the address to interact with |
| value | The value sent in this transaction, in hex (e.g., 0xff22) |
| gas | The amount of gas provided for the transaction, in hex (e.g., 0x5f5e0ff) |
| gasPrice | The gas price paid for each unit of gas, in wei Post EIP-1559, the gasPrice has to be higher than the block's baseFeePerGas.|

⛽ Note: The gas parameter is capped at 2x the current block gas limit.

### Response
#### Sample response
```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x6556"
}
```