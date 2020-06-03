var ContactView = React.createClass( {
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    id: React.PropTypes.string.isRequired,
    onChangeContact: React.PropTypes.func.isRequired,
    onSubmitContact: React.PropTypes.func.isRequired,
  },
  
  render: function(){
    var key = this.props.id;
    var contact = this.props.contacts.filter( function( contact ) {
      return contact.key == key;
    })[0];
    
    return (
      !contact
      ? React.createElement( 'h1', {}, "Not Found" )
      : React.createElement( 'div', {className: 'ContactView'}, 
          React.createElement( 'h1', {className: 'ContactView-title'}, "Edit Contact" ),
          React.createElement( ContactForm, {value: contact, onChange: this.props.onChangeContact, onSubmit: this.props.onSubmitContact })
        )
    );
  }
});
