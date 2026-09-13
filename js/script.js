document.addEventListener("DOMContentLoaded", () => {

  const clickSound = new Audio("audio/minecraft_click.mp3");
  clickSound.volume = 1;

  document.addEventListener("click", () => {
  clickSound.currentTime = 0.0; 
  clickSound.play().catch(() => {
  });
});
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const audio = document.getElementById("background-audio");
  const audioToggle = document.getElementById("audioToggle");
  const audioLabel = audioToggle ? audioToggle.querySelector(".audio-label") : null;

  if (audio && audioToggle) {
    audioToggle.addEventListener("click", () => {
      const nowPlaying = audio.paused;

      if (nowPlaying) {
        audio.play().catch(() => {
          if (audioLabel) audioLabel.textContent = "Music: unavailable";
        });
      } else {
        audio.pause();
      }

      audioToggle.setAttribute("aria-pressed", String(nowPlaying));
      if (audioLabel) {
        audioLabel.textContent = nowPlaying ? "Music: On" : "Music: Off";
      }
    });
  }

  const form = document.getElementById("askForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = "Fill in your name and question first.";
        return;
      }

      const name = document.getElementById("username").value.trim();
      status.textContent = `Thanks, ${name}! Steve will get back to you soon.`;
      form.reset();
    });
  }

  const videoSlides = [...document.querySelectorAll(".video-slide")];
  const carouselDots = document.querySelector(".carousel-dots");
  let activeVideo = 0;

  function showVideo(index) {
    activeVideo = (index + videoSlides.length) % videoSlides.length;
    videoSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeVideo);
    });
    document.querySelectorAll(".carousel-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeVideo);
      dot.setAttribute("aria-current", dotIndex === activeVideo ? "true" : "false");
    });
  }

  if (videoSlides.length > 0 && carouselDots) {
    videoSlides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Show video ${index + 1}`);
      dot.addEventListener("click", () => showVideo(index));
      carouselDots.appendChild(dot);
    });
    document.querySelector('[data-carousel="previous"]').addEventListener("click", () => showVideo(activeVideo - 1));
    document.querySelector('[data-carousel="next"]').addEventListener("click", () => showVideo(activeVideo + 1));

    document.querySelectorAll(".video-link").forEach((link) => {
      link.addEventListener("click", () => {
        showVideo(Number(link.dataset.videoIndex));
      });
    });

    showVideo(0);
  }

});
