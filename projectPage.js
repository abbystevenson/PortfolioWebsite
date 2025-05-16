// Project Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Add scroll reveal animations for project page
  const revealElements = document.querySelectorAll(
    ".project-grid, .timeline-item, .tech-highlight-item, .goal-item, .result-item, .reflection-container, .next-steps"
  );

  // Simple reveal animation on scroll
  if ("IntersectionObserver" in window) {
    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    // Apply to all elements that should animate in
    revealElements.forEach((element) => {
      element.classList.add("reveal-element");
      revealOnScroll.observe(element);
    });
  }

  // Handle code snippet formatting
  const codeSnippets = document.querySelectorAll(".code-snippet code");
  codeSnippets.forEach((snippet) => {
    // Add line numbers if needed
    if (snippet.textContent.includes("\n")) {
      snippet.classList.add("has-line-numbers");
    }
  });

  // Function to clean up code displays and prevent class names from appearing in code
  function cleanupCodeSnippets() {
    const codeSnippets = document.querySelectorAll(".code-snippet code");

    codeSnippets.forEach((snippet) => {
      // First remove any keyword/string/comment text that appears as content
      let content = snippet.innerHTML;

      // Clean up the content to avoid showing class="keyword" text in the displayed code
      content = content.replace(
        /class="keyword"|class="string"|class="comment"/g,
        ""
      );

      // Update the content
      snippet.innerHTML = content;

      // Re-apply syntax highlighting properly
      highlightSyntax(snippet);
    });
  }

  // Improved syntax highlighting function
  function highlightSyntax(codeElement) {
    // Decode HTML entities first
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = codeElement.innerHTML;
    let code = tempDiv.textContent;

    const keywords = [
      "function",
      "const",
      "let",
      "var",
      "if",
      "else",
      "return",
      "for",
      "while",
      "new",
      "class",
      "this",
      "forEach",
      "setTimeout",
      "name",
      "on",
      "jobs",
      "steps",
      "uses",
      "with",
      "run",
      "entries",
    ];

    // Highlight keywords
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      code = code.replace(regex, `<span class="keyword">${keyword}</span>`);
    });

    // Highlight strings
    code = code.replace(
      /(".*?"|'.*?'|`.*?`)/g,
      '<span class="string">$1</span>'
    );

    // Highlight comments
    code = code.replace(/(\/\/[^\n]*)/g, '<span class="comment">$1</span>');

    // Re-encode for HTML and assign back
    codeElement.innerHTML = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Handle project navigation links
  const projectLinks = document.querySelectorAll(".nav-project");
  projectLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Since project pages are still being created, prevent navigation and show info message
      e.preventDefault();

      // Create popup message
      const popup = document.createElement("div");
      popup.className = "cv-popup"; // Reuse popup styling from main site
      popup.innerHTML = `
        <div class="popup-content">
          <span class="close-popup">&times;</span>
          <h3>Coming Soon</h3>
          <p>Additional project pages are currently under development. Please check back soon!</p>
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
  });

  // Add styling for code syntax highlighting
  const style = document.createElement("style");
  style.textContent = `
    .keyword { color: #0077aa; font-weight: bold; }
    .string { color: #669900; }
    .comment { color: #999999; font-style: italic; }
    
    .reveal-element {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .revealed {
      opacity: 1;
      transform: translateY(0);
    }
    
    .code-snippet.has-line-numbers {
      padding-left: 3.5em;
      position: relative;
    }
  `;
  document.head.appendChild(style);

  // Make breadcrumb navigation work
  const breadcrumbLinks = document.querySelectorAll(".breadcrumbs a");
  breadcrumbLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // If it's an anchor link, use smooth scrolling
      const href = this.getAttribute("href");
      if (href.includes("#") && !href.startsWith("http")) {
        const targetId = href.split("#")[1];
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (
            targetElement &&
            window.location.pathname.includes("index.html")
          ) {
            e.preventDefault();
            window.scrollTo({
              top: targetElement.offsetTop,
              behaviour: "smooth",
            });
          }
        }
      }
    });
  });
  // Direct method to fix the syntax highlighting and remove the extra text
  function fixCodeBlocks() {
    document.querySelectorAll(".code-snippet code").forEach((codeElement) => {
      // Get the code content
      let content = codeElement.innerHTML;

      // Replace the actual word "keyword" appearing as text
      content = content.replace(/\"keyword\"/g, "");
      content = content.replace(/\'keyword\'/g, "");
      content = content.replace(
        /\<span class\=\"keyword\"\>/g,
        "<span class='keyword'>"
      );
      content = content.replace(/\"string\"/g, "");
      content = content.replace(/\"comment\"/g, "");

      // Clean up any instances of class= without the quotes
      content = content.replace(/class\=keyword/g, "");
      content = content.replace(/class\=string/g, "");
      content = content.replace(/class\=comment/g, "");

      // Apply the cleaned content
      codeElement.innerHTML = content;
    });
  }

  // Apply the fix with a slight delay to ensure DOM is fully loaded
  setTimeout(fixCodeBlocks, 100);
});

document.addEventListener("DOMContentLoaded", function () {
  // Delay slightly to ensure all <code> blocks are rendered before highlighting
  setTimeout(() => {
    cleanupCodeSnippets();
  }, 100);
});
