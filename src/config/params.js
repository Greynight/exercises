const maxValue = (items, itemName) => {
  let values = items[itemName];
  return Math.max.apply(null, values);
};

const averageValue = (items, itemName) => {
  let values = items[itemName];
  return values.reduce((prev, current) => (prev + current), 0) / items.length;
};

const totalValue = (items, itemName) => {
  let values = items[itemName];
  return values.reduce((prev, current) => (prev + current), 0);
};

export default [{
  id: 'maxWeight',
  name: 'Maximum Weight',
  formula: (items) => (maxValue(items, 'weight'))
}, {
  id: 'totalWeight',
  name: 'Total Weight',
  formula: (items) => (totalValue(items, 'weight'))
}, {
  id: 'averageWeight',
  name: 'Average Weight',
  formula: (items) => (averageValue(items, 'weight'))
}, {
  id: 'maxNumber',
  name: 'Maximum Number',
  formula: (items) => (maxValue(items, 'number'))
}, {
  id: 'totalNumber',
  name: 'Total Number',
  formula: (items) => (totalValue(items, 'number'))
}, {
  id: 'averageNumber',
  name: 'Average Number',
  formula: (items) => (averageValue(items, 'number'))
}, {
  id: 'calories',
  name: 'Calories',
  formula: (items) => (items.map(item => item.calories))
}, {
  id: 'duration',
  name: 'Duration',
  formula: (items) => (items.map(item => item.duration))
}, {
  id: 'distance',
  name: 'Distance',
  formula: (items) => (items.map(item => item.distance))
}];
