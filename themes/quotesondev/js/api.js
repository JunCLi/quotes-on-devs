// import { format } from "url";

(function($) {
  
  const currentUrl = window.location.href;

  // Update Content on random quote
  const updateContent = (data) => {
    const $content = $('.entry-content');
    const $title = $('.entry-title');

    $content.html(data.content.rendered);
    $title.html(data.title.rendered);
  }

  // Random Quote
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

  $('#submit-new-quote').on('submit', event => {
    event.preventDefault();
    const $form = $(event.currentTarget);
    let formData = {}

    $form.find('[name]').each( (index, value) => {
      let inputValue = value.value;
      formData[value.name] = inputValue;

    });
    
    formData.status = 'publish';
    formData.category = 'User Submitted'

    $.ajax({
      method: 'POST',
      url: submit_quote.rest_url + 'wp/v2/posts',
      data: formData,
      dataType: 'json',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', submit_quote.wpapi_nonce);
      },
      success: () => {
      }
    }).done(() => {
    }).fail(() => {
    }).always(() => {
    });
  });
})(jQuery);