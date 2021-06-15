/**
* PHP Email Form Validation - v3.1
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      // let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!')
        return;
      }

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      // let formData = new FormData(thisForm);

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const text = document.getElementById("message").value;

      const data = {
        name,
        email,
        subject,
        text
      };

      // for (var key of formData.entries()) {
      //   console.log(key[0] + ', ' + key[1])
      // }

      // const data = new URLSearchParams(formData);

      console.log(data);

      email_form_submit(thisForm, action, data);

    //   if ( recaptcha ) {
    //     if(typeof recaptcha !== "undefined" ) {
    //       recaptcha.ready(function() {
    //         try {
    //           recaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
    //           .then(token => {
    //             formData.set('recaptcha-response', token);
    //             php_email_form_submit(thisForm, action, formData);
    //           })
    //         } catch(error) {
    //           displayError(thisForm, error)
    //         }
    //       });
    //     } else {
    //       displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
    //     }
    //   } else {
    //     php_email_form_submit(thisForm, action, formData);
    //   }
    });

    // todo - maybe kena buat baru untuk send data
  });

  function email_form_submit(thisForm, action, data) {

    console.log(data);

    fetch(action, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if( response.ok ) {
        return response.text();
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      console.log(data);
      if (data.trim() == 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
