


 export function createCard(cardData, selectorTemplate, openImagePopup) {
    //Клонируем шаблон темплейта и записываем его в card
    const card = selectorTemplate.content.cloneNode(true);
  
    //находим и записываем в переменные остальные элемента шаблона
    const groupImage = card.querySelector('.group__image');
    const groupTitle = card.querySelector('.group__title');
    const groupButton = card.querySelector('.group__button');
    const groupButtonDelete = card.querySelector('.group__button-delete');
    //устанавливаем атрибуты для картинки
    groupImage.setAttribute('src', cardData.link)
    groupImage.setAttribute('alt', cardData.name)
  
    //слушатель открытия картинки ставим на саму картинку
    groupImage.addEventListener('click', () => openImagePopup(cardData))
  
     
    // устанавливаем название
    groupTitle.textContent = cardData.name;
    // слушатель на лайк
    groupButton.addEventListener('click', evt => cardLike(evt.target));
    // слушатель на корзинку удалить
    groupButtonDelete.addEventListener('click', () => deleteCard(card));
    return card;
}
function cardLike (card) {
  card.classList.toggle('group__button_active');
}

function deleteCard(card) {
    card.remove();
}