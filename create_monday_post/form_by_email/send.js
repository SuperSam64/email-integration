var URL = window.location.href;
var conversation = URL.split('conversations/')[1];
var messageLink = 'https://mail.missiveapp.com/#inbox/conversations/' + conversation;
var formLink = 'https://forms.monday.com/forms/3ae2e16a1b03593499e614a01d99d276?r=use1&missive=' + messageLink;
window.open(formLink);
