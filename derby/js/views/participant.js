var app = app || {};

app.ParticipantView = Backbone.View.extend( {
	
	tagName: 'li',
	
	template: _.template( $( '#participant-template' ).html() ),
	
	initialize: function() {
		this.listenTo( this.model, 'change', this.render );
	},
	
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	}
});