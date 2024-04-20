function body1Click(conversation){
    return conversation.id;
}
function body2Click(conversation){
    return (currentConversation.messages_count + " | " + currentConversation.messages.length);
}
function body3Click(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        return conversation.latest_message.to_fields[0].address;
    }
}
function body4Click(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        return conversation.latest_message.from_field.address;
    }
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