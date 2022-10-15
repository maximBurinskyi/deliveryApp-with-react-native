import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import useCustomerOrders from '../hooks/useCustomerOrders';
import { CustomerScreenNavigationProp } from '../screens/CustomersScreen';
import { Card } from '@rneui/themed';

type Props = {
  userId: string;
  name: string;
  email: string;
};

const CustomerCard = ({ email, name, userId }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  //console.log(orders);

  return (
    <TouchableOpacity>
      <Card containerStyle={tw('p-5 rounded-lg')}>
        <View>
          <View>
            <Text>{name}</Text>
            <Text>ID: {userId}</Text>
          </View>

          <View>
            <Text>{loading ? 'loading...' : `${orders.length} x`}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
