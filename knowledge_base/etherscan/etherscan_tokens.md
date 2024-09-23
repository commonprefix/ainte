# Tokens

## Get ERC20-Token TotalSupply by ContractAddress

Returns the current amount of an ERC-20 token in circulation.
```
https://api.etherscan.io/api
   ?module=stats
   &action=tokensupply
   &contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055
   &apikey=YourApiKeyToken
   ```
### Request
#### Query Parameters
| Parameter       | Description                              |
|-----------------|------------------------------------------|
| contractaddress | the contract address of the ERC-20 token |
### Response
#### Sample response
```json
{
   "status":"1",
   "message":"OK",
   "result":"21265524714464"
}
```
📈 **Tip** : The result is returned in the token's smallest decimal representation.
Eg. a token with a balance of 215.241526476136819398 and 18 decimal places will be returned as 215241526476136819398



## Get ERC20-Token Account Balance for TokenContractAddress

Returns the current balance of an ERC-20 token of an address.
```
https://api.etherscan.io/api
   ?module=account
   &action=tokenbalance
   &contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055
   &address=0xe04f27eb70e025b78871a2ad7eabe85e61212761
   &tag=latest&apikey=YourApiKeyToken
```

### Request
#### Query Parameters
| Parameter       | Description                                                    |
|-----------------|----------------------------------------------------------------|
| contractaddress | the contract address of the ERC-20 token                       |
| address         | the string representing the address to check for token balance |
### Response
#### Sample response
```json
{
   "status":"1",
   "message":"OK",
   "result":"135499"
}
```
📈 **Tip** : The result is returned in the token's smallest decimal representation.
Eg. a token with a balance of 215.241526476136819398 and 18 decimal places will be returned as 215241526476136819398