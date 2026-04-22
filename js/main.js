/**
 * Edrus Educational Platform - Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Navbar Scroll Effect & Mobile Menu Toggle
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    /* ==========================================================================
       2. Stats Counter Animation
       ========================================================================== */
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString('ar-EG');
                }
            };
            updateCount();
        });
    }

    // Use Intersection Observer to trigger counter animation when visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    /* ==========================================================================
       3. Mock Data Rendering - Categories
       ========================================================================== */
    const categoriesData = [
        { id: 1, title: 'الذكاء الاصطناعي', count: '1,245 مرجع', icon: 'fa-brain' },
        { id: 2, title: 'العلوم الطبية', count: '3,890 مرجع', icon: 'fa-staff-snake' },
        { id: 3, title: 'هندسة البرمجيات', count: '2,104 مرجع', icon: 'fa-laptop-code' },
        { id: 4, title: 'إدارة الأعمال', count: '1,560 مرجع', icon: 'fa-chart-line' },
        { id: 5, title: 'الفيزياء والرياضيات', count: '985 مرجع', icon: 'fa-subscript' },
        { id: 6, title: 'الأدب واللغات', count: '4,120 مرجع', icon: 'fa-language' },
        { id: 7, title: 'الهندسة المعمارية', count: '870 مرجع', icon: 'fa-building' },
        { id: 8, title: 'القانون والسياسة', count: '1,320 مرجع', icon: 'fa-scale-balanced' }
    ];

    const categoriesGrid = document.getElementById('categoriesGrid');
    if (categoriesGrid) {
        categoriesData.forEach(cat => {
            const el = document.createElement('div');
            el.className = 'category-card';
            el.innerHTML = `
                <div class="category-icon">
                    <i class="fa-solid ${cat.icon}"></i>
                </div>
                <h3 class="category-title">${cat.title}</h3>
                <p class="category-count">${cat.count}</p>
            `;
            categoriesGrid.appendChild(el);
        });
    }

    /* ==========================================================================
       4. Mock Data Rendering - Featured Resources (Books & Research)
       ========================================================================== */
    const resourcesData = [
        { id: 1, title: 'أساسيات تعلم الآلة والشبكات العصبية', author: 'د. أحمد محمود', type: 'book', typeLabel: 'كتاب', downloads: 1250, pages: 320, icon: 'fa-book' },
        { id: 2, title: 'تأثير التغير المناخي على زراعة القمح بالمناطق الجافة', author: 'د. سارة خليل', type: 'research', typeLabel: 'بحث', downloads: 480, pages: 45, icon: 'fa-file-pdf' },
        { id: 3, title: 'تاريخ العمارة الإسلامية في الأندلس', author: 'الباحث يوسف إبراهيم', type: 'book', typeLabel: 'كتاب', downloads: 890, pages: 410, icon: 'fa-book-open' },
        { id: 4, title: 'استخدام خوارزميات التشفير في قواعد البيانات', author: 'م. ليلى حسن', type: 'research', typeLabel: 'بحث', downloads: 620, pages: 65, icon: 'fa-file-code' },
        { id: 5, title: 'أصول الإدارة الحديثة للشركات الناشئة', author: 'د. طارق زيد', type: 'book', typeLabel: 'كتاب', downloads: 2100, pages: 275, icon: 'fa-address-book' },
        { id: 6, title: 'تطوير لقاحات الحمض النووي الريبوزي', author: 'فريق بحث طبي', type: 'research', typeLabel: 'بحث', downloads: 3500, pages: 120, icon: 'fa-microscope' }
    ];

    const resourcesGrid = document.getElementById('resourcesGrid');
    
    // Render function
    const renderResources = (filterType = 'all') => {
        if (!resourcesGrid) return;
        resourcesGrid.innerHTML = '';
        
        const filtered = filterType === 'all' 
            ? resourcesData 
            : resourcesData.filter(item => item.type === filterType);
            
        filtered.forEach(item => {
            const isBook = item.type === 'book';
            const iconBg = isBook ? 'linear-gradient(135deg, #0ea5e9, #38bdf8)' : 'linear-gradient(135deg, #f97316, #fb923c)';
            
            const card = document.createElement('div');
            card.className = 'resource-card';
            card.innerHTML = `
                <div class="resource-header" style="background: ${iconBg}">
                    <span class="resource-type">${item.typeLabel}</span>
                    <i class="fa-solid ${item.icon} resource-icon"></i>
                </div>
                <div class="resource-body">
                    <h3 class="resource-title">${item.title}</h3>
                    <p class="resource-author"><i class="fa-solid fa-pen-nib"></i> ${item.author}</p>
                    <div class="resource-meta">
                        <div class="resource-stats">
                            <span><i class="fa-solid fa-download"></i> ${item.downloads}</span>
                            <span><i class="fa-regular fa-file-lines"></i> ${item.pages} ص</span>
                        </div>
                        <button class="btn-download" title="تحميل"><i class="fa-solid fa-arrow-down"></i></button>
                    </div>
                </div>
            `;
            resourcesGrid.appendChild(card);
        });
    };

    // Initial render
    renderResources();

    /* ==========================================================================
       5. Filtering Tab Logic
       ========================================================================== */
    const filterTabs = document.querySelectorAll('.filter-tab');
    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class
                filterTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');
                // Re-render
                renderResources(tab.getAttribute('data-filter'));
            });
        });
    }

    /* ==========================================================================
       6. Search Button Alert (Mock Action)
       ========================================================================== */
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const input = document.getElementById('searchInput');
            if (input.value.trim() !== '') {
                alert('جاري البحث عن: ' + input.value);
            } else {
                alert('الرجاء إدخال كلمة للبحث');
            }
        });
    }
});
