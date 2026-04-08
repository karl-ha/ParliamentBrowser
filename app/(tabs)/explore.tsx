import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { List, Text } from 'react-native-paper';

type Ledamot = { id: number; first_name: string; last_name: string };

export default function ExploreScreen() {
  const [ledamot, setLedamoter] = useState<Ledamot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLedamoter = async () => {
      try {
        const response = await fetch('https://lagtinget.ax');
        const data = await response.json();
        setLedamoter(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLedamoter();
  }, []);

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;