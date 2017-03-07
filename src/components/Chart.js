import React from 'react';
import { observer } from 'mobx-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';

const Chart = observer(class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.store = props.store;
  }

  getData = () => {
    return this.store.getData();
  };

  getChartType = (user) => {
    let type = this.store.getType();

    return `${user}.${type}`;
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%" minHeight={500}>
        <LineChart data={this.getData()} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Legend />
          {this.store.getUsers().ivan ? <Line connectNulls={true} type="monotone" dataKey={this.getChartType('ivan')} stroke="#8884d8" /> : null}
          {this.store.getUsers().marina ? <Line connectNulls={true} type="monotone" dataKey={this.getChartType('marina')} stroke="#82ca9d" /> : null}
        </LineChart>
      </ResponsiveContainer>
    );
  }
});

export default Chart;
