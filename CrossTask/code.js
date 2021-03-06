"use strict";

var etag= null;
var pod = crosscloud.connect();

function reload () {
    pod.query()
        .filter( { appName:"CrossTask" } )
        .onAllResults(handleResponse)
        .start();
}

function handleResponse(response) {
    var messages = [];
    for (var i=0; i<response.length; i++) {
        var item = response[i];
        var completed = item.completed;
        // consider the 'text' property to be the essential one
        messages.push(item);
    }
    messages.sort(function(a, b){
    if(a._owner < b._owner) return -1;
    if(a._owner > b._owner) return 1;
    return 0;
    });
    
    // not being clever, just remove and re-create the whole "out" element
    var out = document.getElementById("out")
    while(out.firstChild) { out.removeChild(out.firstChild) }

    for (i=0; i<messages.length; i++) {
        var message = messages[i];
        var completed = message.completed;
        var splitMessage = message._id.split("r");
        var etag = splitMessage[splitMessage.length-1];
        message.timeDate = new Date(Number(message.time))
        var tr = document.createElement("tr");
        if (completed) {
            $(tr).css("text-decoration", "line-through");
            tr.innerHTML = "<td> "+message._owner+" </td><td>"+ message.task +"</td><td><input type='checkbox' id='"+ etag +"' checked='checked'></td>";
        } else {
            tr.innerHTML = "<td> "+message._owner+" </td><td>"+ message.task +"</td><td><input type='checkbox' id='"+ etag +"'></td>";
        }
        out.appendChild(tr);
    }

    $('[type="checkbox"]').on("click", function(){
        var etag = this.id;
        var thisBox = $(this);
        var thisLine = $($(thisBox.parent()[0]).parent()[0]);
        var podURL = thisLine.children()[0].innerHTML.replace(/\s/g, '');
        var responseJSON = {_id:podURL+"/r"+etag};

        console.log(thisBox.is(":checked"));

        responseJSON.completed = thisBox.is(":checked");
        if (responseJSON.completed) {
            thisLine.css("text-decoration", "none");
        } else {
            thisLine.css("text-decoration", "line-through");
        }

        pod.push(responseJSON);
    });

    document.getElementById("chat").style.visibility = "visible";
}

function newmsg() {
    var message = document.getElementById("message").value;
    document.getElementById("message").value = "";
    if (message) {
        pod.push({task:message, appName:"CrossTask", completed:false});
    } 
}
