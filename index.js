const ourDogsEl = document.getElementById('our-dogs');

async function getDogs() {
    let dogs = await fetch('dogs.json');
    dogs = await dogs.json();
    console.log(dogs);

    dogs.forEach(dog => {
        console.log(dog.name);
    });
}

ourDogsEl.addEventListener('click', () => {
    document.querySelector('header').style.display = 'none';

});