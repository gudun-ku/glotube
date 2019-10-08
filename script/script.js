'use strict';

document.addEventListener('DOMContentLoaded', () => {

  //экранная клавиатура
  {
    const keyboardButton = document.querySelector('.search-form__keyboard'),
      keyboard = document.querySelector('.keyboard'),
      closeKeyboard = document.getElementById('close-keyboard'),
      searchInput = document.querySelector('.search-form__input');

    const toggleKeyboard = () => {
      keyboard.style.top = keyboard.style.top ? '' : '50%';
    };

    const typing = event => {
      const target = event.target;

      if (target.tagName.toLowerCase() === 'button') {
        //console.log(target);
        //console.log(target.textContent.trim());

        if (target.getAttribute('id') === 'keyboard-backspace') {
          if (searchInput.value.length > 0) {
            searchInput.value = searchInput.value.slice(0, -1);
          }
        } else {
          const letter = target.textContent.trim();
          // space = letter = '';
          if(letter === '') {
            searchInput.value += ' ';            
          } else {
            searchInput.value += letter;
          }
        }       
      }    
    };

    keyboardButton.addEventListener('click', toggleKeyboard);
    closeKeyboard.addEventListener('click', toggleKeyboard);
    keyboard.addEventListener('click', typing);
  }

  // меню
  {
    const burger = document.querySelector('.spinner');
    const sidebarMenu = document.querySelector('.sidebarMenu');

    burger.addEventListener('click', () => {     
      burger.classList.toggle("active");
      sidebarMenu.classList.toggle("rollUp");
    });

    sidebarMenu.addEventListener('click', e => {
      let target = e.target;
      target = target.closest('a[href="#"');

      if (target) {
        const parentTarget = target.parentElement;
        sidebarMenu.querySelectorAll('li').forEach((elem) => {
          if (elem === parentTarget) {
            elem.classList.add('active');
          } else {
            elem.classList.remove('active');
          }
        });
      }
    });
  }

  // модальное окно в котором будет проигрываться видео
  {
    const divYoutuber  = document.createElement('div');



  }






});