// scripts/validation.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return; // если формы нет на странице, выходим

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // отменяем стандартную отправку

        // Сбрасываем предыдущие ошибки
        document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());

        let isValid = true;

        // 1. Проверка ФИО (не пустое, минимум 2 слова)
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        if (fullnameValue === '') {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        } else {
            const words = fullnameValue.split(' ').filter(word => word.length > 0);
            if (words.length < 2) {
                showError(fullname, 'Введите фамилию и имя (минимум два слова)');
                isValid = false;
            }
        }

        // 2. Проверка телефона (не пустой, минимум 10 цифр)
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, ''); // удаляем всё кроме цифр
        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Введите 10 или более цифр номера');
            isValid = false;
        }

        // 3. Проверка email (не пустой, содержит @ и .)
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
            showError(email, 'Введите корректный email (пример: name@domain.com)');
            isValid = false;
        }

        // 4. Проверка согласия (чекбокс должен быть отмечен)
        const agreement = document.getElementById('agreement');
        if (!agreement.checked) {
            // Покажем ошибку рядом с чекбоксом (добавим help блок)
            const agreementField = agreement.closest('.field');
            if (agreementField) {
                showErrorForCheckbox(agreementField, 'Необходимо согласие на обработку данных');
            }
            isValid = false;
        }

        // Если валидация пройдена – генерируем событие с данными формы
        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                message: document.getElementById('message').value.trim() || '(не заполнено)'
            };
            const customEvent = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(customEvent);
            alert('Форма отправлена! Данные выведены в консоль.');
        }
    });

    // Функция показа ошибки для обычных полей (input, textarea)
    function showError(input, message) {
        input.classList.add('is-danger');
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        // Вставляем после родителя с control (структура Bulma: .field > .control > input)
        // Проще добавить после .control или после поля
        const control = input.closest('.control');
        if (control) {
            control.parentNode.appendChild(help);
        } else {
            // Запасной вариант
            input.parentNode.appendChild(help);
        }
    }

    // Функция показа ошибки для чекбокса
    function showErrorForCheckbox(fieldElement, message) {
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        fieldElement.appendChild(help);
    }

    // Сброс ошибок при вводе (для input и textarea)
    document.querySelectorAll('.input, .textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            const field = this.closest('.field');
            if (field) {
                const errors = field.querySelectorAll('.help.is-danger');
                errors.forEach(el => el.remove());
            }
        });
    });

    // Сброс ошибки для чекбокса при его изменении
    const agreement = document.getElementById('agreement');
    if (agreement) {
        agreement.addEventListener('change', function() {
            const field = this.closest('.field');
            if (field) {
                const errors = field.querySelectorAll('.help.is-danger');
                errors.forEach(el => el.remove());
            }
        });
    }
});
