// Pricing Section JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Pricing data
  const pricingData = {
    lms: {
      title: "Learning Management System",
      subtitle: "AI-powered learning solutions for students",
      plans: [
        {
          name: "Basic",
          price: 500,
          period: "per student/year",
          features: [
            "Digital Assignment Management",
            "Basic Attendance Tracking",
            "Parent Dashboard Access",
            "Student Progress Reports",
            "Community Registration",
            "Email Support",
          ],
          unavailable: ["AI-Generated Study Plans", "Advanced Analytics", "SortED Day Events"],
          buttonText: "Get Started",
          featured: false,
        },
        {
          name: "Pro",
          price: 1000,
          period: "per student/year",
          features: [
            "All Basic Features",
            "AI-Generated Study Plans",
            "Smart Quizzes & Gamification",
            "Advanced Progress Analytics",
            "Instant Doubt Solving",
            "Academic Reels Content",
            "Retention Tracking",
            "Priority Support",
          ],
          unavailable: ["SortED Day Events", "Custom Integrations"],
          buttonText: "Choose Pro",
          featured: true,
        },
        {
          name: "Premium",
          price: 1500,
          period: "per student/year",
          features: [
            "All Pro Features",
            "SortED Day Events Access",
            "AI-Based Career Guidance",
            "Predictive GPA Modeling",
            "Custom Learning Paths",
            "Advanced Parent Analytics",
            "Integration Support",
            "24/7 Premium Support",
            "Custom Branding",
          ],
          unavailable: [],
          buttonText: "Go Premium",
          featured: false,
        },
      ],
    },
    hrms: {
      title: "Human Resource Management System",
      subtitle: "Streamline faculty management with AI insights",
      plans: [
        {
          name: "Basic",
          price: 500,
          period: "per faculty/year",
          features: [
            "Digital Faculty Records",
            "Basic Attendance Logging",
            "Leave Management",
            "Payroll Automation",
            "Document Storage",
            "Email Support",
          ],
          unavailable: ["AI Faculty Evaluation", "Biometric Integration", "Advanced Analytics"],
          buttonText: "Get Started",
          featured: false,
        },
        {
          name: "Pro",
          price: 1000,
          period: "per faculty/year",
          features: [
            "All Basic Features",
            "Biometric/API Attendance Sync",
            "PF/ESI/TDS Compliance",
            "Document Automation",
            "Performance Tracking",
            "Workload Analytics",
            "Recruitment Tools",
            "Priority Support",
          ],
          unavailable: ["AI Burnout Prediction", "Advanced Reporting"],
          buttonText: "Choose Pro",
          featured: true,
        },
        {
          name: "Premium",
          price: 1500,
          period: "per faculty/year",
          features: [
            "All Pro Features",
            "AI-Powered Faculty Evaluation",
            "Burnout & Workload Forecasts",
            "Syllabus Coverage Tracking",
            "Class Performance Reports",
            "Professional Development Tracking",
            "Custom Integrations",
            "24/7 Premium Support",
            "Advanced Analytics Dashboard",
          ],
          unavailable: [],
          buttonText: "Go Premium",
          featured: false,
        },
      ],
    },
  }

  // Initialize pricing section
  function initPricing() {
    const pricingSection = document.getElementById("price")
    if (!pricingSection) return

    // Create pricing HTML
    pricingSection.innerHTML = `
            <div class="container section-title" data-aos="fade-up">
                <span>Pricing</span>
                <h2>Pricing</h2>
                <p>Flexible pricing options designed for schools of all sizes</p>
            </div>

            <div class="container">
                <div class="pricing-tabs">
                    <button class="pricing-tab active" data-tab="lms">
                        <i class="bi bi-book"></i> LMS
                    </button>
                    <button class="pricing-tab" data-tab="hrms">
                        <i class="bi bi-people"></i> HRMS
                    </button>
                </div>

                <div class="pricing-content active" id="lms-content">
                    <div class="text-center mb-4">
                        <h3>${pricingData.lms.title}</h3>
                        <p class="text-muted">${pricingData.lms.subtitle}</p>
                    </div>
                    <div class="pricing-cards" id="lms-cards">
                        ${generatePricingCards(pricingData.lms.plans)}
                    </div>
                </div>

                <div class="pricing-content" id="hrms-content">
                    <div class="text-center mb-4">
                        <h3>${pricingData.hrms.title}</h3>
                        <p class="text-muted">${pricingData.hrms.subtitle}</p>
                    </div>
                    <div class="pricing-cards" id="hrms-cards">
                        ${generatePricingCards(pricingData.hrms.plans)}
                    </div>
                </div>

                <div class="pricing-note">
                    <i class="bi bi-info-circle"></i>
                    <strong>Note:</strong> All plans include free setup, training support, and customization options. 
                    Contact us for enterprise solutions and volume discounts.
                </div>
            </div>
        `

    // Add event listeners
    setupTabSwitching()
    setupPricingButtons()
  }

  // Generate pricing cards HTML
  function generatePricingCards(plans) {
    return plans
      .map(
        (plan) => `
            <div class="pricing-card ${plan.featured ? "featured" : ""}" data-aos="fade-up">
                <div class="plan-name">${plan.name}</div>
                <div class="plan-price">
                    <span class="currency">₹</span>${plan.price.toLocaleString()}
                </div>
                <div class="plan-period">${plan.period}</div>
                <ul class="plan-features">
                    ${plan.features
                      .map(
                        (feature) => `
                        <li><i class="bi bi-check-circle"></i> ${feature}</li>
                    `,
                      )
                      .join("")}
                    ${plan.unavailable
                      .map(
                        (feature) => `
                        <li class="unavailable"><i class="bi bi-x-circle"></i> ${feature}</li>
                    `,
                      )
                      .join("")}
                </ul>
                <button class="plan-button" data-plan="${plan.name.toLowerCase()}">
                    ${plan.buttonText}
                </button>
            </div>
        `,
      )
      .join("")
  }

  // Setup tab switching functionality
  function setupTabSwitching() {
    const tabs = document.querySelectorAll(".pricing-tab")
    const contents = document.querySelectorAll(".pricing-content")

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetTab = tab.dataset.tab

        // Remove active class from all tabs and contents
        tabs.forEach((t) => t.classList.remove("active"))
        contents.forEach((c) => c.classList.remove("active"))

        // Add active class to clicked tab and corresponding content
        tab.classList.add("active")
        document.getElementById(`${targetTab}-content`).classList.add("active")

        // Trigger AOS animation for new content
        if (typeof AOS !== "undefined") {
          if (typeof AOS.refresh === "function") {
            AOS.refresh()
          }
        }
      })
    })
  }

  // Setup pricing button functionality
  function setupPricingButtons() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("plan-button")) {
        const plan = e.target.dataset.plan
        const activeTab = document.querySelector(".pricing-tab.active").dataset.tab

        // Add ripple effect
        createRippleEffect(e.target, e)

        // Simulate plan selection (you can replace this with actual functionality)
        setTimeout(() => {
          alert(`You selected the ${plan} plan for ${activeTab.toUpperCase()}! Redirecting to contact form...`)
          // You can redirect to contact form or open a modal here
          document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
        }, 300)
      }
    })
  }

  // Create ripple effect for buttons
  function createRippleEffect(button, event) {
    const ripple = document.createElement("span")
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `

    // Add ripple animation CSS if not exists
    if (!document.getElementById("ripple-style")) {
      const style = document.createElement("style")
      style.id = "ripple-style"
      style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `
      document.head.appendChild(style)
    }

    button.style.position = "relative"
    button.style.overflow = "hidden"
    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  // Initialize when DOM is loaded
  initPricing()
})
