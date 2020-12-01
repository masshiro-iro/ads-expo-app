import React, { Component }                 from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import api                                  from '../services/api';

export default class Detail extends Component {
    state = {
        students: [],
        subject: []
    }

    componentDidMount(){
        this.materia = this.props.route.params.materia;
        this.loadStudents();
    }

    loadStudents = async () => {
        this.response = await api.get(`/subjects/${this.materia.id}`)
            .then(response => {
                this.setState({ students: response.data.data.students, subject: response.data.data.subject });
            }).catch(error => console.log(error));
    }

    renderItem = ({ item }) => (
        <View>
            <Text style={styles.item}>{item.nome}</Text>
        </View>   
    )

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.subject.nome}</Text>
                <FlatList 
                    contentContainerStyle={styles.list}
                    data={this.state.students}
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
        padding: 20
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    list: {
        padding: 20
    },
    item: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5
    }
});