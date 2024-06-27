

// создание карточки 
 export function createCard(cardData, selectorTemplate, openImagePopup, userId, deleteCardApi, likeCardApi, dislikeCardApi) {
    //Клонируем шаблон из темплейта и записываем его в card
    const card = selectorTemplate.content.querySelector('.group__element').cloneNode(true);
  
    //находим и записываем в переменные остальные элемента шаблона
    const groupImage = card.querySelector('.group__image');
    const groupTitle = card.querySelector('.group__title');
    const groupButton = card.querySelector('.group__button');
    const groupButtonDelete = card.querySelector('.group__button-delete');
    const likeCounter = card.querySelector('.group__like');

    likeCounter.textContent = cardData.likes.length || '';
    if(cardData.owner._id !== userId) {
      groupButtonDelete.remove();
    }

    if(cardData.likes.some(like => like._id === userId)) {
      groupButton.classList.add('group__button_active');
    }

    //устанавливаем атрибуты для картинки
    groupImage.setAttribute('src', cardData.link)
    groupImage.setAttribute('alt', cardData.name)
  
    //слушатель открытия картинки ставим на саму картинку
    groupImage.addEventListener('click', () => openImagePopup(cardData))
  
    // устанавливаем название картоки
    groupTitle.textContent = cardData.name;

    // слушатель на лайк
    groupButton.addEventListener('click', evt => {
      if(cardData.likes.some(like => like._id === userId)) {
        dislikeCardApi(cardData._id)
          .then((data) =>  {
            cardData=data
            likeCounter.textContent = cardData.likes.length || '';
            dislikeCard(evt.target)
          }).catch((err) => console.log(err))
      }else {
        likeCardApi(cardData._id)
          .then((data) => {
            cardData=data
            likeCounter.textContent = cardData.likes.length || '';
            likeCard(evt.target)
          }).catch((err) => console.log(err))
      }
    } );

    // слушатель на корзинку удалить
    groupButtonDelete.addEventListener('click', () => {
      deleteCardApi(cardData._id)
        .then(() => deleteCard(card))
        .catch((err) => console.log(err))
    });
    return card;
}

// функция лайка
function likeCard (card) {
  card.classList.add('group__button_active');
}

function dislikeCard(card) {
  card.classList.remove('group__button_active');
}

// функция удаления
function deleteCard(card) {
    card.remove();
}