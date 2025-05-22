document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const title = form.querySelector('input[name="title"]');
    const url = form.querySelector('input[name="url"]');
    const date = form.querySelector('input[name="date"]');
    const titleRegex = /^[\w\s]+$/;

    if (!title.value.trim() || title.value.length > 30 || !titleRegex.test(title.value)) {
      alert('El título debe tener máximo 30 caracteres y solo contener letras, números, espacios o guiones bajos.');
      e.preventDefault();
      return;
    }

    try {
      new URL(url.value);
    } catch {
      alert('URL inválida.');
      e.preventDefault();
      return;
    }

    if (!date.value) {
      alert('La fecha es obligatoria.');
      e.preventDefault();
    }
  });
});