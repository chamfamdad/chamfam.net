var app = app || {};

var ParticipantList = Backbone.Collection.extend( {
	
	model: app.Participant,
	
	localStorage: new Backbone.LocalStorage( 'jsDerby.0.1' ),
	
	nextID: function() {
		return this.length ? this.last().get( 'id' ) + 1 : 1;
	},
	
	comparator: function( participant ) {
		return participant.get( 'id' );
	}
} );

app.Participants = new ParticipantList();