import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

// Services
import { mockFetchUserFavorites } from "./services";

// State
import { pageLoadState, userFavoritesState, currentUserIdState } from "./state";

// Styles
import "./App.css";

// ISSUE: Both use effects are running on load but I want only the top one to
//        run on page load and then the second to run everytime we edit the
//        filter.

function App() {
  const [isPageLoadComplete, setIsPageLoadComplete] =
    useRecoilState(pageLoadState);
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdState);
  const [userFavorites, setUserFavorites] = useRecoilState(userFavoritesState);

  useEffect((): void => {
    async function onPageLoad() {
      return await mockFetchUserFavorites(currentUserId);
    }

    // NOTE: It won't update userDefaults value here within the state hook
    //       for us which is interesting. So using .then() is the best option.

    // Fetching data here.
    onPageLoad()
      .then((res) => {
        // Then we pass the data from the service and also set it in state,
        // so we have that info ready for other areas that may need it.
        const { favorites } = res;
        return favorites;
      })
      .then((data) => {
        // After getting the data in the previous step, we can set it in state.
        setUserFavorites(data);
      })
      .then(() => {
        // At this point the page load is complete.
        setIsPageLoadComplete(true);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("checking for changes ...");
    isPageLoadComplete &&
      mockFetchUserFavorites(currentUserId)
        .then((res) => {
          const { favorites } = res;
          return favorites;
        })
        .then((data) => {
          setUserFavorites(data);
        });
  }, [isPageLoadComplete, currentUserId, setUserFavorites]);

  useEffect(() => {
    console.log(userFavorites);
  }, [userFavorites]);

  return (
    <div className="App">
      <div>data-fetching</div>
      <div>
        <select
          value={currentUserId}
          onChange={(evt) => setCurrentUserId(Number(evt.target.value))}
        >
          <option value={1}>User 1</option>
          <option value={2}>User 2</option>
        </select>

        <div>{`${userFavorites}`}</div>
      </div>
    </div>
  );
}

export default App;
