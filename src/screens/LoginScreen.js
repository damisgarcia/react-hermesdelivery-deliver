import React from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'react-native';
import {
  Container,
  Content,
  Button,
  Form,
  Label,
  Item,
  Input,
} from 'native-base';

import Colors from "../themes/Colors";

export default class LoginScreen extends React.Component {
  state = {
    access_key: ''
  }
  
  render() {
    let { state, navigation } = this.props

    return (
      <Container>
        <View style={styles.container}>
          <Form>
            <Item regular style={ styles.item }>
              <Input value={this.state.access_key} onChangeText={ (access_key)=> this.setState({access_key})} placeholder="Chave de Acesso"/>
            </Item>
            <Button block primary onPress={ _=> this.submit(navigation) }>
              <Text style={styles.textPrimaryBtn}>Entrar</Text>
            </Button>
            <Text style={styles.errorMessage}> { state.params.message } </Text>
          </Form>
        </View>
      </Container>
    );
  }

  submit (navigation){
    this.props.actions.setKey(this.state.access_key)
    navigation.navigate('Home')
  }
};

const styles = {
  item: {
    marginBottom: 24
  },
  counter: {
    fontSize: 48,
  },
  container:{
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  errorMessage:{
    fontSize: 14,
    marginTop: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: Colors.brandDanger
  },
  textPrimaryBtn:{
    color: 'white'
  }
};
