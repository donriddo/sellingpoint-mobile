/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from 'react-native';
import Home from './home';
import styles from './styles';
import MenuBar from './drawer';

class Objectives extends Component {
    constructor(props) {
        super(props);

        this.state = {showText: true};

        setInterval(() => {
            this.setState({showText: !this.state.showText});
        }, parseInt(this.props.number) * 1000);
    }

    render() {
        let display = this.state.showText ? this.props.number + ". " + this.props.objective : ' ';
        return (
            <Text>{display}</Text>
        );
    }
}

class SignUP extends Component{
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', note: ''};
    }
    login(navigator, homeRoutes) {
        if (this.state.email !== "donriddo" && this.state.password !== "don") {
            console.log("Thumbs Up!!!");
            this.props.navigator.resetTo(homeRoutes[0]);
            // this.props.current.setState({view: Home})
            this.setState({note : "Thumbs UP"});
        } else {
            console.log("Invalid Email/Password");
            this.setState({note : "Invalid credentials"});
        }
    };
    render() {
        const homeRoutes = [{title: "Home", index: 0, scene: MenuBar}];
        return (
            <View style={styles.container}>
              <TopBar/>
              <Text style={styles.welcome}>
                Welcome to SellingPoint!s
              </Text>
               <Text style={styles.instructions}>
                 To get started, Please Sign up below.
               </Text>
               <View style={styles.signup}>
                   <TextInput
                       style={{width: 200}}
                       placeholder="Email"
                       returnKeyType="next"
                       onChangeText={(email) => this.setState({email})} />
                   <TextInput
                       style={{width: 200}}
                       returnKeyType="done"
                       secureTextEntry={true}
                       placeholder="Password"
                       onChangeText={(password) => this.setState({password})} />
                   <TouchableOpacity onPress={() => this.login(navigator, homeRoutes)}>
                       <View style={styles.button}>
                           <Text style={{fontSize: 25, margin: 10, justifyContent: "center"}}>Sign Up</Text>
                       </View>
                   </TouchableOpacity>
                   <Text>{this.state.note}</Text>
               </View>
            </View>
        );
    }
}

class TopBar extends Component {
    render() {
        return (
            <View style={styles.topbar}>
                <Text style={{fontSize: 20}}>SellingPoint</Text>
            </View>
        );
    }
}

class SellingPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {view: SignUP, bar: TopBar};
    }
    renderScene(route, navigator) {
        return <route.scene navigator={navigator}/>
    }
  render() {
      const routes = [{title: "SignUP", index: 0, scene: SignUP}];
    return (
        <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={
            (route, navigator) =>
            {return this.renderScene(route, navigator);}
        }
        />
    );
  }
}

AppRegistry.registerComponent('SellingPoint', () => SellingPoint);
