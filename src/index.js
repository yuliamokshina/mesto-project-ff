import './pages/index.css'
import { initialCards } from './scripts/cards';
import { createCard } from './scripts/card';
import { closePopup, openPopup } from './scripts/modal';
//Переменная группы (контейнер с карточками)

const group = document.querySelector('.group');
//Переменные шаблона
const selectorTemplate = document.querySelector('#template-element');

//Переменные для 1 попапа

//до открытия
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileButtonEdit = document.querySelector('.profile__button-edit');
//после открытия
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupInputName = popupProfile.querySelector('.popup__input_data_name');
const popupInputInfo = popupProfile.querySelector('.popup__input_info_name');
//Переменные для 2 попапа

//до открытия
const profileButtonAdd = document.querySelector('.profile__button')
//после открытия
const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupInputDataNameAdd = popupAdd.querySelector('.popup__input_data_name-add');
const popupInputUrlNameAdd = popupAdd.querySelector('.popup__input_url-add');


//Переменные для 3 попапа
const popupImage = document.querySelector('.popup_type_image');
const popupImagePhoto = popupImage.querySelector('.popup__image-photo');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
//--------------------------------------------------------------------------------------------------------

//Цикл для авто добавления карточек из массива

function renderCard(card) {
  return group.prepend(card);
}

initialCards.forEach(value => {
  group.append(createCard(value, selectorTemplate, openImagePopup));
})

// универсальные функции закрытия и открытия попапов

// 1 попап открытие и закрытие

function openProfilPopup() {
  //очитска профиля попап профиль от ошибок
  const formElement = popupProfile.querySelector('.popup__form');
  popupInputInfo.value = profileSubtitle.textContent;
  popupInputName.value = profileTitle.textContent;
  openPopup(popupProfile);
}


// 2 попап закрытие и открытие

function openAddPopup() {
  //очистка форм попап эдд от ошибок
  const formElement = popupAdd.querySelector('.popup__form');
  popupAddForm.reset();
    openPopup(popupAdd);
}

// 3 попап закрытие и открытие

// В аргумент передаем теперь (назвали его cardData) объект состоящий из двух полей (link и name) 
function openImagePopup(cardData) {
  popupImagePhoto.src = cardData.link;
  popupImagePhoto.alt = cardData.name;
  popupImageTitle.textContent = cardData.name;
  openPopup(popupImage);
}

//----------------------------------------------------------------------------
// устанавливаем слушателей

// слушатель для кнопки открыть 1 попапа
profileButtonEdit.addEventListener('click', openProfilPopup);

// Слушатель для кнопки сохранить 1 попапа
popupProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputInfo.value;
  closePopup(popupProfile);
});

// слушатель для кнопки открыть 2 попапа
profileButtonAdd.addEventListener('click', openAddPopup);

//Слушатель для кнопки сохранить 2 попапа
popupAdd.addEventListener('submit', evt => {
  evt.preventDefault();
  const name = popupInputDataNameAdd.value;
  const link = popupInputUrlNameAdd.value;
  renderCard(createCard({ name, link }, selectorTemplate, openImagePopup));
  popupAddForm.reset();
  closePopup(popupAdd);
});

//устанавливаем слушателя на закрытие всех попапов сразу
document.querySelectorAll('.popup__close').forEach(button => {
  const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => closePopup(buttonsPopup)); // закрыли попап
});


//открытие попапа с профилем кликом по оверлею
const popupOverlay = document.querySelectorAll(".popup");
popupOverlay.forEach(popup => {
  popup.addEventListener("mousedown",  event => {
    if (event.target == popup) {
      closePopup(popup);
    };
  })
});

