function empty(conversation) {
    if(!conversation.latest_message){
        return true;
    }
    else{
        return false;
    }
}
function body1Click(conversation){
    return conversation.id;
}
function body2Click(conversation){
    return (currentConversation.messages_count);
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
function body5Click(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        return conversation.latest_message.subject;
    }
}
function body6Click(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        return conversation.subject;
    }
}
function body7Click(conversation){
    var assignedToMe = false;
    for ( var i = 0, assignee = conversation.assignees.length; i < assignee; i++ ) {	
        if(conversation.assignees[i].id == currentUser.id){
            assignedToMe = true;
        }
    }
    return assignedToMe;
}
function body8Click(conversation){
    if (body2Click(conversation) < 2 && body3Click(conversation) == "[empty]" && body4Click(conversation) == "[empty]" && var7 ==  false) {// & unassigned
        return true;
    }
    else{
        return false;
    }
}
function body9Click(conversation){
    if (var4 = "boldsales@filtersfast.com" && var3.split("@")[1] == "filtersfast.com" && var7 == true && var2 == 1)
    {
        return true;
    }
    else {
        return false;
    }
}
function body10Click(conversation){

}
function body1Reset(){
    $("#body1").text("[ready]")
}
function body2Reset(){
    $("#body2").text("[ready]")
}
function body3Reset(){
    $("#body3").text("[ready]")
}
function body4Reset(){
    $("#body4").text("[ready]")
}
function body5Reset(){
    $("#body5").text("[ready]")
}
function body6Reset(){
    $("#body6").text("[ready]")
}
function body7Reset(){
    $("#body7").text("[ready]")
}
function body8Reset(){
    $("#body8").text("[ready]")
}
function body9Reset(){
    $("#body9").text("[ready]")
}


// https://mail.missiveapp.com/#inbox/conversations/   [conversation ID]

// https://mail.missiveapp.com/#inbox/conversations/   [conversation ID]   /messages/   [message ID]

