const fs = require('fs');

const {
     filterByQuery,
     findById,
     createNewZookeeper,
     validateZookeeper
} = require('../lib/zookeepers.js');

const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test('create a new zookeeper object', () => {
     const zookeeper = createNewZookeeper(
          { name: 'darlene', id: 'fdsfdsa' },
          zookeepers
     );

     expect(zookeeper.name).toBe('darlene');
     expect(zookeeper.id).toBe('fdsfdsa');
});

test('filters by query', () => {
     const startingZookeepers = [
          {
               "id": "0",
               "name": "Kim",
               "age": 28,
               "favoriteAnimal": "dolphin"
             },
             {
               "id": "1",
               "name": "Raksha",
               "age": 31,
               "favoriteAnimal": "penguin"
             }
     ];

     const updatedZookeepers = filterByQuery({ name: 'Kim' }, startingZookeepers);

     expect(updatedZookeepers.length).toEqual(1);
});

test('find by ID', () => {
     const startingZookeepers = [
          {
               "id": "0",
               "name": "Kim",
               "age": 28,
               "favoriteAnimal": "dolphin"
             },
             {
               "id": "1",
               "name": "Raksha",
               "age": 31,
               "favoriteAnimal": "penguin"
             }
     ];

     const result = findById('1', startingZookeepers);

     expect(result.name).toBe('Raksha');
});

test('validate favorite animal', () => {
     const zookeeper = {
          "id": "0",
          "name": "Kim",
          "age": 28,
          "favoriteAnimal": "dolphin"
        };

     const invalidZookeeper = {
          "id": "0",
          "name": "Kim",
          "age": 28,
        };

        const result = validateZookeeper(zookeeper);
        const result2 = validateZookeeper(invalidZookeeper);

        expect(result).toBe(true);
        expect(result2).toBe(false);
});