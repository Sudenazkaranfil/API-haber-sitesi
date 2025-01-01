const https = require('https');

// API test fonksiyonu
const testAPI = () => {
  const options = {
    hostname: 'api.collectapi.com',
    path: '/news/getNews?country=tr',
    method: 'GET',
    headers: {
      'Authorization': 'apikey 1DJKLm5qtodEjJEN13WQsz:0c8rTdKZh7xLN9AxakRcR',
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      // API yanıtını kontrol et
      if (res.statusCode === 200) {
        console.log('Test passed: API is reachable.');
        console.log('Response Data:', JSON.parse(data)); // Yanıtı yazdır
      } else {
        console.log('Test failed: API returned a non-200 status code.');
        console.log('Status Code:', res.statusCode);
      }
    });
  });

  req.on('error', (error) => {
    console.log('Test failed: API is not reachable.');
    console.error(error);
  });

  req.end();
};

// Testi çalıştır
testAPI();

