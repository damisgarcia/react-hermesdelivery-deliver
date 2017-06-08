import React from 'react';
import { ActivityIndicator, Alert, Text, View, RefreshControl } from 'react-native';
import {
  Container,
  Content,
  Header,
  Title,
  Left,
  Right,
  Body,
  Button,
  Icon,
  List,
  ListItem,
} from 'native-base';

import Colors from "../themes/Colors";
import Helpers from "../constants/Helpers";

export default class HomeScreen extends React.Component {
  componentDidMount() {
    let { navigation } = this.props;
    this.props.actions.fetchOrders()
  }

  render() {
    let { state, navigation } = this.props
    if(!this.props.state.orders.isRefreshing){
      return(
        <Container>
          <Content refreshControl={
            <RefreshControl
              title="Aguarde..."
              tintColor={ Colors.brandPrimary }
              refreshing={this.props.state.orders.isRefreshing}
              onRefresh={ _=> this.props.actions.fetchOrders() }
            />
            }>
            <View style={styles.container}>
              <List dataArray={this.props.state.orders.data} renderRow={(order)=>(
                  <ListItem button onPress={ _=> navigation.navigate('Order', { order: order }) }>
                    <View style={ styles.situations[order.situation] }></View>
                    <Body>
                      <Text>{order.cliente.nome}</Text>
                      <Text note>{order.address.street}, { order.address.neighborhood } - {order.address.number}</Text>
                      <Text note>{ Helpers.Timezone.agotime(order.created_at).toString() }</Text>
                    </Body>
                  </ListItem>
                )}>
              </List>
            </View>
          </Content>
        </Container>
      )
    } else{
      return (
        <Container>
          <Content>
            <View style={styles.hero}>
              <ActivityIndicator
                animating={this.props.state.orders.isRefreshing}
                style={[styles.centering, {height: 80}]}
                size="large"
                />
              <Text>Carregando...</Text>
            </View>
          </Content>
        </Container>
      );
    }
  }
};

const styles = {
  container: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'white',
  },
  hero: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 64,
    alignItems: 'center',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  situations:{
    pendente: {
      width: 24,
      height: 48,
      borderLeftWidth: 3,
      borderLeftColor: "#BDBDBD",
    },
    enviado: {
      width: 24,
      height: 48,
      borderLeftWidth: 3,
      borderLeftColor: "#FFEB3B",
    },
    concluido: {
      width: 24,
      height: 48,
      borderLeftWidth: 3,
      borderLeftColor: "#76FF03",
    },
    cancelado: {
      width: 24,
      height: 48,
      borderLeftWidth: 3,
      borderLeftColor: "red",
    },
  }
};
