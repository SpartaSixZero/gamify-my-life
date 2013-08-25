$(document).on("pageinit", "#newTask", function() {
	
	// On clicking of the 'save/create' button in the new task
	// page, we want to save the name of that task in local
	// storage

	$("#saveButton").click(function (e) {
		
		// Add a new task to list of tasks  in local storage
		// In local storage, we have a task list object
		var newTask = $("#taskName").val();
		var newTaskJsonObj = {"name":newTask};

		if (localStorage.getItem("taskListArray")) {
			console.log("taskLIstArray already exists")
			
			// Parse the stringified array object 
			var listOfTasks = JSON.parse(localStorage["taskListArray"]);
		}
		else {
			console.log("Don't have listOfTasks yet...")

			var listOfTasks = [];
		}

		listOfTasks.push(newTaskJsonObj);
		localStorage.setItem("taskListArray", JSON.stringify(listOfTasks));
		console.log(listOfTasks);

		reloadTaskList();
		createTaskView(newTask);
		$.mobile.changePage("#home");
	});

});


var createTaskView = function (newTask) {
	
	// Dynamically create a new task view to be accessed when we 
	// swipe on a task in the home page
	console.log("creating a new task view")
	var newPageId = newTask+"View";

	var newPage = $("<div data-role='page' data-url='" + newPageId + "'id='" + newPageId + "'><div data-role=header><a data-iconpos='left' data-icon='back' href='#' data-role='button' data-rel='back'>Back</a><h1>Dynamic Page</h1></div><div data-role=content>Stuff here</div></div>");

    // Append the new page into pageContainer
    newPage.appendTo($.mobile.pageContainer);

    // Move to this page by ID '#page'
    //$.mobile.changePage('#page');
};