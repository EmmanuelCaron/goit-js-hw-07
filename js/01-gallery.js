import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryList = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

// Added gallery markup in HTML (document)
galleryList.insertAdjacentHTML('beforeend', galleryItemsMarkup);

// Create gallery markup from galleryItems (array)
function createGalleryItemsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
    })
    .join('');
}

// Added image click event
galleryList.addEventListener('click', selectImage);

function selectImage(poza) {
  if (poza.target.nodeName !== 'IMG') return;

  //Disallowed default behavior
  poza.preventDefault();

  //Using the library 'Lightbox' (create image)
  const instance = basicLightbox.create(
    `<img src="${poza.target.dataset.source}">`,
    {
      // EventListener for escapeCloseFunction
      onShow: instance => {
        document.addEventListener('keyup', escapeCloseFunction);
      },
      onClose: instance => {
        document.removeEventListener('keyup', escapeCloseFunction);
      },
    }
  );

  // Created function which closes the photo on the 'Escape'
  function escapeCloseFunction(poza) {
    if (poza.key === 'Escape') instance.close();
  }

  //Using the library 'Lightbox' (open image)
  instance.show();
}