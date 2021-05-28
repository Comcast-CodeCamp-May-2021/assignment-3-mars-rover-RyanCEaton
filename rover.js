class Rover {
   constructor (position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
  receiveMessage(messages) {
    
    let resultsArray = [];
   
  for (let commandObject of messages.commands) {
    let completed = commandObject;
    if (commandObject.commandType === 'STATUS_CHECK') {
       completed = {};
       completed["Completed"] = true;
       let roverStatus = {};
       roverStatus["Position"] = this.position;
       roverStatus["Mode"] = this.mode;
       roverStatus["Generator_Watts"] = this.generatorWatts; 
       completed["Rover_Status"] = roverStatus;
    }
    if (commandObject.commandType === 'MODE_CHANGE') {
      completed = {};
      this.mode = commandObject.value;
      completed["Completed"] = true;  
    }
    if (commandObject.commandType === 'MOVE') {
      completed = {};
      if (this.mode === 'LOW_POWER') {
        completed["Completed"] = false;
      }
      else {
        completed["Completed"] = true;
        this.position = commandObject.value;
      }
    }
  resultsArray.push(completed);
  }
    return {
      message: messages.name,
      results: resultsArray      
    }
    
  
  } 

}
module.exports = Rover;