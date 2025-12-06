
/**
 * Professional Mobile Drawer
 * - Dynamically builds a premium mobile menu
 * - Clones desktop links to preserve translations
 * - Adds branded header and social footer
 */
(function () {
  'use strict';
  const qs = (s, ctx = document) => ctx.querySelector(s);
  const qsa = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(() => {
    const toggle = qs('.burger input') || qs('#burger'); // Handle both label/input structures
    if (!toggle) return;

    // Overlay
    let overlay = qs('#navOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'navOverlay';
      document.body.appendChild(overlay);
    }

    // Drawer Construction
    let drawer = qs('#mobileDrawer');
    let controls; // will host theme + language
    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.id = 'mobileDrawer';
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-modal', 'true');
      drawer.setAttribute('aria-label', 'Mobile navigation');

      // 1. Header (Brand + Close)
      const header = document.createElement('div');
      header.className = 'drawer-header';
      header.innerHTML = `
        <div class="drawer-brand">
          <span class="brand-avatar" aria-hidden="true">MR</span>
          <span class="brand-name">Mohamed Riadh</span>
        </div>
        <button class="drawer-close" aria-label="Close menu">
          <i class="fas fa-times"></i>
        </button>
      `;

      // 2. Content (Controls + Nav Links)
      const content = document.createElement('div');
      content.className = 'drawer-content';

      controls = document.createElement('div');
      controls.className = 'drawer-controls';

      const divider = document.createElement('div');
      divider.className = 'drawer-divider';

      const nav = document.createElement('nav');
      nav.className = 'drawer-nav';

      content.appendChild(controls);
      content.appendChild(divider);
      content.appendChild(nav);

      // 3. Footer (Social + CTA)
      const footer = document.createElement('div');
      footer.className = 'drawer-footer';
      footer.innerHTML = `
        <div class="drawer-social">
          <a href="https://dz.linkedin.com/in/cherait-mohamed-riadh-2585b5378" target="_blank"><i class="fab fa-linkedin-in"></i></a>
          <a href="https://github.com/Riadh-2005" target="_blank"><i class="fab fa-github"></i></a>
          <a href="mailto:mohamedriadhch@gmail.com"><i class="fas fa-envelope"></i></a>
        </div>
        <a href="#contact" class="drawer-cta nav-link-cta">
          Let's Talk
        </a>
      `;

      drawer.appendChild(header);
      drawer.appendChild(content);
      drawer.appendChild(footer);
      document.body.appendChild(drawer);
    } else {
      controls = qs('.drawer-controls', drawer);
    }

    const navContainer = qs('.drawer-nav', drawer);

    // Move theme toggle and language selector into drawer controls on open, and restore on close
    function moveControlsIntoDrawer() {
      if (!controls) return;
      controls.innerHTML = '';

      const theme = qs('label.theme');
      const lang = qs('#languageSelector');

      if (theme) {
        if (!theme.__placeholder) {
          theme.__placeholder = document.createElement('span');
          theme.__placeholder.style.display = 'none';
          theme.parentElement?.insertBefore(theme.__placeholder, theme);
        }
        controls.appendChild(theme);
        theme.style.margin = '0';
      }

      if (lang) {
        if (!lang.__placeholder) {
          lang.__placeholder = document.createElement('span');
          lang.__placeholder.style.display = 'none';
          lang.parentElement?.insertBefore(lang.__placeholder, lang);
        }
        controls.appendChild(lang);
        lang.style.margin = '0 0 0 auto';
        // Ensure dropdown is closed when moving
        const dd = qs('#languageDropdown');
        dd && dd.classList.remove('active');
      }
    }

    function restoreControlsToNavbar() {
      const theme = qs('label.theme');
      const lang = qs('#languageSelector');

      if (theme && theme.__placeholder && theme.__placeholder.parentElement) {
        theme.__placeholder.parentElement.insertBefore(theme, theme.__placeholder);
        theme.__placeholder.remove();
        theme.__placeholder = null;
      }
      if (lang && lang.__placeholder && lang.__placeholder.parentElement) {
        lang.__placeholder.parentElement.insertBefore(lang, lang.__placeholder);
        lang.__placeholder.remove();
        lang.__placeholder = null;
      }
    }

    function attachRippleHandlers(root) {
      qsa('.nav-link', root).forEach(link => {
        link.addEventListener('pointerdown', (e) => {
          const rect = link.getBoundingClientRect();
          link.style.setProperty('--x', `${e.clientX - rect.left}px`);
          link.style.setProperty('--y', `${e.clientY - rect.top}px`);
        }, { passive: true });
      });
    }

    function syncLinks() {
      navContainer.innerHTML = '';
      // Prefer header links to ensure we get the latest state/translations
      const desktopLinks = qsa('.nav-menu .nav-link', document); // specific selector

      if (desktopLinks.length) {
        desktopLinks.forEach(a => {
          const clone = a.cloneNode(true);
          // Fix for "Active" state visualization
          if (a.classList.contains('active')) {
            clone.classList.add('active');
          }
          navContainer.appendChild(clone);
        });
      } else {
        // Fallback
        const links = [
          { text: 'Home', href: '#home', icon: 'fa-home' },
          { text: 'About', href: '#about', icon: 'fa-user' },
          { text: 'Expertise', href: '#expertise', icon: 'fa-brain' },
          { text: 'Projects', href: '#projects', icon: 'fa-briefcase' },
          { text: 'Contact', href: '#contact', icon: 'fa-envelope' }
        ];
        links.forEach(l => {
          const a = document.createElement('a');
          a.className = 'nav-link';
          a.href = l.href;
          a.innerHTML = `<i class="fas ${l.icon}"></i> <span>${l.text}</span>`;
          navContainer.appendChild(a);
        });
      }

      // Ripple feedback
      attachRippleHandlers(drawer);

      // Also bind click events to new links to close drawer
      qsa('.nav-link, .nav-link-cta', drawer).forEach(link => {
        link.addEventListener('click', () => {
          // mild delay to allow ripple/active state to be seen
          setTimeout(close, 150);
        });
      });
    }

    function open() {
      moveControlsIntoDrawer();
      syncLinks();
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.classList.add('no-scroll');
      if (toggle.type === 'checkbox') toggle.checked = true;
      // Focus close button for accessibility
      const closeBtn = qs('.drawer-close', drawer);
      closeBtn && closeBtn.focus({ preventScroll: true });
    }

    function close() {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.classList.remove('no-scroll');
      if (toggle.type === 'checkbox') toggle.checked = false;
      restoreControlsToNavbar();
    }

    // Toggle Event
    toggle.addEventListener('change', (e) => {
      if (e.target.tagName === 'INPUT') {
        e.target.checked ? open() : close();
      }
    });

    // Overlay closes drawer
    overlay.addEventListener('click', close);

    // Close button inside drawer
    const closeBtn = qs('.drawer-close', drawer);
    if (closeBtn) closeBtn.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Swipe left to close
    let startX = null;
    drawer.addEventListener('touchstart', (e) => { startX = e.changedTouches[0].clientX; }, { passive: true });
    drawer.addEventListener('touchend', (e) => {
      if (startX == null) return;
      const dx = e.changedTouches[0].clientX - startX;
      // Close only if swiping left on the drawer, and it wasn't a small scroll
      if (startX > window.innerWidth - 50 || drawer.classList.contains('open')) {
        // If swiping right-to-left significantly
        if (dx < -50) close();
      }
      startX = null;
    }, { passive: true });

    // Close on desktop resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && drawer.classList.contains('open')) close();
    });
  });
})();
