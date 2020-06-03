var ContactItem = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string
  },
  
  render: function(){
    return React.createElement( 'li', {className: 'ContactItem'},
      React.createElement( 'a', {href: '#/contact/' + this.props.id, className: 'ContactItem-name'}, this.props.name ),
      React.createElement( 'div', {className: 'ContactItem-description'}, this.props.description ),
      React.createElement( 'a', {href: 'mailto:' + this.props.email, className: 'ContactItem-email'}, this.props.email )
    );
  }
});
