# Etherscan API: Transaction Endpoints

## Check Contract Execution Status

Returns the status code of a contract execution.

```
https://api.etherscan.io/api
   ?module=transaction
   &action=getstatus
   &txhash=0x15f8e5ea1079d9a0bb04a4c58ae5fe7654b5b2b4463375ff7ffb490aa0032f3a
   &apikey=YourApiKeyToken
```

Try this endpoint in your **browser** 🔗
### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| txhash    | The `string` representing the transaction hash to check the execution status |

### Response
#### Sample response

```json
{
   "status":"1",
   "message":"OK",
   "result":{
      "isError":"1",
      "errDescription":"Bad jump destination"
   }
}
```

📖 **Tip:** The `isError` field returns `0` for **successful transactions** and `1` for **failed transactions.**

## Check Transaction Receipt Status

Returns the status code of a transaction execution.

📝 **Note:** Only applicable for post **Byzantium Fork** transactions.

```
https://api.etherscan.io/api
   ?module=transaction
   &action=gettxreceiptstatus
   &txhash=0x513c1ba0bebf66436b5fed86ab668452b7805593c05073eb2d51d3a52f480a76
   &apikey=YourApiKeyToken
```

Try this endpoint in your **browser** 🔗

### Request
#### Query Parameters

| Parameter | Description |
|-----------|-------------|
| txhash    | The `string` representing the transaction hash to check the execution status |

### Response
#### Sample response

```json
{
   "status":"1",
   "message":"OK",
   "result":{
      "status":"1"
   }
}
```

📖 **Tip:** The `status` field returns `0` for **failed transactions** and `1` for **successful transactions.**
