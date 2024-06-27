
// универсальная функция закрытия попапа
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeKeyHendler);
  }

// универсальная функция открытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escapeKeyHendler);
  }

// функция закрытия попапа по клику на оверлей
function escapeKeyHendler(evt) {
  const popup = document.querySelector('.popup_opened');
    if(evt.key === 'Escape') {
      closePopup(popup);
    }
}