(function (window, document) {
  'use strict';

  var FOOTER_PATH = '/templates/footer.htm';

  function insertFooter(markup) {
    var footer = document.getElementById('footer');

    if (!footer) {
      return;
    }

    footer.innerHTML = markup;
  }

  function handleError(error) {
    if (window && window.console && typeof window.console.error === 'function') {
      console.error('Unable to load the footer template.', error);
    }
  }

  function requestFooter() {
    if (!document.getElementById('footer')) {
      return;
    }

    if (window.fetch) {
      fetch(FOOTER_PATH, { credentials: 'same-origin' })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          return response.text();
        })
        .then(insertFooter)
        .catch(handleError);

      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', FOOTER_PATH, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        insertFooter(xhr.responseText);
      } else {
        handleError(new Error('Request for footer failed with status ' + xhr.status));
      }
    };
    xhr.send();
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', requestFooter);
    } else {
      requestFooter();
    }
  }

  init();
})(window, document);
