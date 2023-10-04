import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {StyleSheet, View, Text, FlatList, TouchableNativeFeedback, Image } from 'react-native';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootDrawerParamList } from '../../App'
import { Blog } from '../models/Blog';

type NavigationProps = NativeStackScreenProps<RootDrawerParamList, 'Blogs'>;

const Blogs = ({route, navigation}: NavigationProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { userId } = route.params;

  useEffect(() => {
    const getBlogs = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId ? userId : 1}/posts`,
      );
    //   console.log('response', response.data);
    const blogs: Blog[] = [];
    for (const obj of response.data) {
      const blog = new Blog(obj.id, obj.userId, obj.title, obj.body);
      blogs.push(blog);
    }
      setBlogs(blogs);
    };
    getBlogs();
  }, [userId]);  

  const onDelete = () => {};

  const onSubmit = (itemIndex: number) => {
    navigation.navigate('EditBlog', {data: blogs[itemIndex]})
  };

  type ItemProps = {title: string, body: string, index: number};

  const Item = ({title, body, index}: ItemProps) => (
    <Card>
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
       <View style={{ justifyContent: 'flex-end', flexGrow: 1}}>
            <Footer submitTitle='Edit' cancelTitle='Delete' onCancel={onDelete} onSubmit={() => onSubmit(index)} />
        </View>
    </Card>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        renderItem={({item, index}) => <Item title={item.title} body={item.body} index={index} />}
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
