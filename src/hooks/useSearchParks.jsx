//検索結果の公園データ一覧を取得するカスタムフック
import { useEffect, useMemo, useState } from "react";
import { getSearchParkResults } from "../urls";

export const useSearchParks = (searchWord) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleGetParkSearchResults = async (searchWord) => {
    const { resultData } = await getSearchParkResults(searchWord);
    setSearchResults(resultData);
  };

  useEffect(() => {
    handleGetParkSearchResults();
  }, []);

  const memoizedResults = useMemo(() => {
    return searchResults;
  }, [searchResults]);

  return { handleGetParkSearchResults, searchResults: memoizedResults };
};
