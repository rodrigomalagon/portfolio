'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// expandable variables
const expandableItems = document.querySelectorAll("[data-expandable-item]");


// modal variables
const overlay = document.querySelector("[data-overlay]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const expandModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < expandableItems.length; i++) {

  expandableItems[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-expandable-img]").src;
    modalImg.alt = this.querySelector("[data-expandable-img]").alt;
    modalImg.className = this.querySelector("[data-expandable-img]").className;
    modalTitle.innerHTML = this.querySelector("[data-expandable-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-expandable-text]").innerHTML;

    expandModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", expandModalFunc);
overlay.addEventListener("click", expandModalFunc);




// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
//const form = document.querySelector("[data-form]");
//const formInputs = document.querySelectorAll("[data-form-input]");
//const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
//for (let i = 0; i < formInputs.length; i++) {
//  formInputs[i].addEventListener("input", function () {

    // check form validation
    //if (form.checkValidity()) {
     // formBtn.removeAttribute("disabled");
   // } else {
    //  formBtn.setAttribute("disabled", "");
   // }

  //});
//}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-page-target]");
const pages = document.querySelectorAll("[data-page]");
const homeLink = document.querySelector("[data-page-target='about']");

const setActivePage = function (targetPage) {
  for (let i = 0; i < pages.length; i++) {
    const isActive = pages[i].dataset.page === targetPage;
    pages[i].classList.toggle("active", isActive);
  }

  for (let i = 0; i < navigationLinks.length; i++) {
    const isActive = navigationLinks[i].dataset.pageTarget === targetPage;
    navigationLinks[i].classList.toggle("active", isActive);
  }

  window.scrollTo(0, 0);
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    setActivePage(this.dataset.pageTarget);

  });
}

if (homeLink) {
  homeLink.addEventListener("click", function () {
    setActivePage("about");
  });
}


// ============================================================
// i18n — Language selector EN / ES
// ============================================================

(function () {
  // Default language
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'portfolio_lang';

  // Get initial language from localStorage or browser preference
  function getInitialLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    const browser = navigator.language?.slice(0, 2).toLowerCase();
    return browser === 'es' ? 'es' : DEFAULT_LANG;
  }

  // Apply language to all elements marked with data-i18n
  function applyLang(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text) {
        // Use textContent for plain text, innerHTML for elements with nested tags
        if (el.innerHTML === el.textContent) {
          // Pure text content
          el.textContent = text;
        } else {
          // Has nested HTML
          el.innerHTML = text;
        }
      }
    });

    const cvLinks = document.querySelectorAll('[data-cv-link]');
    cvLinks.forEach(link => {
      const nextHref = link.getAttribute(`data-cv-${lang}`);
      if (nextHref) {
        link.setAttribute('href', nextHref);
      }
    });

    // Update language button label
    const btn = document.getElementById('lang-current');
    if (btn) btn.textContent = lang.toUpperCase();

    // Save preference
    localStorage.setItem(STORAGE_KEY, lang);

    // Update html lang attribute for accessibility
    document.documentElement.setAttribute('lang', lang === 'es' ? 'es' : 'en');
  }

  // Initialize
  let currentLang = getInitialLang();
  applyLang(currentLang);

  // Event listener for toggle button
  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      currentLang = currentLang === 'en' ? 'es' : 'en';
      applyLang(currentLang);
    });
  }
})();

// ============================================================
// FASE 4: Interactividad avanzada
// ============================================================

(function () {
  const mapExpandBtn = document.querySelector('[data-map-expand-btn]');
  const mapModalContainer = document.querySelector('[data-map-modal-container]');
  const mapModalOverlay = document.querySelector('[data-map-modal-overlay]');
  const mapModalCloseBtn = document.querySelector('[data-map-modal-close-btn]');

  let madridLeafletMap = null;
  let pollutionLayer = null;

  function getColorByMean(mean) {
    if (mean >= 30) return '#d73027';
    if (mean >= 29) return '#fc8d59';
    if (mean >= 28) return '#fee090';
    if (mean >= 27) return '#e0f3f8';
    return '#91bfdb';
  }

  function styleFeature(feature) {
    return {
      fillColor: getColorByMean(feature.properties.mean),
      weight: 1.5,
      opacity: 0.8,
      color: '#333',
      fillOpacity: 0.75
    };
  }

  function onEachFeature(feature, layer) {
    const popupContent = `
      <div style="font-family: Arial, sans-serif; font-size: 12px;">
        <strong>${feature.properties.name}</strong><br/>
        Mean NO₂: ${feature.properties.mean.toFixed(2)} µg/m³
      </div>
    `;
    layer.bindPopup(popupContent);
    layer.on('mouseover', function() {
      this.setStyle({ weight: 2.5, opacity: 1, fillOpacity: 0.9 });
    });
    layer.on('mouseout', function() {
      this.setStyle({ weight: 1.5, opacity: 0.8, fillOpacity: 0.75 });
    });
  }

  function addLegend(map) {
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function(map) {
      const div = L.DomUtil.create('div', 'legend');
      div.style.backgroundColor = 'white';
      div.style.padding = '12px';
      div.style.borderRadius = '6px';
      div.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
      div.style.fontFamily = 'Arial, sans-serif';
      div.style.fontSize = '12px';
      div.style.lineHeight = '1.5';

      const ranges = [
        { min: 30, max: Infinity, color: '#d73027', label: '≥ 30 µg/m³' },
        { min: 29, max: 29.99, color: '#fc8d59', label: '29–30 µg/m³' },
        { min: 28, max: 28.99, color: '#fee090', label: '28–29 µg/m³' },
        { min: 27, max: 27.99, color: '#e0f3f8', label: '27–28 µg/m³' },
        { min: 0, max: 26.99, color: '#91bfdb', label: '< 27 µg/m³' }
      ];

      let html = '<strong style="display: block; margin-bottom: 8px;">NO₂ Mean Pollution (2023)</strong>';
      ranges.forEach(range => {
        html += `
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="display: inline-block; width: 18px; height: 18px; background-color: ${range.color}; border: 1px solid #333;"></span>
            <span>${range.label}</span>
          </div>
        `;
      });

      div.innerHTML = html;
      return div;
    };

    legend.addTo(map);
  }

  function initMadridMap() {
    if (madridLeafletMap || !window.L) return;

    madridLeafletMap = L.map('madrid-map-modal', {
      center: [40.4168, -3.7038],
      zoom: 11,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(madridLeafletMap);

    fetch('./assets/data/madrid_mean_no2_pollution.geojson')
      .then(response => response.json())
      .then(data => {
        pollutionLayer = L.geoJSON(data, {
          style: styleFeature,
          onEachFeature: onEachFeature
        }).addTo(madridLeafletMap);
        addLegend(madridLeafletMap);
      })
      .catch(error => console.error('Error loading GeoJSON:', error));
  }

  function openMapModal() {
    if (!mapModalContainer) return;

    mapModalContainer.classList.add('active');
    mapModalContainer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    initMadridMap();

    if (madridLeafletMap) {
      setTimeout(function () {
        madridLeafletMap.invalidateSize();
      }, 100);
    }
  }

  function closeMapModal() {
    if (!mapModalContainer) return;

    mapModalContainer.classList.remove('active');
    mapModalContainer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mapExpandBtn) {
    mapExpandBtn.addEventListener('click', openMapModal);
  }

  if (mapModalCloseBtn) {
    mapModalCloseBtn.addEventListener('click', closeMapModal);
  }

  if (mapModalOverlay) {
    mapModalOverlay.addEventListener('click', closeMapModal);
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mapModalContainer && mapModalContainer.classList.contains('active')) {
      closeMapModal();
    }
  });
})();

