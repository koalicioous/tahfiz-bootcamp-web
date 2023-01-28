import { useState } from "react";

const targetOptions = [
  {
    key: "all",
    label: "Seluruh Al-Qur'an",
  },
  {
    key: "juz",
    label: "Pilih Juz",
  },
  {
    key: "surah",
    label: "Pilih Surah",
  },
];

const CalculatorPlayground = () => {
  const [selectedTarget, setSelectedTarget] = useState(targetOptions[0].key);
  console.log(selectedTarget);

  return (
    <div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>Kalkulator Hafalan Al-Qur&apos;an</h1>
        <p>Temukan berapa banyak yang perlu kamu hafal per hari</p>
      </div>
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <h3>Mana yang ingin kamu hafalkan?</h3>
        <div
          style={{
            marginTop: "32px",
          }}
        >
          {targetOptions.map(({ key, label }) => {
            return (
              <div
                key={key}
                onClick={() => setSelectedTarget(key)}
                className="bg-red-500"
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalculatorPlayground;
