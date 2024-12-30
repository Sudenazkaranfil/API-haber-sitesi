const apiKey = '1DJKLm5qtodEjJEN13WQsz:0c8rTdKZh7xLN9AxakRcRt'; // API anahtarı
const baseUrl = "https://api.collectapi.com/news/getNews?country=tr";
const newsContainer = document.getElementById('news-container');
const loadingIndicator = document.getElementById('loading');
const homePage = document.getElementById('home-page');
const backToHomeBtn = document.getElementById('back-to-home');
const languageIcons = document.querySelectorAll(".language-icon");

let currentLanguage = "tr"; // Varsayılan dil Türkçe

// Dil seçimi değiştiğinde güncelle
languageIcons.forEach(icon => {
  icon.addEventListener("click", (event) => {
    currentLanguage = event.target.dataset.lang;
    updateLanguageTexts();
  });
});

// Sabit metinleri dile göre güncelle
function updateLanguageTexts() {
  const texts = {
    tr: {
      general: "Genel",
      health: "Sağlık",
      technology: "Teknoloji",
      economy: "Ekonomi",
      backToHome: "Ana Sayfaya Dön",
      welcome: "Hoş Geldiniz!",
      chooseCategory: "Kategorilerden birini seçerek haberleri görüntüleyebilirsiniz.",
      loading: "Haberler yükleniyor...",
      noNews: "Kategoriye ait haber bulunamadı.",
      readMore: "Haberin Detayları",
      searchPlaceholder: "Kategori ara...",
      latestNews: "En Güncel Haberler"
    },
    en: {
      general: "General",
      health: "Health",
      technology: "Technology",
      economy: "Economy",
      backToHome: "Back to Home",
      welcome: "Welcome!",
      chooseCategory: "Choose a category to view news.", 
      loading: "Loading news...",
      noNews: "No news found for this category.",
      readMore: "Read More",
      searchPlaceholder: "Search category...",
      latestNews: "Latest News"
    },
};
    // En güncel haberler metnini güncelle
    const latestNewsElement = document.getElementById("latest-news");
    if (latestNewsElement) {
      latestNewsElement.textContent = texts[currentLanguage].latestNews;
    }
      // "Haberler yükleniyor" metnini güncelle
    const loadingIndicator = document.getElementById("loading");
    if (loadingIndicator) {
      loadingIndicator.textContent = texts[currentLanguage].loading;
    }

    // Arama çubuğunun placeholder'ını güncelle
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.placeholder = texts[currentLanguage].searchPlaceholder;
    }
    // Kategori butonlarını güncelle
    document.querySelectorAll(".category-btn").forEach((btn) => {
      const category = btn.dataset.category;
      btn.textContent = texts[currentLanguage][category];
    });

    // Ana sayfa metinlerini güncelle
    document.getElementById("back-to-home").textContent = texts[currentLanguage].backToHome;
    document.getElementById("home-page").innerHTML = 
      `<h2>${texts[currentLanguage].welcome}</h2>
      <p>${texts[currentLanguage].chooseCategory}</p>`;
}


// Haberleri Çekme
function fetchNews(category) {
  const url = `${baseUrl}&tag=${category}`;
  newsContainer.innerHTML = '';
  loadingIndicator.style.display = 'block';
  homePage.style.display = 'none';

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `apikey ${apiKey}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      loadingIndicator.style.display = 'none';
      if (data.success && data.result.length > 0) {
        displayNews(data.result);
      } else {
        newsContainer.innerHTML = `<p>${currentLanguage === "tr" ? "Kategoriye ait haber bulunamadı." : "No news found for this category."}</p>`;
      }
    })
    .catch(error => {
      loadingIndicator.style.display = 'none';
      newsContainer.innerHTML = `<p>Haberler alınırken bir hata oluştu. Hata: ${error.message}</p>`;
    });
}

// Haberleri Görüntüleme
function displayNews(newsArray) {
  newsContainer.innerHTML = ""; 
  newsArray.forEach((news) => {
    const newsElement = document.createElement("div");
    newsElement.classList.add("news-article");

    const formattedDate = new Date(news.date).toLocaleDateString(currentLanguage, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    newsElement.innerHTML = 
      `<img src="${news.image}" alt="${news.name}">
      <div>
        <h2>${news.name}</h2>
        <p><strong>${formattedDate}</strong></p>
        <p>${news.description}</p>
        <a href="${news.url}" target="_blank">${currentLanguage === "tr" ? "Haberin Detayları" : "Read More"}</a>
      </div>`;
    newsContainer.appendChild(newsElement);
  });
}

// Kategori Düğmelerine Tıklama
document.querySelectorAll('.category-btn').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    fetchNews(category);
    backToHomeBtn.style.display = 'block'; // Ana sayfaya dön butonunu göster
  });
});

// Ana Sayfaya Dönme İşlevi
backToHomeBtn.addEventListener('click', () => {
  newsContainer.innerHTML = '';
  homePage.style.display = 'block'; 
  backToHomeBtn.style.display = 'none'; 
});

//Ana Sayfayı Göster
window.addEventListener('load', () => {
  homePage.style.display = 'block'; // Ana sayfa görünsün
  newsContainer.innerHTML = ''; 
  backToHomeBtn.style.display = 'none'; 
  updateLanguageTexts(); // Varsayılan dil metinlerini ayarla
});

// Haberleri saklamak için bir değişken
let currentNews = [];

// Haberleri arama çubuğunda filtrele
function searchNews(keyword) {
  const filteredNews = currentNews.filter(news => 
    news.name.toLowerCase().includes(keyword.toLowerCase()) || 
    news.description.toLowerCase().includes(keyword.toLowerCase())
  );

  if (filteredNews.length > 0) {
    displayNews(filteredNews);
  } else {
    newsContainer.innerHTML = `<p>${currentLanguage === "tr" ? "Aramanıza uygun haber bulunamadı." : "No news found matching your search."}</p>`;
  }
}

// Arama butonuna tıklama olayını dinle
document.getElementById("search-btn").addEventListener("click", (event) => {
  event.preventDefault();  // Sayfanın yeniden yüklenmesini engelle
  const keyword = document.getElementById("search-bar").value.toLowerCase(); 
  searchAndNavigateToCategory(keyword);
  document.getElementById("search-bar").value = '';  
});

// Kategorilere tıklama işlemiyle yönlendirme
function searchAndNavigateToCategory(keyword) {
  const categoryButtons = document.querySelectorAll('.category-btn');
  let categoryFound = false;

  categoryButtons.forEach(button => {
    const buttonText = button.textContent.toLowerCase();
    if (buttonText.trim() === keyword.trim()) {  // Tam eşleşme kontrolü
      button.click();
      categoryFound = true;
    }
  });

  if (!categoryFound) {
    newsContainer.innerHTML = `<p>${currentLanguage === "tr" ? "Kategoriye ait haber bulunamadı." : "No news found for this category."}</p>`;
  }
}

// Haberleri API'den alırken kaydet
function fetchNews(category) {
  const url = `${baseUrl}&tag=${category}`;
  newsContainer.innerHTML = '';
  loadingIndicator.style.display = 'block';
  homePage.style.display = 'none'; // Ana sayfayı gizle

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `apikey ${apiKey}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      loadingIndicator.style.display = 'none';
      if (data.success && data.result.length > 0) {
        currentNews = data.result; // Haberleri kaydet
        displayNews(data.result); // Haberleri göster
      } else {
        newsContainer.innerHTML = `<p>${currentLanguage === "tr" ? "Kategoriye ait haber bulunamadı." : "No news found for this category."}</p>`;
      }
    })
    .catch(error => {
      loadingIndicator.style.display = 'none';
      newsContainer.innerHTML = `<p>Haberler alınırken bir hata oluştu. Hata: ${error.message}</p>`;
    });
}
