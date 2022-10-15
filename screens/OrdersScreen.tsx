import { View, Text, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { useTailwind } from 'tailwind-rn/dist';
import useOrders from '../hooks/useOrders';
import { ButtonGroup, Image } from '@rneui/themed';
import { Button } from '@rneui/base';
import OrderCard from '../components/OrderCard';

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const tw = useTailwind();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);
  console.log(orders);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? '#EB6A7C' : color, fontSize: 10 }}>
          Orders
        </Text>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#EB6A7C' }}>
      {/* <Text>Thsi is the orders screen</Text> */}
      <Image
        source={{ uri: 'https://links.papareact.com/m51' }}
        containerStyle={tw('w-full h-64')}
      />

      <View>
        <Button
          color="pink"
          //titleStyle={{color: 'gray', font-weight: 400}}
          style={tw('py-2 px-5')}
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? 'Showing olderst first' : 'Showing most recent first'}
        </Button>
        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;