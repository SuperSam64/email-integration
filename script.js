function body1Click(){
    $("#body1").text(currentConversation.id + " | " + currentConversation.messages_count)
}
function body1Reset(){
    $("#body1").text("[ready]")
}