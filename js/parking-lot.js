let cars = [
    {
        make: 'Ford',
        model: 'Mustang',
        size: 5,
        money: 30,
    },
    {
        make: 'Subaru',
        model: 'Forester',
        size: 7,
        money: 70,
    },
    {
        make: 'Smart',
        model: 'Passion Cabrio',
        size: 1,
        money: 15,
    }
]

let lots = [ //once you get data from backend-delete this array and set it to response****
    {
        id: 0,
        capacity: 15,
        rate: 5,
    },
    {
        id: 1,
        capacity: 15,
        rate: 5,
    },
    {
        id: 2,
        capacity: 15,
        rate: 5,
    }
]




//when the page loads, request list of lots
window.addEventListener('load', function() {
    getCarLots();

    //we didn't have to get it from an AJAX request this time. Before we were getting it from AJAX. 
    for(let i = 0; i < cars.length; i++) {
            showCars(cars[i]);
        }
});


// function parkCar () {
   


// }

//get car lots
function getCarLots() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://#/lots');
    request.addEventListener('load', function() {
        console.log('Weve got cars weeeeeeee');
        let response = JSON.parse(request.responseText);
        console.log(response);

        //after you got the lots, build the top out with the Dom just like you did for the cars******
    });

    request.send();
}


//Show car
function showCars(car) {

    let carList = document.querySelector('ul');

        //append this to ul 
        let newCar = document.createElement('li');
        carList.appendChild(newCar);

            //create make of the car
            let makeCar = document.createElement('p');
            makeCar.textContent = car.make;
            newCar.appendChild(makeCar);

            //create model of the car
            let modelCar = document.createElement('p');
            modelCar.textContent = car.model;
            newCar.appendChild(modelCar);

            //create size of the car
            let sizeCar = document.createElement('p');
            sizeCar.textContent = car.size;
            newCar.appendChild(sizeCar);

            //create money of the car
            let moneyCar = document.createElement('p');
            moneyCar.textContent = car.money;
            newCar.appendChild(moneyCar);

            // create button
            // when clicked, send the current car
                for (let i =0; i < lots.length; i++) {
                    let lotBtn = document.createElement('button');
                    lotBtn.textContent = "Add Lot" + lots[i].id;
                    newCar.appendChild(lotBtn);
                    lotBtn.addEventListener('click', function() {
                    console.log();
            });
                }

            
                
            
}