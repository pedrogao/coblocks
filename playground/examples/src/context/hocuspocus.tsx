import { useContext, useState, useEffect, createContext, useCallback } from "react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as Y from "yjs";

export const createHocuspocusProvider = ({
  name,
  url,
  doc = new Y.Doc(),
  autoConnect = true,
}: {
  name: string;
  url: string;
  autoConnect?: boolean;
  doc?: Y.Doc;
}) => {
  const HocuspocusProviderContext = createContext<HocuspocusProvider | null>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const HocuspocusContextProvider = ({ children }: { children: any | any[] }) => {
    const newProvider = useCallback(() => {
      return new HocuspocusProvider({
        url,
        name,
        document: doc,
        connect: false,
      });
    }, []);

    const [provider, setProvider] = useState<HocuspocusProvider>(newProvider());

    useEffect(() => {
      // console.log("HocuspocusReactProvider useEffect");

      const provider = newProvider();
      setProvider(provider);

      if (autoConnect) {
        provider.connect();
      }

      return () => {
        provider.destroy();
      };
      // https://medium.com/suyeonme/react-lets-deep-dive-into-deps-array-of-useeffect-13ab96468db7
      // doc is not a primitive value, so it will always be different. unless we replace it with a new one.
    }, []);

    return (
      <HocuspocusProviderContext.Provider value={provider}>
        {children}
      </HocuspocusProviderContext.Provider>
    );
  };

  const useHocuspocusProvider = () => {
    const provider = useContext(HocuspocusProviderContext);
    if (provider === null) {
      throw new Error("Provider is not initialized");
    }
    return provider!;
  };

  return { HocuspocusContextProvider, useHocuspocusProvider };
};
