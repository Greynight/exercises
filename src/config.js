export default {
  users: [{
    id: 'marina',
    name: 'Marina'
  }, {
    id: 'ivan', name: 'Ivan'
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
