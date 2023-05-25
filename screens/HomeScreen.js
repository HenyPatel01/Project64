import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
import { Header } from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import dictionary from '../database';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            isSearchPressed: true,
            word: '',
            lexicalCategory: '',
            definition: ''
        }
    }

      getWord = (text) => {
    var text = text.toLowerCase();
    try {
      var word = dictionary[text]['word'];
      var lexicalCategory = dictionary[text]['lexicalCategory'];
      var definition = dictionary[text]['definition'];
      this.setState({
        word: word,
        lexicalCategory: lexicalCategory,
        definition: definition,
      });
    } catch (err) {
      alert('Sorry this word is not available');
      this.setState({
        text: '',
        isSearchPressed: false,
      });
    }
    }
    

    render() {
      return (
        <SafeAreaProvider>
        <View>
            <ScrollView>
            <Header backgroundColor="#b8e0d2" centerComponent={{text:'Pocket Dictionary', style:{color:'#fff', fontSize:20}}}/>

            <TextInput style = {styles.inputBox} onChangeText = {text => {
                this.setState({
                    text: text,
                    isSearchPressed: false,
                    word: "Loading...",
                    lexicalCategory: '',
                    examples: [],
                    definition: ''
                })
            }}/>

            <TouchableOpacity style = {styles.searchButton} onPress = {() => {
                this.setState({isSearchPressed: true});
                this.getWord(this.state.text)
            }}><Text style = {{textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: "black"}}>Search</Text></TouchableOpacity>

            <View>
                <Text style = {{fontSize: 20, marginLeft: 50}}>
                    {
                        this.state.isSearchPressed && this.state.word === "Loading..."
                        ? this.state.word
                        :<Text> </Text>
                    }
                </Text>
                {
                    this.state.word !== "Loading..."?
                    <View>
                        <View>
                            <Text style = {styles.details1}>
                                Word: {" "}
                            </Text>
                            <Text style = {{fontSize: 20, marginLeft: 100, marginRight: 20, marginTop: -28}}>
                                {this.state.word}
                            </Text>
                        </View>

                        <View>
                            <Text style = {styles.details1}>
                                Type: {" "}
                            </Text>
                            <Text style = {{fontSize: 20, marginLeft: 100, marginRight: 20, marginTop: -28}}>
                                {this.state.lexicalCategory}
                            </Text>
                        </View>

                        <View>
                            <Text style = {styles.details1}>
                                Definition: {" "}
                            </Text>
                            <Text style = {{fontSize: 20, marginLeft: 20, marginRight: 20}}>
                                {this.state.definition}
                            </Text>
                        </View>
                    </View>
                    :<Text> </Text>
                }
            </View>
            </ScrollView>
        </View>
        </SafeAreaProvider>
      );
    }
}

const styles = StyleSheet.create({

    inputBox: {
        width:'80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 3,
        borderColor: 'black',
    },

    searchButton: {
        width: '40%',
        height: 50,
        alignSelf: 'center',
        padding: 10,
        margin: 20,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: 'black',
    },

    details1: {
        marginTop: 30,
        color: "black",
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20
    },
})