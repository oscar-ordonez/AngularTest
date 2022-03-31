const json = require('./data.json');
const lodash = require('lodash');
const readline = require("readline");

const data = JSON.parse(json);
//console.log(data);

// search if the object has the property
function hasKey(arr, prop) {
  for(let i=0; i<arr.length; i++){
    let obj = arr[i];
    if (obj[prop]) {
      return {exist:true, index:i};
    }
  }
  return {exist:false, index:0};
}

function main(){
  let result = [[{General:[]}], [{General:[]}]];
  let tmp;
  for(let i=0; i<data.length; i++) {
    if(data[i].IdUser === undefined || data[i].IdUser === null){ // insert second
      if(data[i].GroupName === undefined || data[i].GroupName === null){ // insert second
        result[1][0].General.push(data[i]);
      }else{
        tmp = hasKey(result[1], data[i].GroupName); 
        if(tmp.exist){
          result[1][tmp.index][data[i].GroupName].push(data[i]);
        }else{
          result[1].push({ [data[i].GroupName] : [data[i]]}); 
        }
      }
    }else{ // insert first
      if(data[i].GroupName === undefined || data[i].GroupName === null){ // insert second
        result[0][0].General.push(data[i]);
      }else{
        tmp = hasKey(result[0], data[i].GroupName); 
        if(tmp.exist){
          result[0][tmp.index][data[i].GroupName].push(data[i]);
        }else{
          result[0].push({ [data[i].GroupName] : [data[i]]}); 
        }
      }

    }
  }
  
  console.log(JSON.stringify(result));

  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  reader.question("Label to search: ", function (text) {
    for(let i=0; i<result[0].length; i++){
      if(result[0][i].Label == text){
        result[1].push(result[0].splice(i, 1));
      }
    }
    console.log(JSON.stringify(result));
    reader.close();
  });
}

main();


//{\"GroupName\":\"General\",\"Label\":\"Account Held At\",\"IdUser\":null,\"Id\":11067}
//{\"GroupName\":\"General\",\"Label\":\"Account Held At\",\"IdUser\":null,\"Id\":11067}
// 1. Split the array into a tuple where the first element is those that have IdUser and the second is those objects where IdUser is null or undefined
//     We know that tuples in js are not available so you can use array of arrays [[], []]
//     1.1 In the first element elements should be only those which have valid Id field
// 2. Group the first element of the tuple(array of arrays) by GroupName
//     Example: with a given array of [{ country: 'BG', name: 'Georgi' }, { country: 'BG', name: 'Emil' }, { country: 'GR', name: 'Stefanos' }, { country: 'US', name: 'Mark' }]
//     grouping by country expected result should be: 
//     {
//      BG: [{ country: 'BG', name: 'Georgi' }, { country: 'BG', name: 'Emil' }],
//      GR: [{ country: 'GR', name: 'Stefanos' }],
//      US: [{ country: 'US', name: 'Mark' }]
//     }
//     2.1 For those which GroupName is undefined or null include them in General group
// 3. General group should be on the top
// 4. Print the result
// 5. Get user input from standard input/output and the objects that Label contains the user's input. Move the result to the second element of the tuple (array of arrays)
// 6. Print the final result

// Notes:
// 1. In the repo we have reference to lodash library. Feel free to use it.

// Bonus: 
// 1. Write your own logic for grouping the array
// 2. Write your own logic for splitting into tuples
// 3. We like immutability. So bonus will be recieved if all the code is written in the immutiable manner.