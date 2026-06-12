// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const icon = mobileMenuBtn.querySelector('i');
  if (mobileMenu.classList.contains('hidden')) {
    icon.setAttribute('data-lucide', 'menu');
  } else {
    icon.setAttribute('data-lucide', 'x');
  }
  lucide.createIcons();
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    icon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('.faq-icon');
    const isHidden = answer.classList.contains('hidden');
    // Close all others
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
    document.querySelectorAll('.faq-icon').forEach(i => {
      i.style.transform = 'rotate(0deg)';
    });
    if (isHidden) {
      answer.classList.remove('hidden');
      icon.style.transform = 'rotate(180deg)';
    }
  });
});

// Scroll Animations (Intersection Observer)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav div.hidden a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('text-brand-600', 'bg-brand-50');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('text-brand-600', 'bg-brand-50');
    }
  });
});