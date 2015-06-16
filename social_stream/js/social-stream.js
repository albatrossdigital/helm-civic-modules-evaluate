(function ($) {

Drupal.behaviors.social_stream = {
  attach: function (context, settings) {
    settings.social_stream.days = 30;
    settings.social_stream.limit = 10;
    settings.social_stream.max = 'limit';
    $('#social-stream').dcSocialStream(settings.social_stream);

  }
};

})(jQuery);