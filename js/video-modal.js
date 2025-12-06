// Video Modal JavaScript - Simplified

// Global variables
let videoLightbox;
let videoLightboxVideo;
let videoCloseBtn;
let videoLoading;

// Open video modal function
function openVideoLightbox(videoSrc) {
    if (!videoSrc) {
        console.error("No video source found!");
        return;
    }
    
    console.log("Opening video:", videoSrc);
    
    // Show loading
    if (videoLoading) videoLoading.style.display = "block";
    
    // Set video source and show modal
    videoLightboxVideo.src = videoSrc;
    videoLightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
    
    // Add active class for animation
    setTimeout(() => {
        videoLightbox.classList.add("active");
    }, 10);
    
    // Hide loading when video is ready
    videoLightboxVideo.addEventListener("loadeddata", function() {
        if (videoLoading) videoLoading.style.display = "none";
        try {
            videoLightboxVideo.play();
        } catch (error) {
            console.log("Autoplay blocked:", error);
        }
    }, { once: true });
}



// Close video modal function
function closeVideoLightbox() {
    videoLightbox.classList.remove("active");
    setTimeout(() => {
        videoLightbox.style.display = "none";
        document.body.style.overflow = "auto";
        videoLightboxVideo.pause();
        videoLightboxVideo.src = "";
        videoLightboxVideo.currentTime = 0;
    }, 300);
}

// Open image lightbox function
function openImageLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxSecondaryImg = document.getElementById('lightbox-secondary-img');
    
    if (!lightbox || !lightboxImg) {
        console.error("Image lightbox elements not found!");
        return;
    }
    
    // Set primary image
    lightboxImg.src = imgElement.src;
    lightboxImg.alt = imgElement.alt;
    
    // Always show only the primary image (hide any secondary image)
    if (lightboxSecondaryImg) {
        lightboxSecondaryImg.style.display = 'none';
        lightboxSecondaryImg.src = '';
    }
    
    // Show lightbox
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close image lightbox function
function closeImageLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Global function for car video
function openCarVideoModal() {
    console.log("Opening car video modal...");
    const videoSrc = "image/Zzzz.mp4";
    
    // Check if elements exist
    if (!videoLightbox || !videoLightboxVideo) {
        console.error("Video modal elements not found!");
        return;
    }
    
    openVideoLightbox(videoSrc);
}

// Global function for Dina video
function openDinaVideoModal() {
    console.log("Opening Dina video modal...");
    const videoSrc = "image/2025-08بيبيبيبي-24 09-30-02.mp4";
    
    // Check if elements exist
    if (!videoLightbox || !videoLightboxVideo) {
        console.error("Video modal elements not found!");
        return;
    }
    
    openVideoLightbox(videoSrc);
}

// Global function for Abd Erahmane video
function openAbdErahmaneVideoModal() {
    console.log("Opening Abd Erahmane video modal...");
    const videoSrc = "image/Abd erahmane.mp4";
    
    // Check if elements exist
    if (!videoLightbox || !videoLightboxVideo) {
        console.error("Video modal elements not found!");
        return;
    }
    
    openVideoLightbox(videoSrc);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing video modal...");
    
    // Get elements
    videoLightbox = document.getElementById('video-lightbox');
    videoLightboxVideo = document.getElementById('video-lightbox-video');
    videoCloseBtn = document.querySelector('.video-close');
    videoLoading = document.getElementById('video-loading');
    
    // Check if elements exist
    if (!videoLightbox || !videoLightboxVideo) {
        console.error("Required video modal elements not found!");
        return;
    }
    
    console.log("Video modal elements found successfully!");
    
    // Add event listeners
    if (videoCloseBtn) {
        videoCloseBtn.addEventListener("click", closeVideoLightbox);
    }
    
    // Close on background click
    videoLightbox.addEventListener("click", function(e) {
        if (e.target === videoLightbox) {
            closeVideoLightbox();
        }
    });
    
    // Close on Escape key
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            closeVideoLightbox();
            closeImageLightbox();
        }
    });
    
    // Add event listeners to watch video buttons
    const watchVideoBtns = document.querySelectorAll('.watch-video-btn');
    watchVideoBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Watch video button clicked");
            
            // Check which button was clicked and call appropriate function
            if (this.onclick && this.onclick.toString().includes('openDinaVideoModal')) {
                openDinaVideoModal();
            } else if (this.onclick && this.onclick.toString().includes('openAbdErahmaneVideoModal')) {
                openAbdErahmaneVideoModal();
            } else {
                openCarVideoModal();
            }
        });
    });
    
    // Add event listeners for image lightbox
    const imageLightbox = document.getElementById('lightbox');
    const imageCloseBtn = imageLightbox ? imageLightbox.querySelector('.close') : null;
    
    if (imageCloseBtn) {
        imageCloseBtn.addEventListener('click', closeImageLightbox);
    }
    
    if (imageLightbox) {
        imageLightbox.addEventListener('click', function(e) {
            if (e.target === imageLightbox) {
                closeImageLightbox();
            }
        });
    }
    
    // Initialize project images (skip on sites page to avoid duplicate handlers)
    const isSitesPage = (typeof window !== 'undefined') && (window.location.pathname.endsWith('sites.html') || document.querySelector('.sites-section'));
    if (!isSitesPage) {
        const projectImages = document.querySelectorAll(".project-img");
        projectImages.forEach(function(img) {
            img.addEventListener("click", function(e) {
                e.preventDefault();
                
                if (img.tagName.toLowerCase() === "video") {
                    const videoSrc = img.getAttribute("data-video-src") || img.getAttribute("src");
                    if (videoSrc) {
                        openVideoLightbox(videoSrc);
                    }
                } else if (img.tagName.toLowerCase() === "img") {
                    openImageLightbox(img);
                }
            });
        });
    }
    
    console.log("Video modal initialized successfully!");
});