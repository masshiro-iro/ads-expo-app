import React, { Component }                 from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import api                                  from '../services/api';

export default class Main extends Component {
    state = {
        subjects: []
    }
    
    colors= {
        bg: [
            '#d9ffe3',
            '#feffd9',
            '#ffdede',
            '#e0fdff',
            '#e0e3ff',
            '#f2e3ff',
            '#ffe7bf'
        ],
        border: [
            '#b8ffcb',
            '#eef0b9',
            '#d6a9a9',
            '#a7d3d6',
            '#a7acd9',
            '#c8ade0',
            '#ffd082'
        ]
    }

    getButtonStyle = function(){
        let random = Math.floor(Math.random() * 7);

        return {
            flex: 1,
            backgroundColor: this.colors.bg[random],
            borderWidth: 1,
            borderColor: this.colors.border[random],
            borderRadius: 5,
            padding: 20,
            marginBottom: 20
        }
    }

    componentDidMount(){
        this.loadSubjects();
    }

    loadSubjects = async () => {
        const response = await api.get('/subjects')
            .then(response => {
                this.setState({ subjects: response.data.data });
            }).catch(error => console.log(error));
    }

    renderItem = ({ item }) => (
        <View style={this.getButtonStyle()}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                        this.props.navigation.navigate('Detail', { materia: item })
                    }
                }
            >
                <Text style={styles.materia}>{item.nome} <Text style={styles.semestre}>4º Semestre</Text></Text>
            </TouchableOpacity>
        </View>   
    )

    render(){
        return (
            <View style={styles.container}>
                <FlatList 
                    contentContainerStyle={styles.list}
                    data={this.state.subjects}
                    keyExtractor={item => item.id}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    materia: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    semestre: {
        fontSize: 14,
        fontWeight: '200'
    },
    // button: {
        
    // },
    list: {
        padding: 20
    }
});
