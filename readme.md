# groupby-array

Groups an array by the specified property.

[![NPM Version](https://img.shields.io/npm/v/groupby-array)](https://www.npmjs.com/package/groupby-array)
[![Action Status](https://github.com/xiadevisser/groupby-array/actions/workflows/build.yml/badge.svg)](https://github.com/xiadevisser/groupby-array)
[![Coverage Status](https://coveralls.io/repos/github/xiadevisser/groupby-array/badge.svg)](https://coveralls.io/github/xiadevisser/groupby-array)
[![License](https://img.shields.io/github/license/xiadevisser/groupby-array)](/LICENSE)

## Installation

```
yarn add groupby-array
```

or

```
npm install --save groupby-array
```

## Usage

### Basic usage

```js
import { groupBy } from 'groupby-array';

const users = [
  { name: 'John', age: 30, isAdmin: true },
  { name: 'Jane', age: 25, isAdmin: true },
  { name: 'Jim', age: 30, isAdmin: false }
];
  
const result = groupBy(users, u => u.age);
```

```js
// result

{
  30: [
    { name: 'John', age: 30, isAdmin: true },
    { name: 'Jim', age: 30, isAdmin: false }
  ],
  25: [
    { name: 'Jane', age: 25, isAdmin: true }
  ]
};
```

### Group by multiple properties

```js
const users = [
  { firstName: 'John', lastName: 'Doe', age: 30 },
  { firstName: 'Jane', lastName: 'Doe', age: 25 },
  { firstName: 'James', lastName: 'Bond', age: 30 }
];
  
const result = groupBy(users, u => `${u.firstName} ${u.lastName}`);
```

```js
// result

{
  'John Doe': [
    { firstName: 'John', lastName: 'Doe', age: 30 }
  ],
  'Jane Doe': [
    { firstName: 'Jane', lastName: 'Doe', age: 25 }
  ],
  'James Bond': [
    { firstName: 'James', lastName: 'Bond', age: 30 }
  ]
};
```

More examples can be found in the [tests](test/groupby.test.ts)