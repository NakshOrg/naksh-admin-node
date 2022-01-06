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
    await keyStore.setKey('testnet', 'abhishekvenunathan.testnet', mainKeyPair);

    // NFT ACCOUNT
    const nftParsedSeedPhrase = parseSeedPhrase(process.env.NFT_ACCOUNT_SEEDPHRASE);
    const nftKeyPair = utils.KeyPair.fromString(nftParsedSeedPhrase.secretKey);
    await keyStore.setKey('testnet', 'nft1.abhishekvenunathan.testnet', nftKeyPair);

    // MARKET ACCOUNT
    const marketParsedSeedPhrase = parseSeedPhrase(process.env.MARKET_ACCOUNT_SEEDPHRASE);
    const marketKeyPair = utils.KeyPair.fromString(marketParsedSeedPhrase.secretKey);
    await keyStore.setKey('testnet', 'market1.abhishekvenunathan.testnet', marketKeyPair);

    const config = {
        networkId: "testnet",
        keyStore,
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    };
    
    const near = await connect(config);

    const mainAccount = await near.account("abhishekvenunathan.testnet");
    const nftAccount = await near.account("nft1.abhishekvenunathan.testnet");
    const marketAccount = await near.account("market1.abhishekvenunathan.testnet");

    // const data = await account.sendMoney("abhishekvenunathan.testnet", 100);

    // const yoctoNearBalance = await account.getAccountBalance();
    
    // const nearBalance = utils.format.formatNearAmount(yoctoNearBalance.available);

    //! SMART CONTRACT
    // const nftContract = fs.readFileSync(path.join(__dirname, "../../contracts/nft.wasm"));
    // const newNftAccount = await mainAccount.createAndDeployContract(`nft1.abhishekvenunathan.testnet`, nftKeyPair.getPublicKey(), nftContract, utils.format.parseNearAmount("10") );
    // const marketContract = fs.readFileSync(path.join(__dirname, "../../contracts/market.wasm"));
    // const newMarketAccount = await mainAccount.createAndDeployContract(`market1.abhishekvenunathan.testnet`, marketKeyPair.getPublicKey(), marketContract, utils.format.parseNearAmount("10") );
    
    // const txs = await marketAccount.deployContract(marketContract);
    
    // const data = await marketAccount.deleteAccount("abhishekvenunathan.testnet");

    //! 1 - INIT
    // const nftMetadata = {
    //     spec: "nft-1",
    //     name: "Naksh",
    //     symbol: "TNFT"
    // };

    // const nft_supply_cap_by_type = {
    //     test: '1000000'
    // };

    // const nftFunctionCallOptions = {
    //     contractId: 'nft1.abhishekvenunathan.testnet',
    //     methodName: 'new',
    //     args: {
    //         owner_id: 'nft1.abhishekvenunathan.testnet',
    //         metadata: nftMetadata,
    //         supply_cap_by_type: nft_supply_cap_by_type
    //     }
    // };

    // const nftData = await nftAccount.functionCall(nftFunctionCallOptions);

    // const marketMetadata = {
    //     spec: "nft-1",
    //     name: "Naksh",
    //     symbol: "TNFT"
    // };

    // const market_supply_cap_by_type = {
    //     test: '1000000'
    // };

    // const marketFunctionCallOptions = {
    //     contractId: 'market1.abhishekvenunathan.testnet',
    //     methodName: 'new',
    //     args: {
    //         owner_id: 'market1.abhishekvenunathan.testnet',
    //         metadata: marketMetadata,
    //         supply_cap_by_type: market_supply_cap_by_type
    //     }
    // };

    // const marketData = await marketAccount.functionCall(marketFunctionCallOptions);

    // const data = { nftData, marketData };
    

    //! 2 - MINT
    // const metadata = {
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
    //         token_id: 'abhishek-' + Date.now(),
    //         metadata,
    //         perpetual_royalties
    //     },
    //     gas,
    //     attachedDeposit
    // };

    // const data = await mainAccount.functionCall(FunctionCallOptions);


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

    let token_id = "abhishek-1639733525321";

    // ! 5 - APPROVE NFT SALE
    // const gas = 200000000000000;
    // const attachedDeposit = utils.format.parseNearAmount("10");
    // const FunctionCallOptions = {
    //     contractId: 'nft1.abhishekvenunathan.testnet',
    //     methodName: 'nft_approve',
    //     args: {
    //         account_id: 'market1.abhishekvenunathan.testnet',
    //         token_id,
    //         msg: "{\"sale_conditions\":\"10\"}"
    //     },
    //     gas,
    //     attachedDeposit
    // };

    // const data = await mainAccount.functionCall(FunctionCallOptions);

    //! 6 - UPDATE SALE
    // const gas = 200000000000000;
    // const attachedDeposit = "1";
    // const FunctionCallOptions = {
    //     contractId: 'market1.abhishekvenunathan.testnet',
    //     methodName: 'update_price',
    //     args: {
    //         nft_contract_id: 'nft1.abhishekvenunathan.testnet',
    //         token_id,
    //         price: '5'
    //     },
    //     gas,
    //     attachedDeposit
    // };

    // const data = await mainAccount.functionCall(FunctionCallOptions);

    //! 7 - GET SALE
    // const gas = 200000000000000;
    // const attachedDeposit = "1";
    // const FunctionCallOptions = {
    //     contractId: 'market1.abhishekvenunathan.testnet',
    //     methodName: 'get_supply_by_nft_contract_id',
    //     args: {
    //         nft_contract_id: 'nft1.abhishekvenunathan.testnet'
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

    // const data = await mainAccount.functionCall(FunctionCallOptions);

    //! 9 - BURN NFT WORKAROUND
    // const gas = 200000000000000;
    // const attachedDeposit = 1;
    // const FunctionCallOptions = {
    //     contractId: 'nft1.abhishekvenunathan.testnet',
    //     methodName: 'nft_transfer',
    //     args: {
    //         receiver_id: "0x0",
    //         token_id
    //     },
    //     gas,
    //     attachedDeposit
    // };

    // const data = await mainAccount.functionCall(FunctionCallOptions);

    //! 10 - VIEW ALL NFT
    // const gas = 200000000000000;
    // const attachedDeposit = utils.format.parseNearAmount("0.1");

    // const FunctionCallOptions = {
    //     contractId: 'nft1.abhishekvenunathan.testnet',
    //     methodName: 'nft_tokens',
    //     args: {},
    //     gas,
    //     attachedDeposit
    // };

    const data = await mainAccount.functionCall(FunctionCallOptions);

    return res.status(200).send({ data });

});

exports.testPinata = asyncHandler( async (req, res, next) => {

    const auth = await pinata.testAuthentication();

    const readableStreamForFile = fs.createReadStream(path.join(__dirname, "../../raccoon.jpg"));

    const options = {
        pinataMetadata: {
            name: "abhi",
            keyvalues: {
                customKey: 'customValue',
                issuedAt: Date.now().toString(),
                issuedBy: "naksh"
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };

    const upload = await pinata.pinFileToIPFS(readableStreamForFile, options);
    
    return res.status(200).send({ auth, upload });

});

exports.testMedium = asyncHandler( async (req, res, next) => {

    const auth = await pinata.testAuthentication();

    const readableStreamForFile = fs.createReadStream(path.join(__dirname, "../../raccoon.jpg"));

    const options = {
        pinataMetadata: {
            name: "abhi",
            keyvalues: {
                customKey: 'customValue',
                issuedAt: Date.now().toString(),
                issuedBy: "naksh"
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };

    const upload = await pinata.pinFileToIPFS(readableStreamForFile, options);
    
    return res.status(200).send({ auth, upload });

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