
			var reloadTaskList = function() {
				var listOfTasks = JSON.parse(localStorage["taskListArray"]);
				console.log(listOfTasks);

				$("#taskList").empty();
				$(listOfTasks).each( function(idx,task) {
					console.log("task:%o", arguments);
					console.log("task name is: "+task["name"]);
					var taskNameWithoutSpaces = task["name"].replace(/ /g,'');
					console.log("task name without spaces: "+taskNameWithoutSpaces);
					$("#taskList").append("<li id="+taskNameWithoutSpaces+"><a href=''>"+task["name"]+"</a></li>");

					// This will allow our newly added list items to follow
					// the jquery mobile styling for list items
					$("#taskList").listview("refresh");
				});	

				$("li").swipe(function(event) {
					console.log("swiped!")
					var pageIdName = "#" + $(this).attr("id") + "View";
					console.log(pageIdName);
					$.mobile.changePage(pageIdName, {transition:"slide"});
				});
			}