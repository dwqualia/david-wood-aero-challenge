fetch("https://aero-mock-api.vercel.app/")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("subtitle").textContent = data.subtitle;
    document.getElementById("headline").innerHTML = data.title;
    document.getElementById("accordion-image").src = data.items[0].image;

    const container = document.getElementById("accordion-content");
    const accordionImage = document.getElementById("accordion-image");

    // Clear placeholders
    container.querySelectorAll("details").forEach((el) => el.remove());

    // Replace accordion items
    data.items.forEach((item, index) => {
      const details = document.createElement("details");
      details.innerHTML = `
        <summary>${item.title}</summary>
        <div class="accordion-item">
          <img class="accordion-item-image" src="${item.image}" alt="${item.title}" />
          <p>${item.description}</p>
        </div>
      `;

      container.appendChild(details);

      // First open by default
      if (index === 0) {
        setTimeout(() => details.setAttribute("open", ""), 10);
      }

      // Fade image
      details.addEventListener("toggle", () => {
        if (details.open) {
          accordionImage.classList.add("fade");

          setTimeout(() => {
            accordionImage.src = item.image;
            accordionImage.classList.remove("fade");
          }, 300);

          // Only one at a time now
          container.querySelectorAll("details").forEach((otherDetails) => {
            if (otherDetails !== details) {
              otherDetails.removeAttribute("open");
            }
          });
        }
      });
    });
  })
  .catch((error) => console.error("Error:", error));
