# PROJECT CODENAME

- The index for this project is 25.3
## Installation

Use npm

```bash
npm install
```

## Usage

```bash
npm start
```
use an app called expoGo

## Lastly

Mbele Naona success

## License

[Emunah Technologies](https://www.natfirecompany.co.ke/)

React Native
- React Native is related to react JS
- With react and react native, you can build real native mobile apps
- React JS is a library independent from React Native
- React JS is a JS library for building user interfaces
- React JS is typically used for web development
- There is another library, react-dom that acts the actual web support
why? - the library react itself is platform-agnostic.
- react doesn't really care about the underlying platform.
- react only gives you methods to handle state, building virtual dom, etc.
- react native is an alternative to react-dom. it gives you a collection of special react components that are compiled to native UI elements.
- react native also allows you to use APIs for camera, sound etc.
- react native is like react dom only that it doesn't target web browser but ios and android.
- react native, you need to know react. you write your code in react and use these components to produce native apps

> npx create-expo-app@latest --template blank ReactNativeCourse
- this gives you a basic startup

- expo go
wtf!. you can build android apps with vscode with no need of an emulator, you can run it and it gives you a qrcode that you can scan and with expo go, you watch your app live manh. WTF!!

> npm start

flexbox
- flexdirection controls the orientations of main axis and cross axis. (main axis is top to bottom) (cross axis is left to right)
- flex: 1 means element should expand to occupy all available space
- flexDirection: 'column' is to the main axis. top to bottom
  flexDirection: 'row' is cross axis
- justifyContent: 'space-between' - controls how elements are layed out in their axis. say if there is to be space btw them, or crunched together - organize elements along the main axis
- alignItems: 'flex-start' - organize elements along the cross axis
justifyContent, if flex is column which is top to bottom it aligns it on the main axis while alignItems does it on the cross axis

- to know options, ctrl+space
- flex property is applied to items inside a flexbox ( comes by default the flexbox )
eg flex 1 in a child view of the first one, will span the entire space of the main-axis
- by default, items will take only as much space as they need
- the flex property remember that it is relative. doesn't have to be one. one can be 1, 2, 1 this will be 1/4
- NB: the button is a component that does not have a style

2.23
Handling Events
- i want you to know that adding a parenthesis on function call on jsx makes the function to be fired as soon as the code is parsed and evaluated. sometimes we want to just point to that function
look at the code
- we need to store the goalInputHandler method as a state so that we can use it in the second function
2.24
Managing a list of Course Goals
NOTE 01

2.25
IOS & Android Styling Differences
- border radius is not supported by ios. so wrap it in a view
- but sasa the color is not supported by view
- styles in react do not cascade ( child elements and descendant elements inherit style from parent and ancestor elements )

2.26
Making content Scrollable with ScrollView
- to scroll, use ScrollView in another view with your styles
- read documentation

2.27
Optimizing Lists with FlatList
- dynamic lists are not good with scrollview because they can become too long.
- flat list will only load items that are visible and all items off screen will be lazy loaded as the user is scrolling
- flatlist is given the data prop
renderItem return items as an object. so it has metadata
- here, we dont need the key prop
NOTE 02

- say if your data is coming from an api and you cant manually add the key prop, what you do is, NOTE 03 add a keyExtractor

2.28
Splitting Components into Smaller Components
- custom components, you name them starting with a capital letter

2.29
Utilizing Props
                // NOTE 04 - passing props to components
- basically here its just about using a component in app and passing a prop from app and take it in the component
- and ofcourse the styles

2.30
Working on the "Goal Input" Component
- we can pass event handler functions via props
- we also need to send data to app from component
NOTE 05. 
we create a function that passes the data back to app

24.01.25
- remember in GoalInput, we are getting the text input and interacting with the course goal state. the problem is that the course goal state is managed in the app component while the input are in a different component. the input is in GoalInput but what is handling it is managed in app. so like app needs something coming from GoalInput component. 
- ati we can talk to parent component by passing event handler functions via props. so addGoalHandler is what we have in the main to work with what is added from the goalInput but we dont have it in the GoalInput Component. so in the Component, you can have a prop from this
<Button title="Add Goal" onPress={addGoalHandler} />
addGoalHandler is in App.
we can have
<Button title="Add Goal" onPress={props.onAddGoal />
onAddGoal now is to be provided by parent component.
- so where we pass GoalInput component in app, we pass onAddGoal as we pass it. we pass a function the addGoalHandler
<GoalInput onAddGoal={addGoalHandler} />
- what about the user input?
it should be in the GoalInput Component. the enteredGoalText useState.
- so even though we dont have the enteredGoalText in our GoalInput component, we pass the function in app that used enterdGoalText in our component as we declare it in app so its like the useState is being fired in the component not in app. you get? like even though the function itself is in app
- also goalInputHandler needs to be in the component.
- then in the app, on the addGoalHandler, we must pass a prop that is the enteredGoalText. that data, enteredGoalText is coming from our component. 
welcome to react my friend.
- one last problem, let me just write it word by word. "whenever addGoalHandler is called, we get this text(enteredGoalText) and we can use it in here(the function) now this function is fine but right now, this text wouldn't be provided. addGoalHandler is passed as a value to onAddGoal on the GoalInput in App and onAddGoal is forwarded to onPress(in our component) but onPress which ultimately calls this function does not provide this enterdGoalText to make sure it does,"
- add another function addGoalHandler
ooh ive understood, you see this button where we call the function
<Button title="Add Goal" onPress={props.onAddGoal} /> 
there is no where we pass the enteredText
so we need another function to pass the enterdText as a parameter. thus,
function addGoalHandler() {
        // NOTE 05
        // we need to pass a value to APP
        props.onAddGoal(enteredGoalText)
        setEnteredGoalText('');
    }
then in the button,
<Button title="Add Goal" onPress={addGoalHandler} /> 

- this is forwarding the enteredGoalText. the state that now is in our component. i pass the state as a value to the function we receive on the onAddGoal prop and since this function is in addGoalHandler in app component, it will receive the enteredText
- then we set the setEnteredGoalText to an empty string whenever we add a new goal

- tebu still listen to this, even though we have set the state to empty, we somehow dont have two way binding. it wount work. we are setting the state in addGoalHandler in GoalInput component but we are not binding the state to textInput the Native Component. so we add a value prop to the <TextInput/> and add a value prop and bind this to enteredGoalText. so whenever the state changes, it is reflected in the TextInput

2.31
Deleting items (Handling taps with the pressable component)
- you wrap the item into a Pressable component

2.32
Making items deletable & using IDs
- we have to receive an id in deleteGoalHandler
- remember that filter returns a the old array minus the items we filtered (forget this latter statement. focus on this next one). if the function returns true, the item is kept (it is not the one being deleted) it is !==. 
- return true if the goal id is not equal to the id we are passing. and if true, we keep it. but if this is false whereby our item is equal to the goal item we want to remove this return false because the id are equal then this item is dropped and the new array will not contain it. now i gerrit
- in deleting you see we also need to pass the id to app because the function to delete is in app and the data needs to come from GoalItem. so we also need to do the same thing where we define a helper function and pass the id inside the prop. but we can also do this 
NOTE 06. - we call an inbuild bind function on the function which we get on the onDeleteItem. bind allows you to preconfigure a function for future executions.
1st value is where it is to be executed (this)
2nd argument, is the first parameter received by the to be called function. this should be the id of the goal item to be removed.
- set an id prop on goalItem in App where you call it. 
- lastly we need to get an id prop on the goalItem component

25.01.25
2.33
Adding an Android Ripple Effect & an IOS Alternative
- adding a ripple effect on Pressable component. 
- a ripple effect is like a big hover
- we move pressable inside so that we ripple on the item only
- this does not happen on IOS. we use style with a function
- the pressed comes with Pressable

2.34
Adding a Modal Screen
- we want to add a modal. a modal is a screen that comes ontop, you do what you do and it goes
- you just wrap the content you want it to go into the modal into the modal Component
- we want to add a button to show when we want to show the modal
- remember button does not have a style component
- we add a useState, have a function to set it and have it in the button
- you remember how we used to conditionally show a modal?
- now we can see a button and onpress we can see the modal. but its just there
- modal has a visible prop that ifset to true is visible and v.v
- modal in GoalInput also has an animationType
- we get the state for the modal via prop

2.35
Styling the Modal Overlay
- we want to have the button below (from row to column) the text input and a button to close the modal
- we can wrap a button in a view and style the view. we are in GoalInput component

2.26
Opening and Closing the modal
- adding a onCancel prop on the component and having a function to end the state or falsify it and calling it in the addGoalHandler

2.37
Working with Images and Changing Colors
- displaying an image
- links you use require
- the path should be relative
- we can also set background color in the major Modal ( the container)

2.38 
App Finishing Touches
- we can add special bg color in app.json
- i dont know why adding backgroundColor in app.json aint working
    "backgroundColor": "#1e085a",
- expo allows us to have a statusBar. we use it to finetune the look of the status bar

so far 
- we built an app of adding course goals
- we learnt user interface in react native
- we saw we have to use native elements
- we learned styling through stylesheet and assign to different elements in jsx code
- we have css properties but it really is not css. we have no inheritance
- we saw differences between android and IOS
- we saw we write regular react applications. we react to state, we can output state, we can change state only that at times names are different like onPress instead of onClick
- we saw how to output list with ScrollView and FlatList and their difference
- we learned how to use modals.
- we learned something about buttons in react native