import React from "react";

const Datebox = () => {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section>
      <h4 className="dateTitle">오늘은 언제인가요?</h4>
      <div className="input_box">
        <input className="input_date" type="date" defaultValue={today} />
      </div>
    </section>
  );
};

export default Datebox;
