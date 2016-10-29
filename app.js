function lora_decrypt(payload_hex, sequence_counter, key, addr){


      
	var key = new Buffer(appskey, 'hex');
	var aesEcb = new aesjs.ModeOfOperation.ecb(key);
    var dev_addr = new Buffer(addr, 'hex');
    var buffer = new Buffer(payload_hex, 'hex');
    var size = buffer.length;
    //console.log(size);
    
    var bufferIndex = 0;
    
    var ctr = 1;
    
    var encbuffer = new Uint8Array(buffer.length);
    
    var Block_A = new Uint8Array([0x01, 0x00 ,0x00 ,0x00 ,0x00, 0 ,dev_addr[3] ,dev_addr[2] ,dev_addr[1]
    				 ,dev_addr[0] ,sequence_counter & 0xff , (sequence_counter >> 8) & 0xff , (sequence_counter >> 16) & 0xff
    				 , (sequence_counter >> 24) & 0xff, 0x00, 0x00]);
    var sBlock = new Uint8Array(16);
	/*
	this is an example how Block a is formed according to Lorawan specs)
	Block_A[0]  = 0x01;
	Block_A[1]  = 0x00;
	Block_A[2]  = 0x00;
	Block_A[3]  = 0x00;
	Block_A[4]  = 0x00;
	Block_A[5]  = 0;        // 0 for uplink frames 1 for downlink frames;
	Block_A[6]  = dev_addr[3]; // LSB devAddr 4 bytes
	Block_A[7]  = dev_addr[2];  // ..
	Block_A[8]  = dev_addr[1];  // ..
	Block_A[9]  = dev_addr[0];  // MSB
	Block_A[10] = sequence_counter & 0xff;  // LSB framecounter
	Block_A[11] = (sequence_counter >> 8) & 0xff;  // MSB framecounter
	Block_A[12] = (sequence_counter >> 16) & 0xff;     // Frame counter upper Bytes
	Block_A[13] = (sequence_counter >> 24) & 0xff;
	Block_A[14] = 0x00;
	console.log(Block_A[10]+ "  "+Block_A[11]+"  "+Block_A[11]+"  "+Block_A[13]);*/
				
     while (size >= 16){
        Block_A[15] = ctr & 0xFF;
        ctr += 1;
        sBlock = aesEcb.encrypt(Block_A);
        //console.log(sBlock);
        for (i=0;i<16;i++){
            encbuffer[bufferIndex + i] = buffer[bufferIndex + i] ^ sBlock[i];
		}
        size -= 16
        bufferIndex += 16
    }
    if (size > 0){
        Block_A[15] = ctr & 0xFF;
        ctr += 1;
        sBlock = aesEcb.encrypt(Block_A);
        //console.log(sBlock);
        for (i=0;i<16;i++){
            encbuffer[bufferIndex + i] = buffer[bufferIndex + i] ^ sBlock[i];
            //console.log(buffer[bufferIndex + i] +"    ja "+sBlock[i]);    
			}
    }
    var obj={};
    var str =String.fromCharCode.apply(null,encbuffer);
    
    if (!isASCII(str)) {
				//obj.base64 = btoa(str);
				console.log(obj);
			}
	console.log("\nDecrypted String:"+"\n"+str+"\n");
	
	
	
	var u8 = new Uint8Array(encbuffer); // original array
	var u32bytes1 = u8.buffer.slice(0,4); // last four bytes as a new `ArrayBuffer`
	var uint = new Uint32Array(u32bytes1)[0];
	var u32bytes2 = u8.buffer.slice(4); 
	var uint2 = new Uint32Array(u32bytes2)[0];	
	
	var payload=[];
	payload.push((uint/1000000));
	payload.push((uint2/1000000));
	
	return payload;
	


}