const jsonExample = '{"name": "John", "age": 30, "city": "New York"}';
const parsedData = JSON.parse(jsonExample);
console.log("Parsed Data: ", parsedData);

const toJSON = JSON.stringify(parsedData);
console.log("JSON String: ", toJSON);
