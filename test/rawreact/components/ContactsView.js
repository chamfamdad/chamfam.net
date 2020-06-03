var ContactsView = React.createClass( {
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired,
    onChangeNewContact: React.PropTypes.func.isRequired,
    onSubmitNewContact: React.PropTypes.func.isRequired,
  },
  
  render: function(){
    var listElements = this.props.contacts
      .filter( function( contact ){ return contact.email } )
      .map( function( contact ) { return React.createElement( ContactItem, Object.assign( {}, contact, {id: contact.key} ) ); } );
      
    return React.createElement( 'div', {},
      React.createElement( 'h1', {className: 'ContactsView-header'}, "Contact Mania II" ),
      React.createElement( 'ul', {className: 'ContactsView-list'}, listElements ),
      React.createElement( ContactForm, { value: this.props.newContact, onChange: this.props.onChangeNewContact, onSubmit: this.props.onSubmitNewContact } )
    );
  }
});
