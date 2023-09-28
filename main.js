window.addEventListener('load', async () =>{

    API_URL = "https://swapi.dev/api/people/1/?format=json";
    const data = await requestURL(API_URL);

    displayCard(data.name ,data);
})

// ============================================================ Requesting for the URL ===============================================================

const requestURL = async (url) =>{
    const response = await axios.get(url);
    const data = response.data
    return data;
}

// ============================================================ Creating / Displaying card ===============================================================

const displayCard = (title, data) => {

    // Input : title => a string, data => an object
    // Display a created card using createCard()

    document.body.innerHTML = ''
    // Creating the main card

    card = document.createElement('div')
    card.classList.add('card')

    // Creating the corresponding header

    const containerName = document.createElement('section');
    const name = document.createElement('h2')
    containerName.classList.add('card__name');
    name.textContent = title;
    containerName.appendChild(name);

    card.appendChild(containerName);

    // Creating and adding the card to the body

    createCard(card, data);
    document.body.appendChild(card) 

}

const createCard = async (card , data) => {

    // Input : card => a card DOM element create in Dipslaycard(),

    const containerContent = document.createElement('section')
    containerContent.classList.add('card__content')

    const elements = document.createElement('section'); // PS : It is for fiting the constraint I've made for the layout

    const containerTitle = document.createElement('h2')
    containerTitle.classList.add('card__name');
    containerTitle.textContent = 'Characteristics';

    elements.appendChild(containerTitle);
    elements.classList.add('card__box')
    elements.classList.add('first-box');
    containerContent.appendChild(elements);

    for (let key of Object.keys(data)){

        if (typeof(data[key]) == 'object'){ // Si la valeur de l'élement est un array on utilise createListElements() ou sinon on utilise createOneElement() 
                
            list = await createListElements(key, data);

            if (list != "There is no elements"){
                containerContent.appendChild(list); 
            }               
        }
        else{   
            const element = await createOneElement(key, data);
            elements.appendChild(element);
        }
    } 
    
    card.appendChild(containerContent);

}

// ============================================================ Creating the card content ===============================================================

const createListElements = async (key, data) =>{

    // Input : key => a string, data => an object
    // Create a list of button for each element int the array of element

    const list = document.createElement('section')
    const value = data[key]

    const containerTitle = document.createElement('h2')
    containerTitle.classList.add('card__name');
    containerTitle.textContent = key;
    list.appendChild(containerTitle);

    list.classList.add("card__box")
    
    if (value.length == 0){
        return "There is no elements" // Can be done a better way I'm sure 
    }
    else{
        switch (key) {

            case 'films':
    
                value.forEach(async (element) => {
                    item = await createButtonWithTitle(element)
                    list.appendChild(item)
                });
                break;
                
            case 'vehicles':
            case 'starships':
            case 'chracters' :
            case 'people' : 
            case 'species' :

                value.forEach(async (element) => {
                    item = await createButtonWithName(element)
                    list.appendChild(item)
                });
                break;
    
            default:
    
                value.forEach(async (element) => {
                    item = await createButtonWithName(element)
                    list.appendChild(item)
                });
                break;
        }
    }
    return list
}

const createOneElement = async (key, data) =>{

    // Input : key => a string, value => a string
    // Create a paragraph for the corresponding element using the entered value

    const value = data[key]
    const element = document.createElement('p');

    if (key == 'homeworld'){
        data = await requestURL(value);
        element.textContent = key + ' : ' + data.name  // Need to be mofidy because this is an URL 
    }
    else{
        element.textContent = key + ' : ' + value;
    }
    
    return element

}

// ============================================================ Creating the links ===============================================================

const createButtonWithName = async (url) =>{

    const data = await requestURL(url);

    const button = document.createElement('button')
    button.classList.add('btn')
    button.textContent = data.name;

    button.addEventListener('click', async () =>{
        const responseData = await requestURL(url);
        displayCard(responseData.name, responseData);
    })

    return button;
}

const createButtonWithTitle = async (url) =>{
    const data = await requestURL(url);

    const button = document.createElement('button')
    button.classList.add('btn')
    button.textContent = data.title;

    button.addEventListener('click', async () =>{
        const responseData = await requestURL(url);
        displayCard(responseData.title ,responseData);
    })

    return button;
}