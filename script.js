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
    //return var4 + " | " +  var3 + " | " + var7 + " | " + var2;
    if (var4 == "boldsales@filtersfast.com" && var3.split("@")[1] == "filtersfast.com" && var7 == true && var2 == 1)
    {
        return true;
    }
    else {
        return false;
    }
}
function body10Click(conversation){
    return "https://mail.missiveapp.com/#inbox/conversations/" + conversation.id;
}
function body11Click(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        return "https://mail.missiveapp.com/#inbox/conversations/" + conversation.id + "/messages/" + conversation.latest_message.id;
    }
}
/*function body12Click(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        var email = (conversation.latest_message.body.split("mailto:")[1]).split('"')[0]
        return email;
    }
}
function body13Click(conversation){

}
function body14Click(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        var name = (conversation.latest_message.body.split("From:</b>")[1]).split("&lt;")[0];
        return name;
    }
}*/
function body15Click(conversation){

}
function body16Click(conversation){

}
function body17Click(conversation){

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
function body10Reset(){
    $("#body10").text("[ready]")
}
function body11Reset(){
    $("#body11").text("[ready]")
}
function body12Reset(){
    $("#body12").text("[ready]")
}
function body13Reset(){
    $("#body13").text("[ready]")
}
function body14Reset(){
    $("#body14").text("[ready]")
}
function body15Reset(){
    $("#body15").text("[ready]")
}
function body16Reset(){
    $("#body16").text("[ready]")
}
function body17Reset(){
    $("#body17").text("[ready]")
}