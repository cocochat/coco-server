const axios                                    = require('axios'),
      winston                                  = require('./Winston');
let OM                                         = {
    audience    : {},
    authenticate: {},
    customer    : {},
    message     : {},
    user        : {},
};
axios.defaults.baseURL                         = process.env.OM_ROOT || 'http://next.openmessage.io';
axios.defaults.headers.common['Authorization'] = process.env.OM_AUTH_KEY || 'FFu5cXopaIdC4R38nsfzTMN1KbSACs0msvrfuwhvDXr6uc3Z0zupRoDTGfIsbQkP';

OM.authenticate = function () {
    axios.get('/')
         .then(function (response) {
             console.log(response);
             return response;
         })
         .catch(function (err) {
             winston.record(err);
             console.log(err);
             return false;
         });
};

OM.audience.patch = function (params) {
    axios.patch('/audiences', params)
         .then(function (response) {
             console.log(response);
             return response;
         })
         .catch(function (err) {
             winston.record(err);
             console.log(err);
             return false;
         });
};

OM.audience.getAll = function () {
    axios.get('/audiences')
         .then(function (resp) {
             console.log(resp);
             return resp;
         })
         .catch(function (err) {
             winston.record(err);
             console.log(err);
             return false;
         });
};

OM.audience.update = function (data) {
    axios.put('/audiences', data)
         .then(function (resp) {
             console.log(resp);
             return resp;
         })
         .catch(function (err) {
             winston.record(err);
             console.log(err);
             return false;
         });
};

OM.audience.create = function (data) {
    axios.post('/audiences', data)
         .then(function (resp) {
             console.log(resp);
             return resp;
         })
         .catch(function (err) {
             winston.record(err);
             console.log(err);
             return false;
         });
};

// CUSTOMER INCOMPLETE?

OM.customer.getAll = function () {
    axios.get('/customers')
         .then(function (resp) {
             console.log(resp);
             return resp;
         })
         .catch(function (err) {
             winston.record(err);
             console.log(err);
             return false;
         });
};

OM.customer.createOne = function (customerData) {
    axios.post('/customers/save-one', customerData)
         .then(function (resp) {
             console.log(resp);
             return resp;
         })
         .catch(function (err) {
             winston.record(err);
             console.log(err);
             return false;
         });
};

OM.customer.createBatch = function (customersData) {
    axios.post('/customers/save-batch', customersData)
         .then(function (resp) {
             console.log(resp);
             return resp;
         })
         .catch(function (err) {
             winston.record(err);
             console.log(err);
             return false;
         });
};

// MESSAGING
OM.message.getAll = function () {
    axios.get('/messages')
         .then(function (resp) {
             console.log(resp);
             return resp;
         })
         .catch(function (err) {
             winston.record(err);
             console.log(err);
             return false;
         });
};

OM.message.create = function (data) {
    axios.post('/messages', data)
         .then(function (resp) {
             console.log(resp);
             return resp;
         })
         .catch(function (err) {
             winston.record(err);
             console.log(err);
             return false;
         });
};

OM.message.sendSingle = function (data) {
    /**
     * params:
     * messageId - Id of the message
     * customerId - Id of the target customer
     * organizationId - Id of the organization of origin
     */
    axios.post('/messages/sendSingleMessage', data, {
        headers: {
            'Content-Type': 'applicaiton/json',
            'Authorization': process.env.OM_AUTH_KEY || 'FFu5cXopaIdC4R38nsfzTMN1KbSACs0msvrfuwhvDXr6uc3Z0zupRoDTGfIsbQkP'
        }
    })
        .then(function (sentMessage) {
            console.log(sentMessage);
            return sentMessage;
        })
        .catch(function (err) {
            winston.record(err);
            console.log(err);
            return false;
        });
};


module.exports = OM;
