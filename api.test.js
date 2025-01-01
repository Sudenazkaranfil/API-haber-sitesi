const fetch = require('node-fetch');

const testAPI = async () => {
  try {
    const response = await fetch('https://api.collectapi.com/news/getNews?country=tr', {
      method: 'GET',
      headers: {
        'Authorization': 'apikey 1DJKLm5qtodEjJEN13WQsz:0c8rTdKZh7xLN9AxakRcR',
        'Content-Type': 'application/json'
      }
    });

    // API yanıtının başarılı olup olmadığını kontrol et
    if (response.ok) {
      const data = await response.json();
      console.log('Test passed: API is reachable.');
      console.log('Response Data:', data); // Yanıtı yazdır
    } else {
      console.log('Test failed: API returned a non-200 status code.');
      console.log('Status Code:', response.status);
    }
  } catch (error) {
    console.log('Test failed: API is not reachable.');
    console.error(error);
  }
};

// Testi çalıştır
testAPI();
