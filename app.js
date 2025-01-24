let latitude;
let longitude;

const cardTitle = document.querySelector('.card-title');
const cardText = document.querySelector('.card-text');
const locBtn = document.querySelector('#LocBtn')

function getLoc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Get the latitude and longitude
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            // Update the page with the latitude and longitude


            console.log(latitude)
            console.log(longitude)

            fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=930278800105786893005x4448`).then((res) => {
                return res.json();
            }).then((locationData) => {

                cardTitle.innerHTML = `<strong>${locationData.standard.city}</strong>, 
                <strong>${locationData.state}</strong>, <strong>${locationData.country}</strong>.`

                const paragraphContent = `
                You are currently located in <strong>${locationData.standard.city}</strong>, 
                <strong>${locationData.state}</strong>, <strong>${locationData.country}</strong>. 
                This beautiful region, known for its vibrant culture, is in the <strong>${locationData.region}</strong> area. 
                The postal code for your location is <strong>${locationData.postal}</strong>, 
                and your coordinates are approximately <strong>${locationData.latt}</strong> latitude 
                and <strong>${locationData.longt}</strong> longitude. 
                You are at an elevation of <strong>${locationData.elevation}</strong> meters above sea level, 
                within the <strong>${locationData.timezone}</strong> timezone. 
                This place has rich history and offers a unique blend of modernity and tradition, 
                making it a truly remarkable location.`;

                cardText.innerHTML = paragraphContent;
                console.log(locationData);


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

