//検索結果の公園データ一覧を取得するカスタムフック
import { createContext } from "react";
import { useEffect, useState } from "react";
import { getSearchParkResults } from "../urls";

export const SearchParkContext = createContext();

export const SearchParkProvider = (props) => {
  const { children } = props;
  const [searchResults, setSearchResults] = useState([]);

  const handleGetParkSearchResults = async (word) => {
    const { data } = await getSearchParkResults(word);
    setSearchResults(data);
  };

  useEffect(() => {
    handleGetParkSearchResults();
  }, []);

  return (
    <SearchParkContext.Provider
      value={{ handleGetParkSearchResults, searchResults }}
    >
      {children}
    </SearchParkContext.Provider>
  );
};
