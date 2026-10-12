 document.querySelectorAll(".btn-floor").forEach(btn => {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".btn-floor").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
      });
    });


 const imageModal = document.getElementById('imageModal');

    imageModal.addEventListener('show.bs.modal', function (event) {

      const button = event.relatedTarget;

      const img = button.getAttribute('data-img');
      const title = button.getAttribute('data-title');
      const description = button.getAttribute('data-description');
      const artist = button.getAttribute('data-artist');
      const year = button.getAttribute('data-year');
      const style = button.getAttribute('data-style');

      document.getElementById('modalImage').src = img;
      document.getElementById('artTitle').textContent = title;
      document.getElementById('artDescription').textContent = description;
      document.getElementById('artArtist').textContent = artist;
      document.getElementById('artYear').textContent = year;
      document.getElementById('artStyle').textContent = style;
    });

    const transition = document.getElementById("floorTransition");

    function goToPage(url) {
      transition.classList.add("active");

      setTimeout(() => {
        window.location.href = url;
      }, 800);
    }

    const floor1Btn = document.getElementById("floor1Btn");
    const floor2Btn = document.getElementById("floor2Btn");
    const floor3Btn = document.getElementById("floor3Btn");

    if (floor1Btn) {
      floor1Btn.addEventListener("click", () => {
        goToPage("gallery.html");
      });
    }

    if (floor2Btn) {
      floor2Btn.addEventListener("click", () => {
        goToPage("gallery2.html");
      });
    }

    if (floor3Btn) {
      floor3Btn.addEventListener("click", () => {
        goToPage("gallery3.html"); // change if needed
      });
    }