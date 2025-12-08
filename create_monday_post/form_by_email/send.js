
/*var missive_po_key = localStorage.getItem('missive_po_key');
console.log('Key:', missive_po_key);*/

var testKey = localStorage.getItem('missive_po_key');
var currentConvo;
console.log('Key:', testKey);


/*function openForm(){
  var URL = window.location.href;
  var conversation = URL.split('conversations/')[1];
  var messageLink = 'https://mail.missiveapp.com/#inbox/conversations/' + conversation;
  var formLink = 'https://forms.monday.com/forms/3ae2e16a1b03593499e614a01d99d276?r=use1&missive=' + messageLink;
  window.open(formLink);
}*/


 Missive.on('change:conversations', (ids) => {
   Missive.fetchConversations(ids).then((conversations) => {
     if (conversations.length != 1) {
       // Do nothing if multiple conversations are selected.
       return
     }
     currentConvo = conversations[0]
     console.log(currentConvo);
   })
})
           

/*function openForm(){
  var keyField = document.getElementById('keyField');
  var key = keyField.textContent;
  localStorage.setItem('missive_po_key', key);
  var missive_po_key = localStorage.getItem('missive_po_key');
  console.log('Key:', missive_po_key);
}*/
