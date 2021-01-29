import { PermissionsAndroid, Platform } from "react-native";
import { init, Geolocation } from "react-native-amap-geolocation";
import axios from "axios";
class Geo {
  async initGeo() {
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    }
    await init({
      //key是高德地图中探花应用的key
      ios: "1218920229d29164606570e64c0a921a",
      android: "1218920229d29164606570e64c0a921a"
    });
    return Promise.resolve();
  }
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      console.log("开始定位");
      Geolocation.getCurrentPosition(({ coords }) => {
        resolve(coords);
      }, reject);
    })
  }
  async getCityByLocation() {
    const { longitude, latitude } = await this.getCurrentPosition();
    const res = await axios.get("https://restapi.amap.com/v3/geocode/regeo", {
      // key是高德地图中web api应用的key
      params: { location: `${longitude},${latitude}`, key: "05142335912a80a447e0d086296fb57c", }
    });
    return Promise.resolve(res.data);
  }
}
export default new Geo();