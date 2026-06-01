/* =========================================================
   Satyajit Barua — Portfolio
   script.js
   Plain, beginner-friendly JavaScript. No libraries needed.
   ========================================================= */

// Wait until the HTML page is fully loaded before running code.
document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Sticky header background on scroll ----------
     When the user scrolls down a bit, we add the "scrolled" class
     to the header. The CSS then gives it a blurred background. */
  const header = document.getElementById("header");

  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // run once on load


  /* ---------- 2. Mobile menu (hamburger) toggle ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open"); // add/remove "open"
    menuToggle.classList.toggle("open", isOpen);       // animate the icon
    menuToggle.setAttribute("aria-expanded", isOpen);  // accessibility
  });

  // Close the mobile menu after clicking any link inside it.
  const links = navLinks.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });


  /* ---------- 3. Scroll-reveal animations ----------
     Every element with the class "reveal" fades up into view
     the first time it scrolls onto the screen. We use the
     IntersectionObserver API, which is built into browsers. */
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(function (item) {
    observer.observe(item);
  });


  /* ---------- 4. FAQ accordion ----------
     Clicking a question opens its answer and closes the others. */
  const faqButtons = document.querySelectorAll(".faq-q");

  faqButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const answer = button.nextElementSibling; // the .faq-a div
      const isOpen = button.getAttribute("aria-expanded") === "true";

      // First, close every FAQ item.
      faqButtons.forEach(function (otherBtn) {
        otherBtn.setAttribute("aria-expanded", "false");
        otherBtn.nextElementSibling.style.maxHeight = null;
      });

      // Then open this one (unless it was already open).
      if (!isOpen) {
        button.setAttribute("aria-expanded", "true");
        // scrollHeight = the full height the content needs.
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });


  /* ---------- 5. Contact form (no backend) ----------
     There is no server here, so when the form is submitted we
     build a "mailto:" link and open the visitor's email app
     with their message pre-filled. This works on free hosting. */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      note.textContent = "Please fill in every field.";
      return;
    }

    // Build the email contents.
    const subject = encodeURIComponent("Portfolio enquiry from " + name);
    const body = encodeURIComponent(
      message + "\n\n— " + name + "\n" + email
    );

    // Open the visitor's email client.
    window.location.href =
      "mailto:baruattbbk@yahoo.com?subject=" + subject + "&body=" + body;

    note.textContent = "Opening your email app… thank you!";
    form.reset();
  });


  /* ---------- 6. Live project previews ----------
     Each project shows a static mockup first. When the visitor clicks
     "Load live preview", we swap in an <iframe> pointing at the real
     site. We only load it on click so the page stays fast, and the
     real site isn't fetched until someone actually wants to see it. */
  const previewButtons = document.querySelectorAll(".preview-load");

  previewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const stage = button.closest(".preview-stage");
      const url = stage.getAttribute("data-live");

      // Don't load twice.
      if (stage.classList.contains("loaded")) return;

      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.loading = "lazy";
      iframe.title = "Live preview";
      // Sandboxing keeps the embedded site from interfering with the page.
      iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups allow-forms");
      iframe.referrerPolicy = "no-referrer";

      stage.appendChild(iframe);
      stage.classList.add("loaded");
    });
  });


  /* ---------- 7. Auto-update the footer year ---------- */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
