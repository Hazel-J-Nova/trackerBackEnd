const { DateTime } = require('luxon');

const now = DateTime.now();
const future = now.plus({ seconds: 20 });
console.log(future - now);
