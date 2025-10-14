import "./index.css";
import { enableValidation, config } from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";
import { setDeleteText } from "../utils/helpers.js";
import { data, error } from "jquery";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b20f1a1b-01a4-4317-92ee-903527d3d2ea",
    "Content-Type": "application/json",
  },
});

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLinkInput = newPostModal.querySelector("#card_image-input");
const newPostCaptionInput = newPostModal.querySelector(
  "#profile-caption-input"
);
const newPostSubmitBtn = newPostForm.querySelector(".modal__submit-btn");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileImageEl = document.querySelector(".profile__avatar");
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");

const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarSubmit = avatarModal.querySelector(".modal__submit-btn");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarImage = document.querySelector(".profile__avatar");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = document.querySelector("#delete-form");
const deleteModalCloseBtn = document.querySelector(
  ".modal__close-btn_delete-modal"
);
const deleteModalCancelBtn = deleteModal.querySelector(".modal__cancel-btn");

let selectedCard;
let selectedCardId;

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

const hideInputError = (formEl, inputEl) => {
  const errorMsgID = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#" + errorMsgID);
  inputEl.classList.remove(config.inputErrorClass);
  errorMsgEl.textContent = "";
};

const resetValidation = (formEl, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input);
  });
};

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardCaptionEl = previewModal.querySelector(".modal__caption");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  cardCaptionEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  }
  const isLiked = cardLikeBtnEl.classList.contains("card__like-btn_active");
  cardLikeBtnEl.addEventListener("click", () => {
    api
      .changeLikeStatus(data._id, isLiked)
      .then(() => {
        cardLikeBtnEl.classList.toggle("card__like-btn_active");
      })
      .catch(console.error);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    cardTitleEl.textContent = data.name;
    cardCaptionEl.textContent = data.name;

    openModal(previewModal);
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeletecard(cardElement, data);
  });

  return cardElement;
}

api
  .getAppInfo()
  .then(([initialCards, userInfo]) => {
    initialCards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
    avatarImage.src = userInfo.avatar;
  })

  .catch(console.error);

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  setModalEventListeners(modal);
}
function handleKeydown(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_is-opened");
    closeModal(modal);
  }
}

function handleClick(evt) {
  const modal = document.querySelector(".modal_is-opened");
  if (evt.target === modal) {
    closeModal(modal);
  }
}

function setModalEventListeners(modal) {
  document.addEventListener("keydown", handleKeydown);
  modal.addEventListener("click", handleClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleKeydown);
}

deleteModalCancelBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;

  resetValidation(editProfileForm, [
    editProfileNameInput,
    editProfileDescriptionInput,
  ]);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

avatarModalBtn.addEventListener("click", function () {
  openModal(avatarModal);
});

deleteModalCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const modal__submitBtn = evt.submitter;
  setButtonText(modal__submitBtn, true, "Save", "Saving...");
  api
    .editAvatarInfo(avatarInput.value)
    .then((res) => {
      avatarImage.src = avatarInput.value;
      avatarForm.reset();
      resetValidation(avatarForm, [avatarInput]);
      closeModal(avatarModal);
    })

    .catch(console.error)
    .finally(() => {
      setButtonText(modal__submitBtn, false, "Save", "Saving...");
    });
}

avatarForm.addEventListener("submit", handleAvatarSubmit);
avatarCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const modal__submitBtn = evt.submitter;
  setButtonText(modal__submitBtn, true, "Save", "Saving...");

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      resetValidation(editProfileForm, [
        editProfileNameInput,
        editProfileDescriptionInput,
      ]);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(modal__submitBtn, false, "Save", "Saving...");
      closeModal(editProfileModal);
    });
}

function handleDeletecard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

const handleDeleteSubmit = (evt) => {
  evt.preventDefault();
  const modal__deleteBtn = evt.submitter;
  setDeleteText(modal__deleteBtn, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setDeleteText(modal__deleteBtn, false, "Delete", "Deleting...");
    });
};

deleteForm.addEventListener("submit", handleDeleteSubmit);

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  const modal__submitBtn = evt.submitter;
  setButtonText(modal__submitBtn, true, "Save", "Saving...");

  const inputValues = {
    link: newPostLinkInput.value,
    name: newPostCaptionInput.value,
  };

  api
    .postCards(inputValues)
    .then(() => {
      const cardElement = getCardElement(inputValues);
      cardsList.prepend(cardElement);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(modal__submitBtn, false, "Save", "Saving...");
      closeModal(newPostModal);
    });

  newPostForm.reset();
  resetValidation(newPostModal, [newPostLinkInput, newPostCaptionInput]);
}

newPostForm.addEventListener("submit", handleNewPostFormSubmit);

enableValidation(config);
