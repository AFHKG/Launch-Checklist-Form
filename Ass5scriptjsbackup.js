
window.addEventListener("load", function() {

    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
       response.json().then(function(json) {
          let randomChooses = Math.floor(Math.random() * json.length);
          console.log(json[randomChooses].name);   
 
          document.getElementById("missionTarget").innerHTML = `
          <h2>Mission Destination</h2>
          <ol>
             <li>Name: ${json[randomChooses].name}</li>
             <li>Diameter: ${json[randomChooses].diameter}</li>
             <li>Star: ${json[randomChooses].star}</li>
             <li>Distance from Earth: ${json[randomChooses].distance}</li>
             <li>Number of Moons: ${json[randomChooses].moons}</li>
          </ol>
          <img src="${json[randomChooses].image}">
          `;
       });
    });
 
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
       event.preventDefault();
 
       let pilotName   = document.querySelector("input[name=pilotName]");
       let copilotName = document.querySelector("input[name=copilotName]");
       let fuelLevel   = document.querySelector("input[name=fuelLevel]");
       let cargoMass   = document.querySelector("input[name=cargoMass]");
 
       let userInput = [pilotName, copilotName, fuelLevel, cargoMass];
       for (let i=0; i <  userInput.length; i++) {
          if (userInput[i].value === "") {
             alert("All fields are required!");
             event.preventDefault();
          }
       }
       if(!isNaN(pilotName.value)) {
          alert("Enter valid pilot name.")
       }
       if(!isNaN(copilotName.value)) {
          alert("Enter valid co-pilot name.")
       }
       if(isNaN(fuelLevel.value)) {
          alert("Enter valid number for fuel level.")
       }
       if(isNaN(cargoMass.value)) {
          alert("Enter valid number for cargo mass.")
       }  
 
       let faultyItems  = document.getElementById("faultyItems");
       let pilotStatus   = document.getElementById("pilotStatus");
       let copilotStatus = document.getElementById("copilotStatus");
       let launchStatus = document.getElementById("launchStatus");
       let fuelStatus    = document.getElementById("fuelStatus");
       let cargoStatus   = document.getElementById("cargoStatus");
       
 
       if (Number(fuelLevel.value) < 10000 && Number(cargoMass.value) > 10000) {
          faultyItems.style.visibility = "visible";
          cargoStatus.innerHTML = `Cargo mass too high for launch`;
          fuelStatus.innerHTML = `Fuel level too low for launch`;
          launchStatus.innerHTML = "Shuttle not ready for launch";
          pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
          copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
      
       } else if (Number(fuelLevel.value) >= 10000 && Number(cargoMass.value) <= 10000) {
          launchStatus.style.color = "green";
          launchStatus.innerHTML = "Shuttle is ready for launch"
 
       } else if (Number(fuelLevel.value) >= 10000 && Number(cargoMass.value) > 10000) {
          faultyItems.style.visibility = "visible";
          fuelStatus.innerHTML = `Fuel level high enough for launch`;
          cargoStatus.innerHTML = `Cargo mass too high for launch`;
          launchStatus.style.color = "red";
          pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
          copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
          launchStatus.innerHTML = "Shuttle not ready for launch";
 
       } else if (Number(fuelLevel.value) < 10000 && Number(cargoMass.value) <= 10000) {
          faultyItems.style.visibility = "visible";
          fuelStatus.innerHTML = `Fuel level too low for luanch`;
          cargoStatus.innerHTML = `Cargo mass low enough for launch`;
          launchStatus.style.color = "red";
          pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
          copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
          launchStatus.innerHTML = "Shuttle not ready for launch";
       }
 
 
    });
 });