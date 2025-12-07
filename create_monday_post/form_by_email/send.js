var URL = window.location.href;
var conversation = URL.split('conversations/')[1];
var messageLink = 'https://mail.missiveapp.com/#inbox/conversations/' + conversation;

console.log(messageLink);
