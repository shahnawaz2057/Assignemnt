import axios from 'axios';
import React, { useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

interface componentNameProps {}

const EditBlog = ({ route, navigation }) => {

  const { data } = route.params;
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);

  
  console.log(data);
  

  const titleChangeHandler = text => {
      setTitle(text);
  }

  const bodyChangeHandler = text => {
    setBody(text);
  }

  const onSave = async () => {
    const payload = {
      'id': data.id,
      'userId': data.userId,
      'title': title ? title : data.title,
      'body': body ? body : data.body
    }
    console.log('payload', JSON.stringify(payload));
    
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${data.userId}`, 
          JSON.stringify(payload),
          { headers: {'Content-Type': 'application/json'} });
      
      if (response.status == 200) {
          Alert.alert('Alert Message', 'Post updated successfully', [
              {
                  text: 'OK',
                  onPress: () => {
                      navigation.navigate('Blogs', {"userId": data.userId});
                  },
              },
          ])
      }  
  }
    
  return (
    <View style={styles.container}>
        <View style={styles.section}>
            <Text style={styles.title}>Title</Text>
            <TextInput 
                style={styles.input} 
                multiline={true}
                value={title}
                onChangeText={(text) => titleChangeHandler(text)}
            /> 
        </View>
        <View>
            <Text style={styles.title}>Body</Text>
            <TextInput 
                style={styles.input} 
                multiline={true}
                value={body}
                onChangeText={(text) => bodyChangeHandler(text)}
            /> 
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => onSave()}>
                <Text style={styles.submitText}>Save</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default EditBlog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    padding: 8
  },
  title: {
    fontSize: 20
  },
  section: {
    marginBottom: 20
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
    paddingHorizontal: 3,
    paddingVertical: 5
},
buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
button: {
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
} ,
submitText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  }, 
});
