(function () {
  'use strict';

  angular
    .module('filters.module')
    .filter('bbCode', bbCode);

  function bbCode() {

    return bbCodeFilter;

    ////////////////

    function bbCodeFilter(text) {
      if (text !== undefined) {
        var output;
        // Dodajemy emotikony
            output = text
            .replace(/\:\)/gmi,'<i class="icon icon-smiley"></i>')
            .replace(/\:\-\)/gmi,'<i class="icon icon-smiley"></i>')
            .replace(/\:D/gmi,  '<i class="icon icon-happy"></i>')
            .replace(/\:P/gmi,  '<i class="icon icon-tongue"></i>')
            .replace(/\:\(/gmi, '<i class="icon icon-sad"></i>')
            .replace(/:o/gmi,   '<i class="icon icon-shocked"></i>')
            .replace(/([\:][\-\^]?[/])(?=\s|$)/gmi,  '<i class="icon icon-wondering"></i>')
            .replace(/:\|/gmi,  '<i class="icon icon-neutral"></i>');

            // //Dodajemy formatowanie
            output=output
            .replace( /\[b\](.+?)\[\/b]/gmi, "<b>$1</b>" )
            .replace( /\[i\](.+?)\[\/i]/gmi, "<i>$1</i>" )
            .replace( /\[u\](.+?)\[\/u]/gmi, "<em>$1</em>" )
            .replace( /\[quote\](.+?)\[\/quote]/gmi, "<blockquote>$1</blockquote>" )
            .replace(/\n|\r\n|\r/g, '<br/>')
            .replace(/\[url=(.+?)\](.+?)\[\/url]/gmi, "<a class=\"positive\" onclick=\"window.open('$1', '_system', 'location=yes')\" href=\"#\">$2</a>" )
            .replace(/\[img\](.+?)\[\/img]/gmi, "<a class=\"positive\" onclick=\"window.open('$1', '_system', 'location=yes')\" href=\"#\"><div class=\"row\"><div class=\"col col-50 col-offset-25 text-center\"><img height=\"50\" src=\"assets/img/hills.svg\"></div></div></a>" );

            // // //Dodajemy profil i img trigger
            output=output
            .replace(/\[citizen\]\s*(.+?)\s*\[\/citizen]/gmi,'<a href="#/main/profileByLogin/$1" class="boxhead"><i class="icon-user"></i>$1</a>')
            //.replace( /\[img\](.+?)\[\/img]/gi, '<img src="/assets/img/bbcodeimg.jpg" class="img-changer avatar" newsrc="$1"/>' )
            .replace(/(\[.[a-zA-Z0-9\=\/\.\,\?\:\_\&\-\#]*\])/gmi, "");

            return (output);
      }
      return '';
    }
  }

})();
