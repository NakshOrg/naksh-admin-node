const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');
const { sendEmail } = require('../helpers/email');

const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dayjs = require('dayjs');

const Admin = require('../models/admin');

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

    // MAIN ACCOUNT
    const mainParsedSeedPhrase = parseSeedPhrase(process.env.MAIN_ACCOUNT_SEEDPHRASE);
    const mainKeyPair = utils.KeyPair.fromString(mainParsedSeedPhrase.secretKey);
    await keyStore.setKey('mainnet', 'srilakshmi_96.near', mainKeyPair);

    // NFT ACCOUNT
    const nftParsedSeedPhrase = parseSeedPhrase(process.env.NFT_ACCOUNT_SEEDPHRASE);
    const nftKeyPair = utils.KeyPair.fromString(nftParsedSeedPhrase.secretKey);
    await keyStore.setKey('mainnet', 'nft1.srilakshmi_96.near', nftKeyPair);

    // MARKET ACCOUNT
    const marketParsedSeedPhrase = parseSeedPhrase(process.env.MARKET_ACCOUNT_SEEDPHRASE);
    const marketKeyPair = utils.KeyPair.fromString(marketParsedSeedPhrase.secretKey);
    await keyStore.setKey('mainnet', 'market1.srilakshmi_96.near', marketKeyPair);

    // TEST CONFIG
    // const config = {
    //     networkId: "testnet",
    //     keyStore,
    //     nodeUrl: "https://rpc.testnet.near.org",
    //     walletUrl: "https://wallet.testnet.near.org",
    //     helperUrl: "https://helper.testnet.near.org",
    //     explorerUrl: "https://explorer.testnet.near.org",
    // };

    // MAIN CONFIG
    const config = {
        networkId: "mainnet",
        keyStore,
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
    };
    
    const near = await connect(config);

    const mainAccountID = "srilakshmi_96.near";
    const nftAccountID = "nft1.srilakshmi_96.near";
    const marketAccountID = "market1.srilakshmi_96.near";

    const mainAccount = await near.account(mainAccountID);
    const nftAccount = await near.account(nftAccountID);
    const marketAccount = await near.account(marketAccountID);

    // console.log(utils.format.formatNearAmount("1257490000000000000000000"));

    // return res.send("hello")

    // const data = await mainAccount.createAccount("new1.srilakshmi_96.near", nftKeyPair.getPublicKey(), utils.format.parseNearAmount("2") );

    // const data = await account.sendMoney("abhishekvenunathan.testnet", 100);

    // const yoctoNearBalance = await mainAccount.getAccountBalance();
    
    // const nearBalance = utils.format.formatNearAmount(yoctoNearBalance.available);

    //! SMART CONTRACT
    // const nftContract = fs.readFileSync(path.join(__dirname, "../../contracts/nft.wasm"));
    // const data = await mainAccount.createAndDeployContract(`nft1.srilakshmi_96.near`, nftKeyPair.getPublicKey(), nftContract, utils.format.parseNearAmount("4") );
    // const marketContract = fs.readFileSync(path.join(__dirname, "../../contracts/market.wasm"));
    // const data = await mainAccount.createAndDeployContract(`market1.srilakshmi_96.near`, marketKeyPair.getPublicKey(), marketContract, utils.format.parseNearAmount("4") );
    
    // const txs = await marketAccount.deployContract(marketContract);
    
    // const data = await marketAccount.deleteAccount("abhishekvenunathan.testnet");

    //! 1 - INIT
    // const nftMetadata = {
    //     spec: "nft-1.0.0",
    //     name: "Srilakshmi",
    //     symbol: "LAKSH"
    // };

    // const nft_supply_cap_by_type = {
    //     test: '1000000'
    // };

    // const nftFunctionCallOptions = {
    //     contractId: nftAccountID,
    //     methodName: 'new',
    //     args: {
    //         owner_id: nftAccountID,
    //         metadata: nftMetadata,
    //         supply_cap_by_type: nft_supply_cap_by_type
    //     }
    // };

    // const data = await nftAccount.functionCall(nftFunctionCallOptions);

    // const marketMetadata = {
    //     spec: "nft-1.0.0",
    //     name: "Srilakshmi",
    //     symbol: "LAKSH"
    // };

    // const market_supply_cap_by_type = {
    //     test: '1000000'
    // };

    // const marketFunctionCallOptions = {
    //     contractId: marketAccountID,
    //     methodName: 'new',
    //     args: {
    //         owner_id: marketAccountID,
    //         metadata: marketMetadata,
    //         supply_cap_by_type: market_supply_cap_by_type
    //     }
    // };

    // const data = await marketAccount.functionCall(marketFunctionCallOptions);

    // const data = { nftData, marketData };
    

    // //! 2 - MINT
    // const metadata = {
    //     title: "storage test 3",
    //     description: "sample description",
    //     media: "https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
    //     issued_at: Date.now()
    // };
    // const gas = 200000000000000;
    // const attachedDeposit = utils.format.parseNearAmount("0.1");
    // const perpetual_royalties = {
    //     "laksh.testnet": 500,
    //     "eleye.testnet": 500,
    //     "nivedita.testnet": 1000,
    // };

    // const FunctionCallOptions = {
    //     contractId: 'nft1.abhishekvenunathan.testnet',
    //     methodName: 'nft_mint',
    //     args: {
    //         token_id: 'abhishek1-' + Date.now(),
    //         metadata,
    //         perpetual_royalties
    //     },
    //     gas,
    //     attachedDeposit
    // };

    // const data = await newAccount.functionCall(FunctionCallOptions);


    //! 4 - STORAGE - Calculate storage
    // const gas = 200000000000000;
    // const attachedDeposit = utils.format.parseNearAmount("0.1");

    // const FunctionCallOptions = {
    //     contractId: 'market1.abhishekvenunathan.testnet',
    //     methodName: 'storage_deposit',
    //     args: {},
    //     gas,
    //     attachedDeposit
    // };

    // const data = await mainAccount.functionCall(FunctionCallOptions);

    // let token_id = "abhishek1-1644152699144";

    // ! 5 - APPROVE NFT SALE
    // const gas = 200000000000000;
    // const msg = JSON.stringify({
    //     sale_conditions: utils.format.parseNearAmount("3")
    // });
    // const attachedDeposit = utils.format.parseNearAmount("0.1");
    // const FunctionCallOptions = {
    //     contractId: 'nft1.abhishekvenunathan.testnet',
    //     methodName: 'nft_approve',
    //     args: {
    //         account_id: 'market1.abhishekvenunathan.testnet',
    //         token_id,
    //         msg
    //     },
    //     gas,
    //     attachedDeposit
    // };

    // const data = await newAccount.functionCall(FunctionCallOptions);

    //! 6 - UPDATE SALE
    // const gas = 200000000000000;
    // const attachedDeposit = "1";
    // const FunctionCallOptions = {
    //     contractId: 'market1.abhishekvenunathan.testnet',
    //     methodName: 'update_price',
    //     args: {
    //         nft_contract_id: 'nft1.abhishekvenunathan.testnet',
    //         token_id,
    //         price: '15'
    //     },
    //     gas,
    //     attachedDeposit
    // };

    // const data = await mainAccount.functionCall(FunctionCallOptions);

    //! 8 - SELL NFT
    // const gas = 200000000000000;
    // const attachedDeposit = utils.format.parseNearAmount("1");
    // const FunctionCallOptions = {
    //     contractId: 'market1.abhishekvenunathan.testnet',
    //     methodName: 'offer',
    //     args: {
    //         nft_contract_id: 'nft1.abhishekvenunathan.testnet',
    //         token_id
    //     },
    //     gas,
    //     attachedDeposit
    // };

    // const data = await nftAccount.functionCall(FunctionCallOptions);

    // //! 9 - BURN NFT WORKAROUND
    // const gas = 200000000000000;
    // const attachedDeposit = 1;
    // const FunctionCallOptions = {
    //     contractId: 'nft1.abhishekvenunathan.testnet',
    //     methodName: 'nft_transfer',
    //     args: {
    //         receiver_id: "0x0",
    //         token_id: "abhishek-1642336041965",
    //         // approval_id: "abhishekvenunathan.testnet"
    //     },
    //     gas,
    //     attachedDeposit
    // };

    // const data = await mainAccount.functionCall(FunctionCallOptions);

    //! 10 - VIEW NFT

    // ! ALL MINTED NFT
    // const data = await mainAccount.viewFunction('nft1.abhishekvenunathan.testnet', 'nft_tokens', { from_index: "0", limit: 1000 });
    // ! ALL NFT OF ONE ACCOUNT
    // const data = await mainAccount.viewFunction('nft1.abhishekvenunathan.testnet', 'nft_tokens_for_owner', { account_id: "abhishekvenunathan.testnet", from_index: "0", limit: 1000 });
    // ! ALL SALE NFT
    // const data = await mainAccount.viewFunction('market1.abhishekvenunathan.testnet', 'get_sales_by_nft_contract_id', { nft_contract_id: 'nft1.abhishekvenunathan.testnet', from_index: "0", limit: 1000 });
    // ! ONE SALE
    // const data = await mainAccount.viewFunction('market1.abhishekvenunathan.testnet', 'get_sale', { nft_contract_token: `nft1.abhishekvenunathan.testnet.${token_id}` });

    // ! 11 - STORAGE TEST
    // Per sale 0.01N or 10000000000000000000000 yoctoNear
    // let data = await newAccount.viewFunction('market1.abhishekvenunathan.testnet', 'storage_minimum_balance', { });

    // Current 3.5N or 3500000000000000000000000 yoctoNear
    // let data = await newAccount.viewFunction('market1.abhishekvenunathan.testnet', 'storage_balance_of', { account_id: newAccount.accountId });
    
    // data = utils.format.formatNearAmount(data);

    return res.status(200).send({ data });

});

exports.login = asyncHandler( async (req, res, next) => {

    const exist = process.env.ALLOWED_EMAIL.split(" ").includes(req.body.email);

    if(!exist) {
        return next(new ErrorResponse(403, "access denied"));
    }

    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false }).toString('hex');
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    const otpExpiry = dayjs().add(5, 'minute').toDate();

    const admin = await Admin.findOneAndUpdate(
        { ...req.body },
        {
            otp: hashedOtp,
            otpExpiry,
            createdAt: dayjs().toDate()
        },
        { upsert: true, new: true }
    );

    await admin.save();

    const subject = "Naksh login request";

    const payload = `Naksh OTP for login is ${otp}. It will expire in 5 minutes.`;

    const email = await sendEmail( req.body.email, subject, payload );

    return res.status(200).send({

        email

    });

});

exports.verifyOtp = asyncHandler( async (req, res, next) => {

    const exist = process.env.ALLOWED_EMAIL.split(" ").includes(req.body.email);

    if(!exist) {
        return next(new ErrorResponse(403, "access denied"));
    }
    
    req.body.otp = crypto.createHash('sha256').update(req.body.otp).digest('hex');

    const admin = await Admin.findOneAndUpdate({ ...req.body , otpExpiry: { $gt: dayjs().toDate() } }, { $unset:{ otp: "", otpExpiry: "" } }, { new: true });

    if(!admin) {
        return next(new ErrorResponse(401, 'invalid or expired OTP'));
    }

    const token = jwt.sign({ _id: admin._id.toString(), userType: 0 }, process.env.JWT_SECRET );

    return res.status(200).send({ login: true, token: `Bearer ${token}` });

});