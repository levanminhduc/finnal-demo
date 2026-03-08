requireEmployee();
renderHeader();
renderEmployeeSidebar();

function renderList() {
  const benefits = getAll('benefits');
  const container = document.getElementById('benefitCards');
  if (!benefits.length) {
    container.innerHTML = '<div class="col-span-full text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200"><p class="text-sm text-slate-400 font-medium">Chưa có phúc lợi nào.</p></div>';
    return;
  }
  container.innerHTML = benefits.map(b => `
    <div class="card bg-white hover:scale-[1.02] transition-all duration-300 group">
      <div class="flex items-center gap-4 mb-4">
        <div class="p-3 rounded-2xl bg-primary-50 text-primary-600 shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-colors">
          ${ICONS.benefits}
        </div>
        <div>
          <h3 class="font-black text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors text-lg">${b.title || b.name || '—'}</h3>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Phúc lợi nhân viên</p>
        </div>
      </div>
      <p class="text-sm text-slate-600 leading-relaxed font-medium">${b.description || '—'}</p>
    </div>
  `).join('');
}

renderList();
