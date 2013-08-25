$(document).on("pageinit", "#home", function() {

	// For each task stored in localStorage, we want to be able
	// get it a task view by swiping on it.

	/*
	if (localStorage.getItem("taskListArray")) {
		var listOfTasks = JSON.parse(localStorage["taskListArray"]);
		$(listOfTasks).each( function(idx,task) {
			newStr = "#"+task;
			$(newStr).on("swipe", function() {
				console.log("We swiped!")
				$.mobile.changePage("#firstLink")
			});
		});
	}
	*/

	$( "#abc" ).click(function() {
  		alert( "Handler for .click() called." );
	});

	$('li').each(function(index) {
		var elementId = $(this).attr("id");
		elementId = "#"+elementId; //#page1 #page2 #page3
		var pageIdName = elementId + "View";
		console.log(pageIdName);

		$(function() {
			$(elementId).on("swipe", function(){
				$.mobile.changePage(pageIdName, {transition:"slide"});
				console.log("swiped!");
			});
		});
	});

});

$(document).on("pagechange", "#home", function() {
	$( "#abc" ).click(function() {
  		alert( "Handler for .click() called." );
	});
});