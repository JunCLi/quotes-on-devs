(function($) {
  const reloadPage = () => {
    window.location.reload();
  }

  $('.site-main').on('click', '.error-message button', () => {
    reloadPage();
  });

  $('.site-main').on('click', '.submit-another button', () => {
    reloadPage();
  });
})(jQuery);