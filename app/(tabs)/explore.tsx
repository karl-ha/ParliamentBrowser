import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { List} from 'react-native-paper';

type Ledamot = { id: number; first_name: string; last_name: string };

export default function ExploreScreen() {
  const [ledamot, setLedamoter] = useState<Ledamot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLedamoter = async () => {
      try {
        const response = await fetch('https://api.lagtinget.ax/api/persons.json');
        const data = await response.json();
        
      const activeLedamot = data.filter((item: any) => item.state === "1");
      setLedamoter(activeLedamot);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLedamoter();
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={ledamot}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <List.Item
              title={`${item.first_name} ${item.last_name}`}
              left={props => <List.Icon {...props} icon="account" />}
            />
          )}
        />
      )}
    </View>
  );
}