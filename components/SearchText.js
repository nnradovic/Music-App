import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage} from 'react-native-elements'

export class SearchText extends React.Component {
    constructor(){
        super()

        this.state={
            value:''
        }
    }
    componentDidMount(){
        this.input.focus();
    }
    onChange(value){
        this.setState({value})
    }
    onSubmitSearch(){
        const { submitSearch} = this.props;
        submitSearch(this.state.value)
        
    }
    render() {
    return (
    <View>
        <FormLabel containerStyle={styles.center}>Search an artist</FormLabel>
        <FormInput ref={input => this.input = input} onChangeText={(event)=> this.onChange(event)}/>
        <FormValidationMessage></FormValidationMessage>
        <Button title="Search" onPress={()=>{ this.onSubmitSearch()}}/>
    </View>
    )
  }
}


const styles = StyleSheet.create({
    center:{
        alignItems: 'center'
    }
})