(function( window, document, undefined ) {
  var reactDOMNode = document.getElementById( "react-app" );
  var fb = new Firebase( "https://akela.firebaseio.com/" );
  var state = {};
  
  var ErrorView = React.createClass( {
    propTypes: {
      error: React.PropTypes.object.isRequired,
    },
    
    render: function() {
      return React.createElement( 'div', {className: "row"},
        React.createElement( 'div', {className: "panel panel-danger col-sm-offset-4 col-sm-4"},
          React.createElement( 'div', {className: "panel-heading"},
            React.createElement( 'h3', {className: "panel-title"}, "Wo, Something Went Wrong!" )
          ),
          React.createElement( 'div', {className: "panel-body"}, this.props.error )
        )
      );
    }
  });
  
  var HomeView = React.createClass( {
    propTypes: {
      googleSignIn: React.PropTypes.func.isRequired
    },
    
    onGoogleSignIn: function( e ) {
      e.preventDefault();
      this.props.googleSignIn();
    },
    
    render: function() {
      return React.createElement( 'div', {className: "row"},
        React.createElement( 'div', {className: "col-sm-offset-4 col-sm-4"},
          React.createElement( 'button', {className: "btn btn-default", onClick: this.onGoogleSignIn},
            React.createElement( 'img', {src: "./assets/btn_google_signin_dark_normal_web.png"} )
          )
        )
      );
    }
  });
  
  var UserView = React.createClass( {
    propTypes: {
      user: React.PropTypes.object.isRequired,
    },
    
    render: function() {
      return React.createElement( 'div', {className: "row"},
        React.createElement( 'div', {className: "panel panel-default col-sm-offset-4 col-sm-4"},
          React.createElement( 'div', {className: "panel-heading"},
            React.createElement( 'h3', {className: "panel-title"}, "User Data" )
          ),
          React.createElement( 'div', {className: "panel-body"}, 
            React.createElement( 'p', {}, 
              React.createElement( 'img', {src: this.props.user.photo, height: 50} ),
              this.props.user.name
            ),
            React.createElement( 'p', {}, "Last Login: " + this.props.user.lastLogin ),
            React.createElement( 'p', {}, React.createElement( 'a', {href: this.props.user.link}, "Google+ Profile" ) )
          )
        )
      );
    }
  });
  
  var NewPackForm = React.createClass( {
    propTypes: {
      name: React.PropTypes.string,
      onSubmit: React.PropTypes.func.isRequired,
    },
    
    onSubmit: function( e ) {
      e.preventDefault();

      this.props.onSubmit( {
        council: document.getElementById( 'council' ).value,
        unit: document.getElementById( 'unit' ).value,
      });
    },
    
    render: function() {
      var name = this.props.name ? ", " + this.props.name : "";
      
      return React.createElement( 'div', {className: 'col-sm-offset-4 col-sm-4'},
        React.createElement( 'p', {}, "Welcome" + name + ". Let's get started by creating a new pack." ),
        React.createElement( 'div', {className: "panel panel-primary"},
          React.createElement( 'div', {className: 'panel-heading'}, "Create New Pack" ),
          React.createElement( 'div', {className: 'panel-body'},
            React.createElement( 'form', {onSubmit: this.onSubmit},
              React.createElement( 'div', {className: 'form-group'},
                React.createElement( 'label', {htmFor: 'council'}, "Council" ),
                React.createElement( 'input', {type: 'text', className: 'form-control', id: 'council', placeholder: 'Simon Kenton'} )
              ),
              React.createElement( 'div', {className: 'form-group'},
                React.createElement( 'label', {htmlFor: 'unit'}, "Unit Number" ),
                React.createElement( 'input', {type: 'text', className: 'form-control', id: 'unit', placeholder: '3132'} )
              ),
              React.createElement( 'button', {type: "submit"}, "Create Pack")
            )
          )
        )
      );
    }
  });
  
  var PackView = React.createClass( {
    propTypes: {
      pack: React.PropTypes.object.isRequired,
    },
    
    render: function() {
      return React.createElement( 'p', {}, "Show Pack" );
    }
  });

  function googleSignIn() {
    fb.authWithOAuthPopup( "google", function( error, authData ) {
      if( error ) {
        setState( {user: undefined, error: error} );
      } else {
        updateUser( {
          key: authData.uid,
          provider: authData.provider,
          name: getName( authData ),
          link: getLink( authData ),
          photo: getPhoto( authData ),
          lastLogin: new Date().toLocaleString(),
        } );
        
      }
    });
  }
  
  function updateUser( user) {
    var fbUsers = fb.child( "users" );
    
    fbUsers.child( user.key ).once( 'value', function( snapshot ) {
      if( snapshot.val() !== null ){
        // merge what was in the database with new values from the client
        user = Object.assign( {}, snapshot.val(), state.user );
        fbUsers.child( user.key ).update( user );
      } else {
        fbUsers.child( user.key ).set( user );
      }
      
      setState( {user: user} );
    });
  }
  
  function getName( authData ) {
    if( authData && authData.google ) {
      return authData.google.displayName;
    }
    
    return undefined;
  }
  
  function getEmail( authData ) {
    if( authData && authData.google ) {
      return authData.google.email;
    }
    
    return undefined;
  }
  
  function getLink( authData ) {
    if( authData && authData.google ) {
      return authData.google.cachedUserProfile.link;
    }
    
    return undefined;
  }
  
  function getPhoto( authData ) {
    if( authData && authData.google ) {
      return authData.google.profileImageURL;
    }
    
    return undefined;
  }
  
  function onNewPack( newPack ) {
    var fbPacks = fb.child( "packs" );
    var fbPack = fbPacks.push( newPack );
    
    state.user.pack = fbPack.key();
    updateUser( state.user );
  }

  function setState( changes ) {
    Object.assign( state, changes );
    
    refreshUI();
  }
  
  function refreshUI() {
    if( state.error ) {
      ReactDOM.render( ErrorView, { error: state.error }, reactDOMNode );
    } else if( state.user === undefined ) {
      ReactDOM.render( React.createElement( HomeView, {googleSignIn: googleSignIn} ), reactDOMNode );
    } else if( state.user ) {
      if( state.user.pack === undefined ) {
        ReactDOM.render( React.createElement( NewPackForm, {onSubmit: onNewPack, name: state.user.name} ), reactDOMNode );
      } else if( state.scout === undefined ) {
        // no scout selected, show the pack
        if( state.pack === undefined ) {
          fb.child( "packs" ).child( state.user.pack ).once( 'value', function( snapshot ) {
            if( snapshot.val() !== null ) {
              setState( {pack: snapshot.val, scout: undefined} );
            }
          });
        } else {
          ReactDOM.render( React.createElement( PackView, {pack: state.pack} ), reactDOMNode );  
        }
      } else {
        ReactDOM.render( React.createElement( UserView, {user: state.user} ), reactDOMNode );
      }
    }
  }
  
  setState( {} );
})( window, document );
