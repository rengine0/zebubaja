// ===== Zebu Baja — tema claro/escuro + menu hambúrguer =====

(function () {
  var root = document.documentElement;
  var STORAGE_KEY = "zebubaja-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* localStorage indisponível — segue sem salvar */
    }
  }

  // tema inicial: escolha salva > preferência do sistema > claro
  var initial =
    getStoredTheme() ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  applyTheme(initial);

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
        var next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        storeTheme(next);
      });
    }

    // formulário de contato: monta um e-mail (mailto:) com os dados preenchidos
    var contactForm = document.querySelector("[data-contact-form]");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var status = contactForm.querySelector("[data-contact-status]");
        var name = (contactForm.querySelector("#name") || {}).value || "";
        var email = (contactForm.querySelector("#email") || {}).value || "";
        var msg = (contactForm.querySelector("#msg") || {}).value || "";

        name = name.trim();
        email = email.trim();
        msg = msg.trim();

        if (!name || !email || !msg) {
          if (status) {
            status.style.display = "block";
            status.style.color = "#E0433B";
            status.textContent = "Preencha nome, email e mensagem antes de enviar.";
          }
          return;
        }

        var subject = encodeURIComponent("Contato via site - " + name);
        var bodyLines = [
          "Nome: " + name,
          "Email: " + email,
          "",
          msg,
        ];
        var body = encodeURIComponent(bodyLines.join("\n"));
        var mailto =
          "mailto:zebubajamarketing@gmail.com?subject=" + subject + "&body=" + body;

        if (status) {
          status.style.display = "block";
          status.style.color = "var(--muted)";
          status.textContent = "Abrindo seu aplicativo de email para enviar a mensagem...";
        }

        window.location.href = mailto;
      });
    }

    var hamburger = document.querySelector("[data-hamburger]");
    var navLinks = document.querySelector("[data-nav-links]");
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", function () {
        var isOpen = navLinks.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
      // fecha o menu ao clicar num link (navegação mobile)
      navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          navLinks.classList.remove("open");
          hamburger.setAttribute("aria-expanded", "false");
        });
      });
    }
  });
})();
