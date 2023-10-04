import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SectionList,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const menuList = [
  {
    title: 'Dashboards',
    data: [
      {"name": "Overview", "icon": "signal", "enabled": false}, 
      {"name": "Calendar", "icon": "calendar", "enabled": false},
      {"name": "Scheduled Actions", "icon": "clipboard-list", "enabled": false}, 
      {"name": "Live Alerts'", "icon": "bell", "enabled": false}],
  },
  {
    title: 'Blogs',
    data: [
      {"name": "All", "icon": "circle", "enabled": true , "screen": "Blogs"}, 
      {"name": "Latest", "icon": "info-circle", "enabled": true,  "screen": "Blogs"}, 
      {"name": "Archived", "icon": "archive", "enabled": true,  "screen": "Blogs"}],
  },
  {
    title: 'Home',
    data: [{"name": "Home", "icon": "home", "enabled": true,  "screen": "Home"}],
  },
];

const CustomDrawer = props => {

  const navigation = useNavigation();

  return (
    
    <DrawerContentScrollView {...props} contentContainerStyle={{flexGrow: 1}}>
    <View style={styles.container}>
       {/* 1A2155 */}
      <View style={{height: 100, backgroundColor: '#1A2155', }}>
        <Image
          source={require('../assets/qdb.png')}
          style={styles.bannerImage}
        />
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/laura-jones.jpg')}
          style={styles.profileImage}
        />
        <Text>Hello</Text>
        <Text>{props.user ? props.user.name : 'NA'}</Text>
      </View>
      <View style={styles.sectionList}>
        <SectionList
          sections={menuList}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({item, index}) => (
            <DrawerItem
              key={index}
              label={() => (
                <View >
                    <Text
                    style={item.enabled ? styles.drawerItemLabel : styles.drawerItemLabelDisabled}>
                    {item.name}
                  </Text>
                </View>
              )}
              icon={() => (<Icon name={item.icon} size={30} color={item.enabled ? "#1e90ff" : "grey"} />)}
              onPress={() => {item.enabled && navigation.navigate(item.screen, {"userId": props.user.id ? props.user.id : 1})}}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
          scrollEnabled={false}
        />
      </View>
    </View>

      </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerImage: {
    flex: 1,
    objectFit: 'contain',
    alignSelf: 'flex-start'
  },
  profileContainer: {
    alignItems: 'center', 
    justifyContent: 'center' , 
    paddingTop: 16
  },
  liveMetrics: {
    width: '80%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#6AC5FE',
    marginTop: 10,
    alignItems: 'center',
  },
  drawerItemLabel: {
    fontWeight: '500',
    padding: 0,
    marginLeft: -20
  },
  drawerItemLabelDisabled: {
    fontWeight: '500',
    padding: 0,
    color: 'grey',
    marginLeft: -20
  },
  item: {
    // backgroundColor: '#f9c2ff',
    paddingHorizontal: 16,
    paddingVertical: 0,
    marginVertical: 4,
  },
  header: {
    fontSize: 16,
    backgroundColor: '#6AC5FE',
    // backgroundColor: '#1A2155',
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  title: {
    fontSize: 18,
  },

  sectionList: {
    marginHorizontal: 8,
    marginTop: 16,
    marginBottom: 8
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});

export default CustomDrawer;
