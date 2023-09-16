const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');
const { sendEmail } = require('../helpers/email');

const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dayjs = require('dayjs');

const Admin = require('../models/admin');
const TPGSubscriber = require('../models/TPGSubscriber');
const TPGAdmin = require('../models/TPGAdmin');

const { Wallet, Chain, Network } = require('mintbase');

const { connect, keyStores, utils, Account } = require("near-api-js");

const { parseSeedPhrase } = require('near-seed-phrase');

const fs = require('fs');

const path = require('path');

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

const axios = require('axios').default;
const { parse } = require("node-html-parser");
const axiosInstance = axios.create({
    baseURL: `https://api.lu.ma/profile`,
    timeout: 3000
});

exports.connectWallet = asyncHandler( async (req, res, next) => {

    return res.status(200).send({ data: "Something" });

});

exports.accountDetails = asyncHandler( async (req, res, next) => {

    const mainAccountID = "naksh.near";
    const nftAccountID = "nft1.naksh.near";
    const marketAccountID = "market1.naksh.near";

    const CREDENTIALS_DIR = "../../.near-credentials";
    const credentialsPath = path.join(__dirname, CREDENTIALS_DIR);
    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

    // MAIN ACCOUNT
    const mainParsedSeedPhrase = parseSeedPhrase(process.env.MAIN_ACCOUNT_SEEDPHRASE);
    const mainKeyPair = utils.KeyPair.fromString(mainParsedSeedPhrase.secretKey);
    await keyStore.setKey('mainnet', mainAccountID, mainKeyPair);

    // NFT ACCOUNT
    const nftParsedSeedPhrase = parseSeedPhrase(process.env.NFT_ACCOUNT_SEEDPHRASE);
    const nftKeyPair = utils.KeyPair.fromString(nftParsedSeedPhrase.secretKey);
    await keyStore.setKey('mainnet', nftAccountID, nftKeyPair);

    // MARKET ACCOUNT
    const marketParsedSeedPhrase = parseSeedPhrase(process.env.MARKET_ACCOUNT_SEEDPHRASE);
    const marketKeyPair = utils.KeyPair.fromString(marketParsedSeedPhrase.secretKey);
    await keyStore.setKey('mainnet', marketAccountID, marketKeyPair);

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

    const mainAccount = await near.account(mainAccountID);
    const nftAccount = await near.account(nftAccountID);
    const marketAccount = await near.account(marketAccountID);

    // const data = await mainAccount.createAccount("new1.srilakshmi_96.near", nftKeyPair.getPublicKey(), utils.format.parseNearAmount("2") );

    // const data = await account.sendMoney("abhishekvenunathan.testnet", 100);

    // const yoctoNearBalance = await mainAccount.getAccountBalance();
    
    // const nearBalance = utils.format.formatNearAmount(yoctoNearBalance.available);

    //! SMART CONTRACT
    // const nftContract = fs.readFileSync(path.join(__dirname, "../../contracts/nft.wasm"));
    // const data = await mainAccount.createAndDeployContract(nftAccountID, nftKeyPair.getPublicKey(), nftContract, utils.format.parseNearAmount("5") );
    // const marketContract = fs.readFileSync(path.join(__dirname, "../../contracts/market.wasm"));
    // const data = await mainAccount.createAndDeployContract(marketAccountID, marketKeyPair.getPublicKey(), marketContract, utils.format.parseNearAmount("5") );
    
    // const txs = await marketAccount.deployContract(marketContract);
    // const data = await marketAccount.deleteAccount("abhishekvenunathan.testnet");

    //! 1 - INIT
    // const nftMetadata = {
    //     spec: "nft-1.0.0",
    //     name: "Naksh",
    //     symbol: "NAKSH"
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
    //     name: "Naksh",
    //     symbol: "NAKSH"
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

    const email = await sendEmail( process.env.NAKSH_ADMIN_EMAIL, req.body.email, subject, payload, undefined );

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

exports.lumaWebScrape = asyncHandler(async (req, res, next) => {

    let response = await axiosInstance.get('?host_api_id=usr-hzW4RWAY0WDRlX3');

    const data = response.data;

    let events = [];
    
    for(let event of data.events.reverse()) {
        let eventObj = {};
        eventObj.name = event.name? event.name : null;
        eventObj.cover = event.cover_url? event.cover_url : null;
        eventObj.description = "";
        event.description_mirror?.content?.forEach(description => {
            if(description.type == "paragraph") {
                description.content?.forEach(content => {
                    if(content.type == "text") {
                        eventObj.description += content.text;
                    }
                    if(content.type == "hard_break") {
                        eventObj.description += "\n";
                    }
                });
            } else {
                eventObj.description += null;
            }
            eventObj.description += "\n";
        });
        eventObj.start = event.start_at? event.start_at : null;
        eventObj.end = event.end_at? event.end_at : null;
        eventObj.city = event.geo_address_info?.city ? event.geo_address_info.city : null;
        eventObj.state = event.geo_address_info?.region ? event.geo_address_info.region : null;
        eventObj.country = event.geo_address_info?.country ? event.geo_address_info.country : null;
        eventObj.type = event.location_type ? event.location_type : null;
        eventObj.ongoing = dayjs().isBefore(dayjs(event.end_at)) ? true : false;
        eventObj.url = event.url ? `https://lu.ma/${event.url}` : null;
        events.push(eventObj);
    }

    res.status(200).json({ events });

});

exports.subscribeToTPGNewsletter = asyncHandler(async (req, res, next) => {

    const exist = await TPGSubscriber.findOne({ ...req.body });

    if(exist) {

        return res.status(200).send({

            message: "You have already subscribed to our newsletter"
    
        });
    }

    await new TPGSubscriber({ ...req.body, createdAt: dayjs().toDate() }).save();

    const subject = "Welcome to The Phoenix Guild!";

    const payload = `
    Dear User,
    
    Thank you for subscribing to The Phoenix Guild newsletter. We're excited to have you on board!
    
    Here's what you can expect from our newsletter:
    
    1. Exciting Updates: Stay in the loop with the latest news, workshops, events, and company updates.
    
    2. Exclusive Content: Get access to exclusive articles, how-tos, and resources delivered right to your inbox.
    
    3. Special Offers: Be the first to know about our promotions, discounts, and special offers.
    
    4. Community: Join our thriving community of subscribers and engage in discussions, feedback, and more.
    
    We promise not to flood your inbox with emails. You'll receive our newsletter once a week, and we'll make sure it's worth your while.
    
    If you ever have any questions, feedback, or suggestions, please don't hesitate to reach out to us. We value your input!
    
    Thanks again for joining us. We're looking forward to a fantastic journey together.
    
    Best regards,
    The Phoenix Guild
    Website: www.thephoenixguild.org
    Contact Email: thephoenixguild2022@gmail.com
    Twitter: @PhoenixGuildHQ
    `;

    const htmlPayload = `
    <html>
        <head>
            <style>
            body {
                font-family: 'Comic Sans MS', cursive, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
            }
            .container {
                background-color: #FFFFFF; /* background color */
                border-radius: 10px;
                border: 2px solid #3e125b; /* border color */
                padding: 20px;
                margin: 20px;
            }
            .header {
                background-image: url('https://pbs.twimg.com/profile_banners/1479033772091719682/1663772858/1500x500');
                background-size: cover;
                background-color: #0D1039; /* Fallback blue background */
                color: #EF7131;
                text-align: center;
                padding: 10px;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                color: #1e1842; /* text color */
                font-size: 16px; /* font size */
            }
            .content a {
                color: #EF7131; /* Change link color to orange */
                text-decoration: none; /* Remove underline from links */
            }
            </style>
        </head>
        <body>
            <div class="container">
            <div class="header">
                <h1><b>Welcome to The Phoenix Guild Newsletter!</b></h1>
            </div>
            <div class="content">
                <p>
                Thank you for <b>subscribing</b> to The Phoenix Guild newsletter. We're excited to have you on board!
                </p>
                <p>
                Here's what you can expect from our newsletter:
                </p>
                <ul>
                <li><b>Exciting Updates:</b> Stay in the loop with the latest news, workshops, events, and company updates.</li>
                <li><b>Exclusive Content:</b> Get access to exclusive articles, how-tos, and resources delivered right to your inbox.</li>
                <li><b>Special Offers:</b> Be the first to know about our promotions, discounts, and special offers.</li>
                <li><b>Community:</b> Join our thriving community of subscribers and engage in discussions, feedback, and more.</li>
                </ul>
                <p>
                We promise not to flood your inbox with emails. You'll receive our newsletter <b>once a week</b>, and we'll make sure it's worth your while.
                </p>
                <p>
                If you ever have any questions, feedback, or suggestions, please don't hesitate to reach out to us. We value your input!
                </p>
                <p>
                Thanks again for joining us. We're looking forward to a <b>fantastic journey</b> together.
                </p>
                <p>
                <b>Best regards,</b>
                </p>
                <p>
                <b>The Phoenix Guild</b><br>
                Visit our website: <a href="https://www.thephoenixguild.org/"><b>www.thephoenixguild.org</b></a><br>
                Contact us anytime at: <a href="mailto:getintouch.tpg@gmail.com?subject=Re:%20TPG%20Newsletter"><b>thephoenixguild2022@gmail.com</b></a><br>
                Follow us on Twitter: <a href="https://twitter.com/PhoenixGuildHQ"><b>@PhoenixGuildHQ</b></a>
                </p>
            </div>
            </div>
        </body>
    </html>
    `;

    const email = await sendEmail( process.env.TPG_GET_IN_TOUCH_EMAIL, req.body.email, subject, payload, htmlPayload );

    return res.status(200).send({

        message: "You have successfully subscribed to our newsletter"

    });
});

exports.loginTPG = asyncHandler( async (req, res, next) => {

    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false }).toString('hex');
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    const otpExpiry = dayjs().add(5, 'minute').toDate();

    const tpgAdmin = await TPGAdmin.findOneAndUpdate(
        { email: process.env.TPG_GET_IN_TOUCH_EMAIL },
        {
            otp: hashedOtp,
            otpExpiry,
            createdAt: dayjs().toDate()
        },
        { upsert: true, new: true }
    );

    const subject = "TPG login request";

    const payload = `TPG OTP for login is ${otp}. It will expire in 5 minutes.`;

    const email = await sendEmail( process.env.TPG_GET_IN_TOUCH_EMAIL, process.env.MAIN_TPG_EMAIL, subject, payload, undefined );

    return res.status(200).send({

        email

    });

});

exports.getAllTPGNewsletterSubscribers = asyncHandler(async (req, res, next) => {
    
    const otp = crypto.createHash('sha256').update(req.params.otp).digest('hex');

    const tpgAdmin = await TPGAdmin.findOneAndUpdate({ otp , otpExpiry: { $gt: dayjs().toDate() } }, { $unset:{ otp: "", otpExpiry: "" } }, { new: true });

    if(!tpgAdmin) {
        return next(new ErrorResponse(401, 'invalid or expired OTP'));
    }

    const subscribers = await TPGSubscriber.find();

    let subscribersList = "";

    for(let subscriber of subscribers) {
        subscribersList += `${subscriber.email},`;
    }

    return res.status(200).send(subscribersList);
});

exports.sendTPGFeedback = asyncHandler(async (req, res, next) => {

    const subject = `Business Enquiry: ${req.body.name}`;

    const payload = `

    From: ${req.body.name},
    
    Contact: ${req.body.email},
    
    Message: ${req.body.message}
    
    `;

    const htmlPayload = undefined;

    let toEmail;

    switch(req.query.location) {
        case 'delhi':
            toEmail = process.env.DELHI_TPG_EMAIL;
            break;
        case 'jaipur':
            toEmail = process.env.JAIPUR_TPG_EMAIL;
            break;
        case 'kolkata':
            toEmail = process.env.KOLKATA_TPG_EMAIL;
            break;
        case 'pune':
            toEmail = process.env.PUNE_TPG_EMAIL;
            break;
        case 'bhopal':
            toEmail = process.env.BHOPAL_TPG_EMAIL;
            break;
        case 'hyderabad':
            toEmail = process.env.HYDERABAD_TPG_EMAIL;
            break;
        case 'chennai':
            toEmail = process.env.CHENNAI_TPG_EMAIL;
            break;
        case 'kerala':
            toEmail = process.env.KERALA_TPG_EMAIL;
            break;
        case 'karnataka':
            toEmail = process.env.KARNATAKA_TPG_EMAIL;
            break;
        case 'ahmedabad':
            toEmail = process.env.AHMEDABAD_TPG_EMAIL;
            break;
        case 'kualalumpur':
            toEmail = process.env.KUALALUMPUR_TPG_EMAIL;
            break;
        case 'main':
            toEmail = process.env.MAIN_TPG_EMAIL;
            break;
        default:
            toEmail = process.env.MAIN_TPG_EMAIL;
    }

    const email = await sendEmail( process.env.TPG_GET_IN_TOUCH_EMAIL, toEmail, subject, payload, htmlPayload );

    return res.status(200).send({

        message: "Thank you for reaching out to us! We will get back to you."

    });
});