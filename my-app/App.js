import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, ScrollView, } from 'react-native';
import { fetchTopWatch, fetchFlwItem } from './extension/aniwatch';

export default function App() {
  const image = require("./assets/background.jpg")

  const [dataSrcList, setDataSrcList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData();
    fetchMovies();
  }, []);
  
  const fetchMovies = async () => {
   try {
     const movies = await fetchTopWatch(0);
     console.log('movies: ', movies)
     setMovies(movies);
   } catch (error) {
     console.error('Error fetching movies:', error);
   }
 };

  const fetchData = async () => {
    try {
      const dataSrcList = await fetchFlwItem();
      console.log('data: ', dataSrcList)
      setDataSrcList(dataSrcList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
         <View style={styles.header}>
            <View></View>
            <Text style={styles.text_heading}>Aniwatch</Text>
            <View style={styles.search_bar}>
               <Text>Search</Text>
            </View>
         </View>
         <View style={styles.carousel}>
            <ScrollView horizontal contentContainerStyle={styles.scrollView}>
               {dataSrcList.map((dataSrc, index) => (
                  <View style={styles.flw_item}>
                     <Image key={index} style={styles.image} source={{ uri: dataSrc.url }} />
                     <View style={styles.center_div}>
                        <Text style={styles.text}>{ dataSrc.name }</Text>
                     </View>
                  </View>
               ))}
            </ScrollView>
         </View>
         <View style={styles.top_section}>
            <View style={styles.top_section_header}>
               <Text style={styles.top_10}>Top 10</Text>
               <View style={styles.div}>
                  <Text style={styles.active}>Today</Text>
                  <Text style={styles.top_category_text}>Weekly</Text>
                  <Text style={styles.top_category_text}>Monthly</Text>
               </View>
            </View>
               <ScrollView>
                  <View style={styles.top_section_data}>
                     {movies.map(movie => (
                     <View key={movie.rank} style={styles.movieContainer}>
                        <View style={styles.space_between}>
                           <Text style={styles.movieRank}>{movie.rank}</Text>
                           <Image source={{ uri: movie.url }} style={styles.movieImage} />
                        </View>
                        <View>
                           <Text style={styles.movieText}>{movie.name}</Text>
                        </View>
                     </View>
                     ))}
                  </View>
               </ScrollView>
         </View>
         <View>
            
         </View>
         <View style={styles.footer}>
            <View style={styles.footer_view}>
               <Text style={styles.footer_text}>Home</Text>
            </View>
            <View style={styles.footer_view}>
               <Text style={styles.footer_text}>Library</Text>
            </View>
            <View style={styles.footer_view}>
               <Text style={styles.footer_text}>History</Text>
            </View>
            <View style={styles.footer_view}>
               <Text style={styles.footer_text}>Setting</Text>
            </View>
         </View>
         <StatusBar style="auto" />
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
   //  flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  header: {
   width: '100%',
   height: '5%',
   backgroundColor: '#151A20',
   justifyContent: 'space-between',
   alignItems: 'center',
   flexDirection: 'row',
   padding: 5,
  },

  search_bar: {
   backgroundColor: '#777',
   width: '70%',
   padding: 5,
  },

  div: {
   backgroundColor: '#222',
   justifyContent: 'space-between',
   flexDirection: 'row',
   width: 150,
   padding: 5,
  },

  flw_item: {
   flexDirection: 'column',
   justifyContent: 'space-between',
   width: 200,
  },

  center_div: {
   height: 40,
  },

  text: {
   color: 'white',
   textAlign: 'center',
  },

  images1: {
    flex: 1,
    justifyContent: 'center',
    width: 395,
  },

  scrollView: {
   justifyContent: 'space-between',
   gap: 5,
  },

  top_10: {
   fontSize: 16,
   fontWeight: 'bold',
   color: 'white',
  },

  top_section: {
   width: '100%',
   height: 300,
   backgroundColor: '#121212',
   padding: 5,
  },

  top_section_header: {
   width: '100%',
   backgroundColor: '#121212',
   justifyContent: 'space-between',
   alignItems: 'center',
   flexDirection: 'row',
   marginBottom: 5,
  },

  top_section_data: {
   flexDirection: 'column',
   // alignItems: 'center'
   backgroundColor: "#111",
  },

  space_between: {
   justifyContent: 'space-between',
   alignItems: 'center',
   flexDirection: 'row',
   gap: 30,
  },

  movieContainer: {
   justifyContent: 'space-between',
   alignItems: 'center',
   flexDirection: 'row',
   // borderColor: 'white',
   borderWidth: 1,
   padding: 5,
  },

  movieRank: {
   fontWeight: 'bold',
   borderColor: '#F24462',
   // borderWidth: 5,
   borderBottomWidth: 5,
   color: 'white',
  },

  movieText : {
   color: 'white'
  },

  movieImage: {
   width: 60,
   height: 60,
   borderRadius: 5,
  },
  
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },

  carousel : {
   width: '100%',
   maxHeight: '32%',
   backgroundColor: '#121212',
   justifyContent: 'center',
   alignItems: 'center',
  },

  footer : {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   width: '100%',
   minHeight: 50,
   backgroundColor: '#151A20',
   bottom: 35,
  },

  footer_view: {
   borderBlockColor: 'white',
   paddingTop: 10,
   paddingBottom: 10,
   paddingLeft: 20,
   paddingRight: 20,
  },

  footer_text: {
   color: 'white',
  },

  text_heading: {
   color: '#F24462',
   fontWeight: 'bold',
   fontSize: 20,
  },

  top_category_text: {
   color: 'white'
  },

  active: {
   color: 'white',
   backgroundColor: '#F24462',
  }
});
