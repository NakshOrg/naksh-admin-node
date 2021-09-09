const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');

const mintbase = require('mintbase');

const { connect, keyStores, utils } = require("near-api-js");

const { parseSeedPhrase } = require('near-seed-phrase');

exports.connectWallet = asyncHandler( async (req, res, next) => {

    return res.status(200).send({ data: "Something" });

});

exports.accountDetails = asyncHandler( async (req, res, next) => {


    const parsedSeedPhrase = parseSeedPhrase('first entry swap execute erosion concert mango umbrella now can vehicle tomato');

    const keyPair = utils.KeyPair.fromString(parsedSeedPhrase.secretKey);

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
    
    const near = await connect(config);

    const account = await near.account("abhishekvenunathan.testnet");

    const response = await near.connection.provider.query({
        request_type: "view_code",
        finality: "final",
        account_id: "abhishekvenunathan.testnet",
      });

    const yoctoNearBalance = await account.getAccountBalance();

    const nearBalance = utils.format.formatNearAmount(yoctoNearBalance.available);

    return res.status(200).send({ account, nearBalance, response });

});