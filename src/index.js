import './pages/index.css'
import { initialCards } from './scripts/cards';
import { createCard } from './scripts/card';
import { closePopup, openPopup } from './scripts/modal';

//Переменная группы (контейнер с карточками)
const group = document.querySelector('.group');

//Переменные шаблона
const selectorTemplate = document.querySelector('#template-element');

// Переменные профиля
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileButtonEdit = document.querySelector('.profile__button-edit');

// переменные формы профиля
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupInputName = popupProfile.querySelector('.popup__input_data_name');
const popupInputInfo = popupProfile.querySelector('.popup__input_info_name');

// Кнопка отркрытия попапа с изменениеми профиля
const profileButtonAdd = document.querySelector('.profile__button')

//Переменная формы добавления карточки
const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupInputDataNameAdd = popupAdd.querySelector('.popup__input_data_name-add');
const popupInputUrlNameAdd = popupAdd.querySelector('.popup__input_url-add');

//Переменная карточки
const popupImage = document.querySelector('.popup_type_image');
const popupImagePhoto = popupImage.querySelector('.popup__image-photo');
const popupImageTitle = popupImage.querySelector('.popup__image-title');

// функция для добавления карточек
function renderCard(card) {
  return group.prepend(card);
}

// Инициализация(первичное добавление карточек и отрисовка(рендер) на странице) карточек
initialCards.forEach(value => {
  group.append(createCard(value, selectorTemplate, openImagePopup));
})

// открытие попапа профиля
function openProfilPopup() {
  //очитска профиля попап профиль от ошибок
  popupInputInfo.value = profileSubtitle.textContent;
  popupInputName.value = profileTitle.textContent;
  openPopup(popupProfile);
}

// открытие попапа добавления карточки
function openAddPopup() {
  //очистка форм попап эдд от ошибок
  popupAddForm.reset();
    openPopup(popupAdd);
}

// открытие попапа с картинкой карточки
function openImagePopup(cardData) {
  popupImagePhoto.src = cardData.link;
  popupImagePhoto.alt = cardData.name;
  popupImageTitle.textContent = cardData.name;
  openPopup(popupImage);
}

// Слушатель для кнопки редактирования профиля
profileButtonEdit.addEventListener('click', openProfilPopup);

// Слушатель для формы профиля
popupProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputInfo.value;
  closePopup(popupProfile);
});

// слушатель для кнопки добавления карточки
profileButtonAdd.addEventListener('click', openAddPopup);

//Слушатель для формы добавления карточки
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

//закрытие попапа с профилем кликом по оверлею
const popupOverlay = document.querySelectorAll(".popup");
popupOverlay.forEach(popup => {
  popup.addEventListener("mousedown",  event => {
    if (event.target == popup) {
      closePopup(popup);
    };
  })
});

