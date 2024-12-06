// Preloader
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.style.display = "none";
});

// Floating Elements Animation
document.addEventListener("mousemove", (event) => {
    const elements = document.querySelectorAll(".floating");
    elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // Adjust for intensity
        const moveDistance = Math.max(Math.min(maxDistance - distance, 15), 0);
        const angle = Math.atan2(dy, dx);
        element.style.transform = `translate(${moveDistance * Math.cos(angle)}px, ${moveDistance * Math.sin(angle)}px)`;
    });
});

// Create Floating Elements
const createFloatingElements = () => {
    const heroSection = document.querySelector(".hero");
    if (!heroSection) return;

    for (let i = 0; i < 50; i++) {
        const span = document.createElement("span");
        span.classList.add("floating");
        span.textContent = ["Σ", "π", "e", "∫", "Δ"][Math.floor(Math.random() * 5)];
        span.style.position = "absolute";
        span.style.color = "rgba(255, 255, 255, 0.3)";
        span.style.fontSize = `${Math.random() * 20 + 10}px`;
        span.style.top = `${Math.random() * 100}%`;
        span.style.left = `${Math.random() * 100}%`;
        heroSection.appendChild(span);
    }
};
createFloatingElements();

// Smooth Scrolling for Navigation
document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Dynamic Greeting Based on Time
const setDynamicGreeting = () => {
    const heroGreeting = document.querySelector(".hero h1");
    const currentHour = new Date().getHours();
    if (!heroGreeting) return;

    if (currentHour < 12) {
        heroGreeting.textContent = "Good Morning! Welcome to My Portfolio";
    } else if (currentHour < 18) {
        heroGreeting.textContent = "Good Afternoon! Welcome to My Portfolio";
    } else {
        heroGreeting.textContent = "Good Evening! Welcome to My Portfolio";
    }
};
setDynamicGreeting();

// Project Filtering
const filterProjects = () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project");
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            projects.forEach((project) => {
                if (category === "all" || project.dataset.category === category) {
                    project.style.display = "block";
                } else {
                    project.style.display = "none";
                }
            });
        });
    });
};
filterProjects();

// Interactive Project Cards (Hover Effect)
const setInteractiveProjectCards = () => {
    const projectCards = document.querySelectorAll(".project");
    projectCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
            card.style.transition = "transform 0.3s ease";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });
};
setInteractiveProjectCards();

// Form Submission Feedback
const setupContactForm = () => {
    const contactForm = document.querySelector("#contact form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default submission
        alert("Thank you for reaching out! I will get back to you soon.");
        contactForm.reset(); // Reset form fields
    });
};
setupContactForm();

// Blog and Project Management (localStorage)
const displayBlogs = () => {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blogContainer = document.querySelector(".blog-posts");
    if (!blogContainer) return;

    blogContainer.innerHTML = "";
    blogs.forEach((blog) => {
        const blogElement = document.createElement("div");
        blogElement.className = "blog-post";
        blogElement.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
        `;
        blogContainer.appendChild(blogElement);
    });
};

const displayProjects = () => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const projectContainer = document.querySelector(".project-grid");
    if (!projectContainer) return;

    projectContainer.innerHTML = "";
    projects.forEach((project) => {
        const projectElement = document.createElement("div");
        projectElement.className = "project";
        projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        projectContainer.appendChild(projectElement);
    });
};

// Initialize Blogs and Projects on Page Load
document.addEventListener("DOMContentLoaded", () => {
    displayBlogs();
    displayProjects();
});

// Admin Panel Functionality
const setupAdminPanel = () => {
    const adminPassword = "mypassword"; // Replace with your password
    const loginForm = document.getElementById("login-form");
    const logoutBtn = document.getElementById("logout-btn");
    const adminPanel = document.getElementById("admin-panel");
    const adminLogin = document.getElementById("admin-login");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const password = document.getElementById("password").value;
            if (password === adminPassword) {
                alert("Login Successful!");
                adminLogin.style.display = "none";
                adminPanel.style.display = "block";
            } else {
                alert("Incorrect Password!");
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            adminPanel.style.display = "none";
            adminLogin.style.display = "block";
        });
    }
};
setupAdminPanel();

// Add Blog and Project
const setupAdminForms = () => {
    const blogForm = document.getElementById("blog-form");
    const projectForm = document.getElementById("project-form");
    const addBlogBtn = document.getElementById("add-blog-btn");
    const addProjectBtn = document.getElementById("add-project-btn");

    if (addBlogBtn && blogForm) {
        addBlogBtn.addEventListener("click", () => {
            blogForm.style.display = "block";
            projectForm.style.display = "none";
        });

        blogForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
            const title = document.getElementById("blog-title").value;
            const content = document.getElementById("blog-content").value;
            blogs.push({ title, content });
            localStorage.setItem("blogs", JSON.stringify(blogs));
            alert("Blog added!");
            blogForm.reset();
            displayBlogs();
        });
    }

    if (addProjectBtn && projectForm) {
        addProjectBtn.addEventListener("click", () => {
            projectForm.style.display = "block";
            blogForm.style.display = "none";
        });

        projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const projects = JSON.parse(localStorage.getItem("projects")) || [];
            const title = document.getElementById("project-title").value;
            const description = document.getElementById("project-description").value;
            projects.push({ title, description });
            localStorage.setItem("projects", JSON.stringify(projects));
            alert("Project added!");
            projectForm.reset();
            displayProjects();
        });
    }
};
setupAdminForms();
