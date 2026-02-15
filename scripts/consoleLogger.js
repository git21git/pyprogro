// scripts/consoleLogger.js

document.addEventListener('DOMContentLoaded', function() {
    // Слушаем кастомное событие formValid, которое генерирует validation.js
    document.addEventListener('formValid', function(event) {
        // Получаем данные формы из события
        const formData = event.detail;

        // Очищаем консоль для наглядности (опционально)
        console.clear();

        // Выводим данные в читаемом виде
        console.log('=== Данные успешно отправленной формы ===');
        console.log('ФИО:', formData.fullname);
        console.log('Телефон:', formData.phone);
        console.log('Email:', formData.email);
        console.log('Сообщение:', formData.message);

        // Добавляем временную метку
        console.log('Время отправки:', new Date().toLocaleString());
    });
});
