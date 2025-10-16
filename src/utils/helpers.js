export function setButtonText(
  modal__submitbtn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    modal__submitbtn.textContent = loadingText;
  } else {
    modal__submitbtn.textContent = defaultText;
  }
}
export function setDeleteText(
  modal__deleteBtn,
  isDeleting,
  defaultText = "Delete",
  loadingText = "Deleting..."
) {
  if (isDeleting) {
    modal__deleteBtn.textContent = loadingText;
  } else {
    modal__deleteBtn.textContent = defaultText;
  }
}
