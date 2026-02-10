'use strict';

function darkMode() {
  const checkboxContainer = document.querySelector('.checkbox-container');

  checkboxContainer.addEventListener('click', () => {
    checkboxContainer.classList.toggle('checkbox-active');

    if (checkboxContainer.classList.contains('checkbox-active')) {
      document.body.classList.add('dark-mode-active');
    } else {
      document.body.classList.remove('dark-mode-active');
    }
  });
}

darkMode();
