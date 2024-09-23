# Stats

## Get Total Supply of Ether

Returns the current amount of Ether in circulation excluding ETH2 Staking rewards and EIP1559 burnt fees.
```
https://api.etherscan.io/api
   ?module=stats
   &action=ethsupply
   &apikey=YourApiKeyToken
   ```
### Request
#### Query Parameters
No parameters required.
### Response
#### Sample response
```json
{
   "status":"1",
   "message":"OK",
   "result":"116487067186500000000000000"
}
```
📖 **Tip** : Easily convert Ethereum units using our unit converter. 



## Get Total Supply of Ether 2

Returns the current amount of Ether in circulation, ETH2 Staking rewards, EIP1559 burnt fees, and total withdrawn ETH from the beacon chain. 

```
https://api.etherscan.io/api
   ?module=stats
   &action=ethsupply2
   &apikey=YourApiKeyToken
```
### Request
#### Query Parameters
No parameters required.
### Response
#### Sample response
```json
{
   "status":"1",
   "message":"OK",
   "result":{
      "EthSupply":"122373866217800000000000000",
      "Eth2Staking":"1157529105115885000000000",
      "BurntFees":"3102505506455601519229842",
      "WithdrawnTotal":"1170200333006131000000000"
   }
}
```
📝 **Note**: The EthSupply is calculated before adding ETH minted as Eth2Staking rewards and subtracting BurntFees from EIP-1559. 


## Get Ether Last Price

Returns the latest price of 1 ETH.
```
https://api.etherscan.io/api
   ?module=stats
   &action=ethprice
   &apikey=YourApiKeyToken
   ```
### Request
#### Query Parameters
No parameters required.
### Response
#### Sample response
```json
{
   "status":"1",
   "message":"OK",
   "result":{
      "ethbtc":"0.06116",
      "ethbtc_timestamp":"1624961308",
      "ethusd":"2149.18",
      "ethusd_timestamp":"1624961308"
   }
}
```
**Tip** : The timestamps are represented in Unix timestamp.


## Get Ethereum Nodes Size

Returns the size of the Ethereum blockchain, in bytes, over a date range.
```
https://api.etherscan.io/api
   ?module=stats
   &action=chainsize
   &startdate=2019-02-01
   &enddate=2019-02-28
   &clienttype=geth
   &syncmode=default
   &sort=asc
   &apikey=YourApiKeyToken
   ```
### Request
#### Query Parameters
| Parameter  | Description                                                                         |
|------------|-------------------------------------------------------------------------------------|
| startdate  | the starting date in yyyy-MM-dd format, eg. 2019-02-01                              |
| enddate    | the ending date in yyyy-MM-dd format, eg. 2019-02-28                                |
| clienttype | the Ethereum node client to use, either geth or parity                              |
| syncmode   | the type of node to run, either default or archive                                  |
| sort       | the sorting preference, use asc to sort by ascending and desc to sort by descending |

### Response
#### Sample response
```json
{
   "status":"1",
   "message":"OK",
   "result":[
      {
         "blockNumber":"7156164",
         "chainTimeStamp":"2019-02-01",
         "chainSize":"184726421279",
         "clientType":"Geth",
         "syncMode":"Default"
      }
      {
         "blockNumber":"7276521",
         "chainTimeStamp":"2019-02-28",
         "chainSize":"197073145113",
         "clientType":"Geth",
         "syncMode":"Default"
      }
   ]
}
```
**Tip** : The chainSize is represented in bytes.



## Get Total Nodes Count

Returns the total number of discoverable Ethereum nodes.
```
https://api.etherscan.io/api
   ?module=stats
   &action=nodecount
   &apikey=YourApiKeyToken
   ```
### Request
#### Query Parameters
No parameters required.
### Response
#### Sample response
```json
{
   "status":"1",
   "message":"OK",
   "result":{
      "UTCDate":"2021-06-29",
      "TotalNodeCount":"6413"
   }
}
```