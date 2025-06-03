// DOM Elements
const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");
const typingText = document.getElementById("typingText");
const navLinks = document.querySelectorAll(".nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.getElementById("contactForm");
const currentYearElement = document.getElementById("currentYear");

function animateBarWhenVisible(bar) {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetWidth = bar.getAttribute("data-width");
          bar.style.width = targetWidth;
          bar.classList.add("animated");
          observerInstance.unobserve(bar); // only run once
        }
      });
    },
    {
      threshold: 0.5, // only trigger when 50% in view
    }
  );

  observer.observe(bar);
}

// Attach to each progress bar
document.querySelectorAll(".progress-fill").forEach((bar) => {
  bar.style.width = "0%"; // reset width on page load
  bar.style.transition = "width 1.5s ease-in-out";
  animateBarWhenVisible(bar);
});

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Mobile Menu Toggle
menuButton.addEventListener("click", () => {
  mobileNav.style.display =
    mobileNav.style.display === "block" ? "none" : "block";
});

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
  if (!menuButton.contains(event.target) && !mobileNav.contains(event.target)) {
    mobileNav.style.display = "none";
  }
});

// Typing Animation
function typeWriter() {
  const text = "BSc Computer Science w/ Artificial Intelligence Graduate";
  let i = 0;
  const speed = 45; // typing speed in milliseconds

  function type() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Start typing animation when page loads
window.addEventListener("load", typeWriter);

function setupNeuronInteractivity() {
  const svgDoc = document.querySelector(".svg-animation").contentDocument;

  if (!svgDoc) return;

  const neurons = svgDoc.querySelectorAll(".neuron");

  neurons.forEach((neuron) => {
    neuron.addEventListener("click", function () {
      const connections = svgDoc.querySelectorAll(".connection");
      connections.forEach((conn) => {
        conn.setAttribute("stroke-opacity", "0.8");
        conn.setAttribute("stroke-width", "2");
      });

      const cx = parseFloat(this.getAttribute("cx"));
      const cy = parseFloat(this.getAttribute("cy"));

      connections.forEach((conn) => {
        const d = conn.getAttribute("d");
        if (d.includes(`${cx},${cy}`) || d.includes(`${cx}, ${cy}`)) {
          conn.setAttribute("stroke-opacity", "1");
          conn.setAttribute("stroke-width", "3");
        }
      });
    });
  });
}

// Wait for SVG to load before trying to access it
window.addEventListener("load", () => {
  const svgObject = document.querySelector(".svg-animation");

  if (svgObject) {
    svgObject.addEventListener("load", () => {
      setupNeuronInteractivity();
    });
  }
});

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    // If the href is just "#", prevent the default behavior
    if (this.getAttribute("href") === "#") {
      e.preventDefault();
    }
  });
});

// Navigation Active Link
function setActiveLink() {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Desktop nav
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });

      // Mobile nav
      mobileNavLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.style.color = "#b19cd9";
        } else {
          link.style.color = "#a9a9a9";
        }
      });
    }
  });
}

// Update active link on scroll
window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// Project Card Hover Effect
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
    card.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Close mobile menu if open
      mobileNav.style.display = "none";

      // Smooth scroll to element
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Contact form: show thank you message instead of redirecting
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        contactForm.style.display = "none";
        document.getElementById("thankYouMessage").style.display = "block";
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form error:", error);
      alert("There was a problem submitting the form.");
    }
  });
}

// Add scroll reveal animations
window.addEventListener("DOMContentLoaded", () => {
  // Check if IntersectionObserver is supported
  if ("IntersectionObserver" in window) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    // Apply to elements that should animate in
    const animatedElements = document.querySelectorAll(".fade-in");
    animatedElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      appearOnScroll.observe(element);
    });

    // Helper class for animation
    document.querySelectorAll(".appear").forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    });
  }
});

// Add fade-in class to elements on load if not already done by HTML
window.addEventListener("load", () => {
  // Add fade-in class to section titles and content blocks
  document
    .querySelectorAll(
      ".section-title, .project-card, .skill-card, .proficiency-container, .contact-form-container, .contact-info-container"
    )
    .forEach((element) => {
      if (!element.classList.contains("fade-in")) {
        element.classList.add("fade-in");
      }
    });
});

// CV Download Button Popup
document.addEventListener("DOMContentLoaded", function () {
  const downloadCVButton = document.getElementById("downloadCV");

  if (downloadCVButton) {
    console.log("CV button found and listener attached");
    downloadCVButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Create popup element
      const popup = document.createElement("div");
      popup.className = "cv-popup";
      popup.innerHTML = `
        <div class="popup-content">
          <span class="close-popup">&times;</span>
          <h3>Work In Progress</h3>
          <p>My CV is currently being updated. Please check back soon!</p>
        </div>
      `;

      // Add popup to body
      document.body.appendChild(popup);

      // Show popup with animation
      setTimeout(() => {
        popup.classList.add("show");
      }, 10);

      // Close button functionality
      const closeBtn = popup.querySelector(".close-popup");
      closeBtn.addEventListener("click", function () {
        popup.classList.remove("show");

        // Remove popup after animation completes
        setTimeout(() => {
          document.body.removeChild(popup);
        }, 300);
      });

      // Close popup when clicking outside
      popup.addEventListener("click", function (event) {
        if (event.target === popup) {
          popup.classList.remove("show");

          // Remove popup after animation completes
          setTimeout(() => {
            document.body.removeChild(popup);
          }, 300);
        }
      });
    });
  } else {
    console.log("CV button not found on page load");
  }
});

// Project Links Popup
document.addEventListener("DOMContentLoaded", function () {
  const projectLinks = document.querySelectorAll(".project-link");

  projectLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const isLive = link.classList.contains("live-project");

      if (!isLive) {
        e.preventDefault(); // only works on project pages that aren't live

        const popup = document.createElement("div");
        popup.className = "cv-popup";
        popup.innerHTML = `
          <div class="popup-content">
            <span class="close-popup">&times;</span>
            <h3>Project Page Coming Soon</h3>
            <p>This detailed project page is currently under development. Please check back soon!</p>
          </div>
        `;

        document.body.appendChild(popup);
        setTimeout(() => popup.classList.add("show"), 10);

        const closeBtn = popup.querySelector(".close-popup");
        closeBtn.addEventListener("click", () => {
          popup.classList.remove("show");
          setTimeout(() => popup.remove(), 300);
        });

        popup.addEventListener("click", (event) => {
          if (event.target === popup) {
            popup.classList.remove("show");
            setTimeout(() => popup.remove(), 300);
          }
        });
      }
    });
  });
});
