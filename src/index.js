import './pages/index.css'
import { createCard } from './scripts/card';
import { closePopup, openPopup } from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/validation';
import { getCards, getUserInfo, addCard, deleteCardApi, likeCardApi, dislikeCardApi, setUserInfoApi, setUserAvatar } from './scripts/api';

//Переменная группы (контейнер с карточками)
const group = document.querySelector('.group');

//Переменные шаблона

const selectorTemplate = document.querySelector('#template-element');

// Перменные изменения аватара

const popupAvatar = document.querySelector('.popup_type_avatar');
const btnEditAvatar = document.querySelector('.profile__avatar-edit');
const profileAvatar = document.querySelector('.profile__avatar');
const formEditAvatar = popupAvatar.querySelector('.popup__form');

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

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

let user = {}

// функция для добавления карточек
function renderCard(card) {
  return group.prepend(card);
}
// Инициализация(первичное добавление карточек и отрисовка(рендер) на странице) карточек

Promise.all([getUserInfo(), getCards()]).then(([userData, cardData]) => {
  profileTitle.textContent = userData.name;
  profileSubtitle.textContent = userData.about;
  profileAvatar.src = userData.avatar;
  user = userData
  cardData.forEach(value => group.append(createCard(value, selectorTemplate, openImagePopup, user._id, deleteCardApi, likeCardApi, dislikeCardApi )))
}).catch((err) => console.log(err))

// открытие попапа профиля
function openProfilPopup() {
  //очитска профиля попап профиль от ошибок
  clearValidation(popupProfileForm, validationSettings)
  popupInputInfo.value = profileSubtitle.textContent;
  popupInputName.value = profileTitle.textContent;
  openPopup(popupProfile);
}

// открытие попапа добавления карточки
function openAddPopup() {
  //очистка форм попап эдд от ошибок
  clearValidation(popupAddForm, validationSettings)
  openPopup(popupAdd);
}

// открытие попапа с картинкой карточки
function openImagePopup(cardData) {
  popupImagePhoto.src = cardData.link;
  popupImagePhoto.alt = cardData.name;
  popupImageTitle.textContent = cardData.name;
  openPopup(popupImage);
}

function openAvatarPopup() {
  openPopup(popupAvatar);
  clearValidation(formEditAvatar, validationSettings)
}

// Слушатель для кнопки редактирования профиля
profileButtonEdit.addEventListener('click', openProfilPopup);
btnEditAvatar.addEventListener('click', openAvatarPopup);

formEditAvatar.addEventListener('submit', evt => {
  evt.preventDefault();
  formEditAvatar.querySelector('.popup__button').textContent = 'Сохранение...';
  setUserAvatar({ avatar: formEditAvatar.elements['avatar'].value }).then((data) => {
    btnEditAvatar.children[0].src = formEditAvatar.elements['avatar'].value;
    closePopup(popupAvatar);
  }).catch((err) => console.log(err))
  .finally(() => formEditAvatar.querySelector('.popup__button').textContent = 'Сохранить')
});

// Слушатель для формы профиля
popupProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  popupProfileForm.querySelector('.popup__button').textContent = 'Сохранение...';
  setUserInfoApi({ name: popupInputName.value, about: popupInputInfo.value }).then((data) => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;  
    user = data
    closePopup(popupProfile);
  }).catch((err) => console.log(err))
  .finally(() => popupProfileForm.querySelector('.popup__button').textContent = 'Сохранить')
});
// слушатель для кнопки добавления карточки
profileButtonAdd.addEventListener('click', openAddPopup);

//Слушатель для формы добавления карточки
popupAdd.addEventListener('submit', evt => {
  evt.preventDefault();
  const name = popupInputDataNameAdd.value;
  const link = popupInputUrlNameAdd.value;
  popupAdd.querySelector('.popup__button').textContent = 'Сохранение...';
  addCard({name, link}).then((data) => {
    renderCard(createCard(data, selectorTemplate, openImagePopup, user._id, deleteCardApi, likeCardApi, dislikeCardApi ));
    popupAddForm.reset();
    closePopup(popupAdd);
  }).catch((err) => console.log(err))
  .finally(() => popupAdd.querySelector('.popup__button').textContent = 'Сохранить')
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

enableValidation(validationSettings);