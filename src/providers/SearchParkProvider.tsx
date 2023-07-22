//検索結果の公園データ一覧を取得するカスタムフック
import React, { createContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getSearchParkResults } from "../urls";
import { searchWordState } from "../store/atoms/searchWordState";

type SearchParkContextType = {
  handleGetParkSearchResults: (word: string) => void;
  searchResults: string[];
};
type SearchParkProviderProps = {
  children: React.ReactNode;
};

export const SearchParkContext = createContext<SearchParkContextType>({
  handleGetParkSearchResults: () => {},
  searchResults: [],
});

export const SearchParkProvider: React.FC<SearchParkProviderProps> = ({
  children,
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const searchWord = useRecoilValue(searchWordState);

  const handleGetParkSearchResults = async (word: string) => {
    const { data } = await getSearchParkResults(word);
    setSearchResults(data);
  };

  useEffect(() => {
    handleGetParkSearchResults(searchWord);
  }, []);

  return (
    <SearchParkContext.Provider
      value={{ handleGetParkSearchResults, searchResults }}
    >
      {children}
    </SearchParkContext.Provider>
  );
};
