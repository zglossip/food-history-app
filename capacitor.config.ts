import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "Food History",
  webDir: "dist",
  server: {
    //TODO: Before deploy, set up https and change the androidScheme to https
    androidScheme: "http",
  },
};

export default config;
