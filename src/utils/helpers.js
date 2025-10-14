export function setButtonText(
  modal__submitbtn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    modal__submitbtn.textContent = loadingText;
    // set the loading text
  } else {
    modal__submitbtn.textContent = defaultText;
    //set the default text
  }
}
export function setDeleteText(
  modal__deleteBtn,
  isDeleting,
  defaultText = "Delete",
  loadingText = "Deleting..."
) {
  if (isDeleting) {
    //set the deleting text
    modal__deleteBtn.textContent = loadingText;
  } else {
    modal__deleteBtn.textContent = defaultText;
    //set default text
  }
}
