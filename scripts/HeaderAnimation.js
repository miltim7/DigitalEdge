// scripts\HeaderAnimation.js

class HeaderAnimation {
    constructor() {
        this.header = document.querySelector('.header');
        
        if (this.header) {
            this.init();
        }
    }
    
    init() {
        this.animateHeader();
    }
    
    animateHeader() {
        setTimeout(() => {
            this.header.classList.add('animate-in');
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HeaderAnimation();
});