const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');

const { Wallet, Chain, Network } = require('mintbase');

const { connect, keyStores, utils, Account } = require("near-api-js");

const { parseSeedPhrase } = require('near-seed-phrase');

const fs = require('fs');

const path = require('path');

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

exports.connectWallet = asyncHandler( async (req, res, next) => {

    return res.status(200).send({ data: "Something" });

});

exports.accountDetails = asyncHandler( async (req, res, next) => {

    const CREDENTIALS_DIR = "../../.near-credentials";
    const credentialsPath = path.join(__dirname, CREDENTIALS_DIR);
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

    // const parsedSeedPhrase = parseSeedPhrase(process.env.SEEDPHRASE);
    // const keyPair = utils.KeyPair.fromString(parsedSeedPhrase.secretKey);
    // await keyStore.setKey('testnet', 'abhishekvenunathan.testnet', keyPair);

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

    // const data = await account.sendMoney("abhishekvenunathan.testnet", 100);

    // const yoctoNearBalance = await account.getAccountBalance();
    
    // const nearBalance = utils.format.formatNearAmount(yoctoNearBalance.available);
    
    // SMART CONTRACT
    // const data = fs.readFileSync(path.join(__dirname, "../../main.wasm"));
    // const txs = await account.deployContract(data);

    // MINTING FUNCTION
    // const metadata = { 
    //     media: "https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
    //     issued_at: Date.now().toString()
    // };
    // const gas = 200000000000000;
    // const attachedDeposit = utils.format.parseNearAmount("0.1");
    // const perpetual_royalties = {
    //     "abhishekvenunathan.testnet": 1000
    // };

    // const FunctionCallOptions = {
    //     contractId: 'abhishekvenunathan.testnet',
    //     methodName: 'nft_mint',
    //     args: {
    //         token_id: 'abhishek-' + Date.now(),
    //         metadata,
    //         perpetual_royalties
    //     },
    //     gas,
    //     attachedDeposit
    // };

    // INIT FUNCTION
    const metadata = {
        spec: "nft-1.0.0",
        name: "Naksh",
        symbol: "NAKSH"
    };

    const FunctionCallOptions = {
        contractId: 'abhishekvenunathan.testnet',
        methodName: 'new',
        args: {
            owner_id: 'abhishekvenunathan.testnet',
            metadata
        }
    };

    const data = await account.functionCall(FunctionCallOptions);

    // const data = await account.functionCall(
    //     'abhishekvenunathan.testnet',
    //     'nft_mint',
    //     {
    //         token_id: 'abhishek-' + Date.now(),
    //         metadata,
    //         perpetual_royalties
    //     },
    //     gas,
    //     attachedDeposit
    // );

    return res.status(200).send({ data });

});

exports.testPinata = asyncHandler( async (req, res, next) => {

    const auth = await pinata.testAuthentication();

    const readableStreamForFile = fs.createReadStream(path.join(__dirname, "../../raccoon.jpg"));

    const options = {
        pinataMetadata: {
            name: "raccoon funny",
            keyvalues: {
                customKey: 'customValue',
                issuedAt: Date.now().toString(),
                issuedBy: "Abhishek"
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };

    const upload = await pinata.pinFileToIPFS(readableStreamForFile, options);
    
    return res.status(200).send({ auth, upload });

});