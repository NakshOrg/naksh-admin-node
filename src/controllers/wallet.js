const { body, validationResult } = require ('express-validator');

const { Wallet, Chain, Network } = require('mintbase');

exports.connectWallet = async (req, res, next) => {
    try {

        const { data, error } = await new Wallet().init({
            networkName: Network.testnet,
            chain: Chain.near,
            apiKey: process.env.MINTBASE_API_KEY
        });
        
        const { wallet, isConnected } = data;

        if (isConnected) {
            
            const details = await wallet.details();
            
            return res.send({ details });
    
            /*
                accountId: "qwerty.testnet"
                allowance: "0.25"
                balance: "365.77"
                contractName: "mintbase13.testnet"
            */
        } else {
            return res.send({ isConnected, wallet, error });
        }

    } catch (error) {
        // Write error handler
        return res.status(400).send({ error: error.message });
    }
}