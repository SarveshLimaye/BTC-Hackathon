import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { WagmiProvider, createConfig, http } from "wagmi";
import { rootstockTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
const connectkitConfig = createConfig(
  getDefaultConfig({
    chains: [rootstockTestnet],
    transports: {
      [rootstockTestnet.id]: http(
        `https://rootstock-testnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
    },

    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    appName: "BTC Hackathon",

    appDescription: "Your App Description.",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",
  })
);

const queryClient = new QueryClient();

const Navbar = dynamic(() => import("@/components/NavBar/NavBar"), {
  ssr: false,
});

const colors = {
  brand: {
    50: "#ecefff",
    100: "#cbceeb",
    200: "#a9aed6",
    300: "#888ec5",
    400: "#666db3",
    500: "#4d5499",
    600: "#3c4178",
    700: "#2a2f57",
    800: "#181c37",
    900: "#080819",
  },
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, config });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <WagmiProvider config={connectkitConfig}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                }}
              >
                <Navbar />
                <Component {...pageProps} />{" "}
              </div>
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </>
  );
}
