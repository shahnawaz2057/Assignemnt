import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {StyleSheet, View, Text, FlatList, TouchableNativeFeedback, Image } from 'react-native';
import Card from '../components/Card';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';

interface Blog {
    id: number,
    title: string;
    body: string;
  }

const Blogs = ({route}) => {
  const [blogs, setBlogs] = useState([]);
  const navigation = useNavigation();

  const { userId } = route.params;

  useEffect(() => {
    const getBlogs = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId ? userId : 1}/posts`,
      );
    //   console.log('response', response.data);
      setBlogs(response.data);
    };
    getBlogs();
  }, []);

  // const cardSelectionHandler = (itemIndex: number) => {
  //   console.log('pressed', itemIndex);
  //   navigation.navigate('EditBlog', {data: blogs[itemIndex]})
  // }

  const onDelete = () => {}

  const onSubmit = (itemIndex: number) => {
    navigation.navigate('EditBlog', {data: blogs[itemIndex]})
  }

  type ItemProps = {title: string, body: string, index: number};

  const Item = ({title, body, index}: ItemProps) => (
    <Card>
       {/* <TouchableNativeFeedback onPress={() => cardSelectionHandler(index)}> */}
        <View style={styles.cardContainer}>
            <View style={styles.imageView}>
              <Image
                source={require('../assets/dummy.jpeg')}
                style={styles.dummyImage}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.body}>{body}</Text>
            </View>
        </View>
       {/* </TouchableNativeFeedback>  */}
       <View style={{ justifyContent: 'flex-end', flexGrow: 1}}>
            <Footer submitTitle='Edit' cancelTitle='Delete' onCancel={onDelete} onSubmit={() => onSubmit(index)} />
        </View>
    </Card>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        renderItem={({item, index}: { item: Blog, index: number }) => <Item title={item.title} body={item.body} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator= {false}
      />
    </View>
  );
};

export default Blogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 16
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageView: {
    paddingHorizontal: 4,
    flex: 0.3
  },
  textContainer: {
    flex: 0.7,
    paddingVertical: 8,
  },
  dummyImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  body: {
    marginTop: 8,
    fontSize: 16
  },
});
