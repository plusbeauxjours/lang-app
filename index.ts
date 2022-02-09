import { AppRegistry } from "react-native";
import AppDrop from "./AppDrop";
import AppCard from "./AppCard";
import AppTest from "./AppTest";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => AppDrop);
// AppRegistry.registerComponent(appName, () => AppCard);
// AppRegistry.registerComponent(appName, () => AppTest);
