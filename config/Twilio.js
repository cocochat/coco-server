const accountSID = process.env.TWILIO_ACCOUNT_SID,
      authToken  = process.env.TWILIO_AUTH_TOKEN,
      client     = require('twilio')(accountSID, authToken);

client.createAccount = function () {
    this.api.accounts.create().then(account => {
        return account;
    });
}

client.getAccount = function (sid) {
    this.api.accounts(sid)
        .fetch()
        .then(account => {
            return account;
        });
}

client.updateAccount = function (sid, status, friendlyName) {
    this.api.accounts(sid)
        .update({status: status, friendlyName: friendlyName})
        .then(account => {
            //todo log changes
            return account;
        })
    
};

client.purchasePhoneNumber = function (country, areacode) {
    client
        .availablePhoneNumbers(country)
        .local.list({
        areaCode  : areacode,
        smsEnabled: true,
        mmsEnabled: true,
    })
        .then(data => {
            const number = data[0];
            return client.incomingPhoneNumbers.create({
                phoneNumber: number.phoneNumber,
            });
        })
        .then(purchasedNumber => {
            return purchasedNumber
        });
};

module.exports = client;
