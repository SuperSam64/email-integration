// https://developers.ringcentral.com/my-account.html#/applications
// Find your credentials at the above url, set them as environment variables, or enter them below

// PATH PARAMETERS
const accountId = '~';

// OPTIONAL QUERY PARAMETERS
const queryParams = {
    //extensionNumber: '<ENTER VALUE>',
    //email: '<ENTER VALUE>',
    //page: 000,
    //perPage: 000,
    //status: [  ],
    //type: [ 'User', 'FaxUser', 'FlexibleUser', 'VirtualUser', 'DigitalUser', 'Department', 'Announcement', 'Voicemail', 'SharedLinesGroup', 'PagingOnly', 'IvrMenu', 'ApplicationExtension', 'ParkLocation', 'Limited', 'Bot', 'ProxyAdmin', 'DelegatedLinesGroup', 'Site' ]
};

const SDK = require('ringcentral');
const rcsdk = new SDK({ 'server': process.env.RC_SERVER_URL, 'clientId': process.env.RC_CLIENT_ID, 'clientSecret': process.env.RC_CLIENT_SECRET });
const platform = rcsdk.platform();
platform.login({ jwt: process.env.RC_JWT }).then(() => {
    platform.get(`/restapi/v1.0/account/${accountId}/extension`, queryParams).then((r) => {
        // PROCESS RESPONSE
    });
});
