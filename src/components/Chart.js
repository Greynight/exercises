import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = (props) => {
  const users = props.users;
  const activeExerciseId = props.activeExerciseId;
  const activeParamId = props.activeParamId;
  const params = props.params;

  let data = props.data.filter(item => item.exercise === activeExerciseId);

  if (!data.length) {
    return <h3>No data</h3>;
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
      label: user.name,
      borderColor: user.color,
      backgroundColor: user.color,
      data: dataItems
    };

    dataSets.push(dataSet);
  }

  // TODO after the chart is ready - add routing for exercises

  const chartOptions = {
    fill: false,
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
