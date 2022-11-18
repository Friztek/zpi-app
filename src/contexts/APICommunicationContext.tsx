import { useAuth0 } from "@auth0/auth0-react";
import { createContext, FC, ReactNode, useContext } from "react";
import { AssetsApi, Configuration, UserAssetsApi, WalletApi, UserPreferencesApi } from "../client-typescript";

export type APICommunication = {
  assetsAPI: AssetsApi;
  userAssetsAPI: UserAssetsApi;
  userPreferenceAPI: UserPreferencesApi;
  walletApi: WalletApi;
};

const APICommunicationContext = createContext<APICommunication | null>(null);

export const APICommunicationContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const basePath = "http://localhost:5000";
  const { getAccessTokenSilently } = useAuth0();

  const configuration = new Configuration({
    basePath,
    accessToken: async () => await getAccessTokenSilently(),
    headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET POST PUT PATCH DELETE"}
  });

  const value: APICommunication = {
    assetsAPI: new AssetsApi(configuration),
    userAssetsAPI: new UserAssetsApi(configuration),
    userPreferenceAPI: new UserPreferencesApi(configuration),
    walletApi: new WalletApi(configuration),
  };

  return <APICommunicationContext.Provider value={value}>{children}</APICommunicationContext.Provider>;
};

export const useAPICommunication = () => {
  const context = useContext(APICommunicationContext);
  if (context === null) throw new Error("Should not be null");
  return context;
};
