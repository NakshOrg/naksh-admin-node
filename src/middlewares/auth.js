const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

const { ErrorResponse } = require('../helpers/error');

const { asyncHandler } = require('../middlewares/asyncHandler');

exports.auth = asyncHandler( async (req, res, next) => {

    if(req.header('token')) {
        const token = req.header('token').replace('Bearer ','');
        
        await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if(err) {
                return next(new ErrorResponse( 401, "invalid or expired token"));
            }
            else {

                switch (decoded.userType) {
                    case 0:
        
                        let admin = await Admin.findOne({ _id: decoded._id });
                        
                        if(!admin) {
        
                            return next(new ErrorResponse( 401, "invalid or expired token"));
        
                        } else {
        
                            req.loggedIn = true;
                            req.userType = decoded.userType;
                            req.admin = admin;
                        }
                    
                    break;
                
                    default:
                        
                        return next(new ErrorResponse( 401, "unsupported user type"));
                    
                    break;
            
                }

            }
        });
        
    }
    else {
        req.loggedIn = false;
    }

    return next();

});

exports.restrictAdmin = asyncHandler( async (req, res, next) => {

    if(!req.loggedIn || req.userType != 0) {

        return next(new ErrorResponse(401, 'unauthorized'));
    }

    return next();

});