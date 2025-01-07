( function( d ) {
    'use strict';
  
     var test = true, c = 1, url = 'https://www.coothead.co.uk/audio/',
          ary = [ url + 'Leadbelly-Goodnight-Irene.mp3', url + 'You-Cant-Always-Get-What-You-Want.mp3', 
                  url + 'The-Peanut-Vendor.mp3', url + 'Mbube.mp3', url + 'Duncan-and-Brady.mp3' 
                 ],
          inf = d.querySelector( '#info' ),
          swp = d.querySelector( '#swap-src' ),
          but = d.querySelector( '#button' ),
          aud = d.querySelector( '#player' );
          aud.classList.add( 'remove' );
          d.querySelector( '#button-container' ).classList.remove( 'hide' );
  
     swp.addEventListener('click',
        function() {
          c ++;
          if ( c > ary.length ) { 
               c = 1; 
            }
          swp.textContent = c;
          inf.textContent = ary[ c-1 ].substring(ary[ c-1 ].lastIndexOf( '/' )+1,
                            ary[ c-1 ].length).replace( '.mp3','' ).replace(/\-/g,' ');
          aud.src = ary[c-1];
          changeSVG();
          aud.load();
        }, false );
  
     but.addEventListener('click',
        function() {
           if ( test === true ) {
                but.classList.add( 'pause' );
                test = false;
                aud.play();
           }
           else {
                changeSVG();
                aud.pause();
           }
        }, false );
  
     aud.addEventListener( 'ended',
        function() {
           changeSVG();
           aud.load();
         }, false );
  
     function changeSVG() {
        but.classList.remove( 'pause' );
        test = true;
      }
   }( document ));