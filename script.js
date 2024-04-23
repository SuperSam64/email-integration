function getConversation(conversation){
    return conversation.id;
}
function getMessageCount(conversation){
    return (currentConversation.messages_count);
}
function getTo(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        return conversation.latest_message.to_fields[0].address;
    }
}
function getFrom(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else {
        var switchEmails;
        var assignedToMe = false;
        for ( var i = 0, assignee = conversation.assignees.length; i < assignee; i++ ) {	
            if(conversation.assignees[i].id == currentUser.id){
                assignedToMe = true;
            }
        }
        if (
            conversation.messages_count == 1 &&
            conversation.latest_message.to_fields[0].address.split("@")[1] == "filtersfast.com" &&
            conversation.latest_message.from_field.address == "boldsales@filtersfast.com" &&
            assignedToMe == true       
        ) {
            switchEmails = true;
        }
        else {
            switchEmails = false;
        }
        if(switchEmails == false){
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
}
function getName(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else {
        var switchName;
        var assignedToMe = false;
        for ( var i = 0, assignee = conversation.assignees.length; i < assignee; i++ ) {	
            if(conversation.assignees[i].id == currentUser.id){
                assignedToMe = true;
            }
        }
        if (
            conversation.messages_count == 1 &&
            conversation.latest_message.to_fields[0].address.split("@")[1] == "filtersfast.com" &&
            conversation.latest_message.from_field.address == "boldsales@filtersfast.com" &&
            assignedToMe == true        
        ) {
            switchName = true;
        }
        else {
            switchName = false;
        }    
        if(switchName == false){
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
}
function getMessageSubject(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        return conversation.latest_message.subject;
    }
}
function getConversationSubject(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        return conversation.subject;
    }
}
function checkAssigned(conversation){
    var assignedToMe = false;
    for ( var i = 0, assignee = conversation.assignees.length; i < assignee; i++ ) {	
        if(conversation.assignees[i].id == currentUser.id){
            assignedToMe = true;
        }
    }
    return assignedToMe;
}
function checkDraft(conversation){ 
    for ( var i = 0, assignee = conversation.assignees.length; i < assignee; i++ ) {	
        if(conversation.assignees[i].id == currentUser.id){
            return false;
        }
    }
    if(
        !conversation.latest_message &&
        currentConversation.messages_count < 2 
    ){
        return true;
    }
    else {
        return false;
    }
}
function updateFrom(conversation){ 
    var assignedToMe = false;
    for ( var i = 0, assignee = conversation.assignees.length; i < assignee; i++ ) {	
        if(conversation.assignees[i].id == currentUser.id){
            assignedToMe = true;
        }
    }
    if(!conversation.latest_message){
        return false;
    }
    else {
        if (
            currentConversation.messages_count == 1 &&
            conversation.latest_message.to_fields[0].address.split("@")[1] == "filtersfast.com" &&
            conversation.latest_message.from_field.address == "boldsales@filtersfast.com" &&
            assignedToMe == true        
        ) {
            return true;
        }
        else {
            return false;
        }
    }
}
function getConversationLink(conversation){
    return "https://mail.missiveapp.com/#inbox/conversations/" + conversation.id;
}
function getMessageLink(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        return "https://mail.missiveapp.com/#inbox/conversations/" + conversation.id + "/messages/" + conversation.latest_message.id;
    }
}
function getLabels(conversation){
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
function labelCheck(conversation, labelID){
    var labeled = false;
    $(labels).each(function(){
        if(this.split("-")[4] == labelID){
          labeled = true;
        }
    });
    return labeled;
}
function getPreview(conversation){
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        return conversation.latest_message.preview;
    }
}
function getFullMessage(conversation){
    if(!conversation.latest_message){
        $("#body16").text("[empty]")
    }
    else{
        $("#body16").html("</div>" + conversation.latest_message.body + "</div>"); // element can be changed
    }
}
function getOrderNumber(conversation){
    var subject = conversation.subject.toLowerCase();
    var myVar;
    if(subject.includes("order")){
        myVar = "[" + subject + "]";
        myVar = myVar.split("order")[1];
         myVar = myVar.replace(" ","");
        myVar = myVar.replace("]"," ]");
        myVar = myVar.split(" ")[0];
        myVar = myVar.replace("#","");
        myVar = myVar.replace(";","");
        myVar = myVar.replace(".","");
        myVar = myVar.replace("cp09","|!|");
        myVar = myVar.replace("-","");
        myVar = myVar.replace("cp","");
        myVar = myVar.replace(" ","");
        myVar = myVar.replace("|!|","CP09-");  
    
    }
    else {
        myVar = "[empty]";
    }

    
    /*var myVar = ("text" + conversationSubject.toLowerCase()).split("order")[1];
    myVar = myVar + " text";
    myVar = myVar.replace("#","");
    myVar = myVar.replace(";","");
    myVar = myVar.replace(".","");
    myVar = myVar.replace("#","");
    myVar = myVar.replace("cp09","|!|");
    myVar = myVar.replace("-","");
    myVar = myVar.replace("cp","");
    myVar = myVar.replace(" ","");
    myVar = myVar.replace("|!|","CP09-");
    myVar = myVar.split(" ")[0];
    if(myVar.length == 8){
        // normal order
        myVar = "Order #" + myVar
    }
    else if(myVar.length == 12) {
        // CP09 order
        myVar = "Order #" + myVar
    }
    else{
        myVar = "unknown"
    }*/

    // replace: spaces, slash, comma, period, numsign, cp09- (temporarily), cp, dashes. then replace CP09- back.
    //myVar = subject;
    return myVar;
}
function update (input){
    conversationID = getConversation(input);
    conversationCount = getMessageCount(input);
    messageTo = getTo(input);
    messageFrom = getFrom(input);
    customerName = getName(input);
    messageSubject = getMessageSubject(input);
    conversationSubject = getConversationSubject(input);
    userAssigned = checkAssigned(input);
    assignDraft = checkDraft(input);
    forwarded = updateFrom(input);
    conversationLink = getConversationLink(input);
    messageLink = getMessageLink(input);
    labels = getLabels(input);
    isLabeled = labelCheck(input, "1d53229eb9e1"); // this can be moved - does not need to happen at startup
    preview = getPreview(input);
    getFullMessage(input); // this is linked to a specific element - change it in script.js as needed
    orderNumber = getOrderNumber(input);
}
function orderNumberSearch (){
    // use this to search the body for an order number if one is not present in the subject.
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
function body5Reset(){
    $("#body5").text("[ready]")
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
    $("#body1").text(conversationID);
    $("#body2").text(conversationCount);
    $("#body3").text(messageTo);
    $("#body4").text(messageFrom);
    $("#body5").text(customerName);
    $("#body6").text(messageSubject); 
    $("#body7").text(conversationSubject);
    $("#body8").text(userAssigned);
    $("#body9").text(assignDraft);
    $("#body10").text(forwarded);
    $("#body11").text(conversationLink);
    $("#body12").text(messageLink);
    $("#body13").text(labels);
    $("#body14").text(isLabeled);
    $("#body15").text(preview);
    $("#body17").text(orderNumber);
}

/*
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
<div data-missive-collapsable-handle="true"></div>
        ^ previous message
parse diff formats like gmail, yahoo mail, etc
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
    - new message for caddis warning

    order number
    order no
    order no.
    order #
    order number is
    order no is
    order no. is
    order # is

*/