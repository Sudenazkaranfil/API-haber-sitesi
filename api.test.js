const fetch = require('node-fetch'); // node-fetch modülünü yüklemelisiniz

const testAPI = async () => {
  try {
    const response = await fetch('https://api.collectapi.com/news/getNews?country=tr', {
      method: 'GET',
      headers: {
        'Authorization': 'apikey 1DJKLm5qtodEjJEN13WQsz:0c8rTdKZh7xLN9AxakRcRt'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('API Response:', data);
    } else {
      console.log('API Error:', response.status);
    }
  } catch (error) {
    console.log('API Error:', error);
  }
};

testAPI();
