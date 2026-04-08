import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Avatar, List, Searchbar } from "react-native-paper";

type Ledamot = {
  id: number;
  first_name: string;
  last_name: string;
  image: { url: string } | null;
};

export default function ExploreScreen() {
  const [ledamot, setLedamoter] = useState<Ledamot[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchLedamoter = async () => {
      try {
        const response = await fetch(
          "https://api.lagtinget.ax/api/persons.json",
        );
        const data = await response.json();
        const activeLedamot = data.filter(
          (item: any) => item.state === 1 || item.state === "1",
        );
        setLedamoter(activeLedamot);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLedamoter();
  }, []);

  const updateSearch = (query: string) => {
    setSearch(query);
  };

  const filteredLedamoter = ledamot.filter((item) =>
    `${item.first_name} ${item.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

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
                onPress={() => {
                  router.push({
                    pathname: "/detailedview",
                    params: {
                      id: item.id,
                      first_name: item.first_name,
                      last_name: item.last_name,
                      image: item.image?.url,
                    },
                  });
                }}
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