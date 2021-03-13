import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';

import Store from './Store/ConfigStore';
import Movies from './Navigation/TabNavigation'

class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Movies/>
      </Provider>
    )
  } 
};

export default App;