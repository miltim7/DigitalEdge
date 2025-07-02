// scripts\InfoAnimation.js

class InfoAnimation {
    constructor() {
        this.info = document.querySelector('.info');
        this.animationTriggered = false;
        
        if (this.info) {
            this.init();
        }
    }
    
    init() {
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '50px 0px -50px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animationTriggered) {
                    this.animationTriggered = true;
                    this.animateInfo();
                }
            });
        }, observerOptions);
        
        observer.observe(this.info);
    }
    
    animateInfo() {
        this.info.classList.add('animate-in');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InfoAnimation();
});