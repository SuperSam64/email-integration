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
    return conversation.subject;
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
function getFullMessage(conversation,element){
    if(!conversation.latest_message){
        $("#" + element).text("[empty]")
    }
    else{
        var bodyHTML = currentConversation.latest_message.body;
        bodyHTML = bodyHTML.replace('<div>--</div>','[end of message]');
        bodyHTML = bodyHTML.replace('<div id="divRplyFwdMsg"','[end of message]');
        bodyHTML = bodyHTML.replace('<div class="gmail_quote">','[end of message]');
        bodyHTML = bodyHTML.replace('<blockquote type="cite">','[end of message]');
        bodyHTML = bodyHTML.replace('<div class="WordSection1">','');
        bodyHTML = bodyHTML.replace('<div class="WordSection1">','[end of message]');
        bodyHTML = bodyHTML.replace('<p class="yahoo-quoted-begin"','[end of message]');
        bodyHTML = bodyHTML.replace('<div>-------- Original message --------</div>','[end of message]');
        bodyHTML = bodyHTML.replace('<hr id="zwchr">','[end of message]');
        bodyHTML = bodyHTML.replace('<div id="ymail_android_signature">','<div id="ymail_android_signature">[end of message]');
        if(bodyHTML.includes('[end of message]')){
            bodyHTML = bodyHTML.split('[end of message]')[0];
        }
        bodyHTML = bodyHTML.replaceAll("> <","><");
        bodyHTML = bodyHTML.replaceAll(">&nbsp;<","><");
        bodyHTML = bodyHTML.replaceAll("> &nbsp;<","><");
        bodyHTML = bodyHTML.replaceAll(">&nbsp; <","><");
        bodyHTML = bodyHTML.replaceAll("> &nbsp; <","><");
        bodyHTML = bodyHTML.replaceAll("<div ","[division]<div ");
        bodyHTML = bodyHTML.replaceAll("<div>","[division]<div>");
        bodyHTML = bodyHTML.replaceAll("</div>","[/division]");
        bodyHTML = bodyHTML.replaceAll("<p ","[paragraph]<p ");
        bodyHTML = bodyHTML.replaceAll("<p>","[paragraph]<p>");
        bodyHTML = bodyHTML.replaceAll("</p>","</p>[/paragraph]");
        bodyHTML = bodyHTML.replaceAll("<br>","[linebreak]");
        bodyHTML = bodyHTML.replaceAll("<br/>","[linebreak]");
        while (bodyHTML.includes("[division][/division]") || bodyHTML.includes("[paragraph][/paragraph]" || "[linebreak][linebreak]" || "[division][linebreak]")) {
            bodyHTML = bodyHTML.replaceAll("[division][/division]","");
            bodyHTML = bodyHTML.replaceAll("[division][linebreak]","[linebreak]");
            bodyHTML = bodyHTML.replaceAll("[paragraph][/paragraph]","");
            bodyHTML = bodyHTML.replaceAll("[linebreak][linebreak]","[linebreak]");
        }
        elementID = document.getElementById(element);
        elementID.innerHTML = bodyHTML;
        bodyHTML = elementID.innerText;
        bodyHTML = bodyHTML.replaceAll("[division]","<div>");
        bodyHTML = bodyHTML.replaceAll("[/division]","</div>");
        bodyHTML = bodyHTML.replaceAll("[paragraph]","<p>");
        bodyHTML = bodyHTML.replaceAll("[/paragraph]","</p>");
        bodyHTML = bodyHTML.replaceAll("[linebreak]","<br>");
        while (bodyHTML.includes("<br><br>") || bodyHTML.includes("<br> <br>")) {
            bodyHTML = bodyHTML.replaceAll("<br><br>","<br>");
            bodyHTML = bodyHTML.replaceAll("<br> <br>","<br>");
        }
        bodyHTML = bodyHTML + "[---]";
        bodyHTML = bodyHTML.replaceAll("<br>[---]","");
        bodyHTML = bodyHTML.replaceAll("<br> [---]","");
        bodyHTML = "<br><br>From: " + messageFrom + '<br><blockquote><span style="font-style:italic">' + bodyHTML + "</span></blockquote>" // can change later, also include date
        $("#" + element).html(bodyHTML);
        return bodyHTML.trim();
        //On [Month D Year] at [TIME AM/PM], [First and Last name] ([email]) wrote:
    }
}
function getOrderNumber(conversation){
    var subject = conversation.subject.toLowerCase();
    var orderString;
    if(subject.includes("order")){
        orderString = subject.trim() + " ]"
        orderString = "[" + orderString.split("order")[1]
        orderString = orderString.replace("#","");
        orderString = orderString.replace("no","");
        orderString = orderString.replace("number","");
        orderString = orderString.replace(";","");
        orderString = orderString.replace(":","");
        orderString = orderString.replace(".","");
        orderString = orderString.replace("cp09","|!|");
        orderString = orderString.replace("-","");
        orderString = orderString.replace("cp","");
        orderString = orderString.replace(")","");
        orderString = orderString.replace("[","");
        orderString = orderString.replace("|!|","CP09-")
        orderString = orderString.trim();
        orderString = orderString.replace("]"," ]");
        orderString = orderString.split(" ")[0];
        //orderString = orderString + " | " + orderString.length; // for testing, remove later
        if(orderString.length != 8 && orderString.length != 12){
            orderString = "[empty]";
        }
    }
    else {
        orderString = "[empty]";
    }
    return orderString;
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
    fullMessage = getFullMessage(input,"body16"); // this is linked to a specific element - change it in script.js as needed
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
function createTasks(tasks){
    for ( var i = 0; i < tasks.length; i ++ ) {	
        Missive.createTask(tasks[i], false);
    }
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
function insertSignature(closing){
    var closingHTML = (
        '<div class="missive_signature"><div>--</div><div>'+ closing + ',</div><div>' + currentUser.first_name.split(" ")[0] + 
        '</div><div><br></div><div>Filters Fast Customer Experience</div><div><br></div><div><a href="https://www.filtersfast.com">' +
        '<img alt="large-FF-shield-logo-Full.png" title="" width="192" data-missive-image-resolution="288" data-missive-resizable-image="true" ' + 
        'style="max-width: 100%" data-missive-attachment-id="524e01ca-499a-4edd-876d-a47b7ea50bbe"' + 
        'src="https://attachments-1.missiveapp.com/524e01ca-499a-4edd-876d-a47b7ea50bbe/large-FF-shield-logo-Full.png?Expires=1714167754&amp;' + 
        'Signature=lwkmfL-6G9a9VFmvvhBBxJDQbaW3WSY3qpWmhVMdIVF306OStGd3VbDi6i5BkxPlN2DLHWAwzjwzNlsx1XZWSx2lZXjZRcsbfuJDH0bW44TOyPi5dhcO6gZFfinbM-' + 
        'b1xjcPd5VF~znm8KuyOuNR~T1z2jDlcozKUuxhH6C3DKhw8freFAJ0bg~BlNGDo4iIHBETHdelihxGdlgi8Mo0V~7DNkEiq-9E~luNoX9gtJVgFsIq9BGT-VkxriknP84Ex27-' +
        '6kKArqZigcd4KcLqyY~gF6gaVl5cRrF-JMARqy4BzoOV3Kr~XRm4sN5a1o6IvmdgpJxvrE~XWTvucrLLyg__&amp;Key-Pair-Id=APKAJWJJOF7ZM5FW5N4Q" data-missive-' +
        'attachment-attributes="{&quot;id&quot;:&quot;524e01ca-499a-4edd-876d-a47b7ea50bbe&quot;,&quot;filename&quot;:&quot;large-FF-shield-logo-Full.png' +
        '&quot;,&quot;extension&quot;:&quot;png&quot;,&quot;url&quot;:&quot;/v1/attachments/524e01ca-499a-4edd-876d-a47b7ea50bbe/redirect?context%5Bid%5D=838671bd-' + 
        'cb11-4ed4-aff1-7fe4e1d33fdb&amp;context%5Bresource%5D=message_entry&amp;context%5Btype%5D=resource&quot;,&quot;media_type&quot;:&quot;image&quot;,&quot;' +
        'sub_type&quot;:&quot;png&quot;,&quot;size&quot;:32753,&quot;uploaded&quot;:true,&quot;width&quot;:1280,&quot;height&quot;:276,&quot;angle&quot;:null,&quot;' +
        'path&quot;:null,&quot;visibility&quot;:&quot;private&quot;,&quot;resolution&quot;:null,&quot;context&quot;:{&quot;type&quot;:&quot;resource&quot;,&quot;' +
        'resource&quot;:&quot;message_entry&quot;,&quot;id&quot;:&quot;838671bd-cb11-4ed4-aff1-7fe4e1d33fdb&quot;},&quot;signed_url&quot;:&quot;' +
        'https://attachments-1.missiveapp.com/524e01ca-499a-4edd-876d-a47b7ea50bbe/large-FF-shield-logo-Full.png?Expires=1714167754&amp;Signature=' +
        'lwkmfL-6G9a9VFmvvhBBxJDQbaW3WSY3qpWmhVMdIVF306OStGd3VbDi6i5BkxPlN2DLHWAwzjwzNlsx1XZWSx2lZXjZRcsbfuJDH0bW44TOyPi5dhcO6gZFfinbM-b1xjcPd5VF~znm8KuyOuNR~' +
        'T1z2jDlcozKUuxhH6C3DKhw8freFAJ0bg~BlNGDo4iIHBETHdelihxGdlgi8Mo0V~7DNkEiq-9E~luNoX9gtJVgFsIq9BGT-VkxriknP84Ex27-6kKArqZigcd4KcLqyY~gF6gaVl5cRrF-'+
        'JMARqy4BzoOV3Kr~XRm4sN5a1o6IvmdgpJxvrE~XWTvucrLLyg__&amp;Key-Pair-Id=APKAJWJJOF7ZM5FW5N4Q&quot;,&quot;signed_url_expires_at&quot;:1714167744}">' +
        '</a></div><div>✉ <a href="mailto:support@filtersfast.com">support@filtersfast.com</a>&nbsp;'+
        ' | &nbsp;📞<a href="tel:+18664383458">866-438-3458 </a>&nbsp; | &nbsp;💬 <a href="sms:+17042289166">704-228-9166</a></div></div>' +
        '<br><br> Here is some text!'
    )
    var emailDetails = {
        deliver:false,
        mailto: {
            body:closingHTML,
        }
    }
    Missive.composeInConversation(emailDetails);
}
function buttonClicked() {
  
    //insertSignature(emailClosing);

    
    formVar = {
        name: "My Form",
        fields: [{
            type:"input",
            data: {
                type: "number",
            }
        }]
    }

    openForm(formVar);
    
    /*var myVar = {
        deliver:false,
        mailto: {
            subject:messageSubject.replace("FW:","Re:"),
            body:fullMessage,
            to_fields:[{
                address:messageFrom,
                name:customerName
            }]
        }
    }
    Missive.composeInConversation(myVar);*/
    

}

/*
- make the "to" the customer's email. find a way to remove the other email. try array = []
places to cut off message, replaceAll with [end of messge], and then cut off only if [end of message] exists:
assign new drafts
set these as utitilies
create an array of tasks for POs and for tax exempt and others
get order number from convo subject line - split by space. if [0] lowercase is "order" and array length is less than 4. or if anywhere in the subject or body (html removed) is "order number XXXXXXXX" "order XXXXXXXX" "order no. XXXXXXXX" "order # XXXXXXXX" 
        get all of the array but [0] and combine into 1 string. remove spaces, remove "CP", remove "-", remove "#"
    else
        order number = "empty"
* attachments-1.missiveapp.com
    if order number is given by user, and order number was previosuly "empty", set convo subject to order number
check for contact by email. if one does not exist, create it. show fields for the user to modify: name, phone number, email, cust ID. when any field is modified, update contact.
scan subject and body for keywords and phrases to identify the intention of the emails. put this in a place where it can be easily modified by the user (or me at least)
  - offer presets based on what the email appears to be about in a dropdown menu. the most likely response will be first, but others will be available.
create forms
set up branching for forms
make autoreply templates that can be modified by me, based on the regular templates
identify time of day when applying a template
for order number, repalce "# " with "#"
take contexts for monday forms and for responses
for certain values entered into integration form, save the info automatically (order numbers, tracking numbers, etc.)
link to monday form
link to monday search
include link to message in monday form?
after order number, add note.
    Order number
    note 
    ex. convo subject may say: Order #4937718, refund for return. these should be short.
have a status - if it is waiting on something, denote that
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


    configurable options: wording of closing ex. "Sincerely"
    Time-based greeting
    Customize "Thank you for reaching out to us!"
    Customize "Thank you for your reply!"
    Toggle auto-assign draft
    Toggle auto-correct return email
    Customize name for Monday posts "Post Monday as:"

*/