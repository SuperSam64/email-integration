
/*var missive_po_key = localStorage.getItem('missive_po_key');
console.log('Key:', missive_po_key);*/

var testKey = localStorage.getItem('missive_po_key');
console.log('Key:', testKey);


/*function openForm(){
  var URL = window.location.href;
  var conversation = URL.split('conversations/')[1];
  var messageLink = 'https://mail.missiveapp.com/#inbox/conversations/' + conversation;
  var formLink = 'https://forms.monday.com/forms/3ae2e16a1b03593499e614a01d99d276?r=use1&missive=' + messageLink;
  window.open(formLink);
}*/

function openForm(){
  Missive.fetchConversations(ids).then((conversations) => {
    if (conversations.length != 1) {
      // Do nothing if multiple conversations are selected.
      return
    }

    var message = conversations[0].latest_message
    if (!message || !message.from_field) {
      // Do nothing if conversation has no message (only chat comments) or if
      // message has no From field.
      return
    }

    var from = message.from_field
    console.log('Message from:', from.name, from.address)
    console.log('Message subject:', message.subject)
  })
}

/*function openForm(){
  var keyField = document.getElementById('keyField');
  var key = keyField.textContent;
  localStorage.setItem('missive_po_key', key);
  var missive_po_key = localStorage.getItem('missive_po_key');
  console.log('Key:', missive_po_key);
}*/
