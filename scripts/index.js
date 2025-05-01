const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileClosebtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");


const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLinkInput = newPostModal.querySelector("#card_image-input");
const newPostCaptionInput = newPostModal.querySelector("#profile-caption-input");

const profileNameEl = document.querySelector(".profile__name");
const profilDescriptionEl = document.querySelector(".profile__description");


editProfileBtn.addEventListener("click", function () {
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profilDescriptionEl.textContent;
    editProfileModal.classList.add("modal_is-opened");
});

editProfileClosebtn.addEventListener("click", function () {
    editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function (){
    newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
    newPostModal.classList.remove("modal_is-opened");
});

function handleEditProfileSubmit(evt) {
    evt.preventDefault()
    profileNameEl.textContent = editProfileNameInput.value;
    profilDescriptionEl.textContent = editProfileDescriptionInput.value;
    editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostForm (evt) {
    evt.preventDefault()
    console.log(newPostCaptionInput.value);
    console.log(newPostLinkInput.value);
    newPostModal.classList.remove("modal_is-opened");

}

newPostForm.addEventListener("submit", handleNewPostForm);

