import React, { Component } from 'react';
import { Navigator, NativeModules, StatusBar, View } from 'react-native';

import { COLOR, ThemeProvider, Toolbar } from '../react-native-material-ui';
import routes from '../routes';
import Container from '../Container';

const UIManager = NativeModules.UIManager;

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
};

class App extends Component {
    static configureScene(route) {
        return route.animationType || Navigator.SceneConfigs.FloatFromRight;
    }
    componentWillMount() {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    renderScene(route, navigator) {
        return (
            <Container>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
                <View style={{ backgroundColor: COLOR.green500, height: 24 }} />
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => navigator.pop()}
                    centerElement={route.title}
                    rightElement="person"
                />
                <route.Page
                    navigator={navigator}
                />
            </Container>
        );
    }

    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
                <Navigator
                    configureScene={App.configureScene}
                    initialRoute={routes.home}
                    ref={this.onNavigatorRef}
                    renderScene={this.renderScene}
                />
            </ThemeProvider>
        );
    }
}

export default App;
