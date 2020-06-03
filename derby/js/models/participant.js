var app = app || {};

app.Participant = Backbone.Model.extend( {
	
	defaults: {
		name: "",
		numWins: 0
	}
	
} );