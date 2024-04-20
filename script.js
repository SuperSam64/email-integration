function body1Click(){
    $("#body1").text(currentConversation.id + " | " + currentConversation.messages_count)// + " | " + currentMessage.id)
}
function body1Reset(){
    $("#body1").text("[ready]")
}