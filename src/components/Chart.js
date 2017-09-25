import React from 'react';
import { observer } from 'mobx-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from 'recharts';

const Chart = observer(class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.store = props.store;
  }

  /**
   * Returns data for a chart
   * @returns {Array}
   */
  getData = () => {
    const data = this.store.getData();

    // TODO only in debug mode
    if (data) {
      console.log(data);
    }

    return data ? data.map(item => item) : [];
  };

  /**
   * Return chart type based on active exercise type and active user
   * @param user
   * @returns {string}
   */
  getChartType = (user) => {
    let type = this.store.activeType;
    return `${user}.${type}`;
  };

  formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  render() {
    let charts = this.store.users.filter(user => !!this.store.activeUsers[user.id]).map(user => <Line
      connectNulls={true}
      key={user.id}
      type="monotone"
      stroke={user.color}
      dataKey={this.getChartType(user.id)}
    />);

    return (
      <ResponsiveContainer width="100%" height="100%" minHeight={500}>
        <LineChart data={this.getData()} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <XAxis dataKey="dateTime" tickFormatter={this.formatXAxis} />
          <YAxis />
          <Tooltip/>
          <Legend />
          {charts}
        </LineChart>
      </ResponsiveContainer>
    );
  }
});

export default Chart;
