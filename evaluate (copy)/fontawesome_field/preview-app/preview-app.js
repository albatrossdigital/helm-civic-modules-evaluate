(function ($) {

  Drupal.behaviors.fontawesomesFieldAdmin = {
    attach: function (context, settings) {

      var $filter_by = $('input').appendTo('.field-widget-fontawesome-field-widget-preview');

      // Filter icons
      if($filter_by.length) {
        var $filter_val = $('.fontawesome-filter-val');
        var $filter = $('.fontawesome-filter');
        var $other = $('#new, #web-application, #transportation, #gender, #form-control, #medical, #currency, #text-editor, #directional, #video-player, #brand, #file-type, #spinner, #payment, #chart');
        var $clear = $('.fontawesome-filter-clear');
        var $no_results = $('.fontawesome-no-search-results');

        var $icons = $('.filter-icon', $filter);

        // Add tab completion
        $filter_by.tabcomplete(filterSet, {
          arrowKeys: true
        });

        $clear.on('click', function(e) {
          e.preventDefault();
          $filter_by
            .val('')
            .trigger('input')
            .trigger('keyup')
            .focus();

          $clear.addClass('hide'); // Hide clear button
        });


        $filter_by.on('keyup', function() {
          var $this = $(this);
          var val = $this.val().toLowerCase();
          $filter.toggle(!!val);
          //$other.toggle(!val);
          $clear.toggleClass('hide', !val);
          $filter_val.text(val);

          if(!val) return;

          var resultsCount = 0;
          $icons.each(function() {
            var filter = $(this).attr('data-filter').split('|');
            var show = inFilter(val, filter);
            if (!show) {
              if (val.slice(-1) === 's') {
                // Try to be smart. Make plural terms singular.
                show = inFilter(val.slice(0, -1), filter);
              }
            }
            if (show) resultsCount++;
            $(this).toggle(!!show);
          });

          if( resultsCount == 0 && val.length != 0 ) {
            $no_results.find('span').text(val);
            $no_results.show();
          } else {
            $no_results.hide();
          }
        });
      }

      function inFilter(val, filter) {
        for (var i = 0; i < filter.length; i++) {
          if (filter[i].match(val)) return true;
        }
        return false;
      }

      $filter_by
        .val('')
        .trigger('input')
        .trigger('keyup');

      if ($clear) {
        $clear.addClass('hide'); // Hide clear button
      }

      
      function renderPreview(wrapperId) {
        var $wrapper = $('#' + wrapperId);
        var $i = $('<i class="fa"></i>')

        // update the selected icon
        var iconSelection = $wrapper.find('select.fontawesome-icon').val();
        if(iconSelection == '0') { $wrapper.find('.fontawesome-icon-preview').html('Preview');  return false; }
        $i.addClass(iconSelection);

        // replace what's there
        $wrapper.find('.fontawesome-icon-preview').html($i);
      }

    }
  };

})(jQuery);
