//検索結果の公園データ一覧を取得するカスタムフック
import { createContext } from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { searchWordState } from "../store/atoms/searchWordState";
import { getSearchParkResults } from "../urls";

export const SearchParkContext = createContext();

export const SearchParkProvider = (props) => {
  const { children } = props;
  const [searchResults, setSearchResults] = useState([]);
  const searchWord = useRecoilValue(searchWordState);

  const handleGetParkSearchResults = async (word) => {
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
