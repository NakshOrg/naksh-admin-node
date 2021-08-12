const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');

const { keyStores, connect, utils } = require("near-api-js");

exports.connectWallet = asyncHandler( async (req, res, next) => {
    /*
    const keyStore = new nearAPI.keyStores.InMemoryKeyStore();

    const config = {
        networkId: "testnet",
        keyStore,
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org"
    };

    const near = await nearAPI.connect(config);

    const account = await near.account(`${req.query.account}.testnet`);

    const balance = await account.getAccountBalance();

    const details = await account.getAccountDetails();

    const state = await account.state();

    const send = await account.sendMoney(
        "abhishek.venunathan.testnet", // receiver account
        "1000000000000000000000000" // amount in yoctoNEAR
    );

    res.send({ send, balance, details, state });
    */
   return next(new ErrorResponse(400, 'under development'));

});

exports.accountDetails = asyncHandler( async (req, res, next) => {

    const keyStore = new keyStores.InMemoryKeyStore();

    const config = {
        networkId: "testnet",
        keyStore,
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org"
    };

    const near = await connect(config);

    const account = await near.account(`${req.query.account}.testnet`);

    const balance = await account.getAccountBalance();

    const details = await account.getAccountDetails();

    const state = await account.state();

    const accessKeys = await account.getAccessKeys();

    const convertedBalance = {};

    Object.keys(balance).forEach( property => {
        convertedBalance[property] = utils.format.formatNearAmount(balance[property]);
    });

    return res.status(200).send({ balance, convertedBalance, details, state, accessKeys });

});