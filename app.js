console.log("=> JS UTAMA BERHASIL DIPANGGIL BROWSER <=");

/**
 * ASSET MANAGEMENT SYSTEM - CORE APP LOGIC
 */

// =========================================================================
// 1. CONFIGURATION
// =========================================================================
const CF_WORKER_URL ="https://management-asset-bouncer.xanimeindo12.workers.dev";
const API_KEY ="DSE-Aset-Project-Leannixx";

/**
 * Load HTML component into a container (GitHub Pages Adaptive)
 */
async function loadComponent(targetContainerId, fileName) {
    try {
        // 1. Dapatkan lokasi direktori saat ini (mengatasi masalah sub-folder repo GitHub)
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);

        // 2. Gabungkan jalur dengan nama file dan berikan suntikan anti-cache (Timestamp)
        const finalUrl = `${window.location.origin}${basePath}${fileName}?v=${new Date().getTime()}`;

        // 3. Fetch dengan header tambahan untuk memastikan browser tidak mengambil dari cache
        const response = await fetch(finalUrl, { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status} saat memuat ${fileName}`);

        const htmlText = await response.text();
        const container = document.getElementById(targetContainerId);

        if (container) {
            container.innerHTML = htmlText;
            console.log(`Successfully loaded component: ${fileName}`);
        } else {
            console.error(`Gagal menyuntikkan data, ID container [${targetContainerId}] tidak ada di index.html`);
        }
    } catch (error) {
        console.error(`Eror fatal pada loader komponen [${fileName}]:`, error);
    }
}

/**
 * Switch application views dynamically
 */
async function switchPage(viewName) {
    const meta = {
        'dashboard': { title: 'Dashboard Overview', desc: 'Ringkasan dan statistik aset IT.' },
        'inventory': { title: 'Daftar Inventaris Aset', desc: 'DATABASE INVENTARIS PERANGKAT DAN HARDWARE ORGANISASI' },
        'accessories': { title: 'Suku Cadang & Aksesoris', desc: 'Kelola inventaris komponen tambahan.' },
        'borrowings': { title: 'Peminjaman Aset', desc: 'Catat peminjaman aset oleh karyawan.' },
        'dailylogs': { title: 'Daily Activity Logs', desc: 'MANAJEMEN AKTIVITAS OPERASIONAL DIGITAL' },
        'maintenance': { title: 'Maintenance Scheduler', desc: 'JADWAL PERAWATAN RUTIN PERANGKAT' },
        'kpi': { title: 'PA Performance KPI', desc: 'Indikator kinerja utama tim IT.' },
        'evidence': { title: 'DOKUMENTASI KEGIATAN SUPPORT & MAINTENANCE', desc: 'Visualisasi bukti pengerjaan (evident) yang diklasifikasikan.' },
        'vendor': { title: 'Populasi Vendor Unit', desc: 'Data distribusi aset berdasarkan vendor.' },
        'status': { title: 'Status Sebaran Unit', desc: 'Peta sebaran aset di seluruh area.' },
        'pica': { title: 'PICA', desc: 'Problem Identification & Corrective Action.' },
        'team': { title: 'Kelola Tim & User', desc: 'MANAJEMEN AKSES & ANGGOTA TIM' }
    };

    if (!meta[viewName]) return;

    // Update UI Header
    const pageHeader = document.getElementById('page-header');
    if (pageHeader) {
        if (viewName === 'evidence' || viewName === 'team') {
            pageHeader.classList.add('hidden');
        } else {
            pageHeader.classList.remove('hidden');
            const titleEl = document.getElementById('current-tab-title');
            const descEl = document.getElementById('current-tab-desc');
            if (titleEl) titleEl.innerText = meta[viewName].title;
            if (descEl) descEl.innerText = meta[viewName].desc;
        }
    }

    // Load external component dynamically
    await loadComponent('content-container', `./${viewName}.html`);

    // Inject Page Actions
    const actionContainer = document.getElementById('view-actions-container');
    if (actionContainer) {
        if (viewName === 'inventory') {
            actionContainer.innerHTML = `
                <div class="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                    <span class="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span class="text-xs font-bold text-slate-600 uppercase tracking-widest">GAS Engine Connected</span>
                </div>
                <button class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-full shadow-md shadow-indigo-200 transition-all flex items-center gap-2 text-sm ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                    TAMBAH PERANGKAT
                </button>
            `;
        } else if (viewName === 'dailylogs') {
            actionContainer.innerHTML = `
                <div class="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span class="text-sm font-semibold text-slate-600">Juni 2026</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
                <button class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-full shadow-md shadow-indigo-200 transition-all flex items-center gap-2 text-sm ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                    ADD NEW ACTIVITY
                </button>
            `;
        } else {
            actionContainer.innerHTML = '';
        }
    }

    // Run specific logic per view
    if (viewName === 'inventory') fetchReferences();

    // Re-initialize form listeners for the new dynamic content
    initFormListeners();

    // Update Sidebar Navigation Active State
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-violet-500', 'text-white', 'shadow-lg', 'shadow-violet-500/20', 'font-semibold', 'animate-glow-lavender');
        btn.classList.add('text-slate-600', 'hover:bg-slate-100');
        const svg = btn.querySelector('svg');
        if (svg) svg.classList.remove('text-white', 'animate-bounce-small', 'text-violet-500');
    });

    document.querySelectorAll('.nav-sub-btn').forEach(btn => {
        btn.classList.remove('bg-violet-500', 'text-white', 'font-semibold', 'animate-glow-lavender');
        btn.classList.add('text-slate-600', 'hover:bg-slate-100');
    });

    const activeBtn = document.getElementById(`btn-${viewName}`);
    if (activeBtn) {
        if (activeBtn.classList.contains('nav-btn')) {
            activeBtn.classList.add('bg-violet-500', 'text-white', 'shadow-lg', 'shadow-violet-500/20', 'font-semibold', 'animate-glow-lavender');
            activeBtn.classList.remove('text-slate-600', 'hover:bg-slate-100');
            const svg = activeBtn.querySelector('svg');
            if (svg) svg.classList.add('text-white', 'animate-bounce-small');
        } else if (activeBtn.classList.contains('nav-sub-btn')) {
            activeBtn.classList.add('bg-violet-500', 'text-white', 'font-semibold', 'animate-glow-lavender');
            activeBtn.classList.remove('text-slate-600', 'hover:bg-slate-100');
        }
    }
}

// =========================================================================
// 3. API SERVICE
// =========================================================================

async function fetchReferences() {
    showLoading(true);
    try {
        const response = await fetch(`${CF_WORKER_URL}?action=get_references`, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY
            }
        });
        const result = await response.json();
        if (result.status === 'success') {
            populateDropdown('category', result.data.categories);
            populateDropdown('location', result.data.locations);
            populateDropdown('department', result.data.departments);
        }
    } catch (error) {
        showAlert("Gagal memuat data referensi.", "error");
    } finally {
        showLoading(false);
    }
}

function populateDropdown(name, items) {
    const selects = document.querySelectorAll(`select[name="${name}"]`);
    selects.forEach(select => {
        select.innerHTML = '<option value="">-- Pilih --</option>';
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.text = item;
            select.appendChild(option);
        });
    });
}

// =========================================================================
// 4. GLOBAL EVENT LISTENERS
// =========================================================================

// Form Submit Delegation
function initSidebarListeners() {
    const sidebar = document.getElementById('sidebar-container');
    if (!sidebar) return;

    sidebar.addEventListener('click', (e) => {
        const groupBtn = e.target.closest('.nav-group-btn');
        if (groupBtn) {
            const targetId = groupBtn.getAttribute('data-target');
            const submenu = document.getElementById(targetId);
            const chevron = groupBtn.querySelector('.chevron-icon');

            if (submenu) {
                const isOpening = !submenu.classList.contains('open');

                // Tutup semua submenu lain terlebih dahulu (Optional, untuk kebersihan UI)
                document.querySelectorAll('[id^="submenu-"]').forEach(s => s.classList.remove('open'));
                document.querySelectorAll('.chevron-icon').forEach(c => c.classList.remove('rotate-180'));

                // Jika sebelumnya tertutup, maka buka
                if (isOpening) {
                    submenu.classList.add('open');
                    if (chevron) chevron.classList.add('rotate-180');

                    // Auto-select sub-kategori pertama
                    const firstSubBtn = submenu.querySelector('.nav-sub-btn');
                    if (firstSubBtn) firstSubBtn.click();
                }
            } else {
                console.error(`Submenu dengan ID ${targetId} tidak ditemukan.`);
            }
            return;
        }

        const btn = e.target.closest('.nav-btn, .nav-sub-btn');
        if (btn && btn.id) {
            const view = btn.id.replace('btn-', '');
            if (view && !btn.classList.contains('nav-group-btn')) {
                switchPage(view);
            }
        }
    });
}

function initFormListeners() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const sheetName = this.dataset.sheet;
            const formData = new FormData(this);
            const dataObject = {};
            formData.forEach((value, key) => dataObject[key] = value);

            showLoading(true); hideAlert();
            try {
                const response = await fetch(CF_WORKER_URL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": API_KEY
                    },
                    body: JSON.stringify({ targetSheet: sheetName, data: dataObject })
                });
                const result = await response.json();
                if (result.status === "success") {
                    showAlert(`Berhasil disimpan ke ${sheetName}!`, "success");
                    this.reset();
                } else throw new Error(result.message);
            } catch (error) { showAlert("Error: " + error.message, "error"); }
            finally { showLoading(false); }
        });
    });
}

// =========================================================================
// 5. UI UTILITIES
// =========================================================================
function showLoading(isVisible) {
    const indicator = document.getElementById('loading-indicator');
    if (!indicator) return;
    if (isVisible) indicator.classList.remove('hidden');
    else indicator.classList.add('hidden');
}
function showAlert(message, type) {
    const banner = document.getElementById('alert-banner');
    if (!banner) return;
    document.getElementById('alert-message').innerText = message;
    banner.classList.remove('hidden');
    banner.className = `mb-6 p-4 rounded-xl shadow-sm border flex justify-between items-center ${type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`;
    setTimeout(hideAlert, 5000);
}
function hideAlert() {
    const banner = document.getElementById('alert-banner');
    if (banner) banner.classList.add('hidden');
}

// 6. INIT
window.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('sidebar-container', './sidebar.html');
    initSidebarListeners();
    initFormListeners();
    switchPage('dashboard');
});
