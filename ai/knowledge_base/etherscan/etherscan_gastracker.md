# Gas Tracker

## Get Estimation of Confirmation Time

Returns the estimated time, in seconds, for a transaction to be confirmed on the blockchain.
```
https://api.etherscan.io/api
   ?module=gastracker
   &action=gasestimate
   &gasprice=2000000000
   &apikey=YourApiKeyToken
   ```
### Request
#### Query Parameters
| Parameter | Description                            |
|-----------|----------------------------------------|
| gasprice  | the price paid per unit of gas, in wei |
📖 **Tip**: Easily convert Ethereum units using our unit converter.
### Response
#### Sample response
```json
{
   "status":"1",
   "message":"OK",
   "result":"9227"
}
```
📝 **Note**: The result is returned in seconds.



## Get Gas Oracle

Returns the current Safe, Proposed and Fast gas prices.

Post **EIP-1559** 🔥 changes :
- Safe/Proposed/Fast gas price recommendations are now modeled as Priority Fees.
- New field `suggestBaseFee` , the baseFee of the next pending block
- New field `gasUsedRatio`, to estimate how busy the network is

Learn more about the gas changes in EIP-1559. 
```
https://api.etherscan.io/api
   ?module=gastracker
   &action=gasoracle
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
      "LastBlock":"13053741",
      "SafeGasPrice":"20",
      "ProposeGasPrice":"22",
      "FastGasPrice":"24",
      "suggestBaseFee":"19.230609716",
      "gasUsedRatio":"0.370119078777807,0.8954731,0.550911766666667,0.212457033333333,0.552463633333333"
   }
}
```
**Note**: The gas prices are returned in Gwei.