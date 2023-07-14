import { fetchBreeds, fetchCatByBreed }  from './cat-api'
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
const refs = {
    selected: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    div : document.querySelector('.cat-info')
}

refs.selected.addEventListener('change', onSelect);
refs.selected.setAttribute("id", "slim-select");

function onSelect(event) {
    fetchCatByBreed(event.target.value)
        .then((response) => {
            console.log(response.data[0]);
            makeMarkCard(response.data[0].breeds[0], response.data[0]);
        }).catch((error) => {

        }).finally(); 


};

fetchBreeds().then((response) => {
    makeMarkOptions(response.data)
     new SlimSelect({
            select: '#slim-select',
    
        });
        }).catch((error) => {

        }).finally(); 


function makeMarkOptions(arr) {
    return arr.forEach(({name, id}) => {
    let markUp = `<option value="${id}">${name}</option>`;
    refs.selected.insertAdjacentHTML('beforeend', markUp);
     
    });
      
};

function makeMarkCard({name, description, temperament}, {url}) {
    let markUp = `
    <img src="${url}" alt="${name}" width="460px"/>
    <div class="descrp-card">
    <p class="title-card">${name}</p>
    <p class="description">${description}</p>
    <p class="temerament">${temperament}</p>
    </div>`;
    refs.div.innerHTML = markUp;
}

