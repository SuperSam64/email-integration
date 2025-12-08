var testKey = localStorage.getItem('missive_po_key');
var currentConvo;
function openForm(){
  var messageLink = 'https://forms.monday.com/forms/3ae2e16a1b03593499e614a01d99d276?r=use1&missive=https://mail.missiveapp.com/#inbox/conversations/' + currentConvo;
  window.open(messageLink);
}
Missive.on('change:conversations', (ids) => {
  Missive.fetchConversations(ids).then((conversations) => {
    if (conversations.length != 1) {
      // Do nothing if multiple conversations are selected.
      return
    }
    currentConvo = conversations[0].id;
  })
})
function goToBoard(){
  var boardItem = 'https://filtersfast.monday.com/boards/18391198601/views/225788621?term=' + currentConvo + '&termColumns=XQAAAAIuAAAAAAAAAABBKsIjgbh-LZdXWUk_Qca3vzf388YyoJAIN0pDiOXAthWBVSnuVp97G60BfwSb___50kAA';
  window.open(messageLink);
}
