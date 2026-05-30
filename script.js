/*
========================================================================
   SCRIPT.JS - Modern AI Engineer & Software Developer Portfolio
   Brand: learnwithjoyshill
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. PRELOADER
  // ==========================================
  const preloader = document.querySelector('.preloader');
  
  window.addEventListener('load', () => {
    // Small timeout to ensure visual transition looks smooth
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('fade-out');
      }
    }, 1200);
  });
  
  // Fallback: hide preloader if load event takes too long
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
    }
  }, 4000);

  // ==========================================
  // 2. CUSTOM CURSOR
  // ==========================================
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // The dot moves instantly
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth lerp (interpolation) for the outer glow cursor
    const animateCursor = () => {
      const lerpFactor = 0.15;
      cursorX += (mouseX - cursorX) * lerpFactor;
      cursorY += (mouseY - cursorY) * lerpFactor;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
    
    // Hover States on interactive links & buttons
    const interactiveElements = document.querySelectorAll('a, button, .interactive-card, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });
  }

  // ==========================================
  // 3. CANVAS PARTICLE SYSTEM (Constellation)
  // ==========================================
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    
    let mouse = { x: null, y: null, radius: 120 };
    
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
    
    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initParticles();
    });
    
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 1;
        // Direction speeds
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.5 + 0.3;
      }
      
      draw() {
        ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      
      update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
        
        // Mouse interact (push away)
        if (mouse.x !== null && mouse.y !== null) {
          let dx = this.x - mouse.x;
          let dy = this.y - mouse.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const dirX = dx / distance;
            const dirY = dy / distance;
            this.x += dirX * force * 1.5;
            this.y += dirY * force * 1.5;
          }
        }
      }
    }
    
    function initParticles() {
      particles = [];
      // Adjust density based on screen width
      let numberOfParticles = Math.floor((width * height) / 14000);
      if (numberOfParticles > 120) numberOfParticles = 120;
      
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * width;
        let y = Math.random() * height;
        particles.push(new Particle(x, y));
      }
    }
    
    function connectParticles() {
      const maxDistance = 110;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            let opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(115, 3, 192, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();
      animationId = requestAnimationFrame(animate);
    }
    
    // Performance optimization: only run when tab is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!animationId) {
            initParticles();
            animate();
          }
        } else {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(document.querySelector('.hero'));
  }

  // ==========================================
  // 4. TYPING ANIMATION (Hero)
  // ==========================================
  const typedTextSpan = document.querySelector('.hero-typing .typed-text');
  const roles = ["Aspiring AI Engineer", "Python Developer", "Future Data Scientist", "Problem Solver"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newRoleDelay = 2000; // Delay between roles
  let roleIndex = 0;
  let charIndex = 0;
  
  if (typedTextSpan) {
    function type() {
      if (charIndex < roles[roleIndex].length) {
        typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        setTimeout(erase, newRoleDelay);
      }
    }
    
    function erase() {
      if (charIndex > 0) {
        typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, typingDelay + 300);
      }
    }
    
    // Start typing after loader vanishes
    setTimeout(type, 1800);
  }

  // ==========================================
  // 5. SCROLL PROGRESS BAR & BACK TO TOP BUTTON
  // ==========================================
  const progressFill = document.querySelector('.scroll-progress-bar');
  const backToTopBtn = document.querySelector('.back-to-top');
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    // Calculate total document height and current scroll location
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    // Update scroll progress bar
    if (progressFill) {
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      progressFill.style.width = scrollPercentage + '%';
    }
    
    // Toggle header appearance
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Toggle back to top button visibility
    if (backToTopBtn) {
      if (scrollTop > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });
  
  // Smooth scroll to top when clicked
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 6. SCROLL REVEAL ANIMATION (IntersectionObserver)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Custom check to animate skill meters when card reveals
        if (entry.target.classList.contains('skill-card')) {
          const fill = entry.target.querySelector('.skill-meter-fill');
          if (fill) {
            const targetVal = fill.getAttribute('data-value');
            fill.style.width = targetVal + '%';
          }
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 7. ACTIVE NAVIGATION HIGHLIGHTS
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  const sectionObserverOptions = {
    threshold: 0.4,
    rootMargin: '-80px 0px 0px 0px'
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeSectionId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeSectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, sectionObserverOptions);
  
  sections.forEach(sec => sectionObserver.observe(sec));

  // ==========================================
  // 8. MOBILE NAV NAVIGATION DROPDOWN
  // ==========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
    
    // Close nav dropdown when link clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 9. MAGNETIC BUTTONS & ICONS (Desktop Only)
  // ==========================================
  const magneticItems = document.querySelectorAll('.btn, .social-icon, .back-to-top');
  
  if (window.matchMedia('(pointer: fine)').matches) {
    magneticItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const boundBox = item.getBoundingClientRect();
        // Calc distance from cursor relative to button center
        const itemCenterX = boundBox.left + boundBox.width / 2;
        const itemCenterY = boundBox.top + boundBox.height / 2;
        const xOffset = (e.clientX - itemCenterX) * 0.35;
        const yOffset = (e.clientY - itemCenterY) * 0.35;
        
        item.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        // Slightly rotate button
        if (item.classList.contains('btn')) {
          item.style.transform += ` scale(1.02)`;
        }
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });
    });
  }

  // ==========================================
  // 10. ANIMATED STATISTICS COUNTER
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateStats = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    let current = 0;
    const duration = 2000; // 2 seconds
    const intervalTime = 30; // 30ms interval
    const stepCount = duration / intervalTime;
    const increment = Math.ceil(target / stepCount);
    
    const counterInterval = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(counterInterval);
        element.textContent = target + suffix;
      } else {
        element.textContent = current + suffix;
      }
    }, intervalTime);
  };
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numEl = entry.target;
        if (!numEl.classList.contains('started')) {
          numEl.classList.add('started');
          animateStats(numEl);
        }
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(num => statsObserver.observe(num));

  // ==========================================
  // 11. CONTACT COPY-EMAIL FUNCTIONALITY
  // ==========================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast-notification');
  const emailValue = 'learnwithjoyshill@gmail.com';
  
  if (copyEmailBtn && toast) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Use clipboard API
      navigator.clipboard.writeText(emailValue).then(() => {
        // Show Toast Notification
        toast.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    });
  }

  // ==========================================
  // 12. CONTACT FORM SUBMISSION HANDLER
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  
  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple client-side checks
      const nameVal = document.getElementById('form-name').value.trim();
      const emailVal = document.getElementById('form-email').value.trim();
      const msgVal = document.getElementById('form-message').value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      if (!nameVal || !emailVal || !msgVal) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please fill out all fields before submitting.';
        return;
      }
      
      // Simple email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please enter a valid email address.';
        return;
      }
      
      // Simulation of submission loading state
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'TRANSMITTING SECURELY...';
      
      setTimeout(() => {
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = 'Message sent! Joy will review and get back to you shortly.';
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        contactForm.reset();
        
        // Reset floating labels manually
        const labels = contactForm.querySelectorAll('.form-label');
        labels.forEach(lbl => {
          lbl.style.top = '';
          lbl.style.fontSize = '';
        });
      }, 1500);
    });
  }
});
