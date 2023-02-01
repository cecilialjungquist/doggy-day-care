let dogSectionEl = document.querySelector('.dog-section');
const checkbox = document.getElementById('checkbox');
const searchField = document.getElementById('search-field');
const searchBtn = document.getElementById('search-btn');
let dogs = '';

async function getDogs() {

    dogs = await fetch('dogs.json');
    dogs = await dogs.json();
    
    dogs.forEach(dog => {
        let newDog = document.createElement('article');
        newDog.classList.add('dog-card');
        newDog.setAttribute('id', dog.chipNumber);
        newDog.innerHTML = `
                <aside>here</aside>
                <img src="${dog.img}" alt="dog">
                <ul>
                    <li>name: ${dog.name}</li>
                    <li>age: ${dog.age}</li>
                    <li>sex: ${dog.sex}</li>
                    <li>chipID: ${dog.chipNumber}</li>
                    <li>owner: ${dog.owner.name} ${dog.owner.lastName}</li>
                    <li>phone: ${dog.owner.phoneNumber}</li>
                </ul>
            `;
        dogSectionEl.appendChild(newDog);
        
        if (!dog.present) {
            // Kom på en bättre lösning här?
            document.querySelector(`#${dog.chipNumber} aside`).style.display = 'none';
        }

        // Lagrar html så den alltid finns
        dog.html = newDog;
    });
};

getDogs();

checkbox.addEventListener('change', () => {
    let val = checkbox.checked;

    if (val) {
        dogSectionEl.innerHTML = '';
        dogs.forEach(dog => {
            if (dog.present) {
                dogSectionEl.appendChild(dog.html)
            }
        });
    } else {
        location.reload();
    }
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Töm checkboxen
    checkbox.checked = false;
    let searchTerm = searchField.value;
    searchTerm = searchTerm.toLowerCase();
    // Töm dog-section
    dogSectionEl.innerHTML = '';

    dogs.forEach(dog => {
        if (dog.name.toLowerCase() === searchTerm 
            || dog.owner.name.toLowerCase() === searchTerm
            || dog.owner.phoneNumber === searchTerm 
            || dog.owner.lastName.toLowerCase() === searchTerm
            || dog.owner.name.toLowerCase() + ' ' + dog.owner.lastName.toLowerCase() === searchTerm ) {

            dogSectionEl.appendChild(dog.html);

            if (!dog.present) {
                document.querySelector(`#${dog.chipNumber} aside`).style.display = 'none';
            }
        }
    });
});