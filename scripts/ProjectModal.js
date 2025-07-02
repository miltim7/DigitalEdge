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
                description: 'Мы выполнили комплексную миграцию корпоративной IT-инфраструктуры с традиционного хостинга на Yandex Cloud. В рамках проекта были перенесены серверы и базы данных, внедрён CDN для ускорения доставки контента, а также проведена масштабная оптимизация производительности всех сервисов. Результат — более высокая отказоустойчивость, снижение затрат на поддержку, ускорение отклика систем и масштабируемость без ограничений. Если вы планируете переход в облако — посмотрите, как мы это делаем на практике. Это не просто перенос. Это трансформация инфраструктуры под реальные бизнес-задачи.',
                tech: ['Yandex Cloud', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'CDN', 'Load Balancer'],
                link: 'https://degit.tech/cloud-migration',
                image: 'images/projects/proj1.png'
            },
            1: {
                title: 'DevOps трансформация',
                subtitle: 'Kubernetes, CI/CD Pipeline, GitOps с Terraform',
                description: 'Мы провели полную трансформацию процессов разработки и развертывания. Миграция микросервисной архитектуры с systemd на Kubernetes позволила значительно повысить управляемость и масштабируемость. В рамках проекта был выстроен CI/CD pipeline на принципах GitOps с использованием Terraform — инфраструктура стала полностью описываемой в коде, а процессы обновления — воспроизводимыми, безопасными и автоматизированными. Посмотрите, как мы реализуем DevOps-практики в реальных проектах. Это не просто автоматизация — это системный переход на новый уровень устойчивости и скорости разработки.',
                tech: ['Kubernetes', 'GitLab CI/CD', 'Terraform', 'FluxCD', 'Prometheus', 'Grafana', 'ArgoCD'],
                link: 'https://degit.tech/devops-solutions',
                image: 'images/projects/proj2.png'
            },
            2: {
                title: 'Сервисы BI-аналитики',
                subtitle: 'Отчетность для e-commerce-бизнеса',
                description: 'Мы разработали комплексную систему бизнес-аналитики для мониторинга продаж на маркетплейсах. Автоматизированный сбор данных через API маркетплейсов обеспечивает актуальность информации без ручного вмешательства. На основе этих данных построены интерактивные дашборды и отчёты в Yandex Datalens — всё для оперативного анализа и принятия обоснованных управленческих решений. Мы превращаем разрозненные данные в инструмент управления бизнесом.',
                tech: ['Python', 'Yandex Datalens', 'API Integration', 'PostgreSQL', 'ClickHouse'],
                link: 'https://degit.tech/bi-analytics',
                image: 'images/projects/proj3.png'
            },
            3: {
                title: 'Backend разработка',
                subtitle: 'Микросервисы на Python FastAPI и Django',
                description: 'Мы создали высоконагруженную микросервисную архитектуру для платформы арбитража трафика. В рамках проекта были разработаны RESTful API, реализована интеграция с внешними сервисами и выполнена глубокая оптимизация производительности. Система спроектирована с прицелом на масштабируемость и стабильную работу под высокими нагрузками — архитектура готова к росту без узких мест. Мы разрабатываем решения, которые выдерживают реальные объёмы и растут вместе с бизнесом.',
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