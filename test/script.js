baseVersion = "11";
revisionNumber = "81";
scriptVersion = "502";

/*
CID - should remove "CID " when going from the text to the form
CID - should add back the "CID " when going from the form to the text
CID - "CID" (or "Customer ID"(?)) should be considered empty.
    for any related formulas, consider this blank
    apply "inactive" attribuet to make it italic and gray
    test for leading 0s
Name - should combine first and last when going from the form to the text
Name - should split into 2 when going from the text to the form unless:
    blank. Then pass "Name" to the form, consider this blank and apply "inactive" attribute
    First name only (as deteremined by no spaces)
Email - this should always be prefilled unless it ends with @filtersfast.com, in which case, blank.
Email - if blank, it should be the only required field (see below)
    document.getElementById("email").removeAttribute("required");
Email - if blank, pass "Email address" to the text, consider this "blank" and apply "inactive" attribute.
Phone - if blank, pass "Phone number"
FOR ALL BLANKS - disable the copy function

to make these more modular, for each item, have an:
    element name for the txt
    element name for the form
    empty value
    these can be objects with the attrbutes
    function for each type to remove unneeded charcaters (ex parseCustID) - have different parsing for both types (text would be the same as input, but with extra steps)
    change conversation = cancel changes
    Normalize phone number
    Normalize CID
    Normalize Name (first, last)
    Normalize email
    Normalize order #

*/
function getFromNew(){
    // 
}
function show(input){
    var element = document.getElementById(input);
    element.classList.add('visible');
    element.classList.remove('hidden');
}
function hide(input){
    var element = document.getElementById(input);
    element.classList.add('hidden');
    element.classList.remove('visible');
}

function addIt(){
    var element = document.getElementById('ordersSection');
    element.classList.add('hidden');
    element.classList.remove('visible');
}
function removeIt(){
    var element = document.getElementById('ordersSection');
    element.classList.add('visible');
    element.classList.remove('hidden');
}
function toggleIt(){
    var element = document.getElementById('ordersSection');
    element.classList.toggle('visible');
    element.classList.toggle('hidden');
}
// ========= STARTUP =========
async function loadUserProfile(){
    // Cycle through all users
    await Missive.fetchUsers().then((users) => {
        $(users).each(function(){
            // if the selected user is me
            if(this.me){
                // set me as the current user
                currentUser = this;
            }
      });
    // Cycle through the list of IDs set as admin
    $(adminList).each(function(){
        // if the selected user is me  
        if(this == currentUser.id.split("-")[4]){
            // set profile type to master
            profileType = "Administrator"
          }
     });
    // Cycle through the list of IDs set as CRM
    $(crmList).each(function(){
        // if the selected user is me    
        if(this == currentUser.id.split("-")[4]){
            // set profile type to CRM
            profileType = "Client Relationship Manager";
        }
    });
    // user the user's first and last name to get their full name
    // set avatar image
    $("#avatar").css("background-image","url(" + currentUser.avatar_url + ")");
    // display user's full name
    $("#name").text(currentUser.first_name + " " + currentUser.last_name);
    // show user's access level
    $("#layout").text(profileType); // consider changing the name of this from layout to access_level or something similar
    // set style sheets here based on access level
    });
}
async function loadData(){
    // upon loading the integration, get the ID of the last conversation
    await Missive.storeGet('lastConversation')
        .then(conversation => {
        // set the current conversation as the last conversation since no conversation has been selected yet
        currentConversation = conversation;
        // update the data based on the newly set current conversation
        if(typeof currentConversation == 'undefined'){
            console.log("is not defined")
        }
        else{
            // update the data based on the newly set current conversation
            update(currentConversation);
            // fill in applicable fields with the results
            showResults();
        }
    });
}
function createTokens(input){
    // array containing values to add or subtract to get key
    var organizationOffset = [3,-1,-46,-45,-2,-49,-47,1,-1,-7,-45,-43,0,-1,7,3,41,0,-53,7,-2,48,6,53,-50,-1,-1,-5,6,41,0,51];
    var contactsOffset = [-2,53,-47,-49,-45,-2,4,-53,-1,-4,1,4,0,-3,52,50,42,-45,-3,51,47,51,47,50,-47,-51,53,-5,6,42,48,7];
    var mondayOffset = [48,72,-24,7,-2,-28,2,4,24,49,-25,-25,33,21,24,0,22,6,-28,9,-8,51,70,25,-52,-5,38,-21,57,22,52,29,
        -3,28,-14,6,22,-22,-29,-36,66,22,-16,21,53,-12,38,21,56,-26,4,63,66,27,32,70,5,-2,38,6,59,16,52,63,
        69,29,-14,10,20,-22,-13,-16,-5,21,-16,21,53,-4,38,21,51,-26,4,63,51,27,55,16,21,-24,18,-54,71,21,29,0,
        68,28,-28,-16,21,-22,-13,10,-6,22,-31,13,68,-23,34,3,-5,-21,20,60,43,23,54,70,5,-3,22,-16,73,16,52,63,
        52,49,-11,-12,-46,1,-46,-27,57,44,-28,-13,53,-25,18,25,48,-10,-51,34,58,40,16,24,-46,-25,57,-21,1,20,14,37,
        68,27,-31,-23,21,-9,-47,-49,50,23,6,-24,-3,-2,1,36,64,-26,8,0,-8,62,54,34,20,3,-4,-26,53,32,15,30,
        -4,21,-46,-7,-32,-29,1,-23,63,44,19,11,68,15,4,20,46,1,-48,24,46,6,56,26,-28,-4,-1,-5,47,43,21,4];
    var organizationArray = [];
    var contactsArray = [];
    var mondayArray = [];
    var longKey = "";
    for ( var i = 0; i < 7; i ++ ){
        longKey = longKey + input.replaceAll("-","");
    }
    for ( var keyChar = 0; keyChar < longKey.length; keyChar ++ ) {
        // add or subtract the offest value
        mondayArray[keyChar] = String.fromCharCode((longKey.charCodeAt(keyChar) + mondayOffset[keyChar]));
    }
    // for each item in the array
    for ( var keyChar = 0; keyChar < input.replaceAll("-","").length; keyChar ++ ) {
        // add or subtract the offest value
        organizationArray[keyChar] = String.fromCharCode((input.replaceAll("-","").charCodeAt(keyChar) + organizationOffset[keyChar]));
        contactsArray[keyChar] = String.fromCharCode((input.replaceAll("-","").charCodeAt(keyChar) + contactsOffset[keyChar]));   
    }
    // divide the resulting value into sections
    var organizationSections = [
        organizationArray.join("").slice(0, 8),
        organizationArray.join("").slice(8, 12),
        organizationArray.join("").slice(12, 16),
        organizationArray.join("").slice(16, 20),
        organizationArray.join("").slice(20, 32)
    ];
    var contactsSections = [
        contactsArray.join("").slice(0, 8),
        contactsArray.join("").slice(8, 12),
        contactsArray.join("").slice(12, 16),
        contactsArray.join("").slice(16, 20),
        contactsArray.join("").slice(20, 32)
    ];
    // separate sections by dashes 
    // make array of keys
    return [organizationSections.join("-"),contactsSections.join("-"),mondayArray.join("")];
}
async function getTokens(){
    var scan = true;
    Missive.fetchLabels().then((labels) => {
        $(labels).each(function(){
          if(this.id.length == 36 && scan == true){
              organization = this.organization_id;
              tokens = createTokens(organization);
              scan = false;
            }
        });
    });
}
function storeLastConversation(){
    // if a conversation is currently selected
    if(typeof currentConversation != 'undefined'){
        // set the last selected conversation as the current conversation
        Missive.storeSet('lastConversation', currentConversation);
    }
}
function getConversation(conversation){
    // THIS DOESN'T NEED TO BE A FUNCTION
    return conversation.id;
}
function showResults(){
    var elements = [
        currentConversation.id,
        currentConversation.messages_count,
        currentConversation.messageTo,
        messageFrom,
        customerName,
        messageSubject,
        currentConversation.subject,
        userAssigned,
        assignDraft,
        "not displayed",//forwarded,
        currentConversation.link,
        messageLink,
        labels,
        isLabeled,
        currentConversation.preview,
        fullMessage,
        orderNumber,
        currentConversation.timeStamp,
        tokens[0] + " | " + tokens[1],
        greeting
    ]
    for ( i = 0; i < elements.length; i++ ){
        $("#body" + (i + 1)).text(elements[i]);
    }
}
function update (input){
    // CHECK THESE TO SEE IF ANY CAN BE SIMPLIFIED/REMOVED
    conversationID = getConversation(input);
    conversationCount = getMessageCount(input);
    currentConversation.messageTo = getTo(input);
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
    isLabeled = labeled("1d53229eb9e1"); // this can be moved - does not need to happen at startup
    currentConversation.preview = getPreview(input);
    fullMessage = getFullMessage(input,"body16"); // this is linked to a specific element - change it in script.js as needed
    orderNumber = "";
    orderNumber = getOrderNumber(input);
    currentConversation.timeStamp = getTimeStamp(input);
    greeting = getGreeting(input);
    lookupContact(messageFrom);
}
async function startup(){
    await getTokens(); 
    await loadUserProfile();
    console.log(currentUser.first_name); // delete later
    await loadData();   
    initialized = true;
    const element = document.getElementById("topBanner");
    var monVarColor = "#CCE5FF";
    let color = window.getComputedStyle(element, null).getPropertyValue("background-color");
    if(color == "rgb(21, 22, 23)"){
        theme = "dark";
        monVarColor = "#133774";
    }
    //buttonTrigger();
    // IMPORTANT - make a separate set of functions that run in the background which can be split off
}

// ======== FUNCTIONS ========
/* ENABLE THIS WHEN READY TO TEST IT
function getLastReceived(conversation){
    var scan = true;
    var received = false;
    var currentMessage = "no message received";
    if(!!conversation.latest_message){
        for (message = conversation.messages_count; message >= 0; message --){
            for ( var label = 0, labelCount = conversation.labels.length; label < labelCount; label++ ) {	
                var prefix = conversation.labels[label].id.split("-")[0];
                if(prefix != "sent"){
                    received = true;
                } 
            }
            if (received == true && scan == true){
                currentMessage = conversation.messages[message];
                scan = false;
            }
        }
    }
    return currentMessage;
}*/


function buttonTrigger(){ // THIS FUNCTION WILL GO IN THE BUTTON OR OTHER TRIGGER WHEN THIS IS IN MISSIVE
    //searchMondayPosts("16164973","5174273","7733083612","scott.youngs@psrmechanical.com",tokens[2]);
}

function chatbotRequest(){
    /* if assigned to me, and labeled chatbot requests, and no draft exists (do this by a variable, this way if it is created and deleted it won't keep recreating it (?))
        set "to" field (use getFrom)
        set message subject to Chat request // + (Order #12345678) when applicable
        set conversation subject to Chat request - OR - Order #12345678
        set name to customer's name (or leave blank if not applicable)
        create a new message in current conversation, use info above ^
        insert signature
        insert original message as quoteblock
        create a link to get to this item on the Monday board // see if this can be done via API
        check for contact data
            if no contact data, and customer ID is present in request, save new contact data

        on SEND, delete the chatbot request, and mark as done automatically on Monday board (if possible)
        after SEND, unlabel
        this should be a utility
        thre should also be a button on the bar in this context in case the user accidentally deletes the draft
    */
}
function getMessageCount(conversation){
    //  DOESN'T NEED TO BE A FUNCTION
    return (conversation.messages_count);
}
function getTo(conversation){
    if(!conversation.latest_message || conversation.latest_message.to_fields.length == 0){
        return "";
    }
    else{
        return conversation.latest_message.to_fields[0].address;
    }
}
function getFrom(conversation){
    if(!conversation.latest_message || !conversation.latest_message.from_field){
        return "";
    }
    else {
        var switchEmails;
        var assignedToMe = false;
        for ( var i = 0, assignee = conversation.assignees.length; i < assignee; i++ ) {	
            if(conversation.assignees[i].id == currentUser.id){
                assignedToMe = true;
            }
        }
        if (conversation.latest_message.to_fields.length > 0){
            if(   
            conversation.messages_count == 1 &&
            conversation.latest_message.to_fields[0].address.split("@")[1] == "filtersfast.com" &&
            conversation.latest_message.from_field.address.split("@")[1] == "filtersfast.com" &&
            assignedToMe == true       
            ) {
                switchEmails = true;
            }
            else {
                switchEmails = false;
            }
        }
        else {
            switchEmails = false;
        }
        if(switchEmails == false){
            if(!conversation.latest_message.from_field.address){
                return "";
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
    // COOMBINE GET FROM, UPDATE FROM AND GET NAME
    if(!conversation.latest_message){
        return "";
    }
    else {
        var switchName;
        var assignedToMe = false;
        for ( var i = 0, assignee = conversation.assignees.length; i < assignee; i++ ) {	
            if(conversation.assignees[i].id == currentUser.id){
                assignedToMe = true;
            }
        }
        if (conversation.latest_message.to_fields.length > 0){
            if(   
            conversation.messages_count == 1 &&
            conversation.latest_message.to_fields[0].address.split("@")[1] == "filtersfast.com" &&
            conversation.latest_message.from_field.address.split("@")[1] == "filtersfast.com" &&
            assignedToMe == true       
            ) {
                switchName = true;
            }
            else {
                switchName = false;
            }
        }
        else {
            switchName = false;
        }
        if(switchName == false){
            if(!conversation.latest_message.from_field.name){
                return "";
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
    // DOES NOT NEED TO BE A FUNCTION
    if(!conversation.latest_message){
        return "";
    }
    else{
        return conversation.latest_message.subject;
    }
}
function getConversationSubject(conversation){
    // DOES NOT NEED TO BE A FUNCTION
    return conversation.subject;
}
function checkAssigned(conversation){
    var assignedToMe = false;
    for ( var i = 0, assignee = conversation.assignees.length; i < assignee; i++ ) {	
        if(conversation.assignees[i].id == currentUser.id){
            assignedToMe = true;
        }
    }
    return assignedToMe;  // THIS ONLY NEEDS TO RETURN A TRUE OR FALS, SO IF (ASSIGNEDTOME()) CAN BBVC NFBN vbc VBMNF vbnm
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
        if (conversation.latest_message.to_fields.length > 0){
            if(   
            conversation.messages_count == 1 &&
            conversation.latest_message.to_fields[0].address.split("@")[1] == "filtersfast.com" &&
            conversation.latest_message.from_field.address.split("@")[1] == "filtersfast.com" &&
            assignedToMe == true       
            ) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}
function getConversationLink(conversation){
    // FUNCTION NOT NEEDED
    return "https://mail.missiveapp.com/#inbox/conversations/" + conversation.id;
}
function getMessageLink(conversation){
    // FUNCTION NOT NEEDED
    if(!conversation.latest_message){
        return "";
    }
    else{
        return "https://mail.missiveapp.com/#inbox/conversations/" + conversation.id + "/messages/" + conversation.latest_message.id;
    }
}
function getLabels(conversation){
    // REPLY TEXT NOT NEEDED HERE
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
function labeled(labelID){
    var isLabeled = false;
    $(labels).each(function(){
        if(this.split("-")[4] == labelID){
          isLabeled = true;
        }
    });
    return isLabeled;
}
function getPreview(conversation){
    // FUNCTION NOT NEEDED
    if(!conversation.latest_message){
        return "";
    }
    else{
        return conversation.latest_message.preview;
    }
}
function getFullMessage(conversation,element){  // in progress
    if(!conversation.latest_message){
        $("#" + element).text("")
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
    if(
        subject.slice(0,6) == "orders" && subject.includes("#") && subject.includes(",") &&
        ((subject.length - 1) - subject.replaceAll(" ","").length) == (subject.length - subject.replaceAll(",","").length)
    ){
        orderString = subject.replaceAll("#","").replaceAll(" ","").slice(6,subject.length);
    }
    else if(subject.includes("order")){
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
            orderString = "";
        }
    }
    else {
        orderString = "";
    }
    return orderString;
}
function formatDate(date){
    const weekdaysShort = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
    // const weekdaysFull = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const monthsShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    // const monthsFull = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var timestampDate = new Date(1000*date);;
    var weekday = weekdaysShort[timestampDate.getDay()];
    var hours;
    var mins;
    var ampm;
    var month = monthsShort[timestampDate.getMonth()]
    var day = timestampDate.getDate()
    var year = timestampDate.getFullYear()
    if(timestampDate.getMinutes() < 10){
        var mins = "0" + timestampDate.getMinutes();
    }
    else {
        var mins = timestampDate.getMinutes();
    }
    if(timestampDate.getHours() > 11){
        ampm = "PM"
    }
    else{
        ampm = "AM"
    }
    if(timestampDate.getHours() > 12){
        hours = timestampDate.getHours() - 12
    }
    else if(timestampDate.getHours() == 0){
        hours = 12
    }
    else{
        hours = timestampDate.getHours()
    }
    var formattedDate = weekday + ", " + month + " " + day +", " + year + ", " + hours + ":" + mins + " " + ampm
    return formattedDate;
}
function getTimeStamp(conversation){  
    // FUNCTION NOT NEEDED
    if(!conversation.latest_message){
        return "";
    }
    else{
        return formatDate(conversation.latest_message.delivered_at);
    }    
}
function getGreeting(conversation) {
    customerName = getName(conversation);
    var scan = true;
    var segment;
    var currentTime = new Date();
    var currentHour = currentTime.getHours();
    var firstName;
    intro = "<br><br>Thank you for reaching out to us!";
    if (currentHour > 15) {
        segment = "evening"
    }
    else if (currentHour > 11) {
        segment = "afternoon"
    }
    else {
        segment = "morning"
    }
    for ( var i = 0, labelCount = conversation.labels.length; i < labelCount; i++ ) {	
        var prefix = conversation.labels[i].id.split("-")[0];
        if(prefix == "sent" && scan == true){
            intro = "<br><br>Thank you for your reply!";
            scan = false;
        }
    }
    if(customerName == "" || typeof customerName == 'undefined'){
        firstName = "";
    }
    else if (customerName.trim().includes(" ")){
        firstName = customerName.trim().split(" ")[0];
        if (firstName.length == 1){
            firstName = firstName.toUpperCase();
        }
        else {
            firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
        }
    }
    else {
        firstName = customerName.trim().toUpperCase()[0] + customerName.trim().toLowerCase().slice(1);
    }
    greeting = ("Good " + segment + " " + firstName + ",").replace(" ,",",") + intro;
    return greeting;    
}
function orderNumberSearch (){
    // use this to search the body for an order number if one is not present in the subject.
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
async function cancellationForm(newMessage){
    {/* ---- MISSIVE COLORS ----
        --Blue--
        {#005CD4
        #0080FF
        #50A8FF
        #01ACF0
        #0193CE
        #49CBFF
        --Teal--
        #31E5DD
        #00C4BB
        #008C8F
        --Green--
        #009E61
        #00C76E
        #50DC96
        --Yellow--
        #FFF200
        #FFD700
        #FFC258
        --Orange--
        #FFA667
        #FF7D22
        #DE5C00
        --Red--
        #EE3430
        #CC0000
        #FF716F
        --Pink--
        #FF6FB4
        #EC008B
        #C60074
        --Purple--
        #865CA5
        #581C94
        #3A0074
        --Gray--
        #BAB6B6
        #737373
        --Black--
        #000000
        */
    }// ------------------------
    const formData = await Missive.openForm({
        name: "Cancellation",
        buttons: [{
            type: "cancel",
            label: "Cancel"
        },{
            type: "submit",
            label: "Submit!"
        }],
        fields: [{
            data: {
                name: "newMessage",
                value: newMessage,
            }
        },{
            type: "input",
            scope: {newMessage: true},
            data: {
                name: "customerName",
                placeholder: "Customer's first name",
                value: "",
            }
        },{
            type: "input",
            scope: {newMessage: true},
            data: {
                name: "emailAddress",
                placeholder: "Customer's email address",
                value: "",
                required: true
            }
        },{
            type: "input",
            scope: {newMessage: true},
            data: {
                name: "orderNumber",
                placeholder: "Order number",
                value: "",
            }
        },{
            type: "select",
            data: {
                name: "orderCancelled",
                options: [{label: "Yes",value: 1},{label: "No",value: 2}],
                value: 1,
                placeholder: "Was the order cancelled?",
                required:true
            }
        },{
            type: "select",
            scope: { orderCancelled: 2 },
            data: {
                name: "returnDone",
                options: [{label: "Return not needed",value: 1},{label: "Standard return created",value: 2},{label: "Refund-only return created",value: 3},{label: "Custom air filters",value: 4}],
                value: 1,
                placeholder: "Was a return created?",
                required:true
            }
        },{
            type: "textarea",
            scope: { orderCancelled: 2 },
            data: {
                name: "trackingNumbers",
                placeholder: 'Enter 1 tracking numberper line.\nIf USPS, add ", USPS" after number\nLeave blank if no tracking info is available.\n\nExamples:\n01234567891011121314\n41312111019876543210, USPS',
                value: "",
                rows: 8
            }
        },{
            type: "select",
            data: {
                name: "subscriptionCancelled",
                options: [{label: "Yes",value: 1},{label: "No",value: 2}],
                value: 2,
                placeholder: "Was a subscription  cancelled?",
                required:true
            }
        }]
    })
    var cancelResult = "";
    var trackingResult = "";
    var returnResult = "";
    var subscriptionResult = "";
    var trackingFooter = "";
    cancelResult = [
        " Your order has been cancelled. Please allow 3-7 days for your refund to apply.",
        " We apologize as this order has already shipped from our warehouse"
    ];
    if(formData.orderCancelled == 2) {
        if (formData.trackingNumbers.trim().length > 0){
            var shippers = [
                "USPS",
                "UPS",
                "DHL",
                "FedEx"];
            var links = [
                "https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=",
                "https://www.ups.com/track?trackNums=",
                "https://webtrack.dhlglobalmail.com/orders?trackingNumber=",
                "https://www.fedex.com/wtrk/track/?trknbr="
            ];
            var trackingInput = formData.trackingNumbers.split("\n")
            var trackingArray = [];
            for ( var line = 0; line < trackingInput.length; line ++ ) {
                var currentLine = trackingInput[line].toLowerCase().trim();
                if (currentLine.length > 0){
                    if(currentLine.includes(" ") || currentLine.includes(",")){
                        number = currentLine.replaceAll(","," ");
                        number = number.replace(" ","|");
                        number = number.replaceAll(" ","");
                        shipper = number.split("|")[1];
                        number = number.split("|")[0]
                        var unknown = true;
                        for ( var shipperIndex = 0; shipperIndex < shippers.length; shipperIndex ++ ){
                            if(shippers[shipperIndex].toLowerCase() == shipper.toLowerCase()){
                                shipper = shippers[shipperIndex];
                                link = '<a href="' + links[shipperIndex] + number + '">' + number + '</a>'
                                unknown = false;
                            }
                        }
                        if(unknown == true){
                            shipper = "Unknown";
                            link = number;
                        }
                    }
                    else {
                        number = currentLine;
                        if(number.substr(0,2).toLowerCase() == "1z"){
                            shipper = "UPS";
                        }
                        else if(number.length >= 22){
                            shipper = "DHL";
                        }
                        else {
                            shipper = "FedEx";
                        }
                        for ( var shipperIndex = 0; shipperIndex < shippers.length; shipperIndex ++ ){
                            if(shippers[shipperIndex].toLowerCase() == shipper.toLowerCase()){
                                link = '<a href="' + links[shipperIndex] + number + '">' + number + '</a>'
                            }
                        }
                    }
                    trackingArray.push({
                        number: number,
                        shipper: shipper,
                        link: link
                    })
                }
            }
            if(trackingArray.length == 1){
                trackingResult = " with " + shipper + " tracking #" + trackingArray[0].link + ", and can no longer be cancelled";
                trackingResult = trackingResult.replaceAll("Unknown ","");
            }
            else if (trackingArray.length == 2 && trackingArray[0].shipper == trackingArray[1].shipper){
                trackingResult = " with " + shipper + " tracking numbers " + trackingArray[0].link + " and " + trackingArray[1].link + ", and can no longer be cancelled.";
                trackingResult = trackingResult.replaceAll("Unknown ","");
            }
            else {
                for ( var trackingObject = 0; trackingObject < trackingInput.length; trackingObject ++ ) {
                    trackingFooter = trackingFooter + "<br>" + trackingArray[trackingObject].shipper + " tracking: #" + trackingArray[trackingObject].link
                }
                trackingResult = " and can no longer be cancelled; I have provided tracking below."
                trackingFooter = "<br>" + trackingFooter;
                trackingFooter = trackingFooter.replaceAll("Unknown tracking #","Tracking #");
                trackingFooter = trackingFooter.replaceAll("Unknown ","");
            }
        }
        else {
            trackingResult = " and can no longer be cancelled; tracking will be provided soon via email.";
            trackingFooter = "";
        }
    }
    if(formData.orderCancelled == 2) {
        returnResultOptions = [
            " If you wish to set up a return you may do so by logging into your filtersfast.com account.",
            " I have initialized a return, and you will be emailed a prepaid return label which can be used to send your order back for a refund.",
            " I have created a refund-only return, which means your order does not need to be sent back, but we will refund it for you. Please allow 3-7 days for your refund to apply to the original method of payment, and feel free to donate or discard the item(s).",
            " Our custom air filters are non-returnable, however, if a new order is placed, we can offer a full refund for the original order. If you do not wish to place a new order at this time, we can still offer a refund of 50%."
        ];
        returnResult = returnResultOptions[formData.returnDone - 1];
    }
    subscriptionResult = [" I have also cancelled your Home Filter Club subscription, and you will receive an email regarding the cancellation.",""]
    var closing = " Let me know if you need further assistance. Have a great day!"
    // formData.customerName, formData.emailAddress, formData.orderNumber
    if(formData.newMessage == true){
        var subjectField;
        customerName = formData.customerName;
        orderNumber = formData.orderNumber;
        var firstName;
        var lastName;
        if(customerName.includes(" ") == true){
            firstName = customerName.replace(" ","[!]").split("[!]")[0]
            lastName = customerName.replace(" ","[!]").split("[!]")[1]
        }
        else {
            firstName = customerName;
        }
        if(formData.orderNumber.length > 0){
            subjectField = " (Order #" + orderNumber + ")";
        }
        else {
            subjectField = "";
        }
        var fullGreeting = [greeting,firstName];
        var fullString = fullGreeting.join(" ") + ",<br><br>Thank you for reaching out to us!" + [cancelResult[formData.orderCancelled - 1] + trackingResult + returnResult + subscriptionResult[formData.subscriptionCancelled - 1] + closing + trackingFooter];
        Missive.compose({
            deliver:false,
            mailto: {
                subject: "Re: Cancellation request" + subjectField,
                body: fullString,
                to_fields:[{
                    address: formData.emailAddress
                }]
            }
        })
        Missive.assign(currentUser);
        // set some of these to global variables for this thread, but make sure to clear the variables in this function so they don't remain when the conversation changes
    }
    else {
        // do this if it is a reply rather than a new message thread
        var subjectField;
        var firstName;
        var lastName;
        if(customerName.includes(" ") == true){
            firstName = customerName.replace(" ","[!]").split("[!]")[0]
            lastName = customerName.replace(" ","[!]").split("[!]")[1]
        }
        else {
            firstName = customerName;
        }
        if(orderNumber.length > 0){
            subjectField = " (Order #" + orderNumber + ")";
        }
        else {
            subjectField = "";
        }
        var fullGreeting = [greeting,firstName];
        var fullString = fullGreeting.join(" ") + "," + intro + [cancelResult[formData.orderCancelled - 1] + trackingResult + returnResult + subscriptionResult[formData.subscriptionCancelled - 1] + closing + trackingFooter];
        Missive.reply({
            deliver:false,
            mailto: {
                subject: "Re: Cancellation request" + subjectField,
                body: fullString
            }
        });
    }
    $("#body1").text(fullString);
    
}
// COMBINE "NEW" AND "REPLY" TO TAKE THE ARGUMENTS NEW OR REPLY. FOLLOW THIS PATTERN WITH NEW FORMS
function cancellationReply() {
    cancellationForm(true);
}
function cancellationNew() {
    cancellationForm(false);
}
function createTasks(tasks){
    for ( var i = 0; i < tasks.length; i ++ ) {	
        Missive.createTask(tasks[i], false);
    }
}
function createReply(){ // working, but needs some optimiaztion
    var reply = {
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
    Missive.composeInConversation(reply);
}
function convoChange(){(ids) => {
    Missive.fetchConversations(ids).then((conversations) => {
        currentConversation = conversations[0];
        console.log("CURRENT CONVO: " + currentConversation);
        return ("CURRENT CONVERSATION " + currentConversation.id)
    })
}}
// ======== BUTTONS ========
function button1Clicked() {
    cancellationReply();
    // currentConversation.someProperty = "did this work?" // this DOES work
    // console.log(currentConversation.id + currentConversation.someProperty) // delete this later, this is to show that storing properties works. do it in json format
}
function button2Clicked() {
    cancellationNew();    
}
function button3Clicked() {
    insertSignature(emailClosing);
}
function button4Clicked() {
    createTasks(purchaseOrderTasks);
}
function button5Clicked() {
    createReply()
}
function button6Clicked() {
    saveContact("Sam","Test","sam_test@filtersfast.com","866-438-3458","12345")
}
function button7Clicked() {
    
}
function button8Clicked() {
    
}
function button9Clicked() {
    
}
function button10Clicked() {
    
}
function button11Clicked() {
    
}
function button12Clicked() {
    
}
function button13Clicked() {
    
}
function button14Clicked() {
    
}
function button15Clicked() {
    
}
function button16Clicked() {
    
}
function button17Clicked() {
    
}
function button18Clicked() {
    
}
function button19Clicked() {
    
}
function button20Clicked() {
    
}

// ======== RESETS ========
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
function body18Reset(){
    $("#body18").text("[ready]")
}
function body19Reset(){
    $("#body19").text("[ready]")
}
function body20Reset(){
    $("#body20").text("[ready]")
}

{ /* ======== NOTES ========
// CUST ID SHOULD BE GREEN
// CHECK FOR ACTIVE SUBSCRIPTIONS BY EMAIL AND BY CUSTOMER ID, MAKE A LINK TO GO TO THAT PAGE
// SAME WITH TEXTS ("this customer may have contacted us via text") (go by last 30 days)
- determine which message was the last RECEIVED, and base everything on that. make it a for loop, starting  from the end. if
  the message does NOT have the "sent" label, that's the one, stop doing other stuff. do this for "current conversation"
- find a way to make a "reply" but without having more than one "to field"
- parse "full message" to cut off at the right place.
- make utility for assign new drafts and swapping emails, so the integration doesn't have to be open to work.
- for chatbot requests, make a popup show automatically when the convo is selected. popup will have a cancel button, which will take the user to the last selected convo. if the user
    opens the app to an unanswered chatbot request, it will take them to the first non-chatbot request in their inbox. if none exists - figure out something here
- create an array of tasks for tax exempt and others and other things that can have preset tasks. POs are already done.
- get order number from convo subject line [DONE], scan body of message too (?)
- check for attachments, attachments-1.missiveapp.com (check consol.log for the conversation object, it shows attachments).
- allow for manual entry of order number, set convo subject accordingly
- check for contact by email. [DONE] If one does not exist, create it. [partially done - in progress] Show fields for the user to modify: name, phone number, email, cust ID, NOTES. when any field is modified, update contact.
- scan subject and body for keywords and phrases to identify the intention of the emails. put this in a place where it can be easily modified by the user (or me at least)
- offer presets based on what the email appears to be about in a dropdown menu. the most likely response will be first, but others will be available.
- create forms for Monday
- when getting most recent message, make sure it's the most recent RECEIVED message, otherwise no customer info. this should still work for forwarded messages. Could maybe do
    items that do not have the "sent" label?
- set up branching for forms [partially done, use Cancellation form as template for others]
    - make autoreply templates that can be modified by me, based on the regular templates.
- identify time of day when applying a template [DONE - except for linking this function to the autoreply]
- when changing conversations with a Monday panel open, prompt to make sure.
    "The data you have entered into your Monday request will not be saved, are you sure you want to proceed?"
    store current convo as last convo [DONE]
    get new current convo
    prompt >
        yes: change the integration back to main content
        no: navigate to previous convo by convo ID, do nothing in the integration
- for order number, repalce "# " with "#" [DONE]
- take contexts for monday forms and for responses
- for certain values entered into integration form, save the info automatically (order numbers, tracking numbers, etc.)
- link to monday form
- link to monday search
- include link to message in monday form? do this as html in the comment
- after order number, add note.
    Order number
    note 
    ex. convo subject may say: Order #4937718, refund for return. these should be short.
- have a status - if it is waiting on something, denote that
- decide what should be CCA, what should be CRM, and what should be shared, separate accordingly. change the stylesheet to determine what to allow.
- come up with functions admins can do with no coding, such as change a person's level
- respond automatically to chatbot requests
- make an "about" page to show version, e tc
- determine whether to say "thanks for reaching out" or "thank you for your reply" [in progress]
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
    Time-based greeting [on/off]
    Customize "Thank you for reaching out to us!"
    Customize "Thank you for your reply!"
    Toggle auto-assign draft
    Toggle auto-correct return email
    Customize name for Monday posts "Post Monday as:"
    https://mail.missiveapp.com/#inbox/conversations/19dcf950-0143-4214-a45b-fbcf2f189d94

*/}