// scripts\ContactModal.js

class ContactModal {
    constructor() {
        this.modal = document.getElementById('contactModal');
        this.modalOverlay = this.modal.querySelector('.contact-modal__overlay');
        this.modalClose = this.modal.querySelector('.contact-modal__close');
        this.form = document.getElementById('contactForm');
        this.openButtons = document.querySelectorAll('.header__button');
        this.init();
    }

    init() {
        this.openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        });

        this.modalOverlay.addEventListener('click', () => this.closeModal());
        this.modalClose.addEventListener('click', () => this.closeModal());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    openModal() {
        this.modal.style.display = 'flex';
        setTimeout(() => {
            this.modal.classList.add('active');
            document.body.classList.add('modal-open');
        }, 10);
    }

    closeModal() {
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }, 400);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const submitButton = this.form.querySelector('.contact-form__submit');
        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        try {
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData
            });

            let result;
            try {
                result = await response.json();
            } catch {
                result = { status: 'error', message: 'Ошибка сервера' };
            }

            if (response.ok && result.status === 'success') {
                submitButton.textContent = 'Отправлено!';
                submitButton.style.background = '#28a745';
                this.form.reset();

                setTimeout(() => {
                    this.closeModal();
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 2000);

            } else {
                throw new Error(result.message || 'Неизвестная ошибка');
            }

        } catch (error) {
            console.error('Ошибка отправки:', error);
            submitButton.textContent = 'Ошибка отправки';
            submitButton.style.background = '#dc3545';

            // Показываем детали ошибки в консоли
            console.log('Детали ошибки:', error.message);

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ContactModal();
});