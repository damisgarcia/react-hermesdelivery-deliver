import React from 'react';
import {
  Alert,
  ActivityIndicator,
  Linking,
  Text,
  View
} from 'react-native';

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
  Card,
  CardItem,
} from 'native-base';

import Helpers from "../constants/Helpers";

export default class OrderScreen extends React.Component {

  render() {
    let { state, navigation } = this.props
    let { order } = navigation.state.params
    return(
      <Container>
        <Content>
          <View style={styles.container}>
            <Text style={styles.situation}>{ order.situation.toUpperCase() }</Text>

            <Card style={styles.component}>
              <CardItem header>
                <Text style={styles.cardTitle}>{'Informações do Cliente'.toUpperCase()}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.title}>Cliente</Text>
                  <Text>{ order.cliente.nome }</Text>

                  <Text style={styles.title}>Endereço</Text>
                  <Text>{ order.address.street }, { order.address.number } - { order.address.neighborhood }</Text>

                  <Text style={styles.title}>Forma de pagamento</Text>
                  <Text>{ order.forma_de_pagamento }</Text>

                  <Text style={styles.title}>Valor Total</Text>
                  <Text>{ Helpers.Number.to_currency(order.valor_total) }</Text>

                  <Text style={styles.title}>Informações Adicionais</Text>
                  <Text>{ order.info_adicional }</Text>
                </Body>
              </CardItem>
            </Card>

            <Card style={styles.component}>
              <CardItem header>
                <Text style={styles.cardTitle}>{'Produtos'.toUpperCase()}</Text>
              </CardItem>
              <CardItem>
                { this._renderProducts(order.json_produtos) }
              </CardItem>
            </Card>
            <Button warning block style={styles.component} onPress={ _=> this._toMap(order.address) }>
              <Text style={styles.textBtn}>{"Abrir Mapa".toUpperCase()}</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  _renderProducts(products){
    return products.map((p, index)=>{
      return(
        <Body key={index}>
          <Text>{ p.count} X { p.name } - { Helpers.Number.to_currency(p.current_price) }</Text>
          <Text>{ Helpers.Number.to_currency(p.current_price * p.count) }</Text>
        </Body>
      );
    })
  }

  _toMap(address){
    Linking.openURL(`geo:0,0?q=${address.street}+${address.number}+${address.neighborhood}`)
  }
};

const styles = {
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: 'white',
  },
  component: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 24,
  },
  hero: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 64,
    alignItems: 'center',
  },
  cardTitle:{
    fontSize: 16,
  },
  title:{
    fontWeight: 'bold',
  },
  textBtn: {
    color: 'white'
  },
  situation:{
    textAlign: 'right',
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
    marginRight: 8,
    marginBottom: 16,
  }
};
