/* =======================================================================================================
=========================================================================================================
Instructions:
Enter any value into the variables below and any correpsonding Monday posts will load from the selected
boards. These variables will eventually be passed from Missive (I already have a function that will
retreive these values, I just need to link the 2.) Some notes
- Phone numbers can be any common format, punctuation and spaces wiill be ignored, as will leading 1s
- Customer IDs can be entered with or without leading 0s
- Email addresses are not case sensitive
- Posts will be grouped by board, and will show the corresponding colors for each label
- Order numbers can include other content before and after. For example, searching for 12345678
    will return a post with the order number as 12345678 / SO-654321 because it contains 12345678
- Clicking a post will open the post in a new tab
- Loading text will display while data is being retreived
- Some fields will not show for CCAs. if profileType is anything besides "Customer Care Advocate"
they will show. 	 		*/

// =======================================================================================================
// =======================================================================================================
var allPosts = [];
async function getMondayData(searchOrder,searchCustID,searchPhoneNum,searchEmail,key){
    allPosts = [];
    document.getElementById('mondaySection').innerHTML = '<div class="loading" style="text-align:center;font-style:italic">LOADING...</div>';
    // If no order number provided, fill with "[undefined]" (this will keep from searching an empty string,
    // which will return everything)
    if(searchOrder == ""){
        searchOrder = "[undefined]";
    }
    // If no customer ID provided provided, fill with "[undefined]"
    if(searchCustID == ""){
        searchCustID = "[undefined]";
    }
    // If customer ID starts with CUS, search only for an exact match
    else if(searchCustID.slice(0,3).toUpperCase() == "CUS"){
        searchCustID = '"' + searchCustID + '"';
    }
    // Otherwise, if customer ID is 8 digits, remove leading 0. Provide both versions to search with
    else if(searchCustID.length < 8){
        searchCustID = '["' + (searchCustID * 1) + '","' + ("0").repeat(8-searchCustID.length) + searchCustID + '"]';
    }
    // Otherwise, if customer ID is not 8 digits, add 9s to fill in the empty digits. Provide both versions
    else {
        searchCustID = '["' + (searchCustID * 1) + '","' + searchCustID + '"]';
    }
    // If no phone number provided provided, fill with "[undefined]"
    if(searchPhoneNum == ""){
        searchPhoneNum = "[undefined]";
    }
    // Remove all punctuation and leading 1. Then split phone number into 3 parts. Search for each of these 3 parts
    // Doing this will still find the phone number on the Monday board even if it includes punctuation,
    // but may also find other phone numbers with the sections provided; this will be addressed in a later function
    else{
        searchPhoneNum = searchPhoneNum.trim()
            .replaceAll(" ","").replaceAll("-","").replaceAll(".","")
            .replaceAll("+","").replaceAll("(","").replaceAll(")","");
        if(searchPhoneNum.slice(0,1) == "1"){
            searchPhoneNum = searchPhoneNum.slice(1,searchPhoneNum.length);
        }
        searchPhoneNum = '["' +
            searchPhoneNum.slice(0,3) + '","' +
            searchPhoneNum.slice(3,6) + '","' +
            searchPhoneNum.slice(6,10) + '"]';
    }
    // If no email provided provided, fill with "[undefined]"
    if(searchEmail == ""){
        searchEmail = "[undefined]";
    }
    let query = 'query{' +
    buildBoard( // CCA MAIN BOARD
        // Enter board name, board ID, and the desired output array
        "CCAform","650367267",["creation_log","status","status2","text0","text6","text03"].join('","'),
        // Enter the fields to check for each applicable type
        [addField("text0","order",searchOrder), addField("text6","ID",searchCustID),
            addField("text03","phone",searchPhoneNum), addField("text03","email",searchEmail)].join(",")) +
    buildBoard( // PURCHASING BOARD - CRM AND ADMIN ONLY
        "purchasing","2941246692",["creation_log","status","po_number","text8"].join('","'),
        addField("text8","order",searchOrder)) +
    buildBoard( // BACKORDER BOARD
        "backorder","4036213204",["last_updated","status","text","phone__"].join('","'),
        [addField("text","order",searchOrder),addField("phone__","phone",searchCustID),
            addField("name","email",searchEmail)].join(",")) +
    buildBoard( // RESHIP BOARD
        "reship","3961923314",["date","status","text","text30","text57","text6","text24"].join('","'),
        [addField("text30","order",searchOrder),addField("text57","ID",searchCustID),
            addField("text6","email",searchEmail),addField("text24","phone",searchPhoneNum)].join(",")) +
    buildBoard( // REJECTED ORDERS BOARD
        "rejectedOrder","5440532825",["date","status","text9","text50","phone_number5__1"].join('","'),
        [addField("text50","ID",searchCustID),addField("phone_number5__1","phone",searchPhoneNum),
            addField("text9","email",searchEmail)].join(",")) +
    buildBoard( // RETURN COMMENTS BOARD
        "returnComments","6635923540",["last_updated4__1","status","text8__1","text__1"].join('","'),
        [	addField("text__1","order",searchOrder), addField("text8__1","ID",searchCustID)].join(","))+'}';
    const response = await fetch ("https://api.monday.com/v2", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : key,
            'API-Version' : '2024-04'
        },
        body: JSON.stringify({
                'query' : query
        })
    })
    return response.json();
}
async function searchMondayPosts(ordernumInput,custIDInput,phonenumInput,emailInput,keyInput){
    const monObj = await getMondayData(ordernumInput,custIDInput,phonenumInput,emailInput,keyInput);
    // Run the following functions to check each board
    CCAformList(monObj.data.CCAform[0].items_page.items, ordernumInput,
        custIDInput, phonenumInput,	emailInput,	profileType);
    purchasingList(monObj.data.purchasing[0].items_page.items, ordernumInput,
        custIDInput, phonenumInput,	emailInput,	profileType);
    backorderList(monObj.data.backorder[0].items_page.items, ordernumInput,
        custIDInput,	phonenumInput, emailInput,	profileType);
    reshipList(monObj.data.reship[0].items_page.items, ordernumInput,
        custIDInput,	phonenumInput, emailInput,	profileType);
    rejectedOrderList(monObj.data.rejectedOrder[0].items_page.items, ordernumInput,
        custIDInput, phonenumInput,	emailInput,	profileType);
    returnCommentsList(monObj.data.returnComments[0].items_page.items, ordernumInput,
        custIDInput, phonenumInput,	emailInput,	profileType);
    // Prepare the HTML that will go into the Monday <div> tag
    var allPostsHTML = '<div class="mondayList">Related Monday Posts</div>';
    var mondaysDiv = document.getElementById('mondaySection');
    // If no results, show a message to this effect
    if(allPosts.length == 0){
        allPostsHTML = '<div class="mondayList">Related Monday Posts</div><div class="noResults">' +
            'No related Monday posts found' +
        '</div>';
    }
    // otherwise, update the HTML for this section
    else{
        for (var i = 0; i < allPosts.length; i ++){
            allPostsHTML = allPostsHTML + allPosts[i].html;
        }
    }
    mondaysDiv.innerHTML = allPostsHTML;
}
function CCAformList(input, orderNum, custID, phoneNum, email) {
    // Receive data from any Monday object found from the query
    for( var i = 0; i < input.length; i ++){
        // If the item is not empty
        if(input[i].column_values[0].text != null || input[0].name != null){
            //create a new object to return
            var outputObject = {};
            // Set the name of the board to be displayed in the title bar
            outputObject.board = "CCA Form";
            // Set the name of the item
            outputObject.name = input[i].name;
            // Set all attributes returned by the item ('[undefined]' for fields not applicable to this board)
            outputObject.link = "https://filtersfast.monday.com/boards/" + input[i].board.id + "/pulses/" + input[i].id;
            outputObject.date = (input[i].column_values[0].text.split(" ")[0].split("-")[1])*1 + "/" +
                (input[i].column_values[0].text.split(" ")[0].split("-")[2])*1 + "/" +
                input[i].column_values[0].text.split(" ")[0].split("-")[0].slice(2,4);
            outputObject.status = input[i].column_values[1].text;
            outputObject.orderNumber = input[i].column_values[2].text;
            outputObject.custID = input[i].column_values[3].text;
            outputObject.phoneNum = input[i].column_values[4].text;
            outputObject.email = input[i].column_values[4].text;
            outputObject.reason = input[i].column_values[5].text;
            outputObject.updates = input[i].updates;
            // Run validation to make sure this meets 1 of the 4 criteria.
            // This is necessary because of false positives; for example, when searching for phone number 222-233-3333,
            // the number 222-333-2222 will be found, because it contains 222, 333 and 2222. This algorithm is in place to
            // ignore punctuation in phone numbers, but can occasionally return phone numbers that don't full match,
            // hence the need for validation.
            if(validated(outputObject,orderNum,custID,phoneNum,email)){
                // Get status color based on the position of this item in its  status array
                outputObject.statusColor = assignColors(outputObject.status, CCAformStatusArray, CCAformStatusColors);
                // Get reason color based on the position of this item in its  reason array
                outputObject.reasonColor = assignColors(outputObject.reason, CCAformReasonArray, CCAformReasonColors);
                buildItem(outputObject);
            }
        }
    }
}
function purchasingList(input, orderNum, custID, phoneNum, email) {
    for( var i = 0; i < input.length; i ++){
        // This is exclusive to CRM/Admin, and will not be displayed in a CCA view.
        if((input[i].column_values[0].text != null || input[0].name != null) && profileType != "Customer Care Advocate"){
            var outputObject = {};
            outputObject.board = "Requests for Purchasing";
            outputObject.name = input[i].name;
            outputObject.link = "https://filtersfast.monday.com/boards/" + input[i].board.id + "/pulses/" + input[i].id;
            outputObject.date = (input[i].column_values[0].text.split(" ")[0].split("-")[1])*1 + "/" +
                (input[i].column_values[0].text.split(" ")[0].split("-")[2])*1 + "/" +
                input[i].column_values[0].text.split(" ")[0].split("-")[0].slice(2,4)
            outputObject.custID = "[undefined]";
            outputObject.phoneNumber = "[undefined]";
            outputObject.email = "[undefined]";
            outputObject.reason = input[i].column_values[1].text
            outputObject.orderNumber = input[i].column_values[2].text;
            outputObject.status = input[i].column_values[3].text;
            outputObject.updates = input[i].updates;
            if(validated(outputObject,orderNum,custID,phoneNum,email)){
                if(theme == "dark"){
                    outputObject.statusColor = "#133774";
                    outputObject.reasonColor = "#133774";
                }
                else{
                    outputObject.statusColor = "#CCE5FF";
                    outputObject.reasonColor = "#CCE5FF";
                }
                buildItem(outputObject);
            }
        }
    }
}
function backorderList(input, orderNum, custID, phoneNum, email) {
    for( var i = 0; i < input.length; i ++){
        if(input[i].column_values[0].text != null || input[0].name != null){
            var outputObject = {};
            outputObject.board = "BO Daily Call List"
            outputObject.name = input[i].name;
            outputObject.link = "https://filtersfast.monday.com/boards/" + input[i].board.id + "/pulses/" + input[i].id;
            outputObject.date = "";
            outputObject.custID = "[undefined]";
            outputObject.status = input[i].column_values[0].text
            outputObject.orderNumber = input[i].column_values[1].text;
            outputObject.phoneNumber = input[i].column_values[2].text;
            outputObject.email = input[i].name;
            outputObject.reason = "";
            outputObject.updates = input[i].updates;
            if(validated(outputObject,orderNum,custID,phoneNum,email)){
                outputObject.statusColor = assignColors(outputObject.status, backorderStatusArray, backorderStatusColors);
                buildItem(outputObject);
            }
        }
    }
}
function reshipList(input, orderNum, custID, phoneNum, email) {
    for( var i = 0; i < input.length; i ++){
        if(input[i].column_values[0].text != null || input[0].name != null){
            var outputObject = {};
            outputObject.board = "Reship Call Backs Board";
            outputObject.name = input[i].name;
            outputObject.link = "https://filtersfast.monday.com/boards/" + input[i].board.id + "/pulses/" + input[i].id;
            outputObject.status = input[i].column_values[0].text;
            outputObject.date = (input[i].column_values[1].text.split("-")[1])*1 + "/" +
                (input[i].column_values[1].text.split("-")[2])*1 + "/" +
                input[i].column_values[1].text.split("-")[0].slice(2,4);
            outputObject.orderNumber = input[i].column_values[2].text;
            outputObject.custID = input[i].column_values[3].text;
            outputObject.phoneNumber = input[i].column_values[4].text;
            outputObject.email =input[i].column_values[5].text;
            outputObject.reason = "";
            outputObject.updates = input[i].updates;
            if(validated(outputObject,orderNum,custID,phoneNum,email)){
                outputObject.statusColor = assignColors(outputObject.status, reshipStatusArray, reshipStatusColors);
                outputObject.reasonColor = "#797E93";
                buildItem(outputObject);
            }
        }
    }
}
function rejectedOrderList(input, orderNum, custID, phoneNum, email) {
    for( var i = 0; i < input.length; i ++){
        if(input[i].column_values[0].text != null || input[0].name != null){
            var outputObject = {};
            outputObject.board = "Rejected Orders List";
            outputObject.name = input[i].name;
            outputObject.link = "https://filtersfast.monday.com/boards/" + input[i].board.id + "/pulses/" + input[i].id;
            outputObject.orderNumber = "[undefined]";
            outputObject.email = input[i].column_values[1].text;
            outputObject.status = input[i].column_values[0].text;
            outputObject.custID = input[i].column_values[2].text;
            outputObject.phoneNumber = input[i].column_values[3].text;
            outputObject.date = (input[i].column_values[4].text.split("-")[1])*1 + "/" +
                (input[i].column_values[4].text.split("-")[2])*1 + "/" +
                input[i].column_values[4].text.split("-")[0].slice(2,4);
            outputObject.reason = "";
            outputObject.updates = input[i].updates;
            if(validated(outputObject,orderNum,custID,phoneNum,email)){
                outputObject.statusColor = assignColors(outputObject.reason, rejectedOrdersStatusArray, rejectedOrdersStatusColors);
                outputObject.reasonColor = "#797E93";
                buildItem(outputObject);
            }
        }
    }
}
function returnCommentsList(input, orderNum, custID, phoneNum, email) {
    for( var i = 0; i < input.length; i ++){
        if(input[i].column_values[0].text != null || input[0].name != null){
            var outputObject = {};
            outputObject.board = "Return Comments Board";
            outputObject.name = input[i].name;
            outputObject.link = "https://filtersfast.monday.com/boards/" + input[i].board.id + "/pulses/" + input[i].id;
            outputObject.phoneNumber = "[undefined]";
            outputObject.email = "[undefined]";
            outputObject.custID = input[i].column_values[0].text;
            outputObject.orderNumber = input[i].column_values[1].text
            outputObject.status = input[i].column_values[2].text;
            outputObject.date = (input[i].column_values[3].text.split(" ")[0].split("-")[1])*1 + "/" +
                (input[i].column_values[3].text.split(" ")[0].split("-")[2])*1 + "/" +
                input[i].column_values[3].text.split(" ")[0].split("-")[0].slice(2,4);
            outputObject.reason = "";
            outputObject.updates = input[i].updates;
            if(validated(outputObject,orderNum,custID,phoneNum,email)){
                outputObject.statusColor = assignColors(outputObject.status, returnStatusArray, returnStatusColors);
                buildItem(outputObject);
            }
        }
    }
}
// Return true of one of the 4 checks below passes
function validated(searchObject, matchOrderNum, matchCustID, matchPhoneNum, matchEmail){
    if(validateOrderNum(searchObject.orderNumber, matchOrderNum) || validateCustID(searchObject.custID, matchCustID) ||
        validatePhoneNum(searchObject.phoneNumber, matchPhoneNum) || validateEmail(searchObject.email, matchEmail)){
        return true;
    }
    else {
        return false;
    }
}
// If the order number is found in the corresponding field (there can be additional charcters, ex. "12345678, 13579246")
function validateOrderNum(value1, value2){
    if(value1.includes(value2) && value2 != ""){
        return true;
    }
    else{
        return false;
    }
}
// If the customer ID is found, with or without leading 0s. Does not check for leading 0s if first 3 chars are CUS
function validateCustID(value1, value2){
    if(value1.slice(0,3).toUpperCase() == "CUS"){
            if(value1.custID == value2){
                return true;
            }
            else{
                return false;
            }
    }
    else if((value1 * 1) == (value2 * 1)){
        return true;
    }
    else{
        return false;
    }
}
// If the phone number is found, ignoring special characters and leading 1s
function validatePhoneNum(value1, value2){
    if(typeof value1 != 'undefined'){
            if((value1.trim()
                .replaceAll(" ","").replaceAll("-","").replaceAll(".","")
                .replaceAll("+","").replaceAll("(","").replaceAll(")","")
                    == value2.trim()
                .replaceAll(" ","").replaceAll("-","").replaceAll(".","")
                .replaceAll("+","").replaceAll("(","").replaceAll(")",""))

                    || ("1" + value1.trim()
                .replaceAll(" ","").replaceAll("-","").replaceAll(".","")
                .replaceAll("+","").replaceAll("(","").replaceAll(")","")
                    == value2.trim()
                .replaceAll(" ","").replaceAll("-","").replaceAll(".","")
                .replaceAll("+","").replaceAll("(","").replaceAll(")",""))

                    || (value1.trim()
                .replaceAll(" ","").replaceAll("-","").replaceAll(".","")
                .replaceAll("+","").replaceAll("(","").replaceAll(")","")
                    == "1" + value2.trim()
                .replaceAll(" ","").replaceAll("-","").replaceAll(".","")
                .replaceAll("+","").replaceAll("(","").replaceAll(")",""))
            ){
            return true;
        }
    }
    else {
        return false;
    }
}
// If the email is found exact  match only, aside from not being case-sensitive
function validateEmail(value1, value2){
    if(value1.toLowerCase() == value2.toLowerCase() && value2 != ""){
        return true;
    }
    else{
        return false;
    }
}
function assignColors(input,status,colors){
    color = "#797E93";
    if(status != "") {
        for (var i = 0; i < status.length; i ++)
        {
            if(input == status[i]){
                color = colors[i];
            }
        }
    }
    return color;
}
// Assign colors by looking up the index in the list array and matching it to the index in the
// corresponding color array
function buildItem(object){
    var round = "";
    var dropdown = "";
    if(object.board == "Requests for Purchasing"){
        round = "border-radius:50px;";
        dropdown = "color:var(--missive-text-color-a);";
    }
    var HTMLstring ='<a title="[preview]" class="mondayLink" target="_blank" href="' + object.link + '">' +
    '<div class="mondayContainer">' +
        '<span class="titleBar">' +
            '<span class="mondayBoard">' + object.board + '</span>' +
            '[date]' +
            '[replies]' +
        '</span>' +
        '[name]' +
        '[reason]' +
        '[status]' +
    '</div>' +
    '</a>';
    if(object.date == ""){
        HTMLstring = HTMLstring.replace("[date]","");
    }
    else {
        HTMLstring = HTMLstring.replace("[date]",'<span class="mondayDate text-label">' +
            object.date +
            '</span>');
    }
    var preview = "";
    var replies = "";
    if(object.updates.length != 0){
        preview = object.updates[(object.updates.length - 1)].text_body.replaceAll("\n"," ").replaceAll("  "," ");
        if(preview.length > 64){
            preview = preview.slice(0,61).trim() + "..."
        }
        replies = object.updates[(object.updates.length - 1)].replies.length;
        if(replies > 1){
            HTMLstring = HTMLstring.replace("[replies]",'<span class="mondayReplies text-label">' +
            replies + " REPLIES" +
            '</span>');
        }
        else if (replies == 1){
            HTMLstring = HTMLstring.replace("[replies]",'<span class="mondayReplies text-label">' +
            replies + " REPLY" +
            '</span>');
        }
        else{
            HTMLstring = HTMLstring.replace("[replies]","");
        }
    }
    else{
            HTMLstring = HTMLstring.replace("[replies]","");
    }
    HTMLstring = HTMLstring.replace("[preview]",preview);
    if(object.name == ""){
        HTMLstring = HTMLstring.replace("[name]","");
    }
    else {
        if(object.name.length > 12){
            object.name = object.name.slice(0,12).trim() + "...";
        }
        HTMLstring = HTMLstring.replace("[name]",'<span class="mondayTitle">' +
            object.name +
            '</span>');
    }
    if(object.reason == "" || object.reason == null){
        HTMLstring = HTMLstring.replace("[reason]","");
    }
    else {
        if(object.reason.length > 12){
            object.reason = object.reason.slice(0,12).trim() + "...";
        }
        HTMLstring = HTMLstring.replace("[reason]",'<span class="mondayStatusPrimary" style="' + round + dropdown + 'background-color:' +
            object.reasonColor + '">' +
            object.reason +
            '</span>');
    }
    if(object.status == "" || object.status ==  null){
        HTMLstring = HTMLstring.replace("[status]","");
    }
    else {
        if(object.status.length > 12){
            object.status = object.status.slice(0,12).trim() + "...";
        }
        HTMLstring = HTMLstring.replace("[status]",'<span class="mondayStatusSecondary" style="' + round + dropdown + 'background-color:' +
            object.statusColor + '">' +
            object.status +
            '</span>');
    }
    object.html = HTMLstring;
    allPosts.push(object);
}
// Compose each section of the item's HTML based on the passed parameters
function addField(name,type,value){
    var output;
    switch(type){
        case "order":
            output = '{ column_id: "' + name + '", compare_value: ' + value + ', operator: contains_text }';
            break;
        case "ID":
            output = '{ column_id: "' + name + '", compare_value: ' + value + ', operator: any_of }';
            break;
        case "phone":
            output = '{ column_id: "' + name + '", compare_value: ' + value + ', operator: contains_terms }';
            break;
        case "email":
            output = '{ column_id: "' + name + '", compare_value: "' + value + '", operator: any_of }';
            break;
    }
    return output;
}
function buildBoard(name,boardID,output,searchCriteria){
    return (
        name + ': boards (ids:' + boardID + ') {items_page (query_params: {rules: [' + searchCriteria +
        '],operator: or},){' + 'items{name id board {id} column_values (ids: ["' +	output + '"])' +
        '{text} updates {text_body replies {text_body}}}}}'
    )
}
//===================================================================================================