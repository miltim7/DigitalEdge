// scripts\CursorFollow.js

const textFollow = document.getElementById("text-follow");
const container = document.querySelector(".directions");

// Изначально скрываем надпись
textFollow.classList.add("visually-hidden");

// Функция для проверки нахождения курсора в контейнере
function isCursorInContainer(event, element) {
  const rect = element.getBoundingClientRect();
  return (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  );
}

document.addEventListener("mousemove", (event) => {
  if (isCursorInContainer(event, container)) {
    // Показываем надпись при нахождении в контейнере
    textFollow.classList.remove("visually-hidden");

    // Обновляем позицию надписи с небольшим смещением
    textFollow.style.left = event.clientX + 20 + "px";
    textFollow.style.top = event.clientY + 20 + "px";
  } else {
    // Скрываем надпись при выходе за пределы контейнера
    textFollow.classList.add("visually-hidden");
  }
});

// АВТОМАТИЧЕСКОЕ ПОЗИЦИОНИРОВАНИЕ ЭЛЕМЕНТОВ
document.addEventListener("DOMContentLoaded", () => {
  const directionsContainer = document.getElementById("directions-container");
  const items = directionsContainer.querySelectorAll(".directions__item");
  
  // Проверяем размер экрана
  function isMobile() {
    return window.innerWidth <= 768;
  }
  
  function isTablet() {
    return window.innerWidth <= 1024 && window.innerWidth > 768;
  }
  
  function isSmallDesktop() {
    return window.innerWidth <= 1440 && window.innerWidth > 1024;
  }
  
  function positionItems() {
    if (isMobile()) {
      // На мобильных используем flex
      return;
    }
    
    const count = items.length;
    
    // АДАПТИВНЫЕ ПОЗИЦИИ ДЛЯ РАЗНЫХ УСТРОЙСТВ
    const positions = {
      // Большие десктопы
      desktop: {
        8: [
          { left: '8%', top: '10%' },        // B2B - левый верх
          { left: '42%', top: '20%', transform: 'translateX(-50%)' },  // B2C - центр, ниже  
          { right: '5%', top: '8%' },       // Разработка - правый верх
          { left: '5%', top: '38%' },       // Консалтинг - левый центр
          { left: '40%', top: '55%', transform: 'translateX(-50%)' },  // B2YOU - центр, ниже
          { right: '6%', top: '38%' },      // DevOps - правый центр
          { left: '12%', bottom: '8%' },    // AI/ML - левый низ
          { right: '12%', bottom: '5%' }    // Mobile - правый низ
        ]
      },
      // Маленькие десктопы
      smallDesktop: {
        8: [
          { left: '6%', top: '12%' },        
          { left: '44%', top: '22%', transform: 'translateX(-50%)' },   
          { right: '4%', top: '10%' },       
          { left: '4%', top: '40%' },        
          { left: '42%', top: '57%', transform: 'translateX(-50%)' },   
          { right: '5%', top: '40%' },       
          { left: '10%', bottom: '10%' },    
          { right: '10%', bottom: '8%' }     
        ]
      },
      // Планшет позиции  
      tablet: {
        8: [
          { left: '5%', top: '8%' },        
          { left: '50%', top: '22%', transform: 'translateX(-50%)' },       
          { right: '5%', top: '8%' },       
          { left: '8%', top: '35%' },       
          { left: '50%', top: '48%', transform: 'translateX(-50%)' },      
          { right: '8%', top: '35%' },      
          { left: '20%', bottom: '8%' },    
          { right: '20%', bottom: '8%' }    
        ]
      }
    };
    
    // Выбираем набор позиций в зависимости от устройства
    let devicePositions;
    if (isTablet()) {
      devicePositions = positions.tablet;
    } else if (isSmallDesktop()) {
      devicePositions = positions.smallDesktop;
    } else {
      devicePositions = positions.desktop;
    }
    
    const currentPositions = devicePositions[count] || devicePositions[8];
    
    items.forEach((item, index) => {
      const pos = currentPositions[index] || currentPositions[0];
      
      // Очищаем предыдущие стили
      item.style.left = '';
      item.style.right = '';
      item.style.top = '';
      item.style.bottom = '';
      item.style.transform = '';
      
      // Применяем новые позиции
      Object.keys(pos).forEach(key => {
        item.style[key] = pos[key];
      });
      
      // Добавляем случайные анимации
      const animations = ['floating', 'floating-alt', 'floating-slow'];
      const delays = ['0s', '-1.5s', '-3s', '-2s', '-4s', '-0.5s', '-2.5s', '-1s'];
      
      item.style.animation = `${animations[index % 3]} ${6 + (index % 3)}s ease-in-out infinite`;
      item.style.animationDelay = delays[index] || '0s';
    });
  }
  
  // Запускаем позиционирование
  positionItems();
  
  // Перепозиционируем при изменении размера окна с дебаунсом
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(positionItems, 150);
  });
});