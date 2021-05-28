const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// // NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
// //       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
// Test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let testRover = new Rover(98382);
    expect(testRover.position).toEqual(98382);
    expect(testRover.mode).toEqual('NORMAL');
    expect(testRover.generatorWatts).toEqual(110);
  });
// Test 8
  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);
  });
// Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });
// Test 10
  it("responds correctly to status check command", function() {
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("Rover Status Check", commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    let check = response.results[0];
    expect(check.Rover_Status.Position).toEqual(98382);
    expect(check.Rover_Status.Mode).toEqual('NORMAL');
    expect(check.Rover_Status.Generator_Watts).toEqual(110);
  });
// Test 11
  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Rover Mode change to LOW_POWER', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    let check = response.results[0];
    expect(rover.mode).toEqual('LOW_POWER');
  });
// // Test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 555)];
    let message = new Message('Move in LOW_POWER mode', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    let check = response.results[1];
    expect(check.Completed).toEqual(false);
  });
// // Test 13  
  it("responds with position for move command", function() {
    let commands = [new Command('MOVE', 555), new Command('STATUS_CHECK')];
    let message = new Message('Move the Rover to 555', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
  });
});


// let testRover = new Rover(444);
// let testCommandOne = new Command("MOVE", 222);
// let testCommandTwo = new Command("MOVE", 555);
// let testCommandThree = new Command("STATUS_CHECK");
// let testCommandFour = new Command("MODE_CHANGE", "LOW_POWER");
// let testCommandFive = new Command("MOVE", 666); // attempt to move when in LOW_POWER
// let testCommandSix = new Command("STATUS_CHECK");
// // // whew that's a lot of commands, but luckily we can send them all in one message:
// let testMessage = new Message("Six commands for our rover", [testCommandOne, testCommandTwo, testCommandThree, testCommandFour, testCommandFive, testCommandSix]);
// let messageResponse = testRover.receiveMessage(testMessage); 
// console.log(messageResponse); // what do we expect? .message .results (how many results? what should each of those results look like?)
// // console.log(messageResponse.results[2]); // what do we expect?
// console.log(messageResponse.results[2].roverStatus.position); // what do we expect?
// // console.log(messageResponse.results[4]); // what do we expect?
// console.log(messageResponse.results[5].roverStatus);