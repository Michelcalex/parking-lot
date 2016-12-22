//let cars is a global variable. It's an array with objects inside. 
let cars = [
    {
        make: 'Ford',
        model: 'Mustang',
        size: 4,
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

//let lots was a global variable, also an array of objects that was made since I didn't have the backend's GET information
// let lots = [ 
//     {
//         id: 0,
//         capacity: 15,
//         rate: '$' + 5,
//     },
//     {
//         id: 1,
//         capacity: 15,
//         rate: '$' + 5,
//     },
//     {
//         id: 2,
//         capacity: 15,
//         rate: '$' + 5,
//     }
// ]


//When the page loads, do this.....
window.addEventListener('load', function() {
    getCarLots(); // run function getCarLots()

    showCars(); //run function showCars()

});


//function getCarLots 
function getCarLots() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://warm-waters-57933.herokuapp.com/parking-lot');
    request.addEventListener('load', function() {
        //console.log('Weve got cars weeeeeeee');
        let response = JSON.parse(request.responseText);
        //console.log(response);

        let lotList = document.querySelector('#lot-info'); //this is my 'ul' from my html 

        for (let i = 0; i < response.length; i++) {
            let lot = document.createElement('li'); //this creates a new 'li' element for my car lots everytime it runs through the loop.

            // let lotId = response[i].id;
            // console.log(lotId);

            lot.innerHTML = Mustache.render (
                document.querySelector('#car-lot-template').innerHTML, 
                { id: response[i].id,        //response[i] is the information coming from the GET request
                  lotCapacity: response[i].capacity,
                  lotCost: response[i].cost
                }
            )

            lotList.appendChild(lot)


        }
        
        
         //after you got the lots, use mustache to build out the lot info to display to users! Right now, this code below goes off my lots array at the top
        
        // let lotList = document.querySelector('#lot-info');
        // for(let i = 0; i <lots.length; i++) {
        //     let lot = document.createElement('li');

        //     lot.innerHTML = Mustache.render (
        //         document.querySelector('#car-lot-template').innerHTML, 
        //         { id: lots[i].id,
        //           lotCapacity: lots[i].capacity,
        //           lotCost: lots[i].rate
        //         }
        //     )

        //     lotList.appendChild(lot);
        // }
    });

    request.send();
}


//function showCars
function showCars() {

    let carList = document.querySelector('#car-info');

    for(let i = 0; i < cars.length; i++) { //display the types of cars when the page loads 
        let newCar = document.createElement('li');
        
        newCar.innerHTML = Mustache.render (
            document.querySelector('#car-info-template').innerHTML,
            { carMake: cars[i].make,    //carMake in this case is referring to my mustache template in html 
              carModel: cars[i].model, 
              carSize: cars[i].size, 
              carMoney: cars[i].money, 
              lots: [        //lots here is referring to the mustach lot SECTION in my html
                  {id: 0},    //id here is referring to my mustache template in my html and I AM the one giving it a property of 0, 1, 2
                  {id: 1},
                  {id: 2},
              ]}
        ); 

            let lot0Button = newCar.querySelector('#lot-0');   //creating the variable lot0button and selecting #lot-0 from my html which is the id for my button that was created in the loop 
            lot0Button.addEventListener('click', function () { //I am adding an event listener to the lot0button so that when the user clicks, run this function. 
                // updateCars has two parameters
                updateCars(0, cars[i]);          //here, I am calling my function updateCars that has two parameters, the lotID and the car. The lotID comes from the 0 from above^^^^{id:0}
            });

            let lot1Button = newCar.querySelector('#lot-1');
            lot1Button.addEventListener('click', function () {
                updateCars(1, cars[i]);
            });

            let lot2Button = newCar.querySelector('#lot-2');
            lot1Button.addEventListener('click', function () {
                updateCars(2, cars[i]);
            });

        // TODO: add third

        // POST: lot id, the car
        
        carList.appendChild(newCar);    //im appending my li, newCar to my parent element which in this case is carList
    }         
};




function updateCars(lotId, car) { //here is where my updateCars function exist. I am passing my two parameters from above, so the id of the car and cars[i]. EX) updateCars(2, cars[i])

    let newCarParked = {     //I am creating a new variable called newCarParked which is sending this info to my backend with the parameters THAT they are ACCEPTING.  
        id: lotId,   // lotId here is referring to the same numbers from above in the updateCars. EX) updateCars(1, cars[i])
        make: car.make,  //this is coming from what every car at the time is equal too and its make which came from here {carMake: cars[i].make,} when I was rendering newCar.innerHTML
        model: car.model,
        size: car.size,
        rate: car.money,
    }


    let request = new XMLHttpRequest();
    request.open('POST', 'https://warm-waters-57933.herokuapp.com/update');
    // request.addEventListener('load', function () {
    //     window.setInterval(getCarLots, 1000);
    // });

    request.send(JSON.stringify(newCarParked));   //this is stringifying newCarParked for the backend. 
}



















// let cars = [
//     {
//         make: 'Ford',
//         model: 'Mustang',
//         size: 5,
//         money: 30,
//     },
//     {
//         make: 'Subaru',
//         model: 'Forester',
//         size: 7,
//         money: 70,
//     },
//     {
//         make: 'Smart',
//         model: 'Passion Cabrio',
//         size: 1,
//         money: 15,
//     }
// ]

// let lots = [ //once you get data from backend-delete this array and set it to response****
//     {
//         id: 0,
//         capacity: 15,
//         rate: 5,
//     },
//     {
//         id: 1,
//         capacity: 15,
//         rate: 5,
//     },
//     {
//         id: 2,
//         capacity: 15,
//         rate: 5,
//     }
// ]




// //when the page loads, request list of lots
// window.addEventListener('load', function() {
//     getCarLots();

//     //we didn't have to get it from an AJAX request this time. Before we were getting it from AJAX. 
//     for(let i = 0; i < cars.length; i++) {
//             showCars(cars[i]);
//         }
// });


// // function parkCar () {
   


// // }

// //get car lots
// function getCarLots() {
//     let request = new XMLHttpRequest();
//     request.open('GET', 'http://#/lots');
//     request.addEventListener('load', function() {
//         console.log('Weve got cars weeeeeeee');
//         let response = JSON.parse(request.responseText);
//         console.log(response);

//         //after you got the lots, build the top out with the Dom just like you did for the cars******
//     });

//     request.send();
// }


// //Show car
// function showCars(car) {

//     let carList = document.querySelector('ul');

//         //append this to ul 
//         let newCar = document.createElement('li');
//         carList.appendChild(newCar);

//             //create make of the car
//             let makeCar = document.createElement('p');
//             makeCar.textContent = car.make;
//             newCar.appendChild(makeCar);

//             //create model of the car
//             let modelCar = document.createElement('p');
//             modelCar.textContent = car.model;
//             newCar.appendChild(modelCar);

//             //create size of the car
//             let sizeCar = document.createElement('p');
//             sizeCar.textContent = car.size;
//             newCar.appendChild(sizeCar);

//             //create money of the car
//             let moneyCar = document.createElement('p');
//             moneyCar.textContent = car.money;
//             newCar.appendChild(moneyCar);

//             // create button
//             // when clicked, send the current car
//                 for (let i =0; i < lots.length; i++) {
//                     let lotBtn = document.createElement('button');
//                     lotBtn.textContent = "Add Lot " + lots[i].id;
//                     newCar.appendChild(lotBtn);
//                     lotBtn.addEventListener('click', function() {
//                         updateCarLot(car, lots[i]);
//                     });
//                 }              
            
// }

// function updateCarLot(car, lot) {
//     let params = {
//         id: lot.id,
//         make: car.make,
//         model: car.model,
//         money: car.money,
//         size: car.size
//     };

//     let request = new XMLHttpRequest();
//     request.open('POST', 'http://#/update');
//     request.addEventListener('load', function() {
//         console.log('look! it updated!');
//     });

//     request.send(JSON.stringify(params));
// }   