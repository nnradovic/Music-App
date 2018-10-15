import React from 'react';
import { View, FlatList } from 'react-native';
import { Card, Text, Button, Icon} from 'react-native-elements'


export class CardList extends React.Component{
    
    renderData(){
        const{ data, imageKey, titleKey, buttonText, bottomView } = this.props



        return(
            <FlatList data={data}
            keyExtractor={(item,index) => index.toString()}
                      renderItem={({item,index})=>{
                          return (
                            <Card
                            title={item[titleKey]}
                            image={{uri:item[imageKey]}}
                            key={index}
                            >
                            {this.props.bottomView(item)}
                            </Card>
                          )
                      }}

            >
            
            </FlatList>
        )
    }

    render(){
        const {data} = this.props
        if(data && data.length > 0){

            return this.renderData()
        }else{
            return <View></View>
        }
            
        
    }
}