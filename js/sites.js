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
            
            // For images, use the existing lightbox functionality
            const imageSrc = this.src;
            const imageAlt = this.alt;
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
    // Function to create and show lightbox for images
    function createLightbox(imageSrc, imageAlt) {
        // Create lightbox overlay
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'lightbox-overlay';
        lightboxOverlay.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">×</button>
                <img src="${imageSrc}" alt="${imageAlt}" class="lightbox-image">
            </div>
        `;
        
        // Add lightbox to body
        document.body.appendChild(lightboxOverlay);
        
        // Prevent background scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
        
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
        const lightboxImage = lightboxOverlay.querySelector('.lightbox-image');
        lightboxImage.addEventListener('click', function(e) {
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
            e.preventDefault();
            
            // Add professional loading state
            const card = this.closest('.site-card');
            if (card) {
                showLoadingState(card);
                
                // Professional analytics tracking
                const projectName = card.querySelector('h3').textContent;
                const action = this.classList.contains('primary-link') ? 'view_live' : 'view_code';
                
                // Track user interaction
                console.log(`Professional interaction: ${action} for ${projectName}`);
                
                // Simulate professional loading (replace with actual navigation)
                setTimeout(() => {
                    card.classList.remove('loading');
                    
                    // Show professional success message
                    showProfessionalNotification(`${action === 'view_live' ? 'Opening live site' : 'Opening source code'} for ${projectName}`);
                }, 1500);
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
            
            if (href.startsWith('index.html#')) {
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
    
    // Parallax effect for background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const sitesSection = document.querySelector('.sites-section');
        
        if (sitesSection) {
            const rate = scrolled * -0.5;
            sitesSection.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Update any scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
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
            max-width: 90%;
            max-height: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        /* Lightbox image styling */
        .lightbox-image {
            max-width: 100%;
            max-height: 90vh;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            transform: scale(0.9) translateY(-20px);
            opacity: 0;
            transition: all 0.4s ease-out;
        }
        
        .lightbox-overlay.active .lightbox-image {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
        
        /* Close button styling */
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: -40px;
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
            transform: translate(-50%, -50%) scale(0.8);
            transition: all 0.3s ease;
            left: 50%;
            top: 50%;
        }

        #video-lightbox.active .video-lightbox-content {
            transform: translate(-50%, -50%) scale(1) !important;
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
                max-height: 85%;
            }
            
            .lightbox-image {
                max-height: 80vh;
            }
            
            .lightbox-close {
                top: -30px;
                right: -30px;
                width: 35px;
                height: 35px;
                font-size: 20px;
            }
        }
        
        /* Mobile screens */
        @media (max-width: 480px) {
            .lightbox-content {
                max-width: 98%;
                max-height: 90%;
            }
            
            .lightbox-image {
                max-height: 75vh;
            }
            
            .lightbox-close {
                top: -25px;
                right: -25px;
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
});