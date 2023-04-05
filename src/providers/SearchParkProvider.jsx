//検索結果の公園データ一覧を取得するカスタムフック
import { createContext } from "react";
import { useEffect, useState } from "react";
import { getSearchParkResults } from "../urls";

export const SearchParkContext = createContext();

export const SearchParkProvider = (props) => {
  const { children, searchWord } = props;
  const [searchResults, setSearchResults] = useState(null);

  const handleGetParkSearchResults = async (searchWord) => {
    const { data } = await getSearchParkResults(searchWord);
    setSearchResults(data);
  };

  useEffect(() => {
    handleGetParkSearchResults(searchWord);
  }, [searchWord]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <SearchParkContext.Provider
      value={{ handleGetParkSearchResults, searchResults }}
    >
      {children}
    </SearchParkContext.Provider>
  );
};
