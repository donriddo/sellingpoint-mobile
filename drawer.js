import React, { Component, PropTypes, Platform } from 'react';
import {
  AppRegistry,
  BackAndroid,
  ToolbarAndroid,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ListView,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  DeviceEventEmitter
} from 'react-native';
import Button from 'react-native-button';
import _ from 'underscore';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { EventEmitter } from 'fbemitter';

// import Menu from './Menu';
import Home from './home'
// import AnotherComponent from './AnotherComponent'

// import navigationHelper from '../helpers/navigation';

import styles from './styles';

let _emitter = new EventEmitter();

function navigationHelper(scene) {
    var componentMap = {
        'Home': {
            title: 'Home',
            id: 'Home',
            index: 0
        },
        'AnotherComponent': {
            title: 'AnotherComponent',
            id: 'AnotherComponent',
            index: 1
        }
    };

    return componentMap[scene];
}

class AnotherComponent extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>AnotherComponent Screen</Text>
            </View>
        );
    }
}

var _navigate;
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
        _navigate = this.props.navigate;
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(['Home', 'AnotherComponent'])
        });
    }

    _renderMenuItem(item) {
        return(
            <Button onPress={()=> this._onItemSelect(item)}><Text style={styles.menuItem}>{item}</Text></Button>
        );
    }

    _onItemSelect(item) {
        _navigate(item);
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(item) => this._renderMenuItem(item)}
            />
        );
    }
}

class MenuBar extends Component {
    componentDidMount() {
        var self = this;

        _emitter.addListener('openMenu', () => {
            self._drawer.open();
        });

        _emitter.addListener('back', () => {
            self._navigator.pop();
        });
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<Menu navigate={(route) => {
                    this._navigator.push(navigationHelper(route));
                    this._drawer.close()
                }}/>}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={{
                    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
                    main: {paddingLeft: 3}
                }}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}>
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => Navigator.SceneConfigs.FloatFromLeft}
                    initialRoute={{
                        id: 'Home',
                        title: 'Home',
                        index: 0
                    }}
                    renderScene={(route, navigator) => this._renderScene(route, navigator)}
                    navigationBar={
                        <Navigator.NavigationBar
                            style={styles.navBar}
                            routeMapper={NavigationBarRouteMapper} />
                    }
                />
            </Drawer>
        );
    }

    _renderScene(route, navigator) {
        switch (route.id) {
            case 'Home':
                return (<Home navigator={navigator}/>);

            case 'AnotherComponent':
                return (<AnotherComponent navigator={navigator}/>);
        }
    }
}

const NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity
                style={styles.navBarLeftButton}
                onPress={() => {_emitter.emit('openMenu')}}>
                <Icon name='menu' size={25} color={'white'}/>
            </TouchableOpacity>
        );
    },

    RightButton(route, navigator, index, navState) {
        console.log(index);
        if (index > 0) {
            return (
                <TouchableOpacity
                    onPress={() => {_emitter.emit('back')}}
                    style={styles.navBarRightButton}>
                    <Icon name='chevron-left' size={25} color={'white'}/>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    },

    Title(route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title}
            </Text>
        )
    }
}

export default MenuBar;
