(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    if (theme === "auto") {
      document.documentElement.setAttribute(
        "data-bs-theme",
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector("#bd-theme");

    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherText = document.querySelector("#bd-theme-text");

    const activeThemeIcon = document.querySelectorAll(".theme-icon i"); // main dropdown

    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );
    const svgOfActiveBtn = btnToActive.querySelector("i").getAttribute("class");

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });

    btnToActive.classList.add("active");
    btnToActive.setAttribute("aria-pressed", "true");
    activeThemeIcon.forEach((element) => {
      element.setAttribute("class", svgOfActiveBtn);
      element.classList.remove("opacity-50");
    });
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
    themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

    if (focus) {
      themeSwitcher.focus();
    }
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme, true);
      });
    });
  });
})();

(function ($) {
  $(function () {
    var jcarousel = $(".jcarousel");
    jcarousel.jcarousel().jcarouselAutoscroll({
      interval: 5000, // 5 seconds
      target: "+=1",
      autostart: true,
    });

    jcarousel
      .on("jcarousel:reload jcarousel:create", function () {
        var carousel = $(this),
          width = carousel.innerWidth();

        if (width >= 600) {
          width = width / 2;
        } else if (width >= 350) {
          width = width / 1;
        }

        carousel.jcarousel("items").css("width", Math.ceil(width) + "px");
      })
      .jcarousel({
        wrap: "circular",
      });

    $(".jcarousel-control-prev").jcarouselControl({
      target: "-=1",
    });

    $(".jcarousel-control-next").jcarouselControl({
      target: "+=1",
    });

    $(".jcarousel-pagination")
      .on("jcarouselpagination:active", "a", function () {
        $(this).addClass("active");
      })
      .on("jcarouselpagination:inactive", "a", function () {
        $(this).removeClass("active");
      })
      .on("click", function (e) {
        e.preventDefault();
      })
      .jcarouselPagination({
        perPage: 1,
        item: function (page) {
          return '<a href="#' + page + '">' + page + "</a>";
        },
      });
  });
})(jQuery);

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  effect: "coverflow",
  slidesPerView: "auto",
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  centeredSlides: true,
  slidesPerView: 2,
  coverflowEffect: {
    rotate: 5,
    scale: 1,
    stretch: 50,
    depth: 300,
    modifier: 1,
    slideShadows: true,
  },
});
