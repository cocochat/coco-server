let Campaign = require('../models/Campaign');
let auth     = require('../config/Authentication');
let mailer   = require('../config/Mailer');
let winston  = require('../config/Winston');


/**
 name
 image
 description
 textAlignment
 textColor
 backgroundColor
 link
 targetAudience
 artistID
 */
module.exports = {
    create: (req, res) => {
        if (!req.user) {
            return res.json({status: false, message: "Authentication Error: Please login.", data: {}, meta: {}});
        }
        let campaign             = new Campaign();
        let user                 = req.user;
        campaign.name            = req.body.name;
        campaign.image           = req.body.image;
        campaign.description     = req.body.description;
        campaign.textAlignment   = req.body.textAlignment;
        campaign.textColor       = req.body.textColor;
        campaign.backgroundColor = req.body.backgroundColor;
        campaign.link            = req.body.link;
        campaign.targetAudience  = req.body.targetAudience;
        campaign.artistID        = user.id;
        campaing.save()
                .then(function (savedCampaign) {
                    console.log(savedCampaing);
                    if (savedCampaign) {
                        return res.json({
                            status : true,
                            message: "Campaign Created.",
                            data   : {campaign: campaign},
                            meta   : {}
                        });
                    }
                })
                .catch(function (err) {
                    winston.record(err);
                    console.log(err);
                    return res.json({status: false, message: "Error Creating Campaing.", data: {err: err}, meta: {}});
                })
        
    },
    draft : (req, res) => {
        if (!req.user) {
            return res.json({status: false, message: "Authentication Error: Please login.", data: {}, meta: {}});
        } else if (!req.params.id) {
            return res.json({status: false, message: "Missing Campaign ID.", data: {}, meta: {}});
        }
        let user = req.user;
        Campaign.getCampaignById(req.params.id, function (campaign) {
            campaign.name            = req.body.name;
            campaign.image           = req.body.image;
            campaign.description     = req.body.description;
            campaign.textAlignment   = req.body.textAlignment;
            campaign.textColor       = req.body.textColor;
            campaign.backgroundColor = req.body.backgroundColor;
            campaign.link            = req.body.link;
            campaign.targetAudience  = req.body.targetAudience;
            campaing.save()
                    .then(function (updatedCampaign) {
                        return res.json({status: true, message: "Campaign Updated.", data: {}, meta: {}})
                    })
                    .catch(function (err) {
                        winston.record(err);
                        console.log(err);
                        return res.json({
                            status : false,
                            message: "Error Updating Campaign.",
                            data   : {error: err},
                            meta   : {}
                        });
                    });
        });
    },
    launch: (req, res) => {
        if (!req.user) {
            return res.json({status: false, message: "Authentication Error: Please login.", data: {}, meta: {}});
        }
    },
    edit  : (req, res) => {
        if (!req.user) {
            return res.json({status: false, message: "Authentication Error: Please login.", data: {}, meta: {}});
        } else if (!req.params.id) {
            return res.json({status: false, message: "Missing Campaign ID.", data: {}, meta: {}});
        }
        Campaign.getCampaignById(req.params.id, function (campaign) {
            if (!campaign) {
                return res.json({status: false, message: "Campaign not found.", data: {}, meta: {}});
            }
            return res.json({status: true, message: "Campaign Found.", data: {campaign: campaign}, meta: {}});
        });
        
    },
    delete: (req, res) => {
        if (!req.user) {
            return res.json({status: false, message: "Authentication Error: Please login.", data: {}, meta: {}});
        } else if (!req.params.id) {
            return res.json({status: false, message: "Missing Campaign ID.", data: {}, meta: {}});
        }
        Campaign.removeCampaign(req.params.id, function (removedCampaign) {
            return res.json({status: true, message: "Campaign Removed.", data: {}, meta: {}})
        })
    }
}
