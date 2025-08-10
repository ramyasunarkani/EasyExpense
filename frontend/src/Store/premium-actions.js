import axios from "axios";
import { premiumActions } from "./premium-reducer";


export const leaderBoardList = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3000/premium/leaderboard");
      console.log(res.data);
      dispatch(premiumActions.setLeaderboard(res.data)); 
    } catch (error) {
      console.error(error.message, "cannot fetch list");
    }
  };
};
