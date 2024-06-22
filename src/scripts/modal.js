
// универсальная функция закрытия попапа
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => escapeKeyHendler(evt, popup));
  }

// универсальная функция открытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => escapeKeyHendler(evt, popup));
  }

// функция закрытия попапа по клику на оверлей
function escapeKeyHendler(evt, popup) {
    if(evt.key === 'Escape') {
      closePopup(popup);
    }
}