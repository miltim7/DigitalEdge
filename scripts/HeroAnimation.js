class HeroAnimation {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.heroTitle = document.querySelector('.hero__title');
        this.heroDescription = document.querySelector('.hero__description');
        this.directionsItems = document.querySelectorAll('.directions__item');
        this.bgImages = document.querySelector('.hero__bg-images');
        this.bgImage1 = document.querySelector('.hero__bg-image-1');
        this.bgImage2 = document.querySelector('.hero__bg-image-2');
        this.shadow = document.querySelector('.shadow');
        this.animationTriggered = false;
        
        if (this.hero) {
            this.init();
        }
    }
    
    init() {
        this.setInitialStates();
        this.setupIntersectionObserver();
    }
    
    setInitialStates() {
        if (this.heroTitle) {
            this.heroTitle.style.opacity = '0';
            this.heroTitle.style.transform = 'translateY(40px) scale(0.95)';
            this.heroTitle.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        }
        
        if (this.heroDescription) {
            this.heroDescription.style.opacity = '0';
            this.heroDescription.style.transform = 'translateY(30px)';
            this.heroDescription.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        }
        
        this.directionsItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px) scale(0.8)';
            item.style.transition = `opacity 0.4s ease-out, transform 0.4s ease-out`;
        });
        
        if (this.bgImages) {
            this.bgImages.style.opacity = '0';
            this.bgImages.style.transform = 'scale(1.1)';
            this.bgImages.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        }
        
        if (this.bgImage1) {
            this.bgImage1.style.transform = 'scale(0.65) translateX(-20px)';
            this.bgImage1.style.transition = 'transform 1.2s ease-out';
        }
        
        if (this.bgImage2) {
            this.bgImage2.style.transform = 'translateX(20px)';
            this.bgImage2.style.transition = 'transform 1.2s ease-out';
        }
        
        if (this.shadow) {
            this.shadow.style.opacity = '0';
            this.shadow.style.transform = 'scale(0.8)';
            this.shadow.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        }
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '100px 0px -50px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animationTriggered) {
                    this.animationTriggered = true;
                    this.animateHero();
                }
            });
        }, observerOptions);
        
        observer.observe(this.hero);
    }
    
    animateHero() {
        setTimeout(() => {
            if (this.heroTitle) {
                this.heroTitle.style.opacity = '1';
                this.heroTitle.style.transform = 'translateY(0) scale(1)';
            }
        }, 200);
        
        setTimeout(() => {
            if (this.heroDescription) {
                this.heroDescription.style.opacity = '1';
                this.heroDescription.style.transform = 'translateY(0)';
            }
        }, 400);
        
        this.directionsItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, 600 + (index * 80));
        });
        
        setTimeout(() => {
            if (this.bgImages) {
                this.bgImages.style.opacity = '1';
                this.bgImages.style.transform = 'scale(1)';
            }
        }, 100);
        
        setTimeout(() => {
            if (this.bgImage1) {
                this.bgImage1.style.transform = 'scale(0.65) translateX(0)';
            }
        }, 300);
        
        setTimeout(() => {
            if (this.bgImage2) {
                this.bgImage2.style.transform = 'translateX(0)';
            }
        }, 500);
        
        setTimeout(() => {
            if (this.shadow) {
                this.shadow.style.opacity = '1';
                this.shadow.style.transform = 'scale(1)';
            }
        }, 700);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HeroAnimation();
});