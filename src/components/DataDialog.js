import React from 'react';

import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';

import { Flex, Box } from 'reflexbox';

import Exercises from './Exercises';

const styles = {
  customWidth: {
    width: 164
  },
  iconAdd: {
    paddingTop: 20,
    cursor: 'pointer'
  },
  iconRemove: {
    paddingTop: 40,
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
        onTouchTap={this.handleSave}
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
      const key = `${param}-${num}`;

      return (
        <Box pl={paddingLeft} key={`box-${key}`}>
          <TextField
            type="number"
            name={paramName}
            id={key}
            key={`field-${key}`}
            floatingLabelText={paramName}
            hintText={paramName}
            onChange={this.handleParamChange}
            style={styles.customWidth}
          />
        </Box>
      );
    });
  };

  handleSave = () => {
    this.props.handleDataSave({
      data: this.state.values,
      date: this.state.date,
      user: this.state.user,
      exercise: this.state.exerciseId
    });
  };

  handleUserChange = (event, index, value) => {
    this.setState({user: value, number: 1});
  };

  handleParamChange = (event, value) => {
    const param = event.currentTarget.id;
    const paramType = param.split('-')[0];
    const paramNum = param.split('-')[1];
    let values = {...this.state.values};
    const savedParam = values[paramType];

    if (!savedParam) {
      values[paramType] = [];
    }

    values[paramType][paramNum-1] = +value;

    this.setState({values});
  };

  handleDateChange = (event, value) => {
    this.setState({date: value});
  };

  handleExerciseChange = (event, index, exerciseId) => {
    this.setState({exerciseId, number: 1});
  };

  // TODO remove saved values in state
  // TODO check how it works with filled fields
  handleRemoveClick = () => {
    const number = --this.state.number;
    this.setState({number});
  };

  // TODO check how it works with filled fields
  handleAddClick = () => {
    const number = ++this.state.number;
    this.setState({number});
  };

  render() {
    const num = this.state.number;
    const actions = this.generateActions();
    const usersItems = this.generateUsersItems();
    const fields = [];

    for (let i = 1; i <= num; i++) {
      let elm = null;

      if (i > 1 && i === num) {
        elm = (
          <Flex key={i}>
            {this.generateFields(i)}
            <Remove
              style={styles.iconRemove}
              onClick={this.handleRemoveClick}
            />
          </Flex>
        );
      } else {
        elm = (<Flex key={i}>{this.generateFields(i)}</Flex>);
      }

      fields.push(elm);
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
            style={styles.iconAdd}
            onClick={this.handleAddClick}
          />
          {fields}
        </Dialog>
      </div>
    );
  }
}

export default DialogData;
