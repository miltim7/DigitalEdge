class ProjectModal {
    constructor() {
        this.modal = document.getElementById('projModal');
        this.modalOverlay = this.modal.querySelector('.proj-modal__overlay');
        this.modalClose = this.modal.querySelector('.proj-modal__close');
        this.cards = document.querySelectorAll('.proj_card');

        this.projectsData = {
            0: {
                title: 'Миграция инфраструктуры',
                subtitle: 'Переход на Yandex Cloud с оптимизацией производительности',
                description: 'Комплексная миграция корпоративной инфраструктуры с традиционного хостинга на облачную платформу Yandex Cloud. Проект включал перенос серверов, баз данных, настройку CDN для ускорения загрузки контента и оптимизацию производительности всех сервисов.',
                tech: ['Yandex Cloud', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'CDN', 'Load Balancer'],
                link: 'https://degit.tech/cloud-migration',
                image: 'images/projects/proj1.png'
            },
            1: {
                title: 'DevOps трансформация',
                subtitle: 'Kubernetes, CI/CD Pipeline, GitOps с Terraform',
                description: 'Полная трансформация процессов разработки и развертывания. Миграция микросервисов с systemd на Kubernetes, построение автоматизированного CI/CD pipeline на основе GitOps подхода с использованием Terraform для управления инфраструктурой как кодом.',
                tech: ['Kubernetes', 'GitLab CI/CD', 'Terraform', 'FluxCD', 'Prometheus', 'Grafana', 'ArgoCD'],
                link: 'https://degit.tech/devops-solutions',
                image: 'images/projects/proj2.png'
            },
            2: {
                title: 'BI-аналитика маркетплейсов',
                subtitle: 'Отчетность для WB, Ozon, YM на Yandex Datalens',
                description: 'Разработка комплексной системы бизнес-аналитики для мониторинга продаж на маркетплейсах. Автоматизация сбора данных из API маркетплейсов, построение дашбордов и отчетов в Yandex Datalens для принятия управленческих решений.',
                tech: ['Python', 'Yandex Datalens', 'API Integration', 'PostgreSQL', 'Apache Airflow', 'Pandas'],
                link: 'https://degit.tech/bi-analytics',
                image: 'images/projects/proj3.png'
            },
            3: {
                title: 'Backend разработка',
                subtitle: 'Микросервисы на Python FastAPI и Django',
                description: 'Создание высоконагруженной микросервисной архитектуры для платформы арбитража трафика. Разработка RESTful API, интеграция с внешними сервисами, оптимизация производительности и масштабируемости системы.',
                tech: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'Nginx'],
                link: 'https://degit.tech/backend-services',
                image: 'images/projects/proj4.png'
            }
        };

        this.init();
    }

    init() {
        this.cards.forEach((card, index) => {
            card.addEventListener('click', () => this.openModal(index));
        });

        this.modalOverlay.addEventListener('click', () => this.closeModal());
        this.modalClose.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(index) {
        const project = this.projectsData[index];
        if (!project) return;

        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalSubtitle').textContent = project.subtitle;
        document.getElementById('modalDescription').textContent = project.description;

        const techList = document.getElementById('modalTech');
        techList.innerHTML = '';
        project.tech.forEach(tech => {
            const techItem = document.createElement('div');
            techItem.className = 'proj-modal__tech-item';
            techItem.textContent = tech;
            techList.appendChild(techItem);
        });

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectModal();
});