var app = app || {};

app.AppView = Backbone.View.extend( {
	el: '#jsDerby',
	
	events: {
		'keypress #name': 'addOnEnter',
		'click #addParticipant': 'addOnClick'
	},
	
	initialize: function() {
		this.listenTo( app.Participants, 'add', this.addParticipant );
		this.listenTo( app.Participants, 'reset', this.addAllParticipants );
		this.$addParticipant = this.$( '#name' );
		
		app.Participants.fetch();
	},
	
	addOnEnter: function( event ){
		// 'this' is the view not the DOM element
		if( event.which !== ENTER_KEY || !this.$addParticipant.val().trim() )
		{
			return;
		}
		
		this.addOnClick( event );
	},
	
	addOnClick: function( event ){
		app.Participants.create( this.newParticipant() );
		this.$input.val( '' );
	},
	
	addParticipant: function( participant ) {
		var view = new app.ParticipantView( { model: participant } );
		this.$( '#participants' ).append( view.render().el );
	},
	
	addAllParticipants: function() {
		this.$( '#participants' ).html( '' );
		app.Participants.each( this.addParticipant, this );
	},
	
	newParticipant: function() {
		return { 
			name: this.$addParticipant.val().trim(),
			id: app.Participants.nextID()
		};
	}
});
	