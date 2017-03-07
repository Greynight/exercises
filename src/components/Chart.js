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
    let type = this.store.type;
    return `${user}.${type}`;
  };

  // TODO chart color
  render() {
    let charts = this.store.users.filter(user => !!this.store.activeUsers[user.id]).map(user => <Line
      connectNulls={true}
      key={user.id}
      type="monotone"
      dataKey={this.getChartType(user.id)}
    />);

    return (
      <ResponsiveContainer width="100%" height="100%" minHeight={500}>
        <LineChart data={this.getData()} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Legend />
          {charts}
        </LineChart>
      </ResponsiveContainer>
    );
  }
});

export default Chart;
