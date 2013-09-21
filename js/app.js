/* TODO: Investigate using require.js */
window.views = {};
views.HomeView = Backbone.View.extend({
    template: _.template($("#home").html()),

    render: function(eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

views.NewTodoView = Backbone.View.extend({
    template: _.template($("#newTask").html()),

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
        this.changePage(new window.views.HomeView());
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

window.models = {};

window.models.Todo = Backbone.Model.extend({
    defaults: function() {
        return {
            name: "No Name Given",
            complete: false
        }
    }
});

window.models.TodoCollection = Backbone.Collection.extend({
    model: models.Todo
});

$(document).ready(function() {
    console.log("document ready");

    app = new AppRouter();
    Backbone.history.start();
});