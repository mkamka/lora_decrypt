lora = require('./lora_decrypt');
payload_hex = '11daf7a44d5e2bbe557176e9e6c8da';
sequence_counter = 2;
key = 'AABBCCDDEEFFAABBCCDDEEFFAABBCCDD';
addr = '00112233';

console.log('Decrypted message: ' + lora.lora_decrypt(payload_hex, sequence_counter, key, addr));
