const weatherform = document.querySelector('form');
const searchElement = document.querySelector('input');
const value = document.querySelectorAll('#value');
const alert = document.querySelector('#alert');

const returnli = (message) => {
    const li = doucument.createElement('li');
    li.classList.add('list-group-item');
    let node = document.createTextNode(message);
    li.appendChild(node);
    return li;
}

weatherform.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchValue = searchElement.value;
    searchElement.value = "";

    let url = '/weather?address='+searchValue;

    fetch(url).then( (response)=> {
        response.json().then((data) => {
            if(data.error) {
                alert.textContent = data.error;
                alert.style.display="flex";
                setTimeout(() => {
                    alert.style.display="none";
                },5000);
            }else {
                value[0].textContent = data.country;
                value[1].textContent = data.region;
                value[2].textContent = data.temperature + " Celsius";
                value[3].textContent = data.feelslike + " Celsius";
                value[4].textContent = data.humidity;
                value[5].textContent = data.windspeed + " km/hr";
            }
        });
    });
});