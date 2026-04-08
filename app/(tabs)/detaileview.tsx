import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Avatar} from "react-native-paper";
import { useLocalSearchParams } from 'expo-router';

export default function DetailView() {
  const { id, first_name, last_name, image } = useLocalSearchParams();
  const [extra, setExtra] = useState<any>(null);

  useEffect(() => {
    fetch(`https://lagtinget.ax{id}.json`)
      .then(res => res.json())
      .then(data => setExtra(data));
  }, [id]);
}

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Sök ledamot..."
          onChangeText={updateSearch}
          value={search}
        />
      </View>
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={filteredLedamoter}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <List.Item
                title={`${item.first_name} ${item.last_name}`}
                left={(props) =>
                  item.image && item.image.url ? (
                    <Avatar.Image
                      {...props}
                      size={48}
                      source={{ uri: item.image.url }}
                    />
                  ) : (
                    <Avatar.Icon {...props} size={48} icon="account" />
                  )
                }
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});