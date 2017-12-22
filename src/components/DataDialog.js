import React from 'react';

import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Add from 'material-ui/svg-icons/content/add';

import { Flex, Box } from 'reflexbox';

import Exercises from './Exercises';

const styles = {
  customWidth: {
    width: 164
  },
  iconStyle: {
    paddingTop: 20,
    cursor: 'pointer'
  }
};

class DialogData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      exerciseId: props.exercises[0].id,
      values: {},
      user: null,
      exercises: props.exercises,
      users: props.users,
      number: 1
    };
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  generateActions = () => {
    return [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleDataSave}
      />,
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={false}
        onTouchTap={this.props.handleDataDialogHide}
      />
    ];
  };

  generateUsersItems = () => {
    return this.state.users.map(user => <MenuItem
      key={user.id}
      value={user.id}
      primaryText={user.name} />);
  };

  generateFields = (num) => {
    const activeExercise = this.state.exercises.find(exercise => exercise.id === this.state.exerciseId);

    return activeExercise.results.map((param, index) => {
      const paddingLeft = index === 0 ? 0 : 2;
      const paramName = this.capitalizeFirstLetter(param);

      return (
        <Flex key={num}>
          <Box pl={paddingLeft} key={`box-${param}-${num}`}>
            <TextField
              type="number"
              name={paramName}
              key={`field-${param}-${num}`}
              floatingLabelText={paramName}
              hintText={paramName}
              onChange={this.handleParamChange}
              style={styles.customWidth}
            />
          </Box>
        </Flex>
      );
    });
  };

  handleUserChange = (event, index, value) => {
    this.setState({user: value, number: 1});
  };

  handleParamChange = (event, value) => {
    const type = event.currentTarget.name;
    const values = {...this.state.values};

    values[type] = +value;

    this.setState({values, number: 1});
  };

  handleDateChange = (event, value) => {
    this.setState({date: value});
  };

  handleExerciseChange = (event, index, exerciseId) => {
    this.setState({exerciseId, number: 1});

  };

  handleOnAddClick = () => {
    const number = ++this.state.number;
    this.setState({number});
  };

  render() {
    const num = this.state.number;

    const actions = this.generateActions();
    const usersItems = this.generateUsersItems();
    const fields = [];

    for (let i = 1; i <= num; i++) {
      fields.push(this.generateFields(i));
    }

    return (
      <div>
        <Dialog
          title="Add data"
          actions={actions}
          modal={false}
          open={this.props.isOpen}
        >
          <Flex align="flex-end">
            <Box pr={2}>
              <SelectField
                floatingLabelText="User"
                value={this.state.user}
                onChange={this.handleUserChange}
                style={styles.customWidth}
              >
                {usersItems}
              </SelectField>
            </Box>
            <Exercises
              value={this.state.exerciseId}
              exercises={this.props.exercises}
              handleExerciseChange={this.handleExerciseChange}
            />
            <Box pl={2}>
              <DatePicker
                value={this.state.date}
                hintText="Date Picker"
                onChange={this.handleDateChange}
              />
            </Box>
          </Flex>
          <Add
            style={styles.iconStyle}
            onClick={this.handleOnAddClick}
          />
          {fields}
        </Dialog>
      </div>
    );
  }
}

export default DialogData;
