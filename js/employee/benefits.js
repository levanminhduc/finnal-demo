requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderList() {
  const benefits = getAll('benefits');
  const container = document.getElementById('benefitCards');
  if (!benefits.length) {
    container.innerHTML = '<p class="text-sm text-slate-400">Chưa có phúc lợi nào.</p>';
    return;
  }
  container.innerHTML = benefits.map(b => `
    <div class="bg-white rounded-md shadow p-4">
      <h3 class="font-semibold text-slate-800 mb-1">${b.title || b.name || '—'}</h3>
      <p class="text-sm text-slate-600">${b.description || '—'}</p>
    </div>
  `).join('');
}

renderList();
