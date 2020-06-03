//
// Constants
//
var NEW_CONTACT = {name:'', email:'', description:'', errors: null};

//
// Initial State
//
var state = {
  transitioning: false,
  contacts: [
    {key: 1, name: 'James Nelson', email: "james@jamesknelson.com", description: "Front-end Unicorn"},
    {key: 2, name: 'John Citizen', email: "john@example.com"},
    {key: 3, name: 'No Email'}
  ],
  newContact: Object.assign( {}, NEW_CONTACT ),
  location: null,
  contactForms: {},
};

//
// Update the state and render any changes necessary
//
function setState( changes ){

  Object.assign( state, changes );
  
  if( !state.transitioning ) {
    ReactDOM.render( React.createElement( Application, state ), document.getElementById( 'react-app' ) );
  }
}

// 
// Handle browser navigation
//
window.addEventListener( 'hashchange', navigated, false );

//
// Let's get started!
//
navigated();
