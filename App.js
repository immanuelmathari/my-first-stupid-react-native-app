import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  // usestate for handling the button
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