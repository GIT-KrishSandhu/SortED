// Product Details JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Product data
  const productData = {
    lms: {
      title: "AI-Powered Learning Management System",
      description:
        "Transform your school's academic experience with our comprehensive Learning Management System. Designed specifically for modern educational institutions, our LMS combines cutting-edge AI technology with intuitive design to create personalized learning experiences for every student.",
      features: [
        "AI-generated personalized study plans based on student performance and learning pace",
        "Instant doubt-solving system powered by advanced GPT technology",
        "Gamified quizzes and interactive assessments to boost student engagement",
        "Real-time student progress tracking with detailed analytics and insights",
        "Academic reels - short-form educational content for visual learners",
        "Comprehensive parent dashboard with live updates and notifications",
        "Digital assignment management with automated grading capabilities",
        "Smart attendance tracking with biometric integration support",
      ],
      details: [
        "Our Learning Management System revolutionizes the traditional classroom experience by leveraging artificial intelligence to create truly personalized learning paths. Each student receives customized study plans that adapt to their learning style, pace, and academic performance.",
        "The platform includes advanced analytics that help teachers identify at-risk students early, enabling timely interventions. With features like predictive GPA modeling and retention tracking, schools can make data-driven decisions to improve student outcomes.",
        "Parents stay connected through our comprehensive dashboard that provides real-time updates on their child's academic progress, attendance, and behavioral insights. The system also includes AI-powered career guidance tools to help students make informed decisions about their future.",
      ],
      heroImage: "assets/img/product-lms.jpg",
    },
    hrms: {
      title: "Smart Human Resource Management System",
      description:
        "Streamline your school's faculty management with our intelligent HRMS solution. From recruitment to retirement, manage every aspect of your human resources with AI-powered insights and automated workflows that save time and improve efficiency.",
      features: [
        "AI-powered faculty performance evaluation with objective metrics and insights",
        "Automated payroll processing with PF, ESI, and TDS compliance",
        "Smart attendance tracking with biometric integration and API synchronization",
        "Comprehensive leave management system with approval workflows",
        "Burnout and workload prediction using advanced analytics",
        "Digital document management with automated compliance reporting",
        "Recruitment and onboarding automation with candidate tracking",
        "Professional development tracking and certification management",
      ],
      details: [
        "Our HRMS solution transforms how schools manage their most valuable asset - their faculty. With AI-driven insights, administrators can make informed decisions about staff allocation, performance improvement, and professional development opportunities.",
        "The system provides predictive analytics to identify potential burnout risks and workload imbalances, enabling proactive management of faculty wellbeing. Automated compliance reporting ensures your school meets all regulatory requirements without manual effort.",
        "Integration capabilities allow seamless connection with existing school systems, while the intuitive dashboard provides real-time visibility into all HR metrics. From syllabus coverage tracking to class performance analysis, every aspect of faculty management is optimized.",
      ],
      heroImage: "assets/img/product-hrms.jpg",
    },
    sortedday: {
      title: "SortED Day - Community & Events Platform",
      description:
        "Foster student engagement and talent development through our innovative events and community platform. SortED Day creates opportunities for students to explore their passions, compete with peers, and develop skills beyond academics.",
      features: [
        "AI-powered student matching to ideal communities based on interests and skills",
        "Comprehensive event management for sports, arts, academics, and innovation",
        "Digital leaderboards and achievement tracking with real-time updates",
        "Inter and intra-school competition organization and management",
        "Expert mentorship sessions with industry professionals and alumni",
        "Digital badges and certification system for skill recognition",
        "Live community feeds with event schedules and participant discussions",
        "Parent and alumni involvement tools for mentoring and sponsorship",
      ],
      details: [
        "SortED Day revolutionizes extracurricular activities by creating structured communities where students can explore their talents and interests. Our AI-powered matching system ensures every student finds their ideal community, whether it's sports, arts, debate, coding, or innovation.",
        "Monthly school-wide events foster healthy competition and collaboration among students. From hackathons to cultural festivals, debate competitions to sports tournaments, every event is designed to develop both skills and character.",
        "The platform provides detailed analytics on student participation and skill development, helping schools understand the impact of extracurricular activities on overall student growth. Recognition systems and digital portfolios help students showcase their achievements for future opportunities.",
      ],
      heroImage: "assets/img/product-sd.jpg",
    },
  }

  // Initialize product details section
  function initProductDetails() {
    const productSection = document.getElementById("product-details")
    if (!productSection) return

    // Create product details HTML
    productSection.innerHTML = `
      <div class="container">
        <div class="product-container">
          <!-- Sidebar -->
          <div class="product-sidebar" data-aos="fade-right">
            <div class="sidebar-section">
              <h3 class="sidebar-title">Our Products</h3>
              <div class="product-nav">
                <button class="product-nav-btn active" data-product="lms">
                  <i class="bi bi-book"></i>
                  LMS - Student Management
                </button>
                <button class="product-nav-btn" data-product="hrms">
                  <i class="bi bi-people"></i>
                  HRMS - Faculty Efficiency
                </button>
                <button class="product-nav-btn" data-product="sortedday">
                  <i class="bi bi-calendar-event"></i>
                  SortED Day
                </button>
              </div>
            </div>

            <div class="sidebar-section">
              <h3 class="sidebar-title">Download Catalogs</h3>
              <div class="download-links">
                <a href="#" class="download-link" onclick="downloadCatalog('pdf')">
                  <i class="bi bi-file-earmark-pdf"></i>
                  Catalog PDF
                </a>
                <a href="#" class="download-link" onclick="downloadCatalog('doc')">
                  <i class="bi bi-file-earmark-word"></i>
                  Catalog DOC
                </a>
              </div>
            </div>

            <div class="contact-box">
              <i class="bi bi-headset contact-box-icon"></i>
              <h4>Have a Question?</h4>
              <div class="contact-info">
                <a href="tel:+919876543210">
                  <i class="bi bi-telephone"></i>
                  +91 987 654 3210
                </a>
                <a href="mailto:hello@sortededtech.com">
                  <i class="bi bi-envelope"></i>
                  hello@sortededtech.com
                </a>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="product-main">
            ${generateProductContent("lms", true)}
            ${generateProductContent("hrms", false)}
            ${generateProductContent("sortedday", false)}
          </div>
        </div>
      </div>
    `

    // Setup event listeners
    setupProductNavigation()
  }

  // Generate product content HTML
  function generateProductContent(productKey, isActive) {
    const product = productData[productKey]
    return `
      <div class="product-content ${isActive ? "active" : ""}" id="${productKey}-content" data-aos="fade-left">
        <img src="${product.heroImage}" alt="${product.title}" class="product-hero">
        <div class="product-info">
          <h2 class="product-title">${product.title}</h2>
          <p class="product-description">${product.description}</p>
          
          <ul class="product-features">
            ${product.features
              .map(
                (feature) => `
              <li><i class="bi bi-check-circle"></i> ${feature}</li>
            `,
              )
              .join("")}
          </ul>
          
          ${product.details
            .map(
              (detail) => `
            <p class="product-details-text">${detail}</p>
          `,
            )
            .join("")}
        </div>
      </div>
    `
  }

  // Setup product navigation
  function setupProductNavigation() {
    const navButtons = document.querySelectorAll(".product-nav-btn")
    const contentSections = document.querySelectorAll(".product-content")

    navButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetProduct = button.dataset.product

        // Remove active class from all buttons and content
        navButtons.forEach((btn) => btn.classList.remove("active"))
        contentSections.forEach((content) => content.classList.remove("active"))

        // Add active class to clicked button and corresponding content
        button.classList.add("active")

        // Add smooth transition delay
        setTimeout(() => {
          document.getElementById(`${targetProduct}-content`).classList.add("active")

          // Trigger AOS animation refresh
          if (typeof AOS !== "undefined" && typeof AOS.refresh === "function") {
            AOS.refresh()
          }
        }, 150)

        // Add click animation
        button.style.transform = "scale(0.95)"
        setTimeout(() => {
          button.style.transform = ""
        }, 150)
      })
    })
  }

  // Download catalog functionality
  window.downloadCatalog = (type) => {
    // Simulate download (replace with actual download logic)
    const activeProduct = document.querySelector(".product-nav-btn.active").dataset.product
    const productName = productData[activeProduct].title

    // Create a temporary link for download simulation
    const link = document.createElement("a")
    link.href = "#"
    link.download = `${productName.replace(/\s+/g, "_")}_Catalog.${type}`

    // Show download notification
    showNotification(`Downloading ${productName} catalog (${type.toUpperCase()})...`)

    // In a real implementation, you would set the actual file URL
    // link.href = `path/to/catalogs/${activeProduct}_catalog.${type}`
    // link.click()
  }

  // Show notification function
  function showNotification(message) {
    // Create notification element
    const notification = document.createElement("div")
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--accent-color);
      color: var(--contrast-color);
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      font-family: var(--default-font);
      font-size: 14px;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `
    notification.textContent = message

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Initialize when DOM is loaded
  initProductDetails()
})
