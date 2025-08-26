import axios from "axios";
import { premiumActions } from "./premium-reducer";


export const leaderBoardList = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://3.108.252.169/api/premium/leaderboard");
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
      const res = await axios.get("http://3.108.252.169/api/premium/report", {
        headers: { Authorization: token }
      });

      if (res.status === 200 || res.status === 201) {
        // ✅ Correct path to S3 URL
        const fileUrl = res.data.fileURL?.Location;

        if (!fileUrl) throw new Error("Report URL not found");

        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", "expenses_report.csv"); 
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.error("Failed to download report:", error);
    }
  };
};
