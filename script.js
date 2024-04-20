function body1Click(){
    $("#body1").text(currentConversation.id)
}
function body2Click(){
    $("#body2").text(currentConversation.messages_count + " | " + currentConversation.messages.length)
}
function body3Click(){
    var something = "[empty]"
    something = currentConversation.latest_message.to_fields[0].address;
    $("#body3").text(something)
}
function body4Click(){
    var something = "[empty]"
    something = currentConversation.latest_message.from_field.address;
    $("#body4").text(something)
}
function body1Reset(){
    $("#body1").text("[ready]")
}
function body1Reset(){
    $("#body2").text("[ready]")
}
function body1Reset(){
    $("#body3").text("[ready]")
}
function body1Reset(){
    $("#body4").text("[ready]")
}