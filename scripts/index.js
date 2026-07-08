const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-popup");
const editProfileForm = document.querySelector("#edit-profile-form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const descriptionInput = editProfileForm.querySelector(
  ".popup__input_type_description",
);
const editModalCloseButton = editModal.querySelector(".popup__close");

const profileAddButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const newCardModalCloseButton = newCardModal.querySelector(".popup__close");

const imageModal = document.querySelector("#image-popup");
const imageModalImage = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");
const imageModalCloseButton = imageModal.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

function handleOpenNewCardModal() {
  newCardForm.reset();
  openModal(newCardModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(cardNameInput.value, cardLinkInput.value, cardsList);
  closeModal(newCardModal);
}

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteButtonClick(evt) {
  const cardElement = evt.target.closest(".card");
  cardElement.remove();
}

function handleCardImageClick(name, link) {
  imageModalImage.src = link;
  imageModalImage.alt = name;
  imageModalCaption.textContent = name;
  openModal(imageModal);
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = name; // el texto visible del <h2> = el nombre del lugar
  cardImage.src = link; // la URL de la imagen = el link recibido
  cardImage.alt = name; // el texto alternativo también usa el name (accesibilidad)

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLikeButtonClick);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDeleteButtonClick);

  cardImage.addEventListener("click", () => handleCardImageClick(name, link));

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

profileEditButton.addEventListener("click", handleOpenEditModal);
editModalCloseButton.addEventListener("click", () => closeModal(editModal));
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
profileAddButton.addEventListener("click", handleOpenNewCardModal);
newCardModalCloseButton.addEventListener("click", () =>
  closeModal(newCardModal),
);

newCardForm.addEventListener("submit", handleCardFormSubmit);
imageModalCloseButton.addEventListener("click", () => closeModal(imageModal));

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});
