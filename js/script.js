document.addEventListener("DOMContentLoaded", () => {
  fetch("data/donation.json")
    .then(response => {
      if (!response.ok) throw new Error("Не удалось загрузить файл пожертвований");
      return response.json();
    })
    .then(data => {
      const container = document.getElementById("donation-container");
      container.innerHTML = ""; // Очищаем "Загрузка целей..."

      const dateInfo = document.createElement("p");
      dateInfo.textContent = `Данные на ${new Date(data.date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long"
      })}`;
      container.appendChild(dateInfo);

      data.goals.forEach(goal => {
        const wrapper = document.createElement("div");
        wrapper.className = "donation-goal";

        const label = document.createElement("label");
        label.textContent = goal.name;
        wrapper.appendChild(label);

        const progress = document.createElement("progress");
        progress.value = goal.value;
        progress.max = goal.goal;
        wrapper.appendChild(progress);

        const display = document.createElement("div");
        display.textContent = `${goal.value.toLocaleString("ru-RU")} ₽ из ${goal.goal.toLocaleString("ru-RU")} ₽`;
        wrapper.appendChild(display);

        container.appendChild(wrapper);
      });
    })
    .catch(error => {
      console.error("Ошибка:", error);
      const container = document.getElementById("donation-container");
      container.textContent = "Ошибка загрузки данных пожертвований.";
    });
});
