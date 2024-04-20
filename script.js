function body1Click(){
    $("#body1").text(currentConversation.id)
}
function body2Click(){
    $("#body2").text(currentConversation.messages_count)
}
function body3Click(){
    $("#body3").text(currentConversation.latest_message.to_fields[0].address)
}
function body4Click(){
    $("#body4").text(currentConversation.latest_message.from_field.address)
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