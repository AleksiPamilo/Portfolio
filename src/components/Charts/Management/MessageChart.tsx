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
import { useDarkmode } from "../../../hooks";
import { collection, getDocs } from "firebase/firestore";
import FirebaseServices from "../../../firebase/firebaseServices";
import { IMessage } from "../../../interfaces/contact";

const db = FirebaseServices.getFirestoreInstance();

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

const MessageChart: React.FC = () => {
  const { isDarkmode } = useDarkmode();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const labels = [...Array(14)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i)

    return d.getDate().toString().padStart(2, "0")
      + "."
      + (d.getMonth() + 1).toString().padStart(2, "0")
      + "."
      + d.getFullYear().toString().slice(-2);
  });

  useEffect(() => {
    const messagesRef = collection(db, "contact");

    getDocs(messagesRef)
      .then((snapshot) => {
        const arr: any = [];

        snapshot.forEach((doc) => {
          arr.push(doc.data());
        });

        setMessages(arr);
      });
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
          label: (tooltipItem: any) => { return "Messages: " + tooltipItem.formattedValue },
        }
      }
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: labels.map((x) => {
          const amount = messages.filter((i) => {
            const date = new Date(i.date);
            return date.getDate().toString().padStart(2, "0")
              + "."
              + (date.getMonth() + 1).toString().padStart(2, "0")
              + "."
              + date.getFullYear().toString().slice(-2)
              === x;
          }).length;
          return amount ?? 0;
        }),
        backgroundColor: "rgba(19, 87, 176, 1)",
      },
    ],
  };

  return (
    <>
      <div className={`w-[20rem] h-[14rem] md:w-[92rem] md:h-[44rem] rounded-lg mt-8 ${isDarkmode ? "bg-cyan-900" : "bg-gray-200"}`}>
        <div>
          <h1 className={`${isDarkmode ? "text-gray-500" : "text-gray-400"} text-lg font-bold pt-5 pl-5 normal-case`}>Sent Messages</h1>
          <h3 className={`${isDarkmode ? "text-gray-500" : "text-gray-400"} text-sm font-bold pl-5 normal-case`}>Last 14 days</h3>
          <hr className="border-gray-500 border-1 my-6" />
        </div>
        <div className="w-[20rem] h-[20rem] md:w-[92rem] md:h-[23rem]">
          <Bar options={options} data={data} width={50} height={20} />
        </div>
      </div>
    </>
  );
};

export default MessageChart;