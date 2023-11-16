import { useEffect, useMemo, useState } from "react";
import Spreadsheet from "react-spreadsheet";
import * as Y from "yjs";
import Network from "../../components/Network";
import { HocuspocusContextProvider, useHocuspocusProvider } from "../../provider";

export default function Page() {
  return (
    <HocuspocusContextProvider>
      <Network />
      <SpreadsheetExample />
    </HocuspocusContextProvider>
  );
}

export const SpreadsheetExample = () => {
  const provider = useHocuspocusProvider();

  const spreadsheetArray = useMemo(() => {
    const spreadsheetArray = provider.document.getArray("spreadsheet");
    return spreadsheetArray;
  }, [provider.document]);

  const getSpreadsheet = () => {
    const arr = spreadsheetArray.toJSON();
    return arr;
  };

  const [data, setData] = useState([[]]);

  useEffect(() => {
    const listener = (events: Y.YEvent<Y.XmlText>[], transaction: Y.Transaction) => {
      if (
        transaction.origin === provider ||
        transaction.origin === provider.document ||
        transaction.origin === null
      ) {
        return;
      }
      const spreadsheet = getSpreadsheet();
      setData(spreadsheet);
    };

    spreadsheetArray.observeDeep(listener);

    return () => {
      spreadsheetArray.unobserveDeep(listener);
    };
  }, []);

  return (
    <Spreadsheet
      data={data}
      onCellCommit={(prevCell, nextCell, coords) => {
        if (!coords) {
          return;
        }

        const { row, column } = coords;
        // @typescript-eslint/no-explicit-any
        const r = spreadsheetArray.get(row) as Y.Array<any>;
        // start transaction
        provider.document.transact(() => {
          r.delete(column);
          // @ts-expect-error
          r.insert(column, [{ value: nextCell?.value || "" }]);
        });
      }}
    />
  );
};
