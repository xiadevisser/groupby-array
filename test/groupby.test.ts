import { groupBy } from '../src/index';

describe('groupBy primitives', () => {
  it('should group by itself', () => {
    const numbers = [1, 1, 1, 2, 1, 1, 4, 4, 5, 4, 4, 4, 1];
    const expected = {
      1: [1, 1, 1, 1, 1, 1],
      2: [2],
      4: [4, 4, 4, 4, 4],
      5: [5],
    };
    const result = groupBy(numbers, u => u);
    expect(result).toEqual(expected);
  });
});

describe('groupBy simple objects', () => {
  class User {
    name: string;
    age?: number;
    isAdmin: boolean;
  }
  const users: User[] = [
    { name: 'John', age: 30, isAdmin: true },
    { name: 'Jane', age: 25, isAdmin: true },
    { name: 'Jim', age: 30, isAdmin: false }
  ];
  it('should group the object by a string type', () => {
    const expected = {
      'John': [
        { name: 'John', age: 30, isAdmin: true }
      ],
      'Jane': [
        { name: 'Jane', age: 25, isAdmin: true }
      ],
      'Jim': [
        { name: 'Jim', age: 30, isAdmin: false }
      ]
    };
    const result = groupBy(users, u => u.name);
    expect(result).toEqual(expected);
  });
  it('should group the object by a number type', () => {
    const expected = {
      30: [
        { name: 'John', age: 30, isAdmin: true },
        { name: 'Jim', age: 30, isAdmin: false }
      ],
      25: [
        { name: 'Jane', age: 25, isAdmin: true }
      ]
    };
    const result = groupBy(users, u => u.age);
    expect(result).toEqual(expected);
  });
  it('should group the object by a boolean type', () => {
    const expected = {
      true: [
        { name: 'John', age: 30, isAdmin: true },
        { name: 'Jane', age: 25, isAdmin: true }
      ],
      false: [
        { name: 'Jim', age: 30, isAdmin: false }
      ]
    };
    const result = groupBy(users, u => u.isAdmin);
    expect(result).toEqual(expected);
  });
  it('should group the object by optional type', () => {
    const users: User[] = [
      { name: 'John', age: 30, isAdmin: true },
      { name: 'Jane', age: 25, isAdmin: true },
      { name: 'Jim', isAdmin: false }
    ];
    const expected = {
      30: [
        { name: 'John', age: 30, isAdmin: true }
      ],
      25: [
        { name: 'Jane', age: 25, isAdmin: true }
      ],
      undefined: [
        { name: 'Jim', isAdmin: false }
      ]
    };
    const result = groupBy(users, u => u.age);
    expect(result).toEqual(expected);
  });
});

describe('groupBy complex objects', () => {
  class Animal {
    type: string;
    age: number;
  }
  class User {
    name: string;
    age?: number;
    pet: Animal;
  }
  const users: User[] = [
    { name: 'John', age: 30, pet: { type: 'cat', age: 2 } },
    { name: 'Jane', age: 25, pet: { type: 'dog', age: 5 } },
    { name: 'Jim', age: 30, pet: { type: 'dog', age: 10 } }
  ];
  it('should group the object by child type', () => {
    const expected = {
      'cat': [
        { name: 'John', age: 30, pet: { type: 'cat', age: 2 } },
      ],
      'dog': [
        { name: 'Jane', age: 25, pet: { type: 'dog', age: 5 } },
        { name: 'Jim', age: 30, pet: { type: 'dog', age: 10 } }
      ]
    };
    const result = groupBy(users, u => u.pet.type);
    expect(result).toEqual(expected);
  });
});

describe('groupBy multiple values', () => {
  class User {
    firstName: string;
    lastName: string;
    age: number;
    luckyNumber: number;
  }
  const users: User[] = [
    { firstName: 'John', lastName: 'Doe', age: 30, luckyNumber: 13 },
    { firstName: 'Jane', lastName: 'Doe', age: 25, luckyNumber: 18 },
    { firstName: 'James', lastName: 'Bond', age: 30, luckyNumber: 3 }
  ];
  it('should group the object by concatenated strings', () => {
    const expected = {
      'John Doe': [
        { firstName: 'John', lastName: 'Doe', age: 30, luckyNumber: 13 }
      ],
      'Jane Doe': [
        { firstName: 'Jane', lastName: 'Doe', age: 25, luckyNumber: 18 }
      ],
      'James Bond': [
        { firstName: 'James', lastName: 'Bond', age: 30, luckyNumber: 3 }
      ]
    };
    const result = groupBy(users, u => `${u.firstName} ${u.lastName}`);
    expect(result).toEqual(expected);
  });
  it('should group the object by summed numbers', () => {
    const expected = {
      43: [
        { firstName: 'John', lastName: 'Doe', age: 30, luckyNumber: 13 },
        { firstName: 'Jane', lastName: 'Doe', age: 25, luckyNumber: 18 }
      ],
      33: [
        { firstName: 'James', lastName: 'Bond', age: 30, luckyNumber: 3 }
      ]
    };
    const result = groupBy(users, u => u.age + u.luckyNumber);
    expect(result).toEqual(expected);
  });
  it('should group the object by the length of a string', () => {
    const expected = {
      4: [
        { firstName: 'John', lastName: 'Doe', age: 30, luckyNumber: 13 },
        { firstName: 'Jane', lastName: 'Doe', age: 25, luckyNumber: 18 }
      ],
      5: [
        { firstName: 'James', lastName: 'Bond', age: 30, luckyNumber: 3 }
      ]
    };
    const result = groupBy(users, u => u.firstName.length);
    expect(result).toEqual(expected);
  });
});