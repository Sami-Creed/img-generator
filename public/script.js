console.log('script.js loaded');


document.querySelector('#btnLoad').addEventListener('click', () => {
	if (document.querySelector('#dinoName') !== null) {
		document.querySelector('#dinoName').remove();
	}
	if (document.querySelector('#dinoImage') !== null) {
		document.querySelector('#dinoImage').remove();
	}
	getDinoName();
  getDinoImage();
});

async function getDinoName() {
  try {
    const response = await fetch('/dinoname');
    
    // Check if the response is okay (status 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('API Response:', data); // Log the response for debugging

    // Assuming data is an array of strings
    // If data is directly an array of names, use data instead of data.data
    let dinoNames = Array.isArray(data) ? data : data.data;

    if (!Array.isArray(dinoNames)) {
      throw new Error('Unexpected response format');
    }

    // Get a random dinosaur name
    let dinoName = dinoNames[Math.floor(Math.random() * dinoNames.length)];
    console.log(dinoName);

    let dinoNameDiv = document.createElement('div');
    dinoNameDiv.id = 'dinoName';
    dinoNameDiv.textContent = dinoName;
    document.querySelector('#dinoWrapper').appendChild(dinoNameDiv);

  } catch (error) {
    console.error('Error fetching dinosaur names:', error);
  }
}




async function getDinoImage() {
  try {
    const response = await fetch('/dinoimage');

    // Check if the response is okay (status 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    //console.log('API Response:', data); // Log the entire response for debugging

    // Check if 'data' exists and is an array
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('Unexpected response format');
    }

    // Randomly select an image URL
    let dinoimage = data.data[Math.floor(Math.random() * data.data.length)];
    let dinoImageurl = dinoimage.url;
    let dinoAlt = dinoimage.title;
    
    console.log(dinoimage); // Log the randomly selected image URL

    let img = document.createElement('img');
    img.id = 'dinoImage';
    img.src = dinoImageurl;
    img.alt = dinoAlt;
    document.querySelector('#dinoWrapper').appendChild(img);

  } catch (error) {
    console.error('Error fetching dinosaur images:', error);
  }

  


}
