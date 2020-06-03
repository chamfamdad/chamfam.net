var Application = React.createClass( {
  propTypes: { 
    location: React.PropTypes.array.isRequired,
  },
  
  render: function() {
    var view;
    
    switch( this.props.location[0] ) {
      case 'contacts':
        view = React.createElement( ContactsView, 
          Object.assign( {}, state, {
              onChangeNewContact: updateNewContact, 
              onSubmitNewContact: submitNewContact
          })
        );
        break;
        
      case 'contact':
        view = React.createElement( ContactView, 
          Object.assign( {}, state, {
            id: state.location[1], 
            onChangeContact: updateContact, 
            onSubmitContact: submitContact
          } )
        );
        break;
        
      default:
        view = React.createElement( FourOhFour, {} );
        break;
    }
      
    return view;
  }
});


