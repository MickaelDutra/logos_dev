// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Activate scrollspy for navigation
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbarNav'
  });

  // Add active class to nav links on scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 100) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBackToTop);
    document.addEventListener('scroll', toggleBackToTop);
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Basic form validation
      let isValid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const company = document.getElementById('company');
      const message = document.getElementById('message');
      
      // Validate name
      if (!name.value.trim()) {
        name.classList.add('is-invalid');
        isValid = false;
      } else {
        name.classList.remove('is-invalid');
        name.classList.add('is-valid');
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
      } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
      }
      
      // Validate company
      if (!company.value.trim()) {
        company.classList.add('is-invalid');
        isValid = false;
      } else {
        company.classList.remove('is-invalid');
        company.classList.add('is-valid');
      }
      
      // Validate message
      if (!message.value.trim()) {
        message.classList.add('is-invalid');
        isValid = false;
      } else {
        message.classList.remove('is-invalid');
        message.classList.add('is-valid');
      }
      
      // If form is valid, show success message
      if (isValid) {
        // Hide loading indicator
        contactForm.querySelector('.loading').style.display = 'none';
        
        // Show success message
        contactForm.querySelector('.sent-message').style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
          contactForm.reset();
          document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
          contactForm.querySelector('.sent-message').style.display = 'none';
        }, 3000);
      }
    });
  }

  // Portfolio item hover effect
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.querySelector('.portfolio-info').style.opacity = '1';
    });
    item.addEventListener('mouseleave', () => {
      item.querySelector('.portfolio-info').style.opacity = '0';
    });
  });

  // Navbar change on scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });
  }

  // Counter animation for About section stats
  const counterElements = document.querySelectorAll('.purecounter');
  
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-purecounter-end'));
    const duration = parseInt(el.getAttribute('data-purecounter-duration')) * 1000;
    let start = 0;
    const increment = target / 100;
    const stepTime = Math.abs(Math.floor(duration / 100));
    
    const timer = setInterval(() => {
      start += increment;
      el.innerText = Math.floor(start);
      if (start >= target) {
        el.innerText = target;
        clearInterval(timer);
      }
    }, stepTime);
  }
  
  // Intersection Observer for counter animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counterElements.forEach(counter => {
    observer.observe(counter);
  });
});