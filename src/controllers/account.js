const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');

const { Wallet, Chain, Network } = require('mintbase');

const { connect, keyStores, utils, Account } = require("near-api-js");

const { parseSeedPhrase } = require('near-seed-phrase');

const fs = require('fs');

const path = require('path');

exports.connectWallet = asyncHandler( async (req, res, next) => {

    return res.status(200).send({ data: "Something" });

});

exports.accountDetails = asyncHandler( async (req, res, next) => {

    // const parsedSeedPhrase = parseSeedPhrase(process.env.SEEDPHRASE);
    // const keyPair = utils.KeyPair.fromString(parsedSeedPhrase.secretKey);

    const CREDENTIALS_DIR = "../../.near-credentials";
    const credentialsPath = path.join(__dirname, CREDENTIALS_DIR);
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

    // keyStore.setKey('testnet', 'abhishekvenunathan.testnet', keyPair);

    const config = {
        networkId: "testnet",
        keyStore,
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    };
    
    const near = await connect(config);

    const account = await near.account("abhishekvenunathan.testnet");

    const data = await account.sendMoney("abhishekvenunathan.testnet", 100);

    // const yoctoNearBalance = await account.getAccountBalance();
    
    // const nearBalance = utils.format.formatNearAmount(yoctoNearBalance.available);
    
    // ! SMART CONTRACT
    // const data = fs.readFileSync(path.join(__dirname, "/nft_simple.wasm"));
    // const txs = await account.deployContract(data);
    // const data = await account.viewFunction(
    //     "abhishekvenunathan.testnet",
    //     "get_accounts"
    // );

    return res.status(200).send({ data });

});