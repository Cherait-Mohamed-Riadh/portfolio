// Professional Sites Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1500);
    }
    
    // Sticky Navigation Scroll Behavior
    const nav = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let scrollThreshold = 100; // Minimum scroll distance before hiding
    
    function handleNavScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = scrollTop - lastScrollTop;
        
        // Only hide/show if we've scrolled enough
        if (Math.abs(scrollDelta) > scrollThreshold) {
            if (scrollDelta > 0 && scrollTop > 200) {
                // Scrolling down - hide navigation
                nav.classList.add('nav-hidden');
                nav.classList.remove('nav-visible');
            } else {
                // Scrolling up - show navigation
                nav.classList.remove('nav-hidden');
                nav.classList.add('nav-visible');
            }
            lastScrollTop = scrollTop;
        }
        
        // Always show navigation when at the top
        if (scrollTop < 100) {
            nav.classList.remove('nav-hidden');
            nav.classList.add('nav-visible');
        }
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleNavScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initialize navigation as visible
    nav.classList.add('nav-visible');
    
    // Initialize professional animations and interactions
    const siteCards = document.querySelectorAll('.site-card');
    
    // Professional loading animation
    function showLoadingState(element) {
        element.classList.add('loading');
        setTimeout(() => {
            element.classList.remove('loading');
        }, 2000);
    }
    
    // Intersection Observer for site cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe site cards
    siteCards.forEach(card => observer.observe(card));
    
    // Site card hover effects
    siteCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== VIDEO LIGHTBOX FUNCTIONALITY =====
    // Get all project videos and images for lightbox effect
    const projectElements = document.querySelectorAll('.project-img');
    
    // Video lightbox elements
    const videoLightbox = document.getElementById('video-lightbox');
    const videoLightboxVideo = document.getElementById('video-lightbox-video');
    const videoCloseBtn = document.querySelector('.video-close');
    
    // Function to open video lightbox
    function openVideoLightbox(videoSrc) {
        console.log('Opening video lightbox with source:', videoSrc);
        
        if (!videoLightbox || !videoLightboxVideo) {
            console.error('Video lightbox elements not found!');
            return;
        }
        
        // Show loading state
        const videoLoading = document.getElementById('video-loading');
        if (videoLoading) {
            videoLoading.style.display = 'block';
        }
        
        // Set video source
        videoLightboxVideo.src = videoSrc;
        
        // Show the lightbox
        videoLightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add active class for animation
        setTimeout(() => {
            videoLightbox.classList.add('active');
        }, 100);
        
        // Handle video loading
        videoLightboxVideo.addEventListener('loadeddata', function() {
            if (videoLoading) {
                videoLoading.style.display = 'none';
            }
            try {
                videoLightboxVideo.play();
            } catch (error) {
                console.error('Error playing video:', error);
            }
        }, { once: true });
        
        // Handle video errors
        videoLightboxVideo.addEventListener('error', function() {
            if (videoLoading) {
                videoLoading.textContent = 'Error loading video';
                videoLoading.style.display = 'block';
            }
        });
    }
    


    // Function to close video lightbox
    function closeVideoLightbox() {
        if (!videoLightbox) return;
        
        // Remove any secondary image containers
        const secondaryImageContainers = videoLightbox.querySelectorAll('.secondary-image-container');
        secondaryImageContainers.forEach(container => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        });
        
        videoLightbox.classList.remove('active');
        
        setTimeout(() => {
            videoLightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Pause and reset video
            if (videoLightboxVideo) {
                videoLightboxVideo.pause();
                videoLightboxVideo.src = '';
            }
            
            // Reset loading state
            const videoLoading = document.getElementById('video-loading');
            if (videoLoading) {
                videoLoading.style.display = 'block';
                videoLoading.textContent = 'Loading video...';
            }
            
            // Reset video opacity
            if (videoLightboxVideo) {
                videoLightboxVideo.style.opacity = '1';
            }
        }, 300);
    }
    
    // Add click event listeners to project elements
    projectElements.forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Check if this is a video element
            if (this.tagName === 'VIDEO') {
                const videoSrc = this.src || this.currentSrc;
                if (videoSrc) {
                    openVideoLightbox(videoSrc);
                }
                return;
            }

            // If the image has a secondary image, show both in a lightbox stacked
            const secondary = this.getAttribute('data-secondary-image');
            const imageSrc = this.src;
            const imageAlt = this.alt;
            if (secondary) {
                createLightbox(imageSrc, imageAlt, secondary);
                return;
            }
            // Otherwise open lightbox with the same image
            createLightbox(imageSrc, imageAlt);
        });
        
        // Add visual indicators
        element.style.cursor = 'pointer';
        if (element.tagName === 'VIDEO') {
            element.title = 'Click to view video in fullscreen';
        } else {
            element.title = 'Click to view larger image';
        }
    });
    
    // Close video lightbox when close button is clicked
    if (videoCloseBtn) {
        videoCloseBtn.addEventListener('click', closeVideoLightbox);
    }
    
    // Close video lightbox when clicking on background
    if (videoLightbox) {
        videoLightbox.addEventListener('click', function(e) {
            if (e.target === videoLightbox) {
                closeVideoLightbox();
            }
        });
    }
    
    // Close video lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (videoLightbox && videoLightbox.style.display === 'flex') {
                closeVideoLightbox();
            }
        }
    });
    
    // ===== IMAGE LIGHTBOX FUNCTIONALITY =====
    // Function to create and show lightbox for images (single image only)
    function createLightbox(imageSrc, imageAlt, secondarySrc) {
        // Create lightbox overlay
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'lightbox-overlay';

        // Build content with a single image only (ignore any secondary source)
        lightboxOverlay.innerHTML = `
            <div class="lightbox-content" style="flex-direction:column;">
                <button class="lightbox-close" aria-label="Close lightbox">×</button>
                <img src="${imageSrc}" alt="${imageAlt}" class="lightbox-image">
            </div>
        `;

        // Add lightbox to body
        document.body.appendChild(lightboxOverlay);

        // Prevent background scrolling when lightbox is open
        document.body.style.overflow = 'hidden';

        // Ensure the image starts from the top (no initial scroll)
        const contentEl = lightboxOverlay.querySelector('.lightbox-content');
        const imgEl = lightboxOverlay.querySelector('.lightbox-image');
        if (contentEl) {
            contentEl.scrollTop = 0;
        }
        lightboxOverlay.scrollTop = 0;

        // After image loads, re-affirm starting at top
        if (imgEl) {
            const ensureTop = () => {
                if (contentEl) contentEl.scrollTop = 0;
                lightboxOverlay.scrollTop = 0;
            };
            imgEl.addEventListener('load', () => {
                requestAnimationFrame(ensureTop);
                setTimeout(ensureTop, 0);
            }, { once: true });
        }

        // ===== Zoom & Pan interactions =====
        (function enableZoomPan(){
            if (!imgEl) return;
            let scale = 1;
            let posX = 0, posY = 0;
            let isPanning = false;
            let startX = 0, startY = 0;
            const minScale = 1;
            const maxScale = 4;

            function applyTransform() {
                imgEl.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(${scale})`;
            }

            function resetZoom() {
                scale = 1;
                posX = 0;
                posY = 0;
                imgEl.classList.remove('zoomed');
                applyTransform();
            }

            function zoomBy(delta, centerX, centerY) {
                const prevScale = scale;
                scale = Math.min(maxScale, Math.max(minScale, scale + delta));
                if (scale === prevScale) return;

                // Keep zoom centered around cursor if available
                if (centerX != null && centerY != null) {
                    const rect = imgEl.getBoundingClientRect();
                    const offsetX = centerX - (rect.left + rect.width / 2);
                    const offsetY = centerY - (rect.top + rect.height / 2);
                    posX -= offsetX * (scale - prevScale) / scale;
                    posY -= offsetY * (scale - prevScale) / scale;
                }

                if (scale === 1) {
                    posX = 0; posY = 0; imgEl.classList.remove('zoomed');
                } else {
                    imgEl.classList.add('zoomed');
                }
                applyTransform();
            }

            // Ctrl + wheel to zoom (desktop)
            (contentEl || lightboxOverlay).addEventListener('wheel', (e) => {
                if (e.ctrlKey) {
                    e.preventDefault();
                    const delta = e.deltaY > 0 ? -0.12 : 0.12;
                    zoomBy(delta, e.clientX, e.clientY);
                }
            }, { passive: false });

            // Double click to toggle zoom
            imgEl.addEventListener('dblclick', (e) => {
                e.preventDefault();
                if (scale === 1) {
                    zoomBy(1, e.clientX, e.clientY);
                } else {
                    resetZoom();
                }
            });

            // Mouse pan while zoomed
            imgEl.addEventListener('mousedown', (e) => {
                if (scale === 1 || e.button !== 0) return;
                isPanning = true;
                startX = e.clientX - posX;
                startY = e.clientY - posY;
                e.preventDefault();
            });
            window.addEventListener('mousemove', (e) => {
                if (!isPanning) return;
                posX = e.clientX - startX;
                posY = e.clientY - startY;
                applyTransform();
            });
            window.addEventListener('mouseup', () => { isPanning = false; });

            // Touch: double-tap to toggle zoom
            let lastTap = 0;
            imgEl.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTap < 300) {
                    if (scale === 1) { zoomBy(1); } else { resetZoom(); }
                }
                lastTap = now;
            });
            // Touch: one-finger pan
            imgEl.addEventListener('touchstart', (e) => {
                if (scale === 1 || e.touches.length !== 1) return;
                const t = e.touches[0];
                isPanning = true;
                startX = t.clientX - posX;
                startY = t.clientY - posY;
            }, { passive: true });
            imgEl.addEventListener('touchmove', (e) => {
                if (!isPanning || e.touches.length !== 1) return;
                const t = e.touches[0];
                posX = t.clientX - startX;
                posY = t.clientY - startY;
                applyTransform();
            }, { passive: true });
            imgEl.addEventListener('touchend', () => { isPanning = false; });
        })();

        // Function to close lightbox
        function closeLightbox() {
            lightboxOverlay.classList.add('fade-out');
            setTimeout(() => {
                lightboxOverlay.remove();
                document.body.style.overflow = '';
            }, 300);
        }

        // Add close functionality for the × button
        const closeBtn = lightboxOverlay.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);

        // Close lightbox when clicking on dark background
        lightboxOverlay.addEventListener('click', function(e) {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });

        // Close lightbox with Escape key
        const escapeHandler = function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        // Prevent lightbox content clicks from closing the lightbox
        const lightboxContent = lightboxOverlay.querySelector('.lightbox-content');
        lightboxContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Add fade-in animation
        setTimeout(() => {
            lightboxOverlay.classList.add('active');
        }, 10);
    }
    
    // Professional site links interaction
    const siteLinks = document.querySelectorAll('.site-links a');
    
    siteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // For primary links, allow the browser to handle navigation normally
            const isPrimary = this.classList.contains('primary-link');
            const href = this.getAttribute('href');
            if (isPrimary && href && href !== '#!') {
                return; // do not preventDefault → native navigation via target="_blank"
            }
            
            e.preventDefault();
            
            // Add professional loading state
            const card = this.closest('.site-card');
            if (card) {
                // Special cases → show designated image on "All site"
                const isEcommerceProject = !!card.querySelector('h3[data-translate="site1Title"]');
                const isEducationProject = !!card.querySelector('h3[data-translate="site3Title"]');
                const isPortfolioProject = !!card.querySelector('h3[data-translate="site5Title"]');
                const isRiadhPortfolioProject = !!card.querySelector('h3[data-translate="site6Title"]');
                const titleEl = card.querySelector('h3');
                const isCarProject = titleEl && titleEl.textContent.trim() === 'Car Sales Company Website';
                const isDinaProject = titleEl && titleEl.textContent.includes('Dina V.');
                const isAllSite = this.classList.contains('secondary-link');
                if (isAllSite) {
                    if (isEcommerceProject) {
                        createLightbox('image/renohdz33.png', 'Enterprise E-commerce Platform');
                        return;
                    }
                    if (isEducationProject) {
                        createLightbox('image/Riaacademyfull.png', 'Educational Learning Platform');
                        return;
                    }
                    if (isPortfolioProject) {
                        createLightbox('image/salimportfiliofull.png', 'Professional Portfolio Website');
                        return;
                    }
                    if (isRiadhPortfolioProject) {
                        createLightbox('image/riadhportfolio22.png', 'Mohamed Riadh Portfolio');
                        return;
                    }
                    if (isDinaProject) {
                        createLightbox('image/سيسيسي54.png', 'Voice Over Artist Portfolio – Dina V.');
                        return;
                    }
                    if (isCarProject) {
                        createLightbox('image/Car Sales Company Website32.png', 'Car Sales Company Website');
                        return;
                    }
                }

                showLoadingState(card);
                
                // Professional analytics tracking
                const projectName = card.querySelector('h3').textContent;
                const action = this.classList.contains('primary-link') ? 'view_live' : 'view_code';
                
                // Track user interaction
                console.log(`Professional interaction: ${action} for ${projectName}`);
                
                // Remove artificial delay for links
                card.classList.remove('loading');
                showProfessionalNotification(`${action === 'view_live' ? 'Opening live site' : 'Opening source code'} for ${projectName}`);
            }
        });
        
        // Add ripple effect
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Professional technology icons hover effects
    const techIcons = document.querySelectorAll('.site-tag-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(8deg)';
            this.style.boxShadow = '0 8px 20px rgba(49, 130, 206, 0.3)';
            
            // Show tooltip with technology info
            const techName = this.getAttribute('title');
            showTechnologyTooltip(this, techName);
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
            
            // Hide tooltip
            hideTechnologyTooltip();
        });
    });
    
    // Professional tooltip system
    function showTechnologyTooltip(element, techName) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.textContent = techName;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 100);
    }
    
    function hideTechnologyTooltip() {
        const tooltip = document.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.classList.remove('show');
            setTimeout(() => {
                tooltip.remove();
            }, 200);
        }
    }
    
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle internal links on the same page
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.querySelector(`#${targetId}`);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - navHeight - 20,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
            // Handle index.html links
            else if (href.startsWith('index.html#')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                const targetElement = document.querySelector(`#${targetId}`);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - navHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Update active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const scrollPos = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveNavLink, 100);
    });
    
    // Back to projects button enhancement
    const backButton = document.querySelector('.cta-buttons .btn-primary');
    
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            // Add loading state
            this.classList.add('loading');
            
            // Simulate navigation delay
            setTimeout(() => {
                this.classList.remove('loading');
            }, 500);
        });
    }
    
    // Remove parallax transform to prevent layout overlap during scroll
    const sitesSectionEl = document.querySelector('.sites-section');
    if (sitesSectionEl) {
        sitesSectionEl.style.transform = 'none';
    }
    
    // Professional notification system
    function showProfessionalNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'professional-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add CSS for professional effects and portfolio modal with both images
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        /* Professional Notification */
        .professional-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--professional-gradient);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            z-index: 10001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
        }
        
        .professional-notification.show {
            transform: translateX(0);
        }
        
        .professional-notification i {
            font-size: 1.2rem;
            color: #4ade80;
        }
        
        /* Professional Technology Tooltip */
        .tech-tooltip {
            position: fixed;
            background: var(--sites-text-primary);
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 500;
            z-index: 10002;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.2s ease;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .tech-tooltip.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .tech-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 5px solid transparent;
            border-top-color: var(--sites-text-primary);
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* ===== LIGHTBOX STYLES ===== */
        /* Lightbox overlay - covers entire screen with dark background */
        .lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease-out;
        }
        
        .lightbox-overlay.active {
            opacity: 1;
        }
        
        .lightbox-overlay.fade-out {
            opacity: 0;
        }
        
        /* Lightbox content container */
        .lightbox-content {
            position: relative;
            max-width: 95%;
            max-height: 90vh;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 48px 16px 16px;
            box-sizing: border-box;
        }
        
        /* Lightbox image styling */
        .lightbox-image {
            width: auto;
            max-width: 100%;
            max-height: 80vh;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.3s ease-out;
            display: block;
            user-select: none;
            -webkit-user-drag: none;
            touch-action: none;
            cursor: zoom-in;
        }
        
        .lightbox-overlay.active .lightbox-image { opacity: 1; }

        .lightbox-image.zoomed { cursor: grab; }
        .lightbox-image.zoomed:active { cursor: grabbing; }
        
        /* Close button styling */
        .lightbox-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            transition: all 0.3s ease;
            z-index: 10;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        /* Close button hover effect */
        .lightbox-close:hover {
            background: rgba(255, 255, 255, 1);
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }
        
        /* ===== VIDEO LIGHTBOX STYLES ===== */
        #video-lightbox {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: rgba(0, 0, 0, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            display: none;
            z-index: 999999 !important;
            justify-content: center !important;
            align-items: center !important;
            overflow: hidden;
            opacity: 0;
            transition: all 0.3s ease;
        }

        #video-lightbox.active {
            opacity: 1 !important;
        }

        .video-lightbox-content {
            position: relative;
            width: 80%;
            height: 70%;
            max-width: 1200px;
            max-height: 800px;
            text-align: center;
            background: rgba(0, 0, 0, 0.98);
            border-radius: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.9);
            overflow: hidden;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            transform: scale(0.95);
            transition: all 0.3s ease;
            margin: 0 auto;
        }

        #video-lightbox.active .video-lightbox-content {
            transform: scale(1) !important;
        }

        .video-lightbox-content video {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 17px;
            display: block;
            margin: 0 auto;
        }

        .video-close {
            position: absolute;
            top: -70px;
            right: 0;
            font-size: 55px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1000000;
            width: 70px;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .video-close:hover {
            color: #ff6b6b;
            background: rgba(255, 107, 107, 0.25);
            transform: scale(1.15);
            box-shadow: 0 12px 40px rgba(255, 107, 107, 0.4);
        }

        .video-close:active {
            transform: scale(0.9);
            box-shadow: 0 6px 24px rgba(255, 107, 107, 0.6);
        }

        /* Video loading state */
        .video-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 20px;
            z-index: 1000001;
            background: rgba(0, 0, 0, 0.8);
            padding: 20px 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            text-align: center;
            font-weight: 500;
        }

        .video-loading::after {
            content: '';
            display: inline-block;
            width: 24px;
            height: 24px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
            margin-left: 15px;
            vertical-align: middle;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Responsive video lightbox */
        @media (max-width: 768px) {
            .video-lightbox-content {
                width: 95%;
                height: 60%;
            }
            
            .video-close {
                top: -60px;
                right: 10px;
                font-size: 45px;
                width: 60px;
                height: 60px;
            }
        }

        @media (max-width: 480px) {
            .video-lightbox-content {
                width: 98%;
                height: 50%;
            }
            
            .video-close {
                top: -55px;
                right: 5px;
                font-size: 40px;
                width: 55px;
                height: 55px;
            }
        }

        @media (max-width: 360px) {
            .video-lightbox-content {
                width: 99%;
                height: 45%;
            }
            
            .video-close {
                top: -50px;
                right: 3px;
                font-size: 35px;
                width: 50px;
                height: 50px;
            }
        }
        
        /* ===== LIGHTBOX RESPONSIVE DESIGN ===== */
        /* Tablet and smaller desktop screens */
        @media (max-width: 768px) {
            .lightbox-content {
                max-width: 95%;
                max-height: 85vh;
            }
            
            .lightbox-image {
                max-height: 75vh;
            }
            
            .lightbox-close {
                top: 8px;
                right: 8px;
                width: 35px;
                height: 35px;
                font-size: 20px;
            }
        }
        
        /* Mobile screens */
        @media (max-width: 480px) {
            .lightbox-content {
                max-width: 98%;
                max-height: 90vh;
            }
            
            .lightbox-image {
                max-height: 70vh;
            }
            
            .lightbox-close {
                top: 6px;
                right: 6px;
                width: 30px;
                height: 30px;
                font-size: 18px;
            }
        }
        
        /* ===== LIGHTBOX ANIMATIONS ===== */
        /* Smooth transitions for lightbox elements */
        .lightbox-overlay,
        .lightbox-image {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Dark mode support for modal */
        [data-theme="dark"] .portfolio-modal-content {
            background: rgba(26, 32, 44, 0.95);
            color: #f7fafc;
        }
        
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .modal-content img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: #3182ce;
        }
        
        .btn-primary.loading {
            position: relative;
            pointer-events: none;
        }
        
        .btn-primary.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 16px;
            margin: -8px 0 0 -8px;
            border: 2px solid transparent;
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        /* Responsive design for portfolio modal */
        @media (max-width: 768px) {
            .portfolio-modal-content {
                max-width: 95%;
                padding: 20px;
            }
            
            .portfolio-images-container {
                gap: 20px;
            }
            
            .close-portfolio-modal {
                top: -15px;
                right: -15px;
                width: 40px;
                height: 40px;
                font-size: 18px;
            }
        }
        
        @media (max-width: 480px) {
            .portfolio-modal-content {
                max-width: 98%;
                padding: 15px;
            }
            
            .portfolio-images-container {
                gap: 15px;
            }
            
            .close-portfolio-modal {
                top: -12px;
                right: -12px;
                width: 35px;
                height: 35px;
                font-size: 16px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize dark mode if saved
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // ===== KEYBOARD NAVIGATION =====
    // Handle Escape key to close lightbox
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const lightbox = document.querySelector('.lightbox-overlay');
            if (lightbox) {
                lightbox.remove();
                document.body.style.overflow = '';
            }
        }
    });
    
    // Touch gestures for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could trigger some action
                console.log('Swipe up detected');
            } else {
                // Swipe down - could trigger some action
                console.log('Swipe down detected');
            }
        }
    }
    
    // Professional analytics and performance tracking
    function trackProfessionalInteraction(action, projectName) {
        const analyticsData = {
            action: action,
            project: projectName,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            viewport: `${window.innerWidth}x${window.innerHeight}`
        };
        
        console.log('Professional Analytics:', analyticsData);
        
        // In a real application, you would send this to your analytics service
        // Example: gtag('event', 'project_interaction', analyticsData);
    }
    
    // Track page load performance
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Professional Sites Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Track page view
        trackProfessionalInteraction('page_view', 'sites_portfolio');
    });
    
    // Professional scroll tracking
    let scrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > scrollDepth && scrollPercent % 25 === 0) {
            scrollDepth = scrollPercent;
            trackProfessionalInteraction('scroll_depth', `${scrollPercent}%`);
        }
    });
    
    console.log('Professional Sites JavaScript loaded successfully!');

    // Animate metrics counters when in view
    (function initMetricsCounters(){
        const counters = document.querySelectorAll('.metric-number');
        if (!counters.length) return;
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target') || '0', 10);
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 1200;
                const start = performance.now();
                function step(now){
                    const p = Math.min(1, (now - start) / duration);
                    const value = Math.floor(target * p);
                    el.textContent = value + suffix;
                    if (p < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
                obs.unobserve(el);
            });
        }, { threshold: 0.3 });
        counters.forEach(c => observer.observe(c));
    })();

    // Re-initialize interactions after dynamic projects render
    document.addEventListener('projects:rendered', function() {
        // Rebind site cards to observer & hover
        const newSiteCards = document.querySelectorAll('.site-card');
        newSiteCards.forEach(card => {
            if (!card.dataset.init) {
                observer.observe(card);
                card.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-8px)'; });
                card.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0)'; });
                card.dataset.init = '1';
            }
        });

        // Rebind media click handlers
        const newMedia = document.querySelectorAll('.project-img');
        newMedia.forEach(element => {
            if (!element.dataset.init) {
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (this.tagName === 'VIDEO') {
                        const videoSrc = this.src || this.currentSrc || this.getAttribute('data-video-src');
                        if (videoSrc) { openVideoLightbox(videoSrc); }
                        return;
                    }
                    // Show both images in a lightbox if secondary is available
                    const secondary = this.getAttribute('data-secondary-image');
                    const imageSrc = this.src;
                    const imageAlt = this.alt || '';
                    if (secondary) {
                        createLightbox(imageSrc, imageAlt, secondary);
                        return;
                    }
                    createLightbox(imageSrc, imageAlt);
                });
                element.style.cursor = 'pointer';
                element.title = element.tagName === 'VIDEO' ? 'Click to view video in fullscreen' : 'Click to view larger image';
                element.dataset.init = '1';
            }
        });

        // Rebind tech icon tooltips
        const newIcons = document.querySelectorAll('.site-tag-icon');
        newIcons.forEach(icon => {
            if (!icon.dataset.init) {
                icon.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.15) rotate(8deg)';
                    this.style.boxShadow = '0 8px 20px rgba(49, 130, 206, 0.3)';
                    const techName = this.getAttribute('title') || this.textContent || '';
                    showTechnologyTooltip(this, techName);
                });
                icon.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) rotate(0deg)';
                    this.style.boxShadow = 'none';
                    hideTechnologyTooltip();
                });
                icon.dataset.init = '1';
            }
        });

        // Rebind site links (ripple/loading)
        const links = document.querySelectorAll('.site-links a');
        links.forEach(link => {
            if (!link.dataset.init) {
                link.addEventListener('click', function(e) {
                    // Allow native navigation for primary links with valid href
                    const isPrimary = this.classList.contains('primary-link');
                    const href = this.getAttribute('href');
                    if (isPrimary && href && href !== '#!') {
                        return;
                    }
                    e.preventDefault();
                    const card = this.closest('.site-card');
                    if (card) {
                        // Special cases → show designated image on "All site"
                        const isEcommerceProject = !!card.querySelector('h3[data-translate="site1Title"]');
                        const isEducationProject = !!card.querySelector('h3[data-translate="site3Title"]');
                        const isPortfolioProject = !!card.querySelector('h3[data-translate="site5Title"]');
                        const isRiadhPortfolioProject = !!card.querySelector('h3[data-translate="site6Title"]');
                        const titleEl = card.querySelector('h3');
                        const isCarProject = titleEl && titleEl.textContent.trim() === 'Car Sales Company Website';
                        const isDinaProject = titleEl && titleEl.textContent.includes('Dina V.');
                        const isAllSite = this.classList.contains('secondary-link');
                        if (isAllSite) {
                            if (isEcommerceProject) {
                                createLightbox('image/renohdz33.png', 'Enterprise E-commerce Platform');
                                return;
                            }
                            if (isEducationProject) {
                                createLightbox('image/Riaacademyfull.png', 'Educational Learning Platform');
                                return;
                            }
                            if (isPortfolioProject) {
                                createLightbox('image/salimportfiliofull.png', 'Professional Portfolio Website');
                                return;
                            }
                            if (isRiadhPortfolioProject) {
                                createLightbox('image/riadhportfolio22.png', 'Mohamed Riadh Portfolio');
                                return;
                            }
                            if (isDinaProject) {
                                createLightbox('image/سيسيسي54.png', 'Voice Over Artist Portfolio – Dina V.');
                                return;
                            }
                            if (isCarProject) {
                                createLightbox('image/Car Sales Company Website32.png', 'Car Sales Company Website');
                                return;
                            }
                        }

                        showLoadingState(card);
                        const projectName = (card.querySelector('h3')?.textContent) || '';
                        const action = this.classList.contains('primary-link') ? 'view_live' : 'view_code';
                        setTimeout(() => { card.classList.remove('loading'); }, 1200);
                        trackProfessionalInteraction(action, projectName);
                        const _href = this.getAttribute('href');
                        if (_href && _href !== '#!') window.open(_href, '_blank');
                    }
                });
                link.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');
                    this.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                });
                link.dataset.init = '1';
            }
        });
    });

    // ===== Toolbar: Search, Filters, Sort =====
    (function initProjectsToolbar(){
        const grid = document.querySelector('.sites-grid');
        if (!grid) return;
        const allCards = Array.from(grid.children).filter(el => el.classList.contains('site-card'));
        allCards.forEach((card, idx) => { card.dataset.initialIndex = String(idx); });

        const searchInput = document.getElementById('projectsSearch');
        const filterButtons = document.querySelectorAll('.toolbar-filters .filter-btn');
        const sortSelect = document.getElementById('projectsSort');
        const countEl = document.getElementById('projectsCount');

        let activeFilter = 'all';
        let searchQuery = '';

        function updateCount(){
            const visible = allCards.filter(c => !c.classList.contains('is-hidden')).length;
            if (countEl) countEl.textContent = `${visible} project${visible === 1 ? '' : 's'}`;
        }

        function applyFilters(){
            const q = searchQuery.trim().toLowerCase();
            allCards.forEach(card => {
                const category = (card.getAttribute('data-category') || '').toLowerCase();
                const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
                const desc = (card.querySelector('p')?.textContent || '').toLowerCase();
                const matchCategory = activeFilter === 'all' || category.split(/[\s,]+/).includes(activeFilter);
                const matchQuery = !q || title.includes(q) || desc.includes(q);
                const shouldShow = matchCategory && matchQuery;
                card.classList.toggle('is-hidden', !shouldShow);
            });
            sortCards();
            updateCount();
        }

        function sortCards(){
            const mode = (sortSelect?.value) || 'default';
            const visibleCards = allCards.filter(c => !c.classList.contains('is-hidden'));
            const hiddenCards = allCards.filter(c => c.classList.contains('is-hidden'));
            let orderedVisible = visibleCards;
            if (mode === 'title') {
                orderedVisible = [...visibleCards].sort((a, b) => {
                    const ta = (a.querySelector('h3')?.textContent || '').toLocaleLowerCase();
                    const tb = (b.querySelector('h3')?.textContent || '').toLocaleLowerCase();
                    return ta.localeCompare(tb);
                });
            } else {
                orderedVisible = [...visibleCards].sort((a, b) => Number(a.dataset.initialIndex) - Number(b.dataset.initialIndex));
            }
            // Re-append in order: visible first, then hidden (keeps layout tidy)
            const fragment = document.createDocumentFragment();
            orderedVisible.forEach(el => fragment.appendChild(el));
            hiddenCards.forEach(el => fragment.appendChild(el));
            grid.appendChild(fragment);
        }

        // Events
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                activeFilter = (btn.getAttribute('data-filter') || 'all').toLowerCase();
                applyFilters();
            });
        });
        searchInput?.addEventListener('input', () => {
            searchQuery = searchInput.value || '';
            applyFilters();
        });
        sortSelect?.addEventListener('change', () => {
            sortCards();
        });

        // Initial render
        updateCount();
    })();
    // ===== Counter Animation =====
    const counters = document.querySelectorAll('.metric-number');
    const speed = 50; // Adjust speed as needed

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/[^0-9]/g, '');
                
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                    const suffix = counter.getAttribute('data-suffix');
                    if (suffix) {
                        counter.innerText += suffix;
                    }
                }
            };
            updateCount();
        });
    };

    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(resultsSection);
    }
});