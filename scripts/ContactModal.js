class ContactModal {
    constructor() {
        this.modal = document.getElementById('contactModal');
        this.modalOverlay = this.modal.querySelector('.contact-modal__overlay');
        this.modalClose = this.modal.querySelector('.contact-modal__close');
        this.form = document.getElementById('contactForm');
        this.openButtons = document.querySelectorAll('.header__button');
        this.nameField = document.getElementById('contactName');
        this.emailField = document.getElementById('contactEmail');
        this.messageField = document.getElementById('contactMessage');
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
        
        // Валидация в реальном времени
        this.nameField.addEventListener('blur', () => this.validateName());
        this.emailField.addEventListener('blur', () => this.validateEmail());
        this.messageField.addEventListener('blur', () => this.validateMessage());
    }

    validateName() {
        const name = this.nameField.value.trim();
        if (name.length < 2) {
            this.showFieldError(this.nameField, 'Имя должно содержать минимум 2 символа');
            return false;
        }
        if (name.length > 50) {
            this.showFieldError(this.nameField, 'Имя не должно превышать 50 символов');
            return false;
        }
        this.clearFieldError(this.nameField);
        return true;
    }

    validateEmail() {
        const email = this.emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showFieldError(this.emailField, 'Введите корректный email адрес');
            return false;
        }
        this.clearFieldError(this.emailField);
        return true;
    }

    validateMessage() {
        const message = this.messageField.value.trim();
        if (message.length < 10) {
            this.showFieldError(this.messageField, 'Сообщение должно содержать минимум 10 символов');
            return false;
        }
        if (message.length > 1000) {
            this.showFieldError(this.messageField, 'Сообщение не должно превышать 1000 символов');
            return false;
        }
        this.clearFieldError(this.messageField);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#dc3545';
    }

    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }

    clearAllErrors() {
        [this.nameField, this.emailField, this.messageField].forEach(field => {
            this.clearFieldError(field);
        });
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
            this.clearAllErrors();
        }, 400);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Валидация перед отправкой
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            return;
        }
        
        const formData = new FormData(this.form);
        const submitButton = this.form.querySelector('.contact-form__submit');
        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
        submitButton.style.opacity = '0.7';

        try {
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData
            });

            let result;
            try {
                const responseText = await response.text();
                result = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Parse error:', parseError);
                throw new Error('Некорректный ответ от сервера');
            }

            if (response.ok && result.status === 'success') {
                submitButton.textContent = 'Отправлено!';
                submitButton.style.background = '#28a745';
                submitButton.style.opacity = '1';
                this.form.reset();
                this.clearAllErrors();

                setTimeout(() => {
                    this.closeModal();
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.style.opacity = '';
                    submitButton.disabled = false;
                }, 2500);

            } else {
                throw new Error(result.message || 'Ошибка отправки сообщения');
            }

        } catch (error) {
            console.error('Ошибка отправки:', error);
            submitButton.textContent = 'Ошибка!';
            submitButton.style.background = '#dc3545';
            submitButton.style.opacity = '1';
            
            // Показываем пользователю конкретную ошибку
            alert('Ошибка: ' + error.message);

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.style.opacity = '';
                submitButton.disabled = false;
            }, 3000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ContactModal();
});