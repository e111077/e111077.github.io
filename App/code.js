"use strict";

var etag=null;

function podURL() {
	// temporary hack until we have a nice way for users to select their pod
	//return "http://"+document.getElementById("username").value+".fakepods.com";
	return document.getElementById("podurl").value
}


function reload() {

	var request = new XMLHttpRequest();

	// just fetch everything, for now, since queries don't work yet
	request.open("GET", podURL()+"/_nearby", true);
	if (etag !== null) {
		request.setRequestHeader("Wait-For-None-Match", etag);
	}

	request.onreadystatechange = function() {
		if (request.readyState==4 && request.status==200) {
    		handleResponse(request.responseText);
    	}
 	}

	request.send();
}

function handleResponse(responseText) {
	var responseJSON = JSON.parse(responseText);
	etag = responseJSON._etag;
	var all = responseJSON._members;
	var messages = [];
	for (var i=0; i<all.length; i++) {
		var item = all[i];
		var completed = item.completed;
		// consider the 'text' property to be the essential one
		if ('task' in item && 'completed' in item) {
			messages.push([item, completed])
		}
	}
	messages.sort(function(a){return a._owner});
	
	// not being clever, just remove and re-create the whole "out" element
	var out = document.getElementById("out")
	while(out.firstChild) { out.removeChild(out.firstChild) }
	for (i=0; i<messages.length; i++) {
		var message = messages[i][0];
		var completed = messages[1];
		message.timeDate = new Date(Number(message.time))
		var tr = document.createElement("tr");
		if (completed) {
			tr.innerHTML = "<td> "+message._owner+" </td><td>"+ message.task +"</td><td><input type='checkbox' id='"+ etag +"'></td>";
		} else {
			tr.innerHTML = "<td> "+message._owner+" </td><td>"+ message.task +"</td><td><input type='checkbox' id='"+ etag +"' checked></td>";
		}
		out.appendChild(tr);
	}

	$('[type="checkbox"]').click(function(){
		var etag = this.id;
		var request = new XMLHttpRequest();
		request.open("PUT", podURL()+'r'+etag);
    	request.onreadystatechange = function() {
            if (request.readyState==4 && request.status==201) {
				// why does this always print null, even though it's not?
				// console.log("Location:", request.getResponseHeader("Location"));
     		}
		}
		request.setRequestHeader("Content-type", "application/json");
		var content = JSON.stringify({completed:this.checked});
		request.send(content);
	});
	document.getElementById("chat").style.visibility = "visible"
	
	// wait for 100ms then reload when there's new data.  If data
	// comes faster than that, we don't really want it.
	setTimeout(reload, 50);
}


function newmsg() {
    var message = document.getElementById("message").value;
	document.getElementById("message").value = "";
    if (message) {
     	var request = new XMLHttpRequest();
	    request.open("POST", podURL());
    	request.onreadystatechange = function() {
            if (request.readyState==4 && request.status==201) {
				// why does this always print null, even though it's not?
				// console.log("Location:", request.getResponseHeader("Location"));
     		}
		}
		request.setRequestHeader("Content-type", "application/json");
		var content = JSON.stringify({task:message, completed:false});
		request.send(content);
	} 
}
