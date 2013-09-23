/* TODO: Investigate using require.js */
window.models = {};

window.models.Todo = Backbone.Model.extend({
    defaults: function() {
        return {
            id: _.uniqueId('task'),
            name: "No Name Given",
            complete: false
        }
    }
});

window.models.TodoCollection = Backbone.Collection.extend({
    model: models.Todo
});

window.myTasks = new models.TodoCollection();
var initTasks = localStorage.getItem("myTasks");
if (initTasks) {
    initTasks = JSON.parse(initTasks);
    initTasks.forEach(function(task) {
        myTasks.add(new models.Todo(task));
    });
}

myTasks.on("all", function() {
    localStorage.setItem("myTasks", JSON.stringify(myTasks.toJSON()));
});

/* --- Views --- */

window.views = {};
views.HomeView = Backbone.View.extend({
    template: _.template($("#home").html()),

    events: {
        'click': 'showAlert'
    },

    render: function(eventName) {
        $(this.el).html(this.template());
        console.log("HomeView.tasks: %o", this.tasks);
        return this;
    }
});

views.NewTodoView = Backbone.View.extend({
    template: _.template($("#newTask").html()),

    events: {
        "click #saveButton": "saveNewTask"
    },

    saveNewTask: function(event) {
        var taskName = this.$("#taskName").val();
        if (taskName) {
            myTasks.add(new models.Todo({name: taskName}));
            console.log("Added task. myTasks: %o", myTasks.toJSON());
        }
    },

    render: function(eventName) {
        $(this.el).html(this.template());
        return this;
    } 
});

views.EditTodoView = Backbone.View.extend({
    template: _.template($("#editTask").html()),

    render: function(eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

views.CreditsView = Backbone.View.extend({
    template: _.template($("#credits").html()),

    render: function(eventName) {
        $(this.el).html(this.template());
        return this;
    } 
});

/* --- Router --- */

var AppRouter = Backbone.Router.extend({
    routes:{
        "":"home",
        "home":"home",
        "todo/new":"newTodo",
        "credits":"credits"
    },

    initialize: function() {
        $('.back').on('click', function(event) {
            app.history.back();
            return false;
        });
        
        this.firstPage = true;
    },

    home: function() {
        console.log("home called!");
        var homeView = new window.views.HomeView({collection: myTasks});
        this.changePage(homeView);
        console.log("home: homeView: %o", homeView.collection);
    },

    newTodo: function() {
        console.log("newTodo called!");
        this.changePage(new window.views.NewTodoView());
    },

    credits: function() {
        console.log("credits called!");
        this.changePage(new window.views.CreditsView());
    },

    changePage:function(page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        if (this.firstPage) {
            transition = "none",
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash: false, transition: transition});
    }
});

$(document).ready(function() {
    console.log("document ready");

    app = new AppRouter();
    Backbone.history.start();
});