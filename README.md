# Lora-payload-decrypt

Node container for decrypting LoRaWan payloads from Thingpark/Actility platform.

- Depends on [aes-js]
- Based on encrypt/decrypt code in [Lora-net/LoRaMac-node]


## Usage

`npm install lora-payload-decrypt`


```Node.js
> lora = require('./lora_decrypt.js');
> payload = '11daf7a44d5e2bbe557176e9e6c8da';
> sequence_counter = 2;
> key = 'AABBCCDDEEFFAABBCCDDEEFFAABBCCDD';
> addr = '00112233';
> lora.lora_decrypt(payload_hex, sequence_counter, key, addr);
[222, 59, 24, 8, 7, 155, 237, 158, 103, 125, 93, 34, 161, 204, 33]
```

[aes-js]: https://www.npmjs.com/package/aes-js
[Lora-net/LoRaMac-node]: https://github.com/Lora-net/LoRaMac-node/blob/master/src/mac/LoRaMacCrypto.c#L108
