import React, { useEffect, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDarkmodeContext } from "../context/darkmodeContextProvider";
import { doc, getDoc } from "firebase/firestore";
import FirebaseServices from "../../firebase/firebaseServices";

const db = FirebaseServices.getFirestoreInstance();

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

const BarChart: React.FC = () => {
  const { useDarkmode } = useDarkmodeContext();
  const [analytics, setAnalytics] = useState<any>([{}]);

  const labels = [...Array(5)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i)
    return d.getDate() + "." + (d.getMonth() + 1);
  });

  useEffect(() => {
    const analyticsRef = doc(db, "analytics", "emails");
    getDoc(analyticsRef).then((res) => { if (res.exists()) setAnalytics(res.data().emailArray) });
  }, []);

  const options = {
    responsive: true,
    barThickness: 13,
    borderRadius: 20,
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        grid: {
          drawTicks: false,
          lineWidth: 0.2,
          color: "#556883"
        }
      }
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: () => { return "" },
          label: (tooltipItem: any) => { return "Emails: " + tooltipItem.formattedValue },
        }
      }
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: labels.map((x) => {
          const obj = analytics.find((e: any) => e.date === x);
          return obj?.emails;
        }),
        backgroundColor: "rgba(19, 87, 176, 1)",
      },
    ],
  };

  return (
    <div className="pt-44">
      <div className={`w-[20rem] h-[14rem] md:w-[60rem] md:h-[33rem] md:mx-auto rounded-lg ${useDarkmode ? "bg-cyan-900" : "bg-gray-200"}`}>
        <div>
          <p className={`${useDarkmode ? "text-[#69768d]" : "text-[#5C687C]"} text-lg font-bold pt-5 pl-5 normal-case`}>Sent emails</p>
          <hr className="border-gray-500 border-1 my-6" />
        </div>
        <div className="w-[20rem] h-[20rem] md:w-[60rem]">
          <Bar options={options} data={data} width={50} height={20} />
        </div>
      </div>
    </div>
  );
};

export default BarChart