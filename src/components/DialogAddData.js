import React from 'react';

import { observer } from 'mobx-react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import { Flex, Box } from 'reflexbox';

const styles = {
  rightBlock: {
    paddingLeft: 20
  },
  customWidth: {
    width: 164,
  }
};

const DialogAddData = observer(class DialogAddData extends React.Component {
  constructor(props) {
    super(props);

    this.store = props.store;
    this.state = {
      date: new Date,
      calories: undefined,
      time: undefined,
      distance: undefined,
      user: undefined
    };
  }

  saveData = () => {
    let date = this.state.date;
    let changedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    let data = {...this.state, date: changedDate};

    this.store.saveData(data);
  };

  generateUsersItems = () => {
    let users = this.store.getUsers();

    return users.map(user => <MenuItem
      key={user.id}
      value={user.id}
      primaryText={user.name} />);
  };

  handleUserChange = (event, index, value) => {
    this.setState({user: value});
  };

  handleDateChange = (event, value) => {
    this.setState({date: value});
  };

  handleCaloriesChange = (event, value) => {
    this.setState({calories: +value});
  };

  handleTimeChange = (event, value) => {
    this.setState({time: +value});
  };

  handleDistanceChange = (event, value) => {
    this.setState({distance: +value});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.saveData.bind(this)}
      />,
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={false}
        onTouchTap={this.store.hideAddDataDialog}
      />,
    ];

    let usersItems = this.generateUsersItems();

    return (
      <div>
        <Dialog
          title="Add data"
          actions={actions}
          modal={false}
          open={this.store.onDialogAddDataOpen()}
        >
          <Flex align="flex-end">
            <Box>
              <SelectField
                floatingLabelText="User"
                value={this.state.user}
                onChange={this.handleUserChange}
              >
                {usersItems}
              </SelectField>
            </Box>
            <Box style={styles.rightBlock} >
              <DatePicker
                value={this.state.date}
                hintText="Date Picker"
                onChange={this.handleDateChange}
              />
            </Box>
          </Flex>
          <Flex>
            <Box>
              <TextField
                type="number"
                hintText="Calories"
                onChange={this.handleCaloriesChange}
                style={styles.customWidth}
              />
            </Box>
            <Box style={styles.rightBlock} >
              <TextField
                type="number"
                hintText="Time, minutes"
                onChange={this.handleTimeChange}
                style={styles.customWidth}
              />
            </Box>
            <Box style={styles.rightBlock} >
              <TextField
                type="number"
                hintText="Distance, km"
                onChange={this.handleDistanceChange}
                style={styles.customWidth}
              />
            </Box>
          </Flex>
        </Dialog>
      </div>
    );
  }
});

export default DialogAddData;
