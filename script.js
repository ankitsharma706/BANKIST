'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-GB',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-GB',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Array
/* 
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice());
console.log(...arr);

console.log(arr);
let arr2=[ 'a', 'b', 'c', 'd', 'e' ]
console.log(arr.reverse());
console.log(arr2.concat(arr));
console.log(...arr,...arr2);
console.log(arr2.join('-'));

const arr = [23, 11, 64];
console.log(arr.includes(11));

console.log(arr.at(0));
console.log(arr[arr.length-1]);
console.log('ankit'.at(2)); 

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} : you depoisted ${movement}`);
  } else {
    console.log(`Movement ${i + 1} : you withdrew ${Math.abs(movement)}`);
  }
}
console.log(`---------------------------`);
movements.forEach(function (movement,i,arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} : you deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} : you withdrew ${Math.abs(movement)}`);
  }
});

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});


const currenciesUnique=new Set(['USD','GBP','EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function(value,_,map){
  console.log(`${value}: ${value}`);
})*/

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatmovementsDate(date, acc.locale);

    const formatmovment = formatCur(mov, acc.locale, acc.currency);

    const html = `
   <div class="movements__row">
          <div class="movements__type
           movements__type--${type}">${i + 1}${type}</div>
            <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatmovment}</div>
        </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const formatmovementsDate = function (date, locale) {
  const calcdaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcdaysPassed(new Date(), date);
  // console.log(daysPassed);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed < 7) return `${daysPassed} days ago`;
  // else {
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }
  return new Intl.DateTimeFormat(locale).format(date);
};
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
// displayMovements(account1.movements);

// console.log(containerMovements.innerHTML);
/* 
const checkDogs = function (dogsJulia, dogskate) {
  const dogsJuliacorrected = dogsJulia.slice();
  dogsJuliacorrected.slice(0, 1);
  dogsJuliacorrected.slice(-2);

  // dogsJulia.slice(1,3);
  const dogs = dogsJuliacorrected.concat(dogskate);
  console.log(dogs);
  // console.log(dogsJuliacorrected);
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    }else{
      console.log(`Dog number ${i + 1} is still a puppy `);
      
    }
  });
};
// console.log(dogsJulia.slice(0,1));

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]); */
/* 
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function(mov){
// return mov*eurToUsd;
// })

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUsdFor = [];
for (const mov of movements) {
  movementsUsdFor.push(mov * eurToUsd);
}
console.log(movementsUsdFor);

const movementDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: you ${mov > 0 ? 'Deposited' : 'Withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementDescription); */

const user = 'Steven Thomas  WIlliams ';

const calcDispBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

// calcDispBalance(account1.movements);
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(
    Math.abs(interest),
    acc.locale,
    acc.currency
  );
};
// calcDisplaySummary(account1.movements);

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner

      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
  // return username;
};
createUserName(accounts);
const updateUI = function (acc) {
  displayMovements(acc);
  calcDispBalance(acc);
  calcDisplaySummary(acc);
};

/* console.log(accounts);

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositFor = [];
for (const mov of movements) {
  if (mov > 0) depositFor.push(mov);
}
console.log(depositFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

console.log(movements);

const balance = movements.reduce((acc, cur, i) => acc + cur, 0);

console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

//maximum value
const max = movements.reduce((acc, mov) => {
  if (mov < acc) return acc;
  else return mov;
}, movements[0]);

console.log(max);
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);

  console.log(humanAges);
  console.log(adults);
  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
 return average;
};

const age1 = calcAverageHumanAge([5, 4, 3, 5, 4, 2, 2, 3]);
const age2 = calcAverageHumanAge([2, 3, 4, 5, 4, 2, 2, 1]);

console.log(age1);
console.log(age2); */
/* const eurToUsd = 1.1;
// PipeLine
const totalDepositUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUsd);

const firstWithDrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithDrawal);

console.log(accounts);

const  account=accounts.find(acc=>acc.owner==='Jessica Davis');
console.log(account); */

// Event handler
const startLogOutTimer = function () {
  // set time out
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    // time--;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started ';
      containerApp.style.opacity = 0;
    }
    time--;
  };

  let time = 120;
  // call the timeer
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
  //In each call

  //when 0 sec
};

let currentAccount, timer;
//fake ui for time
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
//expermenting Api
/* const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const locales = navigator.language;
console.log(locales);

labelDate.textContent = new Intl.DateTimeFormat(locales, options).format(now); */

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('login');

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    const locales = navigator.language;
    // console.log(locales);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    updateUI(currentAccount);
    // console.log('Login');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const recieveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, recieveAcc);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    recieveAcc &&
    currentAccount.balance >= amount &&
    recieveAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieveAcc.movements.push(amount);

    //doing transfer
    currentAccount.movementsDates.push(new Date().toISOString());
    recieveAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov <= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/* console.log(movements);
console.log(movements.includes(-130));
console.log(movements.some(mov => mov > 1500));

const anyDeposit = movements.some(mov => mov > 1500);
console.log(anyDeposit);

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// seprerate callback
const deposit = mov => mov < 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit)); 

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));


const overalaBalance = accounts
  .flatMap(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalaBalance);

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);
console.log(movements);
console.log(movements.sort());
// console.log(movements.sort((a,b)={}));
// console.log(movements.sort((a, b) => a - b));

const mosort = movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(mosort);

const mosorts = movements.sort((a, b) => {
  if (a < b) return 1;
  if (a > b) return -1;
});
console.log(mosorts);

const arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8));

const x = new Array(7);
console.log(x);

console.log(x.map(() => 5));
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);*/

labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementUI);

  const movementUI2 = [...document.querySelectorAll('.movements__value')];
});

/* const bankDEpositSUm = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
// movements.flat(mov);
console.log(bankDEpositSUm);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;

console.log(numDeposits1000); 


console.log(23===23.0);
console.log(23===23.000000000000004);
//Base 10-0 to 9
console.log(0.1+0.2);
console.log(0.1+0.2===0.3);
console.log(Number('23'));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.5));
console.log(Number.parseInt('30px'));
console.log(Number.parseInt('abc'));
console.log(Number.parseInt('e23',10));
console.log(Number.parseFloat('2.5rem'));
console.log(Number.parseInt('2.5rem'));
console.log(Number.isNaN(20));
console.log(Number.isNaN(20/0));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20px'));

console.log(Number.isFinite(20));
console.log(Number.isFinite(20/0));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(20/0));

console.log(Math.sqrt(729));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));
console.log(Math.max(2, 4, 7, 4, 2, 4, 7, 9, 0, 3, 2));
console.log(Math.min(3, 4, 45, 6, 7, 8, 1, 9, 0));
console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6));

// console.log(r);

const randomint = (min, max) => Math.trunc(Math.random() * (max - min) + 1);
console.log(randomint(1, 6));

console.log(randomint(10, 40));

console.log(Math.trunc(23.4));
console.log(Math.round(23.7));
console.log(Math.ceil(23.4));
console.log(Math.floor(23.4));

console.log((2.7).toFixed(0));
console.log((2.7).toFixed(1));
console.log((2.7).toFixed(2));
console.log((2.7).toFixed(3));


console.log(5 % 2);
console.log(5 % 3);
console.log(5 / 2);
console.log(52);

const isEven = n => n % 2 === 0;
console.log(isEven(4));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
  });
});*/

/* const diameter=9_835_203_287_368;
const radius=diameter/2;
console.log(diameter);

const priceCents=345_99;
const priceDollars=priceCents/100;
console.log(priceDollars);

const Pi=3.1_45
console.log(Pi);

console.log(Number('234_7856')); 

console.log(2 ** 53 - 1);
console.log(2 ** 53);
console.log(2 ** 53 + 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);
console.log(2 ** 53 + 5);
console.log(2 ** 53 + 6);
console.log(2 ** 53 - 1);
console.log(4747585858585886896969697908798789n);
console.log(BigInt(4747585858585886896969697908798789));
console.log(1234345n + 12342345n);
const huge = 93846598236745963495n;
const num = 23;
console.log(huge + BigInt(num));
console.log(20n>15);
console.log(typeof 20n);
console.log(20n=='20');
console.log(huge +'is really bug!!!');
console.log(huge +"is really bug!!!");

console.log(10n/3n);
console.log(10/3);

// Create a Date
// const date = new Date('2024-03-20T14:30:00.000')
const now = new Date();
console.log(now);
// console.log(date);
console.log(new Date('december 24,2024'));
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31, 15, 23, 5));
console.log(new Date(0));
console.log(new Date(3*24*60*60*1000));

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

future.setFullYear(2040);
future.setMonth(0);
console.log(future);*/
// console.log(new Date().toISOString());

/* const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcdaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const day1 = calcdaysPassed(new Date(2037, 10, 19), new Date(2037, 10, 24));
console.log(day1); 
const num = 23456789.37;
const options = {
  style: 'currency',
  currency: 'EUR',
  unit: 'mile-per-hour',
  maximumFractionDigits: 3,
  useGrouping: false,
};

console.log(new Intl.NumberFormat('en-IN', options).format(num));
console.log(new Intl.NumberFormat('de-sy').format(num));
console.log(new Intl.NumberFormat('en-DE').format(num));
console.log(new Intl.NumberFormat(navigator.language, options).format(num));*/

/* const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your is pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log('....Waiting');

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//settimeout
setTimeout(function () {
  const now = new Date();
  console.log(now);
}, 3000); */
