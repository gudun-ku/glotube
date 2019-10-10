"use strict";

document.addEventListener("DOMContentLoaded", () => {
  //экранная клавиатура
  {
    const keyboardButton = document.querySelector(".search-form__keyboard"),
      keyboard = document.querySelector(".keyboard"),
      closeKeyboard = document.getElementById("close-keyboard"),
      searchInput = document.querySelector(".search-form__input");

    const toggleKeyboard = () => {
      keyboard.style.top = keyboard.style.top ? "" : "50%";
    };

    const switchLang = (btn, lang) => {
      const langRu = [
        "ё",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        "-",
        "=",
        "⬅",
        "й",
        "ц",
        "у",
        "к",
        "е",
        "н",
        "г",
        "ш",
        "щ",
        "з",
        "х",
        "ъ",
        "ф",
        "ы",
        "в",
        "а",
        "п",
        "р",
        "о",
        "л",
        "д",
        "ж",
        "э",
        "я",
        "ч",
        "с",
        "м",
        "и",
        "т",
        "ь",
        "б",
        "ю",
        ".",
        "en",
        " "
      ];
      const langEn = [
        "`",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        "-",
        "=",
        "⬅",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "[",
        "]",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        ";",
        '"',
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        ",",
        ".",
        "/",
        "ru",
        " "
      ];

      if (lang === "en") {
        btn.forEach((elem, i) => {
          elem.textContent = langEn[i];
        });
      } else {
        btn.forEach((elem, i) => {
          elem.textContent = langRu[i];
        });
      }
    };

    const typing = event => {
      const target = event.target;

      if (target.tagName.toLowerCase() === "button") {
        //console.log(target);
        //console.log(target.textContent.trim());
        const buttons = [...keyboard.querySelectorAll("button")].filter(
          btn => btn.style.visibility !== "hidden"
        );
        console.dir(buttons);

        if (target.getAttribute("id") === "keyboard-backspace") {
          if (searchInput.value.length > 0) {
            searchInput.value = searchInput.value.slice(0, -1);
          }
        } else if (target.getAttribute("id") === "keyboard-switch") {
          switchLang(buttons, target.textContent.trim());
        } else {
          const letter = target.textContent.trim();
          // space = letter = '';
          if (!letter) {
            searchInput.value += " ";
          } else {
            searchInput.value += letter;
          }
        }
      }
    };

    keyboardButton.addEventListener("click", toggleKeyboard);
    closeKeyboard.addEventListener("click", toggleKeyboard);
    keyboard.addEventListener("click", typing);
  }

  // меню
  {
    const burger = document.querySelector(".spinner");
    const sidebarMenu = document.querySelector(".sidebarMenu");

    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      sidebarMenu.classList.toggle("rollUp");
    });

    sidebarMenu.addEventListener("click", e => {
      let target = e.target;
      target = target.closest('a[href="#"');

      if (target) {
        const parentTarget = target.parentElement;
        sidebarMenu.querySelectorAll("li").forEach(elem => {
          if (elem === parentTarget) {
            elem.classList.add("active");
          } else {
            elem.classList.remove("active");
          }
        });
      }
    });
  }

  // модальное окно
  {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
    <div class="youTuberModal">
      <div id="youTuberClose">&#215;</div>
      <div id="youTuberContainer"></div>
    </div>
    `
    );

    const youTuberItems = document.querySelectorAll("[data-youtuber]");
    const youTuberModal = document.querySelector(".youTuberModal");
    const youTuberContainer = document.getElementById("youTuberContainer");

    const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
    const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

    const sizeVideo = () => {
      let ww = document.documentElement.clientWidth;
      let wh = document.documentElement.clientHeight;

      for (let i = 0; i < qw.length; i++) {
        if (ww > qw[i]) {
          youTuberContainer.querySelector("iframe").style.cssText = `
          width: ${qw[i]}px;
          height: ${qh[i]}px;
          top: ${(wh - qh[i]) / 2}px;
          left: ${(ww - qw[i]) / 2}px;
          `;
          youTuberContainer.style.cssText = `
          width: ${qw[i]}px;
          height: ${qh[i]}px;
          top: ${(wh - qh[i]) / 2}px;
          left: ${(ww - qw[i]) / 2}px;
          `;
          //console.log(qw[i]);
          break;
        }
      }
    };

    youTuberItems.forEach(elem => {
      elem.addEventListener('click', () => {
        const idVideo = elem.dataset.youtuber;
        youTuberModal.style.display = "block";

        const youTuberFrame = document.createElement("iframe");
        youTuberFrame.src = `https://www.youtube.com/embed/${idVideo}`;
        youTuberContainer.insertAdjacentElement("beforeend", youTuberFrame);
        //onsole.log(idVideo);

        window.addEventListener("resize", sizeVideo);

        sizeVideo();
      });
    });

    youTuberModal.addEventListener("click", () => {
      youTuberContainer.textContent = "";
      youTuberModal.style.display = "";
      window.removeEventListener("resize", sizeVideo);
    });
  }
  
  // youtube
  {
    const API_KEY = "AIzaSyDpKRXbPRvCsQTpZyqyjkh8IvFA4UZNq_4";
  }
});
