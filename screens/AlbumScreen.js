import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { CardList} from '../components/CardList'
import * as actions from '../actions'; 
import {View, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import { SearchText} from '../components/SearchText'
import AlbumDetailScreen from '../screens/AlbumDetailScreen'
export default class AlbumsScreen extends React.Component {
    static navigationOptions = {
        title: 'Albums',
    };
    constructor(){
        super()
        this.state = {
           albums:[],
           isFetching:false,
           artist:''
        }
      

       
    }

    searchTracks= (artist)=>{
    this.setState({isFetching:true, albums:[], artist})
    actions.searchTracks(artist)
    .then((albums)=>{
        this.setState({albums:albums, isFetching:false})
    })
    .catch(err =>{
       this.setState({albums: [], isFetching: false}) 
    })
    }

    async saveAlbumToFavorites(album){
      const favoriteAlbums = await actions.retrieveData('favoriteAlbums') || {}

      if(favoriteAlbums[album.id]){
        Alert.alert(
            'Cannot add Album',
            `Album is already in Favorites`,
            [
              {text: 'Continue', onPress: () => console.log('Ok Pressed')},
          
            ],
            { cancelable: false }
          )
          return false;
      }

      favoriteAlbums[album.id] = album
      const sucess = actions.storeData('favoriteAlbums', favoriteAlbums);

      if(sucess){
        Alert.alert(
            'Album Added',
            `Album ${album.title} from ${this.state.artist.name} was added to Favorites`,
            [
              {text: 'Continue', onPress: () => console.log('Ok Pressed')},
          
            ],
            { cancelable: false }
          )
          
        }
      
          
      

    }

    renderBottomNAvigation = (album)=>{
        const {artist} = this.state
        return(
            <View style={styles.albumMenu}>
                     <Icon onPress={()=>{}}
                      raised
                      name="play"
                      type="font-awesome"
                      color="#f50"
                      size={30}
                      />
                     <Icon onPress={()=>{this.props.navigation.navigate('AlbumDetail',{album,artist})}}
                      raised
                      name="info"
                      type="font-awesome"
                      color="#f50"
                      size={30}
                      />
                     <Icon onPress={()=>{this.saveAlbumToFavorites(album)}}
                      raised
                      name="thumbs-up"
                      type="font-awesome"
                      color="#f50"
                      size={30}
                      />
            </View>
        )
    }

    renderAlbums(){
        const {albums,isFetching} = this.state
        return(
            <ScrollView style={styles.container}>
            <SearchText submitSearch={(artist)=>{this.searchTracks(artist)}}></SearchText>
            {albums.length>0 && !isFetching &&
              <CardList 
              data={albums} 
              imageKey={'cover_big'} 
              titleKey={'title'}
              buttonText="See the detail"
              bottomView={this.renderBottomNAvigation}/>
            }
            {albums.length === 0 && isFetching &&
               <Text>Loading Albums... </Text>
            }
            </ScrollView>
        )
    }
    

    render() {
        debugger;
       
        return this.renderAlbums()
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    albumMenu:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
});
