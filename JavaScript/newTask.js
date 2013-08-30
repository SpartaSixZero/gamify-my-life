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

// BUG! This needs to be called at each pageinit because we are not creating
// these views for tasks stored in local storage from a previous session
var createTaskView = function (newTask) {
	
	// Dynamically create a new task view to be accessed when we 
	// swipe on a task in the home page
	console.log("creating a new task view")
	var newTaskIdWithoutSpaces = newTask.replace(/ /g,'');
	var newPageId = newTaskIdWithoutSpaces+"View";
	var taskCheckBoxName = newTaskIdWithoutSpaces + "Checkbox";

	var newPage = $("<div data-role='page' data-theme='b' data-url='" + newPageId + "'id='" + newPageId + "'><div data-role=header data-theme='b'><h1>" + newTask +"</h1></div><div data-role=content data-theme='a'><label for='slider-1'>Assign points:</label><input type='range' name='slider-1' id='slider-1' value='60' min='0' max='100' /><input type='checkbox' name='" + taskCheckBoxName + "' id='completedCheckbox' class='custom' data-task-name='" + newTask + "' /><label for='completedCheckbox'>Completed</label></div><div data-role=footer data-theme='b' data-position='fixed'><nav data-role='navbar'><ul><li><a href='#home' data-icon='home'>Home</a></li><li><a href='#newTask' data-icon='edit'>New Task</a></li><li><a href='#credits' data-icon='star'>Credits</a></li></ul></nav></div></div>");

    // Append the new page into pageContainer
    newPage.appendTo($.mobile.pageContainer);
};

