import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";

const useChart = (nodeRef, options) => {
  useEffect(() => {
    if (nodeRef.current) {
      const chartInstance = new Chart(nodeRef.current, options);
      console.log("Chart rendered");

      return () => {
        chartInstance.destroy();
        console.log("Chart destroyed");
      };
    }
  }, [nodeRef, options]);

  return {};
};

export default useChart;
