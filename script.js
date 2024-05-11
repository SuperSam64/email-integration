function getConversation(conversation){
    return conversation.id;
}
function getMessageCount(conversation){
    return (currentConversation.messages_count);
}
function getTo(conversation){
    if(!conversation.latest_message || conversation.latest_message.to_fields.length == 0){
        return "[empty]";
    }
    else{
        return conversation.latest_message.to_fields[0].address;
    }
}
function getFrom(conversation){
    if(!conversation.latest_message || !conversation.latest_message.from_field){
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
        if (conversation.latest_message.to_fields.length > 0){
            if(   
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
        if (conversation.latest_message.to_fields.length > 0){
            if(   
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
        if (conversation.latest_message.to_fields.length > 0){
            if(   
            conversation.messages_count == 1 &&
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
    intro = "<br><br>Thank you for reaching out to us!";
    for ( var i = 0, labelCount = conversation.labels.length; i < labelCount; i++ ) {	
        var prefix = conversation.labels[i].id.split("-")[0];
        if(prefix != "closed" && prefix != "assigned" && prefix != "assigned_to_others" && prefix != "unassigned" && prefix != "archive"){
            if(prefix == "sent"){
                replied = true;
                intro = "<br><br>Thank you for your reply!";
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
function getFullMessage(conversation,element){  // in progress
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
function formatDate(date){
    const weekdaysShort = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
    const weekdaysFull = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const monthsShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    const monthsFull = ["January","February","March","April","May","June","July","August","September","October","November","December"];
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
    if(!conversation.latest_message){
        return "[empty]";
    }
    else{
        return formatDate(conversation.latest_message.delivered_at);
    }    
}
function getGreeting(conversation) {
    var segment;
    var currentTime = new Date();
    var currentHour = currentTime.getHours();
    if (currentHour > 15) {
        segment = "evening"
    }
    else if (currentHour > 11) {
        segment = "afternoon"
    }
    else {
        segment = "morning"
    }
    return "Good "+ segment;
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
    timeStamp = getTimeStamp(input);
    greeting = getGreeting(input);
}
function getKey(input){
    var stringOnly = input.replaceAll("-","");
    var offsetArray = [3,-1,-46,-45,-2,-49,-47,1,-1,-7,-45,-43,0,-1,7,3,41,0,-53,7,-2,48,6,53,-50,-1,-1,-5,6,41,0,51];
    var keyArray = [];
    for ( var i = 0; i < stringOnly.length; i ++ ) {
        keyArray[i] = String.fromCharCode((stringOnly.charCodeAt(i) + offsetArray[i]));    
    }
    var sections = [
        keyArray.join("").slice(0, 8),
        keyArray.join("").slice(8, 12),
        keyArray.join("").slice(12, 16),
        keyArray.join("").slice(16, 20),
        keyArray.join("").slice(20, 32)
    ];
    console.log(sections.join("-"));
    return sections.join("-");
}
function getContactsKey(input){
    var stringOnly = input.replaceAll("-","");
    var offsetArray = [-2,53,-47,-49,-45,-2,4,-53,-1,-4,1,4,0,-3,52,50,42,-45,-3,51,47,51,47,50,-47,-51,53,-5,6,42,48,7];
    var keyArray = [];
    for ( var i = 0; i < stringOnly.length; i ++ ) {
        keyArray[i] = String.fromCharCode((stringOnly.charCodeAt(i) + offsetArray[i]));    
    }
    var sections = [
        keyArray.join("").slice(0, 8),
        keyArray.join("").slice(8, 12),
        keyArray.join("").slice(12, 16),
        keyArray.join("").slice(16, 20),
        keyArray.join("").slice(20, 32)
    ];
    return sections.join("-");
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
    $("#body18").text(timeStamp);
    $("#body20").text(greeting);
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
            " I have initiated a return, and you will be emailed a prepaid return lable which can be used to send your order back for a refund.",
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
function saveContact(firstName,lastName,email,phoneNumber,customerID){
    // there is no visual indicator when the action is successful - make one
    fetch("https://public.missiveapp.com/v1/contacts", {
        method: "POST",
        body: JSON.stringify({
            "contacts": [{
                "contact_book": contactBook, // fill this in later
                "first_name": firstName,
                "last_name": lastName,
                "infos": [{
                    "kind": "phone_number",
                    "label": "main",
                    "value": phoneNumber
                }, {
                    "kind": "email",
                    "label": "personal",
                    "value": email
                }, {
                    "kind": "custom",
                    "label": "other",
                    "custom_label":"Customer ID",
                    "value": customerID
                }]
            }]
        }),
        headers: {
            "Host": "public.missiveapp.com",
            "Authorization": "Bearer " + token, // fill this in later
            "Content-type": "application/json"
        }
    })
    Missive.alert({title: "Contact added",message:"Contact has been added to your contact list.", note: "Click below to continue..."})
}
async function lookupContact(input){
    var contactRecord;
	var contact_URL = await fetch("https://public.missiveapp.com/v1/contacts?contact_book=" + contactBook + "&limit=1&order=last_modified&search=" + input,{
		method: "GET",
		headers: {
		"Host": "public.missiveapp.com",
		"Authorization": "Bearer " + token,
		"Content-type": "application/json"
		}
	})
	contactRecord = await contact_URL.json();
	contact = {
		firstName:"",
		lastName:"",
		customerID:"",
		phoneNumber:"",
		email: input
	};
    if(typeof contact != 'undefined' && contact.length > 0){
        console.log(contact.length)
        contact.firstName = contactRecord.contacts[0].first_name;
        contact.lastName = contactRecord.contacts[0].last_name;  
        for ( var i = 0; i < contactRecord.contacts[0].infos.length; i++ ) {
            if(typeof contactRecord.contacts[0].infos[i].kind != 'undefined') {
                if(contact.phoneNumber == "" && contactRecord.contacts[0].infos[i].kind == "phone_number"){
                    contact.phoneNumber = contactRecord.contacts[0].infos[i].value;
                    contact.phoneNumber = contact.phoneNumber.replaceAll("(","");
                    contact.phoneNumber = contact.phoneNumber.replaceAll(")","");
                    contact.phoneNumber = contact.phoneNumber.replaceAll("+","");
                    contact.phoneNumber = contact.phoneNumber.replaceAll("#","");
                    contact.phoneNumber = contact.phoneNumber.replaceAll("-","");
                    contact.phoneNumber = contact.phoneNumber.replaceAll(".","");
                    contact.phoneNumber = contact.phoneNumber.replaceAll(" ","");
                    if(contact.phoneNumber.slice(0, 1) == "1"){
                        contact.phoneNumber = contact.phoneNumber.slice(1, contact.phoneNumber.length)
                    }
                    if(contact.phoneNumber.length == 10){
                        contact.phoneNumber = "(" + contact.phoneNumber.slice(0, 3) + ") " + contact.phoneNumber.slice(3, 6) + "-" + contact.phoneNumber.slice(6, contact.phoneNumber.length);
                    }
                }
            }
        }
        for ( var i = 0; i < contactRecord.contacts[0].infos.length; i++ ) {
            if(typeof contactRecord.contacts[0].infos[i].custom_label != 'undefined') {
                if(contact.customerID == "" && contactRecord.contacts[0].infos[i].custom_label.toLowerCase() == "customer id"){
                    contact.customerID = contactRecord.contacts[0].infos[i].value;
                }
            }
        }
        $("#body2").text(contact.firstName + " | " + contact.lastName + " | " + contact.email + " | " + contact.phoneNumber + " | " + contact.customerID);
    }
    else {
        $("#body2").text("NO CONTACT DATA");
    }
}
function storeLastConversation(){
    Missive.storeSet('lastConversation', currentConversation);
}
function getLastConversation(){
    Missive.storeGet('lastConversation')
        .then(conversation => {
            $("#body2").text(currentConversation.id)
        });
}
function button1Clicked() {
    lookupContact(messageFrom);
    //cancellationReply();
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

/*        NOTES
- make the "to" the customer's email. find a way to remove the other email. try array = []
places to cut off message, replaceAll with [end of messge], and then cut off only if [end of message] exists:
assign new drafts
set these as utitilies
for chatbot requests, make a popup show automatically when the convo is selected. popup will have a cancel button, which will take the user to the last selected convo. if the user
    opens the app to an unanswered chatbot request, it will take them to the first non-chatbot request in their inbox. if none exists - figure out something here
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
**** when getting most recent message, make sure it's the most recent RECEIVED message, otherwise no customer info. this should still work for forwarded messages. Could maybe do
    items that do not have the "sent" label?
set up branching for forms
make autoreply templates that can be modified by me, based on the regular templates
identify time of day when applying a template
when changing conversations with a Monday panel open, prompt to make sure.
    "The data you have entered into your Monday request will not be saved, are you sure you want to proceed?"
    store current convo as last convo
    get new current convo
    prompt >
        yes: change the integration back to main content
        no: navigate to previous convo by convo ID, do nothing in the integration
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