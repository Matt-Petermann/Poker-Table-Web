import { createContext, useContext, useState } from "react";

interface ITableContext {
  /** Seat number where the button is located. */
  buttonPosition: number,
  /** Set the seat number of where the button is located. */
  setButtonPosition: (seat: number) => void
}

const initialTableContext: ITableContext = {
  buttonPosition: 0,
  setButtonPosition: () => {}
}

const TableServiceContext = createContext<ITableContext>(initialTableContext);

export const useTableContext = () => useContext(TableServiceContext);

export const TableContextProvider = ({ children }: any) => {
  const [values, setValues] = useState<ITableContext>(initialTableContext);

  /** 
   * Set the seat number of where the button is located.
   */
  const setButtonPosition = (seat: number) => {
    setValues(prevValues => ({ ...prevValues, buttonPosition: seat }));
  }

  return (
    <TableServiceContext.Provider value={{ ...values, setButtonPosition }}>
      { children }
    </TableServiceContext.Provider>
  )
}