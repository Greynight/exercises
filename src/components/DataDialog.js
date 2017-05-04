import React from 'react';

import { observer } from 'mobx-react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import { Flex, Box } from 'reflexbox';

import Exercises from './Exercises';

const styles = {
  customWidth: {
    width: 164,
  },
  exercises: {
    width: 164
  }
};

const DialogAddData = observer(class DialogAddData extends React.Component {
  constructor(props) {
    super(props);

    this.store = props.store;

    this.state = {
      date: new Date(),
      exercise: this.store.getExercises()[0].id,
      values: {},
      user: null
    };
  }

  saveData = () => {
    let date = this.state.date;
    // TODO format date?
    let changedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    let data = {...this.state, date: changedDate};

    this.store.saveData(data);
  };

  onExerciseChange = (exercise) => {
    this.setState({exercise});
  };

  generateUsersItems = () => {
    let users = this.store.getUsers();

    return users.map(user => <MenuItem
      key={user.id}
      value={user.id}
      primaryText={user.name} />);
  };

  generateActions = () => {
    return [
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
      />
    ];
  };

  generateFields = () => {
    const activeExerciseId = this.state.exercise;
    const activeExercise = this.store.getExercises().filter(exercise => exercise.id === activeExerciseId)[0];
    const dataTypes = activeExercise.dataTypes;

    return dataTypes.map((datatype, index) => {
      const paddingLeft = index === 0 ? 0 : 2;

      return <Box pl={paddingLeft} key={`box-${datatype.id}`}>
        <TextField
          type="number"
          name={datatype.id}
          key={datatype.id}
          floatingLabelText={datatype.name}
          hintText={datatype.name}
          onChange={this.onItemChange}
          style={styles.customWidth}
        />
      </Box>
    });
  };

  onUserChange = (event, index, value) => {
    this.setState({user: value});
  };

  onItemChange = (event, value) => {
    const type = event.currentTarget.name;
    const values = {...this.state.values};

    values[type] = +value;

    this.setState({values});
  };

  onDateChange = (event, value) => {
    this.setState({date: value});
  };

  render() {
    const actions = this.generateActions();
    const usersItems = this.generateUsersItems();
    const fields = this.generateFields();
    const exercise = this.state.exercise;

    return (
      <div>
        <Dialog
          title="Add data"
          actions={actions}
          modal={false}
          open={this.store.onDialogAddDataOpen()}
        >
          <Flex align="flex-end">
            <Box pr={2}>
              <SelectField
                floatingLabelText="User"
                value={this.state.user}
                onChange={this.onUserChange}
                style={styles.customWidth}
              >
                {usersItems}
              </SelectField>
            </Box>
            <Exercises
              value={exercise}
              store={this.store}
              onExerciseChange={this.onExerciseChange}
            />
            <Box pl={2}>
              <DatePicker
                value={this.state.date}
                hintText="Date Picker"
                onChange={this.onDateChange}
              />
            </Box>
          </Flex>
          <Flex>
            {fields}
          </Flex>
        </Dialog>
      </div>
    );
  }
});

export default DialogAddData;
