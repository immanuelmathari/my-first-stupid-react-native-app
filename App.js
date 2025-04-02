import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  // usestate for handling the button
  // 002 this is that state for it then proceed below
  // here now after understanding that GoalInput is a modal, we need a way to start it obviously using a button, a way to end it too. so you find that if these states of modalIsVisible are here, we need to pass these props here. because remember we first made the GoalInput here then it became big and transferred it to its own components so time to time you'll need that. the reason we pass it is because when we enter the goal in the GoalInput through goalInputHandler, we need to save it, when we save it, that list is stored here not in GoalInput courseGoals (fuck now its become so easy) so we need to pass that result here and the way we do that, is first of all just take a quick note of modalIsVisible, startAddGoalHandler, endAddGoalHandler these are how they are started. listen to this to start you up on passing the props, we need from here a button to open the modal. take a look at it, a button component has a prop onPress which in our case calls this function startAddGoalHandler which simply is a function to set the state of modalIsVisible to true then in GoalInput, we have a need to cancel it yet the function to cancel it is here at endAddGoalHandler now listen, we pass a prop through the component like this <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCancel={endAddGoalHandler}/> take a focus on the onCancel which calls what we need endGoalHandler. so in GoalInput, what we expect to have is and onCancel and we look it through the props. so on the GoalInput where you want to cancel at the onPress, we need to call this endAddGoalHandler which is passed via a prop called onCancel thats why in GoalInput on the Button's onPress, we say onPress={props.onCancel}. now is adding it and its pretty easy too. the function that does that is addGoalHandler and we have to call it once in GoalInput component we save a goal so at that Button's onPress, we expect a prop pointing to this function affGoalHandler which is {props.onAddGoal} but here we carry a value so we have to set it thats why we use the function in GoalInput component addGoalHandler, and in addGoalHandler, we have an inline JS function | arrow fn that takes a prop of currentGoalHandler, we spread it using ... this function will be expecting a prop that was taken from the enteredGoalText in GoalInput component and adds it and we add it with an id for indexing to perform fast operations such as deleting and then you can finish off with the GoalInput whereby we'd preferabbly need a
  // Flat list for the data rather than a scrollview this is because Flatlist offers Lazy loading. you know what that is? you only load as much data as you need. and then we render the rest using a component so to the GoalItem, we give them the text that will be rendered one by one like a map as Flatlist does then we go create a component for a single item which is GoalItem. Note in GoalItem how we do onDelete because we need to pass the id to deleteGoalHandler that has the actual logic and is in here this is because its an id we are passing we pass ids like that by binding the id to the onDeleteItem. This ensures that when the Pressable is clicked, the deleteGoalHandler function receives the id of the specific goal. and we done. btw note the keyExtractor too this is for adding a key prop. 
  // in addGoalHandler the reason we have the prop is because we are expecting it and in GoalInput the reason we need to pass the enteredGoalText via a function is so that we can provide that prop addGoalHandler (in GoalInput). what im trying to say is that onAddGoal has to be passing a text value

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  // function for handling the modal
  function startAddGoalHandler()
  {
    setModalIsVisible(true);
  }

  function endAddGoalHandler()
  {
    setModalIsVisible(false);
    // we must call this function in addGoalHandler
  }


  

  // fired when the user presses the button
  function addGoalHandler(enteredGoalText) {
    console.log(enteredGoalText)
    // NOTE 01: this is not an advisable way to update the state if your new state depends on the previous state
    // setCourseGoals([...courseGoals, enteredGoalText]);
    // here, we call first the state. this value is provided by react and then you pass it and update it.
    // setCourseGoals(currentCourseGoals => [...currentCourseGoals, enteredGoalText])
    // NOTE 02
    // when using flexList, you have to pass an object with a key property
    // now every item in courseGoal array is an object with a text property and key property
    // setCourseGoals(currentCourseGoals => [...currentCourseGoals, { text: enteredGoalText, key: Math.random().toString()}])
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, { text: enteredGoalText, id: Math.random().toString()}])
    endAddGoalHandler();
  };

  function deleteGoalHandler(id) {
    console.log('DELETE');
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id)
    })
  }

  return (
    <>
    <StatusBar style='light' />
    <View style={styles.appContainer}>
      <Button title="Add New Goal" color="#5e0acc" onPress={startAddGoalHandler}/>
      {/* {modalIsVisible && <GoalInput onAddGoal={addGoalHandler} /> } */}
      {/* problem with the above is that it just stays there thats not what we want */}
      <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCancel={endAddGoalHandler}/> 
      
      
      
      <View style={styles.goalsContainer}>
            {/* <ScrollView>
        {
          courseGoals.map((goal) => (
            <View key={goal} style={styles.goalItem}>
              <Text style={styles.goalText} >{goal}</Text>
          </View>
            ) )
          }
              </ScrollView> */}
              <FlatList data={courseGoals} renderItem={(itemData) => {
                // NOTE 04 - passing props to components. note that the name text is what we are using in the GoalItem component
                return <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler} />;
              }}
              // NOTE 03
              keyExtractor={(item, index) => {
                // gets a key for every item
                return item.id
              } } />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    // has to take entire screen so that the children can share what they have been given
    flex: 1, // its the only container so flex 1 gives it all the space
    backgroundColor: '#1e085a'
  },
  goalsContainer: {
    flex: 5,
  },
  
})