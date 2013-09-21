// Use instead of $(document).ready();
$(document).on('pageinit', function() {

    // HACK! I need to find a better way to clear local storage 
    // for debugging purposes
    // BUG! This code is somehow wiping my local storage values 
    // when home screen is displayed. But only sometimes.
    // Solution: Once the logic for deleting a task is done, 
    // we won't need this hack code anymore.
    /*
    var clear = localStorage.getItem("1");
    console.log(clear);
    if (clear != true)
    {
        localStorage.clear();
        clear=true;
        localStorage.setItem("1",clear);
    }
    console.log(clear);         
    */

    // This will allow our task list to be populated with the tasks stored in localStorage from previous sessions.
    if (localStorage.getItem("taskListArray")) {
        reloadTaskList();
    }

    var checkboxChecked = function() {
        if ($("#completedCheckbox").is(":checked"))
        {
            // Add credits to your bank
            console.log("checkbox has been checked!");

            var taskToBeDeleted = this.getAttribute("data-task-name");
            // Store this value into localStorage for later...
            localStorage.setItem("taskToBeDeleted", taskToBeDeleted);

            // On clicking of the completed checkbox, we want to
            // pop up a dialog for confirmation.
            $.mobile.changePage( "#confirmCompletionDialog", { role: "dialog" } );
        }
    };
     
    $( "input[type=checkbox]" ).on( "change", checkboxChecked );

    $("#completedTaskYes").click(function (e) {
        console.log("Yes, we completed our task");

        var taskToBeDeleted = localStorage.getItem("taskToBeDeleted");
        removeTaskFromTaskList(taskToBeDeleted);

        reloadTaskList();

        $.mobile.changePage( "#home");
    });

    var removeTaskFromTaskList = function( taskToBeDeleted) {
        if (localStorage.getItem("taskListArray")) {

            // Parse the stringified array object 
            var listOfTasks = JSON.parse(localStorage["taskListArray"]);

            var taskIndex = -1;
            // Delete the entry in listOfTasks where name matches
            // taskToBeDeleted
            $(listOfTasks).each( function(idx,task) { 
                console.log("task name is: "+task["name"]);
                if (task["name"] == taskToBeDeleted)
                {
                    console.log("Task found, delete this entry!")
                    taskIndex = idx;
                    //listOfTasks.splice(idx, 1);
                }
            });
            if (taskIndex != -1)
            {
                listOfTasks.splice(taskIndex, 1);
            }

            // Replace the old task list object in localStorage 
            // with our new listOfTasks
            localStorage.setItem("taskListArray", JSON.stringify(listOfTasks)); 
        }
    }

}); // End of Document onPageInit 