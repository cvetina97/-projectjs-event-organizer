var countObjectEvents=0; //counter for id
var eventsArray=[]; //array for events
var isClosed=false; // boolean to check if the system is closed
var archivedEvents=[]; // array for the archived events
//class Events
//it has 1 required and many optional properties + one method for self introducing; 
function Events(name,access,price){
    countObjectEvents++;
    this.idEvent=getNextId();
    this.name=name;
    this.access=null;
    this.date=null;
    this.price=price;
    this.Clients=[];
    this.incomeFromClients=0;
    this.rating=0;
    this.clientsToRate=[];
    this.eventArchived=false;
    this.eventIntroducing = function () {
        return this.name + " : " + this.access;
    };
    if(access){
        this.access=access;
    }
    else if(!access || this.access == undefined){
        this.access="free";
    }
}
//method for generating id
function getNextId(){
    var id=countObjectEvents;
        if(typeof(id) == null || typeof(id) == undefined){
            id=1;
        }
        return id;
}
//class Clients - 4 required properties , count for visits per client and status 
function Clients(name,gender,age,envelope){
    this.name=name;
    this.gender=gender;
    this.age=age;
    this.envelope=envelope;
    this.countVisitsPerClient=0;
    this.status="Ordinary client";
}
//method for adding items - 1.check if the system is closed and if so can't add events
//2.check if the price of event is 0 and ets. and put a symbol to the name 
function pushEvents(event){
    if(isClosed===true){
        console.log("You cannot add events , because the system is closed!");
        return;
    }
    else if(event.price == null || event.price == undefined || event.price == 0){
        addSymbolName(event);
        eventsArray.push(event);
    }
    else {
        addSymbolName(event);
        eventsArray.push(event);
    }
}
//method for adding symbol to the name , or add symbol and put new name if update the name 
function addSymbolName(event,newName){
    var symbolExclamationMark= " ! ";
    var symbolDollar = " $ ";

    if( event.price == undefined || event.price == 0){
        if(newName){
            event.name = symbolExclamationMark + newName;
            event.price=0;
        }
        else{
            event.name = symbolExclamationMark + event.name;
            event.price=0;
        }
    }
    else{
        if(newName){
            event.name= symbolDollar + newName;
        }
        else{
            event.name= symbolDollar + event.name;
        }
    }
}
//method for deleting items that finds the id of an event and deletes it with splice method
function popEvents(id){
    var index=eventsArray.map(x => {
        return x.idEvent;}).indexOf(id);
        eventsArray.splice(index,1);
    console.log("Event deleted successfully!");
}
//methods for updating items 
//1.update event name with callback by id and update the name with addSymbolName method
function updateByName(element,id,newNameOfElement){
    var foundIndex=eventsArray.map(x => {
        return x.idEvent;}).indexOf(id);
        if(element  ==  eventsArray[foundIndex]){
            if(typeof newNameOfElement ==='string'){
                addSymbolName(element,newNameOfElement);

                console.log("The event with id : " + id + " is updated successfully!");
                return true;
            }
        }
        return false;
}
//2.update event access with callback by id
function updateByAccess(element,id,newAccessOfEvent){
    var foundIndex=eventsArray.map(x => {
        return x.idEvent;}).indexOf(id);
        if(element  == eventsArray[foundIndex]){
             if(typeof newAccessOfEvent ==="string"){
                element.access=newAccessOfEvent;

                console.log("The event with id : " + id + " is updated successfully!");
                return true;
             }
        }
        return false;
}
//callback for update
function updateEvents(callBack,id,filterParam){
    let callBackResult;
    for (let index = 0; index < eventsArray.length; index++) {
            callBackResult = callBack(eventsArray[index],id,filterParam);
        if(callBackResult){
            console.log(eventsArray[index]);
        }
    }
}
//adding clients to event
/* 1. check for invalid data and if the system is closed , 2. checkClientForMoney checks if
client has enough money or if is a vip client to register for event , also the access and age
3. if the client can be added ,increase the visits of client,, the income of the event,
get a charge from the client , set the status of client and add it to list  */
function addClientToEvent(clientData,eventData){
    if((eventData !== "undefined" || eventData !== null) && isClosed == false){
        var checkClientForMoney=checkForMoney(clientData,eventData);
        if(eventData.access ==='18+' && (checkClientForMoney == true || checkClientForMoney!== "VIP Client")){
            if(clientData.age >= 18){
                clientData.countVisitsPerClient++;
                eventData.incomeFromClients=eventData.incomeFromClients + eventData.price;
                clientData.envelope =clientData.envelope - eventData.price;
                vipClient(clientData);
                eventData.Clients.push(clientData);
            }
            else {
               console.log("Client "+ clientData.name + "  can't be added , because he/she is under-age!");
            }
        }else if(eventData.access === 'free' && (checkClientForMoney == true || checkClientForMoney=== "VIP Client")){
            clientData.countVisitsPerClient++;
            eventData.incomeFromClients=eventData.incomeFromClients + eventData.price;
            clientData.envelope =clientData.envelope- eventData.price;
            vipClient(clientData);
            eventData.Clients.push(clientData);  
        }  
    }
    else{
        console.log("This event isn't added or the system is closed and you cannot add it!");
    }
}
// method for showing the clients by gender with switch
function showClients(event,gender){
    if(event !== "undefined" || event !== null){
            if(event.Clients === 'undefined'){
                return;
            }
            switch(gender){
                case "male" :
                var clientsMale =  event.Clients.filter(function(clientMale) {
                    return clientMale.gender == "male";
                });
                console.log(clientsMale);
                break;
                case "female" :
                var clientsFemale = event.Clients.filter(function(clientFemale){
                    return clientFemale.gender == "female";
                });
                console.log(clientsFemale);
                break;
                default : 
                    console.log("You may not entered gender or it is invalid!");
                }
        }
}
//delete client from event - find client with map and remove it with splice method
function popClientFromEvent(client,event){
    if(event !== "undefined"  && client !== "undefined"){
        var index=event.Clients.map(x => {
        return x.Clients;}).indexOf(client);
        event.Clients.splice(index,1);
    }
    else{
        console.log("There is no such a client or event");
    }
}
//method for adding data to the event
function addDateToEvent(event,date){
    if(event !== "undefined"){
        if(typeof date === "string"){
            var newDate=new Date(date);
            event.date=newDate;
        }
        else{
            console.log("The date may not be in a correct format, please try again!");
        }
    }
    else{
        console.log("There is no such an event!");
    }
}
//method for showing the event with the most clients - if max < count of clients max = count of client
function showTheMostClientsOfEventsArray(){
    var max = 0;
    var event = null;
    if(eventsArray.length != 0){
        for(var i=0;i<eventsArray.length;i++){
            if(eventsArray[i].Clients.length > max){
                max = eventsArray[i].Clients.length;
                event = eventsArray[i].name;
            }
        }
    }
    else{
        console.log("There aren't any events !");
    }
        console.log("The event with max clients is : " + event + " with lenght of :  " + max + " people !");
}
//method for showing the events with allowing under-aged people with filter
function showEventWithAllowingUnderAgePeople(){
            var eventsUnderAgePeople = eventsArray.filter(function(underAgePeople){
            return underAgePeople.access == "free";
           });
    console.log(eventsUnderAgePeople);
}
//group events -under-aged and 18+ with different symbols 
function groupEventsByAccess(){
    for(var i=0;i<eventsArray.length;i++){
            if(eventsArray[i].access == "free"){
               var addSymbolForFree="#";
               console.log("The events with free access is : " + " " + addSymbolForFree + " " + eventsArray[i].name);
            }
            else if(eventsArray[i].access == "18+"){
            var addSymbolForAdult="*";
               console.log("The events with 18+ access is : " + " " + addSymbolForAdult + " " + eventsArray[i].name);
            }
        }
}
//filter by name or by access with callback
function filterByName(event,name){
    if(event.name===name){
        return true;
    }
    return false;
}
function filterByAccess(event,access){
    if(event.access===access){
        return true;
    }
    return false;
}
function filterEvents(callBack,filterParam){
    let callBackResult;
     for (let index = 0; index < eventsArray.length; index++) {
        callBackResult = callBack(eventsArray[index],filterParam);
        if(callBackResult){
            console.log(eventsArray[index]);
        }
    }
}

/*method for checking if client has enough money to be registered for event
or is vip client and has no need to pay */
function checkForMoney(clientData,eventData){
    var canBeAdded=false;
    if(clientData.status==="VIP Client"){
        console.log("This client is a VIP Client , don't have to pay!");
        return clientData.status;
    }
    else if(clientData.envelope != 0 && clientData.envelope >= eventData.price){
        canBeAdded=true;
    }
    else {
        clientData.envelope=0;
        canBeAdded=false;
        console.log("Client " + clientData.name + " has no money in the envelope and can't be registered!");
        
    }
    return canBeAdded;
}
//checks the visits of client and change his status  
function vipClient(client){
    if(client.countVisitsPerClient==5){
        client.status="VIP Client";
    }
    else{
        client.status="Ordinary client";
    }
    return client.status;
}
//deny to add clients or events after calling the method
function denyAddingMethod(){
    isClosed=true;
    return isClosed;
}
/*method for archiving events by splice , changing its symbol 
and sets their status to read-only by isFrozen */
function recordingEvents(event){
        var index = eventsArray.indexOf(event);
        var copy=eventsArray.splice(index,1)[0];
        copy.name="~" + event.name;
        copy.eventArchived=true;
        archivedEvents.push(copy);
        Object.isFrozen(copy);
}
/*listing events - if there is no argument lists all events ,
if put eventsArchived = true , shows the archived events , 
else only not archived events */
function listingEventsFilter(eventsArchived){
    if(arguments.length==0){
       for(var i=0;i<eventsArray.length;i++){
           showMessageRating(eventsArray[i]);
       }
       for(var i=0;i<archivedEvents.length;i++){
        showMessageRating(archivedEvents[i]);
       }
    }
    else if(eventsArchived == true){
        for(var i=0;i<archivedEvents.length;i++){
            showMessageRating(archivedEvents[i]);
        }
    }
    else{
        for(var i=0;i<eventsArray.length;i++){
            showMessageRating(eventsArray[i]);
        }
    }
}

//informs with message if the rating is 0(nobody has voted) that an update is pending
function showMessageRating(event){
    if(event.rating==0){
        console.log(event);
        console.log(event.name + " event still has no rating - An update is pending...");
    }
    else{
        console.log(event);
    }
}
//shows the income from clients for archived event
function showIncome(eventFromTheArchive){
    if(eventFromTheArchive.isArchived==false){
        console.log("This events is not archived!");
        return;
    }
    else{
    console.log("The income from this event is " + eventFromTheArchive.incomeFromClients);
    }
}
/*calculating the rate , accepts archived event , client who is from the list of Clients 
and rate - between 1 and 10*/
function rate(eventFromTheArchive,clientToRate,rate){
    const maxRate=10;
    const minRate=1;
    var foundClient;
    //check if the client is from archived events' list of Clients
    for(var i=0;i<archivedEvents.length;i++){
       if(archivedEvents[i].Clients[i]===clientToRate){
            foundClient=clientToRate;
       }
    }
    //check if the event is archived
    if(eventFromTheArchive.isArchived==false){
        console.log("This events is not archived or the client must have not been in the list of event!");
        return;
    }
    //if the client has voted once , he can't vote twice for that event
    for(var i=0;i<eventFromTheArchive.clientsToRate.length;i++){
        if(eventFromTheArchive.clientsToRate[i]===clientToRate){
            console.log("You can't rate for a second time!");
            return;
        }
    }
        /*calculates the current rate ,converting from tenth to sixth system
        and adds the client to array of voted clients*/
        var currentRate=(rate*3)/5;
        eventFromTheArchive.clientsToRate.push(clientToRate);

        if(eventFromTheArchive.rating===0){
            eventFromTheArchive.rating=currentRate;
            return;
        }
        eventFromTheArchive.rating=(eventFromTheArchive.rating+currentRate)/2;
}