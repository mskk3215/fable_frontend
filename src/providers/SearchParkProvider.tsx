//検索結果の公園データ一覧を取得するカスタムフック
import { createContext } from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { searchWordState } from "../store/atoms/searchWordState";
import { getSearchParkResults } from "../urls";

// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
export const SearchParkContext = createContext();

export const SearchParkProvider = (props: any) => {
  const { children } = props;
  const [searchResults, setSearchResults] = useState([]);
  const searchWord = useRecoilValue(searchWordState);

  const handleGetParkSearchResults = async (word: any) => {
    const { data } = await getSearchParkResults(word);
    setSearchResults(data);
  };

  useEffect(() => {
    handleGetParkSearchResults(searchWord);
  }, []);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <SearchParkContext.Provider
      value={{ handleGetParkSearchResults, searchResults }}
    >
      {children}
    </SearchParkContext.Provider>
  );
};
