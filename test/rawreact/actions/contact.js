function addValidationToContact( contact ){
  // name?
  if( !contact.name ) {
    contact.errors.name = ["Please enter a contact name"];
  }
  
  // valid email?
  if( !/.+@.+\..+/.test( contact.email ) ) {
    contact.errors.email = ["Please enter a valid email address"];
  }
}

function updateNewContact( contact ) {
  setState( {newContact: contact} );
}

function submitNewContact() {
  var contact = Object.assign( {}, state.newContact, {key: state.contacts.length + 1, errors:{}} );

  addValidationToContact( contact );
  
  setState( 
    Object.keys( contact.errors ).length === 0 ? {
        newContact: Object.assign( {}, NEW_CONTACT ),
        contacts: state.contacts.slice(0).concat( contact )
      } : { 
        newContact: contact 
      }
  );
}

function updateContact( contact ) {
  var update = {};
  update[contact.key] = contact;
  var contactForms = Object.assign( state.contactForms, update );
  
  setState( {contactForms: contactForms} );
}

function submitContact() {
  var key = state.location[1];
  var contactForm = state.contactForms[key];
  
  if( !contactForm ){
    startNavigating( '/contacts' );
  } else {
    var contact = Object.assign( {}, contactForm, {errors: {}} );
    
    addValidationToContact( contact );
    
    var contactForms = Object.assign( {}, state.contactForms );
    var update = {contactForms: contactForms};
    
    if( Object.keys( contact.errors ).length === 0 ){
      delete contactForms[key];
      update.contacts = state.contacts.slice(0).map( function(x){
        return x.key == key ? contact : x;
      });
      
      startNavigating( '/contacts' );
    } else {
      contactForms[key] = contact
    }
    
    setState( update );
  }
}
