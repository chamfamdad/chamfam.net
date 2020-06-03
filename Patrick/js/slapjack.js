(function( $, window, document, undefined ){
  var deck = ['A','2','3','4','5','6','7','8','9','10','J','Q','K','A','2','3','4','5','6','7','8','9','10','J','Q','K','A','2','3','4','5','6','7','8','9','10','J','Q','K','A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  var shuffled = [];
  var timer;
  
  function shuffleDeck(){
    
    while( deck.length > 0 ){
      var index = getRandom( 0, deck.length ) - 1;
      var card = deck.splice( index, 1 );
      
      shuffled.push( card[0] );
    }
    
  }
  
  function getRandom( min, max ){
    return Math.floor( Math.random() * (max - min + 1)) + min;
  }
  
  function showCard(){
    $( "span.badge" ).hide();
    if( shuffled.length > 0 ){
      var card = shuffled.pop();
      
      $( "button.card" ).html( card );
    
      timer = setTimeout( showCard, 600 );
    }
  }
  
  function onClick(){
    clearTimeout( timer );
    
    if( $( "button.card" ).html() == "J" ){
      alert( ":D" );
    } else {
      alert( ":P" );
    }
    
    countdown( 3 );
  }
  
  function countdown( start ){
    var $badge = $( "span.badge" );
    
    if( start ){
      $badge.show();
      $badge.html( start );
      setTimeout( countdown, 1000 );
    } else {
      var num = parseInt( $badge.html() );
      
      if( num > 0 ){
        num = num - 1;
        
        $badge.html( num );
        setTimeout( countdown, 1000 );
      } else {
        showCard();
      }
    }
  }
  
  $( document ).ready( function(){
    $( "button.card" ).on( "click", onClick );
  });
  
  shuffleDeck();
  countdown( 3 );
})( jQuery, window, document );

