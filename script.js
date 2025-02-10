document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle with animation
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');

  menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
      setTimeout(() => {
        navLinks.style.opacity = '1';
        navLinks.style.transform = 'translateY(0)';
      }, 10);
    } else {
      navLinks.style.opacity = '0';
      navLinks.style.transform = 'translateY(-10px)';
    }
  });

  // Enhanced parallax effect for phone mockup
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const phoneElement = document.querySelector('.phone-mockup');
    const currentScroll = window.pageYOffset;
    const scrollDirection = currentScroll > lastScroll ? 'down' : 'up';
    
    const rotation = (currentScroll - lastScroll) * 0.05;
    phoneElement.style.transform = `
      translateY(${currentScroll * 0.1}px)
      rotate(${scrollDirection === 'down' ? rotation : -rotation}deg)
    `;
    
    lastScroll = currentScroll;
  });

  // Improved Intersection Observer for staggered animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, index * 100);
      }
    });
  }, observerOptions);

  // Observe features with enhanced animation
  document.querySelectorAll('.feature').forEach(feature => {
    observer.observe(feature);
  });

  // Add floating animation to specific elements
  document.querySelectorAll('.cta-button, .app-store, .play-store').forEach(element => {
    element.classList.add('floating');
  });

  // Enhanced mobile responsiveness
  const handleResize = () => {
    if (window.innerWidth > 768) {
      navLinks.style.display = 'flex';
      navLinks.style.opacity = '1';
      navLinks.style.transform = 'translateY(0)';
    } else {
      navLinks.style.display = 'none';
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize();

  // Enhanced Mobile Navigation
  const setupMobileNav = () => {
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        mobileNav.style.transform = 'translateY(100%)';
      } else {
        mobileNav.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop;
    });

    mobileNavItems.forEach(item => {
      item.addEventListener('click', (e) => {
        mobileNavItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        item.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
      });
    });
  };

  // Professional loading animation
  const showLoadingAnimation = () => {
    const loading = document.createElement('div');
    loading.classList.add('loading-animation');
    loading.innerHTML = `
      <div class="loading-logo">
        <h1>Logysma</h1>
      </div>
    `;
    document.body.appendChild(loading);
  };

  // Initialize enhanced features
  setupMobileNav();
  showLoadingAnimation();

  // Smooth scroll enhancement
  const smoothScroll = (target, duration) => {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - 60;
    let startTime = null;

    const animation = currentTime => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  // Enhanced scroll handling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      smoothScroll(target, 1000);
    });
  });
});