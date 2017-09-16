'use strict';
/*
* Copyright IBM Corp All Rights Reserved
*
* SPDX-License-Identifier: Apache-2.0
*/
/*
 * Hyperledger Fabric Sample Query Program
 */

var fcn_param = 'queryAllArt';
var args_param = [];

var hfc = require('fabric-client');
var path = require('path');

var options = {
    wallet_path: path.join(__dirname, './creds'),
    user_id: 'PeerAdmin',
    channel_id: 'mychannel',
    chaincode_id: 'artchain',
    network_url: 'grpc://localhost:7051',
};

var channel = {};
var client = null;

Promise.resolve().then(() => {
    client = new hfc();
    return hfc.newDefaultKeyValueStore({ path: options.wallet_path });
}).then((wallet) => {
    client.setStateStore(wallet);
    return client.getUserContext(options.user_id, true);
}).then((user) => {
    if (user === undefined || user.isEnrolled() === false) {
        console.error("User not defined, or not enrolled - error");
    }
    channel = client.newChannel(options.channel_id);
    channel.addPeer(client.newPeer(options.network_url));
    return;
}).then(() => {
    var transaction_id = client.newTransactionID();
    const request = {
        chaincodeId: options.chaincode_id,
        txId: transaction_id,
        fcn: fcn_param,
        args: args_param
    };
    return channel.queryByChaincode(request);
}).then((query_responses) => {
    if (!query_responses.length) {
        console.log("{\"error\":\"No payloads were returned from query\"}");
    }
    if (query_responses[0] instanceof Error) {
      //  console.error("error from query = ", query_responses[0]);
    }
    console.log(query_responses[0].toString());
}).catch((err) => {
    console.error("{\"error\":\"Caught Error", err,"\"}");
});
