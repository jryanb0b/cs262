import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/global';

export default function monopoly({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://cs262-monopoly-service.herokuapp.com/players/')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }, []);

  return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator/> : (
            <FlatList
                data={data}
                keyExtractor={({ id }, index) => id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
                    <Text style={globalStyles.title}>{ item.email }</Text>
                </TouchableOpacity>
                )}
            />
        )}
      </View>
  );
};

