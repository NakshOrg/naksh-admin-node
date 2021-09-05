const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');

const mintbase = require('mintbase');

// Near
const { connect, KeyPair, keyStores, utils } = require("near-api-js");
/*
const path = require("path");
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
*/
exports.connectWallet = asyncHandler( async (req, res, next) => {

    /*
    async function createAccount(creatorAccountId, newAccountId, amount) {
    const near = await connect({ ...config, keyStore });
    const creatorAccount = await near.account(creatorAccountId);
    const keyPair = KeyPair.fromRandom("ed25519");
    const publicKey = keyPair.publicKey.toString();
    await keyStore.setKey(config.networkId, newAccountId, keyPair);

    return await creatorAccount.functionCall({
        contractId: "testnet",
        methodName: "create_account",
        args: {
        new_account_id: newAccountId,
        new_public_key: publicKey,
        },
        gas: "300000000000000",
        attachedDeposit: utils.format.parseNearAmount(amount),
    });
    }

    const data = await createAccount(req.query.creatorAccountId, req.query.newAccountId, req.query.amount);
    */

    const config = {
        keyStore,
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
    };
    
    async function createFullAccessKey(accountId) {
        const keyPair = KeyPair.fromRandom("ed25519");
        const publicKey = keyPair.publicKey.toString();
        const near = await connect(config);
        const account = await near.account(accountId);
        console.log(account.getAccessKeys());
        // await keyStore.setKey(config.networkId, publicKey, keyPair);
        // await account.addKey(publicKey);
    }

    const data = await createFullAccessKey(req.query.creatorAccountId);


    return res.status(200).send({ data });

});

exports.accountDetails = asyncHandler( async (req, res, next) => {


    const privateKey = 'first entry swap execute erosion concert mango umbrella now can vehicle tomato';
    const keyPair = utils.KeyPair.fromString(privateKey);

    const keyStore = new keyStores.InMemoryKeyStore();
    keyStore.setKey('testnet', 'abhishekvenunthan.testnet', keyPair);

    const config = {
        networkId: "testnet",
        keyStore,
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    };
    
    const near = await connect({ ...config, keyStore });

    const wallet = new WalletConnection(near);

    return res.status(200).send({ wallet });

});