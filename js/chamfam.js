// JavaScript Document
(function( $, window, document, undefined ){
  function updateFooter( data ){
    var footer = document.getElementById( "footer" );
    
    footer.innerHTML = data;
  }
  
  $.ajax( {
    type: "get",
    url: "/templates/footer.htm",
    success: updateFooter
  });
  
})( jQuery, window, document );

