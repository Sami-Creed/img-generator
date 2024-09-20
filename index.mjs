import fetch from 'node-fetch';
import express from 'express';
import 'dotenv/config'

const app = express();
const port = 3000;

app.use(express.static('public'));

 // Route for the root URL
// app.get('/', (req, res) => {

// });

app.get('/dinoname', async (req, res) => {
  const url = 'https://cat-breeds.p.rapidapi.com/cat_breeds';

  try {
    const fetchapi = await fetch(url, {
      method: 'GET',
      headers: {
            'x-rapidapi-key': process.env.rapid_api_key_dino_name,
    'x-rapidapi-host': 'cat-breeds.p.rapidapi.com'
      }
    });

    const catResponse = await fetchapi.json();
    //console.log('API Response:', catResponse); // Log the response for debugging

    // Check if dogResponse is an array
    if (!Array.isArray(catResponse)) {
      return res.status(500).json({ error: 'Unexpected response format' });
    }

    // Extract breeds and append " cat" to each
    const breeds = catResponse.map(cat => `${cat.breed} cat`);

    res.json(breeds);
    //console.log(breeds);
  } catch (error) {
    console.error('Error fetching dog data:', error);
    res.status(500).json({ error: 'Failed to fetch dog names' });
  }
});
app.get('/dinoimage', async (req, res) => {
  const url = 'https://real-time-image-search.p.rapidapi.com/search?query=beach&limit=10&size=any&color=any&type=any&time=any&usage_rights=any&file_type=any&aspect_ratio=any&safe_search=off&region=us';

  try {
    const fetchapi = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.rapid_api_key,
		'x-rapidapi-host': 'real-time-image-search.p.rapidapi.com'
      }
    });

    const dinoImgResponse = await fetchapi.json();
    //console.log('API Response:', dinoImgResponse); // Log the response for debugging


    

    res.json(dinoImgResponse);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
