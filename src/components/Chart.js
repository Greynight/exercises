import React from 'react';
import { Line } from 'react-chartjs-2';

import uniq from 'lodash/uniq';

import { loadDataAction } from './../redux/actions';
import store from './../store';

class Chart extends React.Component {
  componentDidMount() {
    const data = store.getState().data;

    if (!data.length) {
      store.dispatch(loadDataAction());
    }
  };

  render() {
    const users = this.props.users;
    const activeExerciseId = this.props.activeExerciseId;
    const activeParamId = this.props.activeParamId;
    const params = this.props.params;
    const data = this.props.data.filter(item => item.exercise === activeExerciseId);
    const activeParam = params.find(param => param.id === activeParamId);

    if (!data.length) {
      return <h3>No data</h3>;
    }

    const activeUsers = users.filter(user => user.isActive);
    const labels = uniq(data.map(item => +item.date).sort((a, b) => (a - b)));

    let datasets = [];

    for (let user of activeUsers) {
      // TODO should be array
      const dataValues = []/*data.filter(item => item.user === user.id)*/;

      dataValues.map(item => ({
        x: item.date,
        y: activeParam.formula(item.values)
      }));

      let dataset = {
        label: user.name,
        borderColor: user.color,
        backgroundColor: user.color,
        //data: [1,2,3,4]
        data: activeParam.formula(dataValues)
      };

      datasets.push(dataset);
    }

    console.log('data', this.props.data);
    console.log('labels', labels);

    // TODO after the chart is ready - add routing for exercises

    /*
     data={props.data}
     users={props.users}
     activeExerciseId={props.activeExerciseId}
     activeParamId={props.activeParamId} />
     */


    //const test = this.store.getUsers().filter(user => !!this.store.activeUsers[user.id]);
    //const data = this.store.getData();
    // let charts = this.store.users.filter(user => !!this.store.activeUsers[user.id]).map(user => <Line
    //   connectNulls={true}
    //   key={user.id}
    //   type="monotone"
    //   stroke={user.color}
    //   dataKey={this.getChartType(user.id)}
    // />);

    const chartOptions = {
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'linear',
          time: {
            unit: 'day',
            tooltipFormat: 'MMMM Do, YYYY'
          }
        }]
      }
    };

    //const data = [3,4,5];
    // TODO sort data by date

    const chartData = {
      labels,
      datasets
    };
      // datasets: [{
      //   label: 'Username 1',
      //   borderColor: 'rgba(255, 99, 132, 0.2)',
      //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
      //   data: [1,2,3,4]
      // }, {
      //   label: 'Username 2',
      //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
      //   borderColor: 'rgba(54, 162, 235, 0.2)',
      //   data: [2,4,8,16]
      // }]};

    return (
      /*
      <ResponsiveContainer width="100%" height="100%" minHeight={500}>
        <LineChart data={this.store.getData()} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <XAxis dataKey="dateTime" tickFormatter={this.formatXAxis} />
          <YAxis />
          <Tooltip labelFormatter={this.formatXAxis} />
          <Legend />
          {charts}
        </LineChart>
      </ResponsiveContainer>
      */

      <Line
        data={chartData}
        options={chartOptions} />
    );
  }
}

export default Chart;
