$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#userForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    
    function ajaxPost(){
    	// PREPARE FORM DATA
    	var formData = {
    		student : $("#student").val(),
    		account :  $("#account").val()
    	}
		//console.log(formData.student);
		
    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "api/users/save",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(user) {
				console.log(JSON.stringify(user, null, 2));
				$("#postResultDiv").html("<p>" + 
					"Post Successfully! <br>" +
					"--> " + user.student + " " + user.account + "</p>");
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		});
    	
    	// Reset FormData after Posting
    	resetData();
 
    }
    
    function resetData(){
    	$("#student").val("");
    	$("#account").val("");
    }
})