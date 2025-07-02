// scripts\FooterAnimation.js

class FooterAnimation {
    constructor() {
        this.footer = document.querySelector('.footer');
        this.animationTriggered = false;
        
        if (this.footer) {
            this.init();
        }
    }
    
    init() {
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animationTriggered) {
                    this.animationTriggered = true;
                    this.animateFooter();
                }
            });
        }, observerOptions);
        
        observer.observe(this.footer);
    }
    
    animateFooter() {
        setTimeout(() => {
            this.footer.classList.add('animate-in');
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FooterAnimation();
});