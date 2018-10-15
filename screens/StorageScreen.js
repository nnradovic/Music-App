import React from 'react';
import { ScrollView, StyleSheet,TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, Text, Divider} from 'react-native-elements';
import * as actions from '../actions' 
export default class StorageScreen extends React.Component {
  static navigationOptions = {
    title: 'StorageScreen',
  };

  constructor(){
    super();

    this.state = {
      value: ''
    }
  }

  async storeData(){
    
   const data = {
       value: 'Some Testing Data!'
   } 

  const value = await actions.storeData('someKey',data)

  if(value){
    console.log(value);
    
  }
  }

  async retriveData(){
    this.setState({
      value:''
    })
    const data = await actions.retrieveData('favoriteAlbums');

    if(data){
      debugger;
      console.log(data);
      
      // this.setState({
      //   value: data.value
      // })
    }

    

  }

  async removeData(){
   const sucess = await actions.clearStorage();

    if(sucess){
      this.setState({
        value:''
      })
    }
  }


  render() {
    const {value} = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text>I am a storage Screen!!</Text>
        <Button title="store data!" onPress={()=>{this.storeData()}}/>
        <Button title="retrive data!" onPress={()=>{this.retriveData()}}/>
        <Button title="remove data!" onPress={()=>{this.removeData()}}/>
        <Text h4>{value}</Text>

      <Divider style={{backgroundColor:'black'}}/>
          <Text h3>Touchables</Text>
        <TouchableHighlight onPress={()=>{}} underlayColor="white">
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableHighlight</Text>
        </View>
        </TouchableHighlight>
        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableOpacity</Text>
        </View>
        </TouchableOpacity>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});
