import { useState } from "react";
import { Button, Image, Modal, StyleSheet, TextInput, View } from "react-native";

function GoalInput(props) {

  // Start here 001
  // understand this without the onPress, endGoalHandler, addGoalHandler, onCancel, onAddGoal
  // after that, now you need to understand that we keep this as a Modal which we import from react-native and the Modal has a visible prop which can be set to true or false depending on whether you wonna show it or not. and ofcourse, an animationType (fade, slide, none)
  // if youve understood, now go to App at 002
  // register a state to use for goalInputHandler and addGoalHandler
  const [enteredGoalText, setEnteredGoalText] = useState('');

  // responsible for fetching user input as user types
  // we get the enteredText automatically
  function goalInputHandler(enteredText) {
    console.log(enteredText);
    setEnteredGoalText(enteredText);
  };

  // what these two does, we need to have the text input set to a value. that value is enteredGoalText, but per time per time, it changes, how do we monitor it? we use goalInputHandler

  function endGoalHandler() {
    props.onEndGoal()
  }

  function addGoalHandler() {
    // NOTE 05
    // we need to pass a value to APP
    props.onAddGoal(enteredGoalText)
    setEnteredGoalText('');
  }
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image source={require('../assets/icon.png')} style={styles.image} />
        <TextInput style={styles.textInput} placeholder="Your Course Goal" onChangeText={goalInputHandler} value={enteredGoalText} />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel." onPress={props.onCancel} color='#f31282' />
          </View>
          <View style={styles.button}>
            <Button title="ADD GOAL." onPress={addGoalHandler} color='#5e0acc' />
          </View>
        </View>

      </View>
    </Modal>
  )
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 24,
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: 'gray',
    flex: 1,
    backgroundColor: '#311b6b'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    borderRadius: 6,
    // flex: 1,
    width: '100%',
    padding: 16,
    // marginRight: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,

  },
  button: {
    // width: '30%',
    width: 100,
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20
  }
})