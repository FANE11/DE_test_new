document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('myModal');
  const btn = document.getElementsByClassName('footer-button')[0];
  const closeBtn = document.getElementsByClassName('close')[0];
  const form = document.querySelector('form');

  function closeModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  function showPopup(message, isSuccess) {
    const popupContainer = document.getElementById('popupContainer');

    const popup = document.createElement('div');
    popup.classList.add('popup');

    if (isSuccess) {
      popup.classList.add('success');
    } else {
      popup.classList.add('error');
    }

    popup.textContent = message;
    popupContainer.appendChild(popup);

    setTimeout(() => {
      popupContainer.removeChild(popup);
    }, 3000);
  }

  if (btn && modal && closeBtn) {
    btn.onclick = function () {
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    };

    closeBtn.onclick = closeModal;

    window.onclick = function (event) {
      if (event.target == modal) {
        closeModal();
      }
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        showPopup('Пожалуйста, заполните все поля', false);
      } else {
        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            showPopup('Ваше сообщение успешно отправлено!', true);
          })
          .catch((error) => {
            showPopup('Ошибка', false);
          });
      }
    });
  }
});
