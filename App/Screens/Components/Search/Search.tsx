import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { CustomText } from '@CommonComponent';
import { AppContext } from '@AppContext';

const friends = [
  {
    id: '1',
    name: 'John Parker',
    country: 'Sri Lanka',
    age: 'N3322112',
    rating: 3,
    sports: '2024-12-02',
    imageUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png',
  },
  {
    id: '2',
    name: 'John Parker',
    country: 'Sri Lanka',
    age: 'N3322112',
    rating: 4,
    sports: '2024-12-02',
    imageUrl: 'https://bootdey.com/img/Content/avatar/avatar2.png',
  },
  {
    id: '3',
    name: 'John Parker',
    country: 'Sri Lanka',
    age: 'N3322112',
    rating: 3.5,
    sports: '2024-12-02',
    imageUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
  },
  {
    id: '4',
    name: 'John Parker',
    country: 'Sri Lanka',
    age: 'N3322112',
    rating: 3.5,
    sports: '2024-12-02',
    imageUrl: 'https://bootdey.com/img/Content/avatar/avatar4.png',
  },
  {
    id: '5',
    name: 'John Parker',
    country: 'Sri Lanka',
    age: 'N3322112',
    rating: 3.5,
    sports: '2024-12-02',
    imageUrl: 'https://bootdey.com/img/Content/avatar/avatar5.png',
  },
  {
    id: '6',
    name: 'John Parker',
    country: 'Sri Lanka',
    age: 'N3322112',
    rating: 3.5,
    sports: '2024-12-02',
    imageUrl: 'https://bootdey.com/img/Content/avatar/avatar5.png',
  },
  {
    id: '7',
    name: 'John Parker',
    country: 'Sri Lanka',
    age: 'N3322112',
    rating: 3.5,
    sports: '2024-12-02',
    imageUrl: 'https://bootdey.com/img/Content/avatar/avatar5.png',
  },
];

const Search = () => {
  const { appTheme } = useContext(AppContext);

  const renderFriend = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>
            {item.country} - {item.age}
          </Text>
          <Text style={styles.sports}>{item.sports}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[{ backgroundColor: appTheme.background }]}>
      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderWidth: 4,
    borderColor: '#DCDCDC',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    color: '#FFD700',
  },
  sports: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2ECC71',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#2ECC71',
    fontSize: 16,
  },
});

export default Search;
