const ourDogsEl = document.getElementById('our-dogs');
let dogSectionEl = document.querySelector('.dog-section');


async function getDogs() {
    let dogs = await fetch('dogs.json');
    dogs = await dogs.json();
    console.log(dogs);

    dogs.forEach(dog => {

        dogSectionEl.innerHTML += `
            <article class="dog-card">
                <aside id="${dog.chipNumber}">here</aside>
                <img src="${dog.img}" alt="dog">
                <ul>
                    <li>name: ${dog.name}</li>
                    <li>age: ${dog.age}</li>
                    <li>sex: ${dog.sex}</li>
                    <li>chipID: ${dog.chipNumber}</li>
                    <li>owner: ${dog.owner.name} ${dog.owner.lastName}</li>
                    <li>phone: ${dog.owner.phoneNumber}</li>
                </ul>
            </article>
        `
        if (!dog.present) {
            document.getElementById(dog.chipNumber).style.display = 'none';
        }

    });
};

ourDogsEl.addEventListener('click', () => {
    document.querySelector('header').style.display = 'none';
    document.querySelector('main').style.display = 'flex';

    getDogs();
});


// om hunden inte är här, display = none
// glöm inte take me back
// hantera error?