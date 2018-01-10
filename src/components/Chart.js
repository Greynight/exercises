import React from 'react';
import { Line } from 'react-chartjs-2';

const style = {
  textAlign: 'center'
};

const Chart = (props) => {
  const users = props.users;
  const activeExerciseId = props.activeExerciseId;
  const activeParamId = props.activeParamId;
  const params = props.params;
  let data = [...props.data];

  data = data.filter(item => item.exercise === activeExerciseId);

  if (!data.length) {
    return <h3 style={style}>No data for chosen exercise</h3>;
  }

  data = data
    .map(item => {
      item.date = new Date(item.date);
      return item;
    })
    .sort((a, b) => (a.date - b.date));

  const activeParam = params.find(param => param.id === activeParamId);
  const activeUsers = users.filter(user => user.isActive);

  let dataSets = [];

  for (let user of activeUsers) {
    let dataValues = data.filter(item => item.user === user.id);

    let dataItems = dataValues.map(item => ({
      x: item.date,
      y: activeParam.formula(item.data)
    }));

    let dataSet = {
      fill: false,
      label: user.name,
      borderColor: user.color,
      backgroundColor: user.color,
      data: dataItems
    };

    dataSets.push(dataSet);
  }

  const chartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Dates'
        },
        type: 'time',
        display: true,
        distribution: 'linear',
        time: {
          unit: 'week',
          tooltipFormat: 'MMMM Do, YYYY'
        },
        ticks: {
          beginAtZero: true,
          source: 'auto'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: activeParam.name
        }
      }]
    }
  };

  const chartDataSets = {
    datasets: dataSets
  };

  return (
    <Line
      data={chartDataSets}
      options={chartOptions} />
  );
};

export default Chart;
