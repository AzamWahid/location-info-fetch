let latitude;
let longitude;

const cardTitle = document.querySelector('.card-title');
const cardText = document.querySelector('.card-text');
const locBtn = document.querySelector('#LocBtn')
const cardimgtop = document.querySelector('.card-img-top');

function getLoc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Get the latitude and longitude
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            // Update the page with the latitude and longitude


            console.log("Latitude: ", latitude);
            console.log("Longitude: ", longitude);

            fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=930278800105786893005x4448`).then((res) => {
                return res.json();
            }).then((locationData) => {

                fetch(`https://restcountries.com/v3.1/name/${locationData.country}`).then((res) => {
                    return res.json()
                }).then((countryInfo) => {
                    const currencyCode = Object.keys(countryInfo[0].currencies)[0]; // Gets the first currency code
                    const currency = countryInfo[0].currencies[currencyCode];

                    cardimgtop.src = countryInfo[0].flags.png;


                    cardTitle.innerHTML = `<strong>${locationData.standard.city}</strong>, 
                <strong>${locationData.state}</strong>, <strong>${locationData.country}</strong>.`

                    const paragraphContent = 
                //     `
                // You are currently located in <strong>${locationData.standard.city}</strong>, 
                // <strong>${locationData.state}</strong>, <strong>${locationData.country}</strong>. 
                // This beautiful region, known for its vibrant culture, is in the <strong>${locationData.region}</strong> area. 
                // The postal code for your location is <strong>${locationData.postal}</strong>, 
                // and your coordinates are approximately <strong>${locationData.latt}</strong> latitude 
                // and <strong>${locationData.longt}</strong> longitude. 
                // You are at an elevation of <strong>${locationData.elevation}</strong> meters above sea level, 
                // within the <strong>${locationData.timezone}</strong> timezone. 
                // This place has rich history and offers a unique blend of modernity and tradition, 
                // making it a truly remarkable location.`;
                 `
                <p>You are currently located in <strong>${locationData.standard.city}</strong>, 
                <strong>${locationData.state}</strong>, <strong>${countryInfo[0].name.common}</strong>. 
                Your country is <strong>${countryInfo[0].name.common}</strong> (officially <strong>${countryInfo[0].name.official}</strong>), 
                and the national languages are <strong>${countryInfo[0].languages.eng}</strong> and <strong>${countryInfo[0].languages.urd}</strong>.</p>
                
                <p>The capital city is <strong>${countryInfo[0].capital}</strong>, and the population is approximately <strong>${countryInfo[0].population}</strong> people, 
                living in an area of <strong>${countryInfo[0].area}</strong> square kilometers. 
                The currency used is the <strong>${countryInfo[0].currencies.PKR.name}</strong> (symbol: <strong>${countryInfo[0].currencies.PKR.symbol}</strong>).</p>
                
                <p>This beautiful region, known for its vibrant culture, is in the <strong>${locationData.region}</strong> area. 
                The postal code for your location is <strong>${locationData.postal}</strong>, 
                and your coordinates are approximately <strong>${locationData.latt}</strong> latitude 
                and <strong>${locationData.longt}</strong> longitude. 
                You are at an elevation of <strong>${locationData.elevation}</strong> meters above sea level, 
                within the <strong>${locationData.timezone}</strong> timezone. 
                This place has a rich history and offers a unique blend of modernity and tradition, 
                making it a truly remarkable location.</p>
                
                <p>Additionally, <strong>${countryInfo[0].name.common}</strong> shares its borders with:</p>
                <ul>
                    ${countryInfo[0].borders?.map(border => `<li>${border}</li>`).join('')}
                </ul>
            `;
            

                    cardText.innerHTML = paragraphContent;
                    console.log(locationData);

                })

            })

        }, function (error) {
            // Handle error if geolocation fails
            alert("Error occurred: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }

}

locBtn.addEventListener('click', getLoc);

// let apilink = `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=930278800105786893005x4448`

