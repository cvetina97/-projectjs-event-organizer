/*First declare and initialize 6 events - as if put undefined for access it will be free 
by default , price will be 0 if not give a parameter ,also make a method for self-introducing 
of one event.In the constuctor there is a counter who calculates id*/
var eventBirthday = new Events("Birthday party Planet club ","18+",20);
var eventGrandOpening=new Events("Grand opening of Club 33","18+",50);
var eventConcert=new Events("Black Eyed Piece in Sofia","18+",150);
var eventBabyBorn=new Events("New baby ","free",30);
var eventCapanaFest= new Events("Capana Fest 2019","free",40);
var eventQueenOfRoses=new Events("Queen of Roses Karlovo 2019","free");

/*declare and initialize 6 clients with name ,gender , age and envelope */
var clientCveti= new Clients("Cveti","female",21,0);
var clientDimitur=new Clients("Dimitur","male",23,20);
var clientIceto=new Clients("Iceto","male",12,0);
var clientIvo=new Clients("Ivo","male",24,200);
var clientDeivid=new Clients("Deivid","male",25,1000);
var clientSimona=new Clients("Simona","female",18,100);

/*here call pushEvents method to add events to the global array eventsArray, 
so i can collect them , as it will first check if the system is closed ,
check the price of an event and adds identifier to the name - $ for paid events and ! - for free */
pushEvents(eventBirthday);
pushEvents(eventGrandOpening);
pushEvents(eventConcert);
pushEvents(eventBabyBorn);
pushEvents(eventCapanaFest);
pushEvents(eventQueenOfRoses);
for(var i=0;i<=eventsArray.length;i++){
    console.log(eventsArray[i]);
}//check if all events are pushed

/* call popEvents , that takes id as parameter ,finds the element with this id
and delete it from the global array*/
popEvents(2);
for(var i=0;i<=eventsArray.length;i++){
    console.log(eventsArray[i]);
}//check if the event is deleted

/*call filterEvents to filter the events by access with callback function
and if receive as filterParameter free it will give you only the events with such property*/
filterEvents(filterByAccess,"free");
console.log("---Update elements");
/*when call updateEvents method we can update events by id with callback,id and filterParam
parameters , then we check if element equals the events with such id and returns it as a result
and update the name  */
updateEvents(updateByName,1,"Grand prix");
//same here , but for access 
updateEvents(updateByAccess,1,"free");
    for(var i=0;i<=eventsArray.length;i++){
        console.log(eventsArray[i]);
    }
updateEvents(updateByAccess,3,"free");
    for(var i=0;i<=eventsArray.length;i++){
        console.log(eventsArray[i]);
    }

console.log("End of updates here----");


/*this function gets client and event as parameter 
but before add the client checks for invalid data , if the system is closed ,
if the client has no money , his age and if he is a vip client , if he passes all these verifications
then increase his visits , also increase the income of event , get a charge from the client 
set his status by the visits and push him to the event (register)*/
addClientToEvent(clientDeivid,eventBirthday);
addClientToEvent(clientIvo,eventBirthday);
addClientToEvent(clientSimona,eventBirthday);
addClientToEvent(clientCveti,eventBirthday);
addClientToEvent(clientCveti,eventGrandOpening);
addClientToEvent(clientIceto,eventGrandOpening);
addClientToEvent(clientCveti,eventConcert);
addClientToEvent(clientIceto,eventBirthday);
console.log("-----");

//self-introducing of eventBirthday
console.log(eventBirthday.eventIntroducing());

/*this function shows the clients by gender ,as if push gender = female or male
it will show you only the clients with such gender */
showClients(eventBirthday,"female");
console.log("-----");


/*function for deleting client from event , accepts client and event as parameters
as with map finds the client and then deletes him from the array */
popClientFromEvent(clientCveti,eventBirthday);
//check it item is deleted
console.log(eventBirthday.Clients);
console.log("----");
popClientFromEvent(clientSimona,eventBirthday);
console.log(eventBirthday.Clients);


console.log("date -----");
/*function for adding date to the event in format dateString  example -October 13 2014 11:13
with constructor new Date(dateString); */
addDateToEvent(eventBirthday,"January 31 1980 12:30");
console.log(eventBirthday.date);

/*function that returns the event with the most clients 
if max < count of clients max = count of client  */
showTheMostClientsOfEventsArray();

console.log("Allowing under age people!");
/*function that shows only the events allowing underage people 
with filter - if the condition is fullfilled then return these events */
showEventWithAllowingUnderAgePeople();

/*this function uses the filter method to group the events by access and 
adds the corresponding symbol - if access is free - adds #, else adds * to the name */
groupEventsByAccess();

console.log("calling filter");

/* this function uses callback to filter events by access or by name */
filterEvents(filterByAccess,"free");

/*adding more clients, because have to test the vip status , add clientDeivid for example
to 6 events , check if to the fifth event he is already a vip client 
and if to the sixth event he is an ordinary client again*/
addClientToEvent(clientSimona,eventConcert);
console.log(eventConcert.Clients);
console.log("--------- Add client Deivid ");
addClientToEvent(clientDeivid,eventConcert);
console.log(eventConcert.Clients);

addClientToEvent(clientDeivid,eventGrandOpening);
console.log(eventGrandOpening.Clients);
addClientToEvent(clientDeivid,eventBabyBorn);
console.log(eventBabyBorn.Clients);
addClientToEvent(clientDeivid,eventQueenOfRoses);
console.log(eventQueenOfRoses.Clients);
console.log("After adding Deivid to Capana Fest ");
addClientToEvent(clientDeivid,eventCapanaFest);
console.log(eventCapanaFest.Clients);

console.log("Deny method calling");
/*this function only sets the flag isClosed to true , so the system closes and don't
allows neither to push event nor to push client to event */
denyAddingMethod();
console.log("----check----");
addClientToEvent(clientDimitur,eventQueenOfRoses);
console.log(eventQueenOfRoses.Clients);
pushEvents(eventBabyBorn);
console.log(eventBabyBorn);
console.log("----check----");


console.log("Archived events");
/*here record the events to the archive , change their names with symbol ~ , set
the property eventArchived to true , push them to the global array archivedArray and set them 
to be read-only with Object.isFrozen method*/
recordingEvents(eventBabyBorn);
console.log("in the array copy");
console.log(archivedEvents);

addClientToEvent(clientCveti,archivedEvents[0]);
console.log("Listing events");
/*function for listing the events , if the method accepts no parameter 
then visualize all events , else if pass true to eventsArchived then visualize only the archived
events , else false - only the events that are not archived
as shows the rating of every event with showMessageRating function */
listingEventsFilter();

console.log("Show the income from client to the event");

/*function that visualizes the total income of one event from all client
that has visited this event (archivedEvent) */
showIncome(archivedEvents[0]);
/*this function accepts event from the archive , client from the archived events and rate 
as first checks if the client is from archivedEvents' list of Clients , 
secondly checks if the event is archived ,if the client has voted once , he can't vote twice for that event
then calculates the current rate ,converting from tenth to sixth system
and adds the client to array of voted clients*/
rate(eventBabyBorn,clientDeivid,3);
console.log(archivedEvents);



