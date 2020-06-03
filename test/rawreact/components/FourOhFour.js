var FourOhFour = React.createClass( {
  propTypes: {},
  
  render: function() {
    return React.createElement( 'p', {}, 
      React.createElement( 'span', {}, "404 Not Found.  Maybe you should try " ),
      React.createElement( 'a', {href: '#/contacts'}, "Contacts" ),
      React.createElement( 'span', {}, "." )
    );
  }
});