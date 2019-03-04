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

  // Function to fetch a random quote
  const randomQuoteFunction = () => {
    $.ajax({
      method: 'GET',
      url: random_quote.rest_url + 'wp/v2/posts?' + 'per_page=100',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', random_quote.wpapi_nonce)
      }
    }).done(response => {

      // randomize quote
      const randomPost = response[Math.floor(Math.random() * response.length)];
      
      const randomPostUrl = currentUrl + randomPost.slug

      // update content and inject new state
      updateContent(randomPost);
      history.pushState(randomPost, randomPost.content.rendered, randomPostUrl);

    }).fail(() => {
    }).always(() => {

    });
  };

  // Event handler to recieve random quote on corresponding button click
  $('#another-quote').on('click', event => {
    event.preventDefault();
    randomQuoteFunction();
  });

  // TODO add placeholder before compile finishes then use this script
  // Event handler to recieve random quote on initial page load
  // let firstPageLoad = 0;
  // if (firstPageLoad === 0) {
  //   firstPageLoad++;
  //   randomQuoteFunction();
  // }

  // Revert to a previously saved state
  window.addEventListener('popstate', function(event) {
    if (event.state === null) {
      history.go(0);
      return;
    }
    updateContent(event.state);
  });

  const failToSubmit = response => {
    $form.addClass('hidden');

    let errorMessage = `<div class="error-message">
    <p>There has been an error processing your quote submission, please try again.</p>
    <button>try again</button>
    </div>`;

    if (response === 'missingcontent') {
      errorMessage = `<div class="error-message">
      <p>There has been an error processing your quote submission. Your quote field is empty. Please try again.</p>
      <button>try again</button>
      </div>`;
    } else if (response.statusText) {
      const responseType = response.statusText.toLowerCase();
      if (responseType === 'unauthorized') {
        let urlArray = currentUrl.split('/');
        let baseUrl = currentUrl;
        
        for (let i = 1; i < urlArray.length; i++) {
          if (urlArray.slice(0, -i).includes('submit')) {
            baseUrl = urlArray.slice(0, -i - 1);
          }
        }

        baseUrl = baseUrl.join('/');
        baseUrl = baseUrl + '/';

        errorMessage = `<div class="error-message">
        <p>Sorry, you must be logged in to submit a quote!</p>
        <p><a href="${baseUrl}wp-login.php">Click here to login.</a></p>
        </div>`;
      }
    }
    $form.after(errorMessage);
  };

  // submit new quote
  const $form = $('#submit-new-quote');
  $form.on('submit', event => {
    event.preventDefault();
    // const $form = $(event.currentTarget);

    // save form content to be submitted
    let formData = {}
    $form.find('[name]').each( (index, value) => {
      console.log(formData[value.name]);
      if (formData[value.name] === 'content' && value.value.trim() === '') {
        failToSubmit('missingcontent');
      }
      formData[value.name] = value.value;
    });
    
    formData.status = 'publish';
    formData.category = 'User Submitted'

    // console.log($form);
    // console.log($('#submit-new-quote'));
    $.ajax({
      method: 'POST',
      url: submit_quote.rest_url + 'wp/v2/posts',
      data: formData,
      dataType: 'json',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', submit_quote.wpapi_nonce);
      }
    }).done(() => {
      $form.addClass('hidden');
      const afterSubmit = '<div class="submit-another"><p>Your quote has been submitted!</p><button type="button">Submit Another Quote</button></div>'
      $form.after(afterSubmit);
    }).fail(response => {
      failToSubmit(response);
    }).always(() => {
    });
  });
})(jQuery);