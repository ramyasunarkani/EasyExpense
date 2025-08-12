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


export const downloadReport = () => {
  return async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/premium/report", {
        headers: { Authorization: token },
        responseType: "blob" // important for file download
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expenses_report.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download report:", error);
    }
  };
};

