/**
 * Dr. Badri Prasad Dash - Academic Portfolio Scripts
 * Specialization: International Geopolitics
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Set Current Year in Footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Dark / Light Theme Toggle with LocalStorage
  const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      updateThemeIcon(targetTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
      } else {
        icon.className = 'fa-solid fa-moon';
      }
    }
  }

  // 3. Mobile Navigation Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('open')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close menu when clicking any nav link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 4. Scroll-to-Top Button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. ScrollSpy - Active Navbar Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-link');

  function scrollSpy() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', scrollSpy);

  // 6. Publications Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const pubCards = document.querySelectorAll('.pub-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active tab state
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      pubCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// 7. Contact Form Handling
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const feedback = document.getElementById('formFeedback');

  const name = form.name.value;
  const email = form.email.value;
  const affiliation = form.affiliation.value;
  const subject = form.subject.value;
  const message = form.message.value;

  if (feedback) {
    feedback.className = 'form-feedback success';
    feedback.innerHTML = `
      <strong>Thank you, ${escapeHtml(name)}!</strong><br>
      Your inquiry regarding "<em>${escapeHtml(subject)}</em>" has been noted.<br>
      A direct email prompt will also open to deliver your message to Dr. Badri Prasad Dash.
    `;
    feedback.style.display = 'block';
  }

  // Pre-fill mailto URL for immediate sending
  const mailtoBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0AAffiliation: ${affiliation}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
  const mailtoUrl = `mailto:contact@badriprasaddash.ac.in?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 1200);

  form.reset();
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
}
