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
      const svgOfActiveBtn = btnToActive
        .querySelector("i")
        .getAttribute("class");
  
      document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
        element.classList.remove("active");
        element.setAttribute("aria-pressed", "false");
      });
  
      btnToActive.classList.add("active");
      btnToActive.setAttribute("aria-pressed", "true");
      activeThemeIcon.forEach((element) => {
        element.setAttribute("class", svgOfActiveBtn)
        element.classList.remove("opacity-50");
      })
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
  

  $(document).ready(function() {
    $('#carouselExample').on('slide.bs.carousel', function (e) {
      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = 3;
      var totalItems = $('.carousel-item').length;

      if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
          // append slides to end
          if (e.direction=="left") {
            $('.carousel-item').eq(i).appendTo('.carousel-inner');
          } else {
            $('.carousel-item').eq(0).appendTo('.carousel-inner');
          }
        }
      }
    });
  });