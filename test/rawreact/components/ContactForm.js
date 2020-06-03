var ContactForm = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },
  
  onNameChange: function( e ){ 
    this.props.onChange( Object.assign( {}, this.props.value, {name: e.target.value} ) ); 
  },
  
  onEmailChange: function( e ){ 
    this.props.onChange( Object.assign( {}, this.props.value, {email: e.target.value} ) ); 
  },
  
  onDescriptionChange: function( e ){ 
    this.props.onChange( Object.assign( {}, this.props.value, {description: e.target.value} ) ); 
  },
  
  onSubmit: function( e ) {
    e.preventDefault();
    this.refs.name.focus();
    this.props.onSubmit();
  },
  
  render: function(){
    var errObj = this.props.value.errors || {};
    
    return React.createElement( 'form', {onSubmit: this.onSubmit},
      React.createElement( 'p', {className: errObj.name && "error"}, 
        React.createElement( 'label', {htmlFor: 'name'}, "Name" ),
        React.createElement( 'input', {
          id: 'name',
          ref: 'name',
          type: 'text', 
          value: this.props.value.name,
          onChange: this.onNameChange,
          autoFocus: true
        })
      ),
      React.createElement( 'p', {className: errObj.email && "error"}, 
        React.createElement( 'label', {htmlFor: 'email'}, "Email" ),
        React.createElement( 'input', {
          id: 'email',
          ref: 'email',
          type: 'email', 
          value: this.props.value.email,
          onChange: this.onEmailChange,
        })
      ),
      React.createElement( 'p', {},
        React.createElement( 'label', {htmlFor: 'description'}, "Description" ),
        React.createElement( 'textarea', {
          id: 'description', 
          value: this.props.value.description,
          onChange: this.onDescriptionChange
        })
      ),
      React.createElement( 'button', {type: 'sumbit'}, 'Add Contact')
    );
  },
  
  componentDidUpdate: function( prevProps ) {
    var errObj = this.props.value.errors || {};
    
    if( this.isMounted ) {
      if( errObj.name ){
        this.refs.name.focus();
      } else if( errObj.email ) {
        this.refs.email.focus();
      }
    }
  }
});
