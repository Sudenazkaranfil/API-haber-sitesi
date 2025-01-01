const axios = require('axios');

test('API should return a successful response', async () => {
    const apiKey = '1DJKLm5qtodEjJEN13WQsz:0c8rTdKZh7xLN9AxakRcRt';
    const baseUrl = 'https://api.collectapi.com/news/getNews?country=tr';
    const headers = {
        'Authorization': `apikey ${apiKey}`
    };

    const response = await axios.get(baseUrl, { headers });
    expect(response.status).toBe(200); // HTTP status kodunun 200 (başarılı) olduğunu kontrol eder
    expect(response.data).toBeDefined(); // Gelen verinin tanımlı olup olmadığını kontrol eder
    expect(response.data.result).toBeInstanceOf(Array); // Gelen haberlerin bir dizi olduğunu kontrol eder
});
