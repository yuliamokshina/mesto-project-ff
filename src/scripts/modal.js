export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => escapeKeyHendler(evt, popup));
  }

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => escapeKeyHendler(evt, popup));
  }

export  function escapeKeyHendler(evt, popup) {
    if(evt.key === 'Escape') {
      closePopup(popup);
    }
}