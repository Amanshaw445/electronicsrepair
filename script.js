    AOS.init();

    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sideMenu = document.getElementById('side-menu');
    const backdrop = document.getElementById('backdrop');

    menuBtn.addEventListener('click', () => {
      sideMenu.style.right = '0';
      backdrop.classList.add('visible');
    });

    closeBtn.addEventListener('click', () => {
      sideMenu.style.right = '-300px';
      backdrop.classList.remove('visible');
    });

    backdrop.addEventListener('click', () => {
      sideMenu.style.right = '-300px';
      backdrop.classList.remove('visible');
    });

    document.querySelectorAll('.category').forEach(el => {
      el.addEventListener('click', () => {
        document.getElementById('category').value = el.getAttribute('data-category');
        document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
      });
    });

    const API_URL = "https://script.google.com/macros/s/AKfycbzTCkwhZeep4h5jA7035ZtPZGW1vLc8zo0vt4qsF6QxCZ-t5SNbo-yGcGj0wzjPyfIOtA/exec";

    async function loadReviews() {
      const res = await fetch(API_URL);
      const reviews = await res.json();
      document.getElementById("reviews").innerHTML = reviews.map(r => `
        <div class="bg-white border border-gray-200 shadow-md rounded-xl p-5 hover:shadow-lg transition duration-300">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-lg text-gray-800">${r.name}</h3>
            <span class="text-yellow-500 text-sm">${"⭐".repeat(r.rating)}</span>
          </div>
          <small class="text-gray-500">${new Date(r.date).toLocaleDateString()}</small>
          <p class="mt-3 text-gray-700">${r.review}</p>
        </div>
      `).join("");
    }

    document.getElementById("reviewForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = document.getElementById("submitBtn");
      btn.textContent = "Sending...";
      btn.disabled = true;

      const data = {
        name: document.getElementById("name").value,
        rating: document.getElementById("rating").value,
        review: document.getElementById("review").value
      };

      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data)
      });

      btn.textContent = "Sent!";
      setTimeout(() => {
        btn.textContent = "Send";
        btn.disabled = false;
      }, 2000);

      e.target.reset();
      loadReviews();
    });

    loadReviews();
