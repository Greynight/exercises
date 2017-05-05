export default {
  users: [{
    id: 'marina',
    name: 'Marina',
    color: 'green'
  }, {
    id: 'ivan',
    name: 'Ivan',
    color: 'grey'
  }],
  exercises: [{
    id: 'orbitrack',
    name: 'Orbitrack',
    dataTypes: [{
      id: 'calories',
      name: 'Calories'
    }, {
      id: 'time',
      name: 'Time, min'
    }, {
      id: 'distance',
      name: 'Distance, km'
    }],
    dataKey: 'date'
  }, {
    id: 'pushups',
    name: 'Push ups',
    dataTypes: [{
      id: 'numberPerSet',
      name: 'Number per set'
    }, {
      id: 'sets',
      name: 'Sets'
    }],
    dataKey: 'date'
  }]
}
