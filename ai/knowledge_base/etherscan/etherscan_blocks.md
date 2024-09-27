# Ethereum Block API Endpoints

## Get Block And Uncle Rewards by BlockNo

Returns the block reward and 'Uncle' block rewards.

```
https://api.etherscan.io/api
   ?module=block
   &action=getblockreward
   &blockno=2165403
   &apikey=YourApiKeyToken
```
### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| blockno   | The `integer` block number to check block rewards for, e.g., `12697906` |

### Response
#### Sample response

```json
{
   "status":"1",
   "message":"OK",
   "result":{
      "blockNumber":"2165403",
      "timeStamp":"1472533979",
      "blockMiner":"0x13a06d3dfe21e0db5c016c03ea7d2509f7f8d1e3",
      "blockReward":"5314181600000000000",
      "uncles":[
         {
            "miner":"0xbcdfc35b86bedf72f0cda046a3c16829a2ef41d1",
            "unclePosition":"0",
            "blockreward":"3750000000000000000"
         },
         {
            "miner":"0x0d0c9855c722ff0c78f21e43aa275a5b8ea60dce",
            "unclePosition":"1",
            "blockreward":"3750000000000000000"
         }
      ],
      "uncleInclusionReward":"312500000000000000"
   }
}
```

⏳ **Tip:** The `timestamp` field is denoted in **Unix timestamp.**

## Get Estimated Block Countdown Time by BlockNo

Returns the estimated time remaining, in seconds, until a certain block is mined.

```
https://api.etherscan.io/api
   ?module=block
   &action=getblockcountdown
   &blockno=16701588
   &apikey=YourApiKeyToken
```


### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| blockno   | The `integer` block number to estimate time remaining to be mined, e.g., `12697906` |

### Response
#### Sample response

```json
{
   "status":"1",
   "message":"OK",
   "result":{
      "CurrentBlock":"12715477",
      "CountdownBlock":"16701588",
      "RemainingBlock":"3986111",
      "EstimateTimeInSec":"52616680.2"
   }
}
```

## Get Block Number by Timestamp

Returns the block number that was mined at a certain timestamp.

```
https://api.etherscan.io/api
   ?module=block
   &action=getblocknobytime
   &timestamp=1578638524
   &closest=before
   &apikey=YourApiKeyToken
```


### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| timestamp | The `integer` representing the Unix timestamp in **seconds** |
| closest   | The closest available block to the provided timestamp, either `before` or `after` |

⏳ **Tip:** Convert a regular date-time to a **Unix timestamp.**

### Response
#### Sample response

```json
{
   "status":"1",
   "message":"OK",
   "result":"12712551"
}
```
