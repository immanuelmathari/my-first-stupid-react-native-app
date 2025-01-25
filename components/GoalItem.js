import { Pressable, StyleSheet, Text, View } from "react-native";

function GoalItem(props) {
  
    return (

      // NOTE 06. 
      // we bind 
        <View  style={styles.goalItem}>
          <Pressable android_ripple={{color: '#dddddd'}} onPress={props.onDeleteItem.bind(this, props.id)} style={({ pressed }) => pressed && styles.pressedItem}>
              <Text style={styles.goalText} >{props.text}</Text>
          </Pressable>
          </View>
    )
};

export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: 'hotpink'
      },
      pressedItem : {
        opacity: 0.5
      },
      goalText: {
        color: 'white',
        padding: 8,

    
      }
})