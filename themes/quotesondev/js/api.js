(function($) {
  
  const currentUrl = window.location.href;

  const updateContent = (data) => {
    const $content = $('.entry-content');
    const $title = $('.entry-title');

    $content.html(data.content.rendered);
    $title.html(data.title.rendered);
  }

  $('#another-quote').on('click', event => {
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: random_quote.rest_url + 'wp/v2/posts?' + 'per_page=100',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', random_quote.wpapi_nonce)
      },
      success: () => {
      }
    }).done(response => {
      const randomPost = response[Math.floor(Math.random() * response.length)];
      

      const randomPostUrl = currentUrl + randomPost.slug

      updateContent(randomPost);
      history.pushState(randomPost, randomPost.content.rendered, randomPostUrl);

    }).fail(() => {
    }).always(() => {

    });

  });

  // Revert to a previously saved state
  window.addEventListener('popstate', function(event) {
    if (event.state === null) {
      history.go(0);
      return;
    }
    updateContent(event.state);
  });
})(jQuery);