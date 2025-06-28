// scripts\ProjectVectors.js

class ProjectVectors {
    constructor() {
        this.container = document.querySelector('.proj_container');
        this.svg = document.querySelector('.proj_vectors');
        this.cards = document.querySelectorAll('.proj_card');
        this.center = document.querySelector('.proj_image-container');
        this.animationStarted = false;

        if (this.svg && window.innerWidth > 1024) {
            this.init();
        }
    }

    init() {
        this.updateVectors();
        this.setupIntersectionObserver();

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                this.updateVectors();
            }
        });

        window.addEventListener('load', () => {
            if (window.innerWidth > 1024) {
                this.updateVectors();
            }
        });

        setTimeout(() => this.updateVectors(), 100);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animationStarted) {
                    this.animationStarted = true;
                    this.startAnimation();
                }
            });
        }, observerOptions);

        observer.observe(this.container);
    }

    // startAnimation() {
    //     const vectorLines = this.svg.querySelectorAll('.proj_vector-line');
    //     const vectorDots = this.svg.querySelectorAll('.proj_vector-dot');

    //     vectorLines.forEach((line, index) => {
    //         line.classList.add('animate');
    //     });

    //     vectorDots.forEach((dot, index) => {
    //         dot.classList.add('animate');
    //     });
    // }

    startAnimation() {
        const vectorLines = this.svg.querySelectorAll('.proj_vector-line');
        const vectorDots = this.svg.querySelectorAll('.proj_vector-dot');

        // Добавляем класс контейнеру для анимации логотипа
        this.container.classList.add('in-view');

        vectorLines.forEach((line, index) => {
            line.classList.add('animate');
        });

        vectorDots.forEach((dot, index) => {
            dot.classList.add('animate');
        });
    }

    updateVectors() {
        if (window.innerWidth <= 1024) return;

        const containerRect = this.container.getBoundingClientRect();
        const centerRect = this.center.getBoundingClientRect();

        const centerX = centerRect.left + centerRect.width / 2 - containerRect.left;
        const centerY = centerRect.top + centerRect.height / 2 - containerRect.top;

        this.cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const vectorLine = this.svg.querySelector(`.proj_vector-line--${index + 1}`);
            const vectorDot = this.svg.querySelectorAll('.proj_vector-dot')[index];

            if (vectorLine && vectorDot) {
                let startX, startY;

                if (index < 2) {
                    startX = cardRect.right - containerRect.left + 5;
                    startY = cardRect.top + cardRect.height / 2 - containerRect.top;
                } else {
                    startX = cardRect.left - containerRect.left - 5;
                    startY = cardRect.top + cardRect.height / 2 - containerRect.top;
                }

                const controlX = (startX + centerX) / 2;
                const controlY = startY + (index % 2 === 0 ? -30 : 30);

                const path = `M ${startX} ${startY} Q ${controlX} ${controlY} ${centerX} ${centerY}`;
                vectorLine.setAttribute('d', path);

                vectorDot.setAttribute('cx', startX);
                vectorDot.setAttribute('cy', startY);

                const pathLength = vectorLine.getTotalLength();
                vectorLine.style.strokeDasharray = pathLength;
                vectorLine.style.strokeDashoffset = pathLength;
            }
        });

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        this.svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectVectors();
});

