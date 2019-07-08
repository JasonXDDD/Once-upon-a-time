import React, { Component } from "react";
import { Platform, Image } from "react-native";
import TabBar from "./src/components/tabBar";
import { SafeAreaView } from "react-navigation";
import { Provider, observer } from "mobx-react";
import { Provider as ProviderAntd } from "@ant-design/react-native";
import * as store from "./src/stores/index";
@observer
export default class App extends Component<Props> {
  render() {
    return (
      <Provider rootStore={store}>
        <ProviderAntd>
          <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always", bottom: "always" }}>
            <TabBar />
          </SafeAreaView>
        </ProviderAntd>
      </Provider>
    );
  }
}

