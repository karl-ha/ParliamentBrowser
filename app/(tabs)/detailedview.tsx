import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";

export default function DetailView() {
  const { id, first_name, last_name, image } = useLocalSearchParams();
  const [extra, setExtra] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://api.lagtinget.ax/api/persons/${id}.json`)
      .then((res) => res.json())
      .then((data) => setExtra(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  return (
    <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
      {image ? (
        <Avatar.Image size={100} source={{ uri: image as string }} />
      ) : null}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {first_name} {last_name}
      </Text>
      {extra && (
        <View style={{ marginTop: 20, width: "100%" }}>
          <Text>Phone: {extra.phone}</Text>
          <Text>Email: {extra.email}</Text>
          <Text>Profession: {extra.profession}</Text>
          <Text>Birthday: {extra.birthday}</Text>
          <Text>Adress: {extra.address}</Text>
        </View>
      )}
    </View>
  );
}
