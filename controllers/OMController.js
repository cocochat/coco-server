const winston = require('../config/Winston');
let om = require('../config/OMAPI');

module.exports = {
    //Audiences
    getAllAudiences: (req, res) => {
        let audiences = OM.audience.getAll();
        
        return res.json(audiences);
    },
    
    updateAudiences: (req, res) => {
        let audienceData = req.body.audienceData;
        
        let resp = OM.audience.patch(audienceData);
        if (resp) {
            return res.json(resp);
        } else {
            return res.error();
        }
    },
    
    //todo remove audience
    
    //Customers
    getCustomers: (req, res) => {
        let customers = OM.customer.getAll();
        return res.json(customers);
    },
    
    createCustomer: (req, res) => {
        let customer = req.body.customerData;
        let resp = OM.customer.createOne(customer);
        if (resp) {
            return res.json(resp);
        } else {
            return res.error();
        }
    },
    
    uploadCustomerBatch: (req, res) => {
        //todo decide type of file to be uploaded for customers batch
        let customers = req.body.customerBatch;
        let resp = OM.customer.createBatch(customers);
        if(resp) {
            return res.json(resp);
        } else {
            return res.error();
        }
    }
    
    //Messaging
}
