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
    if (
        body2Click(conversation) < 2 &&
        body3Click(conversation) == "[empty]" && 
        body4Click(conversation) == "[empty]" &&
        var7 ==  false
    ) {
        return true;
    }
    else{
        return false;
    }
}
function body9Click(conversation){
    if (
        var4 == "boldsales@filtersfast.com" &&
        var3.split("@")[1] == "filtersfast.com" &&
        var7 == true &&
        var2 == 1
    ) {
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
function body12Click(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else if(var9 == false){
        if(!conversation.latest_message.from_field.address){
            return "[empty]";
        }
        else{
            return conversation.latest_message.from_field.address;
        }
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
    else if(var9 == false){
        if(!conversation.latest_message.from_field.name){
            return "[empty]";
        }
        else{
            return conversation.latest_message.from_field.name;
        }
    }
    else{
        var name = (conversation.latest_message.body.split("From:</b>")[1]).split("&lt;")[0];
        return name;
    }
}
function body15Click(conversation){
    var labels = ["No labels"]
    replied = false;
    for ( var i = 0, labelCount = conversation.labels.length; i < labelCount; i++ ) {	
        var prefix = conversation.labels[i].id.split("-")[0];
        if(prefix != "closed" && prefix != "assigned" && prefix != "assigned_to_others" && prefix != "unassigned" && prefix != "archive"){
            if(prefix == "sent"){
                replied = true;
            }
            else{
                labels.push(conversation.labels[i].id) // this can be .name or .id
            }
        }
    }
    if(labels.length > 1){
        labels.shift();
    }
    return labels;// +  " | " + replied;
}
function body16Click(conversation, labelID){
    var labeled = false;
    $(var15).each(function(){
        if(this.split("-")[4] == labelID){
          labeled = true;
        }
    });
    return labeled;
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
function showResults(){
    $("#body1").text(var1);
    $("#body2").text(var2);
    $("#body3").text(var3);
    $("#body4").text(var4);
    $("#body5").text(var5);
    $("#body6").text(var6); 
    $("#body7").text(var7);
    $("#body8").text(var8);
    $("#body9").text(var9);
    $("#body10").text(var10);
    $("#body11").text(var11);
    $("#body12").text(var12);
    $("#body13").text(var13);
    $("#body14").text(var14);
    $("#body15").text(var15);
    $("#body16").text(var16);
    $("#body17").text(var17)
}

/*
~~~~~~~~~~ SIMPLIFY - remove/consolodate duplicated fuctions. if one true/false applies to many things, check them all at once. organize/sort, but not in such a way that it breaks functionality. test everything. consolodate results into one textbox
replace "from" with modified "from" - but still have a trigger for when the email is being replaced so a draft can be made
- only make a draft if message count is 1
- make the "to" the customer's email. find a way to remove the other email. try array = []
assign new drafts
set these as utitilies
create an array of tasks for POs and for tax exempt and others
get order number from convo subject line - split by space. if [0] lowercase is "order" and array length is less than 4. or if anywhere in the subject or body (html removed) is "order number XXXXXXXX" "order XXXXXXXX" "order no. XXXXXXXX" "order # XXXXXXXX" 
        get all of the array but [0] and combine into 1 string. remove spaces, remove "CP", remove "-", remove "#"
    else
        order number = "empty"
    if order number is given by user, and order number was previosuly "empty", set convo subject to order number
check for contact by email. if one does not exist, create it. show fields for the user to modify: name, phone number, email, cust ID. when any field is modified, update contact.
scan subject and body for keywords and phrases to identify the intention of the emails. put this in a place where it can be easily modified by the user (or me at least)
  - offer presets based on what the email appears to be about in a dropdown menu. the most likely response will be first, but others will be available.
create forms
set up branching for forms
make autoreply templates that can be modified by me, based on the regular templates
identify time of day when applying a template
take contexts for monday forms and for responses
for certain values entered into integration form, save the info automatically (order numbers, tracking numbers, etc.)
link to monday form
link to monday search
include link to message in monday form?
decide what should be CCA, what should be CRM, and what should be shared, separate accordingly
come up with functions admins can do with no coding, such as change a person's level
respond automatically to chatbot requests
make an "about" page to show version, e tc
determine whether to say "thanks for reaching out" or "thank you for your reply"
     - 
        - has attachments?
        - function to do all starting operations
        - create task
        - link within extension
        - link to other extension
        - link outside of extension
        - assign label

    things to show on master list
    - final from email
    - to email
    - message count
    - will assign draft
    - preview
    - body
    - link to convo
    - link to message
    - customer's name
    - labels
    - is label? (with example)
*/