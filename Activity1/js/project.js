const artModal = document.getElementById('artModal');

    artModal.addEventListener('show.bs.modal', function (event) {
      const card = event.relatedTarget;

      if (!card) return;

      const title = card.dataset.title || 'Project Preview';
      const imageSrc = card.dataset.image || '';
      const category = card.dataset.category || '';
      const description = card.dataset.description || '';
      const projectLink = card.dataset.link || '';

      document.getElementById('artModalTitle').textContent = title;

      const modalImage = document.getElementById('artModalImage');
      modalImage.src = imageSrc;
      modalImage.alt = title;

      document.getElementById('artModalCategory').textContent = category;
      document.getElementById('artModalDescription').textContent = description;

      const linkButton = document.getElementById('artModalLink');

      if (projectLink) {
        linkButton.href = projectLink;
        linkButton.hidden = false;
      } else {
        linkButton.removeAttribute('href');
        linkButton.hidden = true;
      }
    });

    artModal.addEventListener('hidden.bs.modal', function () {
      const modalImage = document.getElementById('artModalImage');
      modalImage.removeAttribute('src');
      modalImage.alt = '';

      document.getElementById('artModalCategory').textContent = '';
      document.getElementById('artModalDescription').textContent = '';

      const linkButton = document.getElementById('artModalLink');
      linkButton.hidden = true;
      linkButton.removeAttribute('href');
    });