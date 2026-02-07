// Конвертер валют
document.addEventListener('DOMContentLoaded', function() {
    // Элементы конвертера
    const acInput = document.getElementById('ac-amount');
    const rubInput = document.getElementById('rub-amount');
    const rate = 150; // 1 AC = 150 RUB
    
    // Функция конвертации AC в RUB
    function convertACtoRUB(ac) {
        return ac * rate;
    }
    
    // Функция конвертации RUB в AC
    function convertRUBtoAC(rub) {
        return rub / rate;
    }
    
    // Обновление RUB при изменении AC
    acInput.addEventListener('input', function() {
        const acValue = parseFloat(this.value) || 0;
        rubInput.value = convertACtoRUB(acValue).toFixed(2);
    });
    
    // Обновление AC при изменении RUB
    rubInput.addEventListener('input', function() {
        const rubValue = parseFloat(this.value) || 0;
        acInput.value = convertRUBtoAC(rubValue).toFixed(6);
    });
    
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем ссылки, которые не являются якорями на текущей странице
            if (href === '#' || href.startsWith('#!')) return;
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Закрываем мобильное меню если открыто
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        .card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stat {
            opacity: 0;
            transform: scale(0.9);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .stat.animate-in {
            opacity: 1;
            transform: scale(1);
        }
        
        .contact-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .contact-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Наблюдаем за статистикой и контактными элементами
    document.querySelectorAll('.stat, .contact-item').forEach(element => {
        observer.observe(element);
    });
});