// ALS Project Page Specific JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Enhanced scroll animations for research content
  const researchElements = document.querySelectorAll(
    ".goal-card, .timeline-item, .tech-highlight-card, .challenge-card, .reflection-container"
  );

  if ("IntersectionObserver" in window) {
    const researchObserverOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const researchObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered animation delay for visual appeal
          setTimeout(() => {
            entry.target.classList.add("research-reveal");
          }, index * 100);
          researchObserver.unobserve(entry.target);
        }
      });
    }, researchObserverOptions);

    researchElements.forEach((element) => {
      element.classList.add("research-hidden");
      researchObserver.observe(element);
    });
  }

  // Add interactive hover effects for technical cards
  const techCards = document.querySelectorAll(".tech-highlight-card");
  techCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
      this.style.boxShadow = "0 15px 35px rgba(177, 156, 217, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-5px) scale(1)";
      this.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
    });
  });

  // Add copy functionality to code snippets
  const codeSnippets = document.querySelectorAll(".code-snippet");
  codeSnippets.forEach((snippet, index) => {
    // Add copy button
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-code-btn";
    copyBtn.innerHTML = "📋 Copy";
    copyBtn.title = "Copy code to clipboard";

    snippet.style.position = "relative";
    snippet.appendChild(copyBtn);

    copyBtn.addEventListener("click", async function () {
      const codeText = snippet.querySelector("code").textContent;

      try {
        await navigator.clipboard.writeText(codeText);
        copyBtn.innerHTML = "✅ Copied!";
        copyBtn.style.backgroundColor = "#b19cd9";
        copyBtn.style.color = "white";

        setTimeout(() => {
          copyBtn.innerHTML = "📋 Copy";
          copyBtn.style.backgroundColor = "";
          copyBtn.style.color = "";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
        copyBtn.innerHTML = "❌ Failed";
        setTimeout(() => {
          copyBtn.innerHTML = "📋 Copy";
        }, 2000);
      }
    });
  });

  // Add progress indicators for timeline items
  const timelineItems = document.querySelectorAll(".timeline-item");
  let completedSteps = 0;

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("timeline-completed")
        ) {
          entry.target.classList.add("timeline-completed");
          completedSteps++;

          // Add completion animation
          const marker = entry.target.querySelector(".timeline-marker");
          if (marker) {
            marker.style.transform = "scale(1.3)";
            marker.style.backgroundColor = "#b19cd9";

            setTimeout(() => {
              marker.style.transform = "scale(1)";
            }, 300);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });

  // Add research metrics counter animation
  const metricsValues = [
    { selector: ".challenge-card:nth-child(1)", value: "94.2", suffix: "%" },
    { selector: ".challenge-card:nth-child(2)", value: "87.3", suffix: "%" },
  ];

  function animateCounter(element, targetValue, suffix = "") {
    let current = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(timer);
      }
      element.textContent = current.toFixed(1) + suffix;
    }, 50);
  }

  // Observe metric cards for counter animation
  const metricCards = document.querySelectorAll(".challenge-card");
  const metricObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const strongElements = entry.target.querySelectorAll("strong");
          strongElements.forEach((strong) => {
            if (strong.textContent.includes("94.2%")) {
              const numberSpan = document.createElement("span");
              strong.parentNode.insertBefore(numberSpan, strong.nextSibling);
              animateCounter(numberSpan, 94.2, "%");
            } else if (strong.textContent.includes("87.3%")) {
              const numberSpan = document.createElement("span");
              strong.parentNode.insertBefore(numberSpan, strong.nextSibling);
              animateCounter(numberSpan, 87.3, "%");
            }
          });
          metricObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.7 }
  );

  metricCards.forEach((card) => {
    metricObserver.observe(card);
  });

  // Add dynamic styles for animations
  const style = document.createElement("style");
  style.textContent = `
    .research-hidden {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .research-reveal {
      opacity: 1;
      transform: translateY(0);
    }
    
    .copy-code-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 4px 8px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 10;
    }
    
    .copy-code-btn:hover {
      background: #f0f0f0;
      transform: scale(1.05);
    }
    
    .timeline-completed .timeline-marker {
      animation: pulse 0.5s ease-in-out;
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(177, 156, 217, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(177, 156, 217, 0); }
      100% { box-shadow: 0 0 0 0 rgba(177, 156, 217, 0); }
    }
    
    .tech-highlight-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .goal-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 25px rgba(177, 156, 217, 0.15);
    }
    
    .challenge-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .challenge-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(177, 156, 217, 0.1);
    }
    
    .reflection-container {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .reflection-container:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(177, 156, 217, 0.08);
    }
  `;
  document.head.appendChild(style);

  // Add smooth scrolling enhancement for breadcrumb navigation
  const breadcrumbLinks = document.querySelectorAll(".breadcrumbs a");
  breadcrumbLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.includes("#") && !href.startsWith("http")) {
        const targetId = href.split("#")[1];
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (
            targetElement &&
            window.location.pathname.includes("homepage.html")
          ) {
            e.preventDefault();
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      }
    });
  });

  // Add keyboard navigation for accessibility
  document.addEventListener("keydown", function (e) {
    // Escape key closes any open popups
    if (e.key === "Escape") {
      const openPopup = document.querySelector(".cv-popup.show");
      if (openPopup) {
        openPopup.classList.remove("show");
        setTimeout(() => openPopup.remove(), 300);
      }
    }
  });

  // Add loading animation for images
  const projectImages = document.querySelectorAll(".project-detail-image");
  projectImages.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "0";
      this.style.transform = "scale(0.9)";
      this.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      setTimeout(() => {
        this.style.opacity = "1";
        this.style.transform = "scale(1)";
      }, 100);
    });
  });

  // Add research progress tracking
  let researchProgress = 0;
  const totalSections = document.querySelectorAll(".project-section").length;

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("section-viewed")
        ) {
          entry.target.classList.add("section-viewed");
          researchProgress++;

          // Update progress indicator if you want to add one
          const progressPercentage = (researchProgress / totalSections) * 100;
          console.log(`Research progress: ${progressPercentage.toFixed(0)}%`);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".project-section").forEach((section) => {
    progressObserver.observe(section);
  });

  // Add enhanced code syntax highlighting for Python
  function enhancePythonSyntax() {
    const codeBlocks = document.querySelectorAll(".code-snippet code");

    codeBlocks.forEach((block) => {
      let content = block.innerHTML;

      // Python keywords
      const pythonKeywords = [
        "def",
        "class",
        "import",
        "from",
        "as",
        "if",
        "else",
        "elif",
        "for",
        "while",
        "try",
        "except",
        "finally",
        "with",
        "return",
        "yield",
        "lambda",
        "True",
        "False",
        "None",
        "and",
        "or",
        "not",
        "in",
        "is",
        "self",
        "super",
      ];

      // TensorFlow/Keras specific terms
      const tfKeywords = [
        "tf",
        "keras",
        "Model",
        "layers",
        "Dense",
        "Dropout",
        "GlobalAveragePooling2D",
        "compile",
        "fit",
        "evaluate",
        "predict",
        "Sequential",
        "applications",
      ];

      // Highlight Python keywords
      pythonKeywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "g");
        content = content.replace(
          regex,
          `<span class="python-keyword">${keyword}</span>`
        );
      });

      // Highlight TensorFlow keywords
      tfKeywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "g");
        content = content.replace(
          regex,
          `<span class="tf-keyword">${keyword}</span>`
        );
      });

      // Highlight function names
      content = content.replace(
        /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
        '<span class="function-name">$1</span>('
      );

      // Highlight numbers
      content = content.replace(
        /\b\d+\.?\d*\b/g,
        '<span class="number">$&</span>'
      );

      block.innerHTML = content;
    });
  }

  // Apply enhanced syntax highlighting
  enhancePythonSyntax();

  // Add additional CSS for enhanced syntax highlighting
  const syntaxStyle = document.createElement("style");
  syntaxStyle.textContent = `
  .python-keyword {
    color: #0066cc;
    font-weight: bold;
  }
  
  .tf-keyword {
    color: #ff6b35;
    font-weight: 600;
  }
  
  .function-name {
    color: #8e44ad;
    font-weight: 500;
  }
  
  .number {
    color: #e67e22;
    font-weight: 500;
  }
  
  .code-snippet {
    position: relative;
  }
  
  /* Updated copy button styles - hidden by default */
  .copy-code-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    /* Hide by default */
    opacity: 0;
    visibility: hidden;
    transform: translateY(-5px);
  }
  
  .copy-code-btn:hover {
    background: #f0f0f0;
    transform: translateY(-5px) scale(1.05);
  }
  
  /* Show button when hovering over the code snippet container */
  .code-snippet:hover .copy-code-btn {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;
  document.head.appendChild(syntaxStyle);

  console.log("ALS Project Page JavaScript loaded successfully");

  // Get elements
  const viewBtn = document.getElementById("viewPosterBtn");
  const modal = document.getElementById("posterModal");
  const closeBtn = document.getElementById("closePosterBtn");

  console.log("Elements found:", {
    viewBtn: !!viewBtn,
    modal: !!modal,
    closeBtn: !!closeBtn,
  });

  if (viewBtn && modal && closeBtn) {
    console.log("Setting up poster modal...");

    // Show modal function
    function showModal() {
      console.log("Opening modal...");
      modal.style.display = "flex";
      modal.style.opacity = "1";
      document.body.style.overflow = "hidden";
    }

    // Close modal function
    function closeModal() {
      console.log("Closing modal...");
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }

    // Event listeners
    viewBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Poster button clicked!");
      showModal();
    });

    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });

    // Click outside to close
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Escape key to close
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.style.display === "flex") {
        closeModal();
      }
    });

    console.log("Poster modal initialised successfully");
  } else {
    console.error("Failed to initialise poster modal");
  }
});
