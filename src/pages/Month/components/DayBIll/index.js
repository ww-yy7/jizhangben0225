import { useMemo, useState } from "react";
import classNames from "classnames";
import "./index.scss";
import { billTypeToName } from "@/contants";
import Icon from "@/components/Icon";

const DayBill = ({ date, billList }) => {
  //   计算日账单
  console.log(billList);
  const dailyReasult = useMemo(() => {
    const pay = billList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = billList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [billList]);
  //   console.log(dailyReasult);
  //切换单日列表的显示隐藏状态
  const [visible, setVisible] = useState(false);

  return (
    <div className={classNames("dailyBill")}>
      {/* 头部区域 */}
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span
            className={classNames("arrow", visible && "expand")}
            onClick={() => setVisible(!visible)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dailyReasult.pay.toFixed(2)}</span>
            {/* <span className="money">{100}</span> */}
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dailyReasult.income.toFixed(2)}</span>
            {/* <span className="money">{100}</span> */}
          </div>
          <div className="balance">
            <span className="money">{dailyReasult.total.toFixed(2)}</span>
            {/* <span className="money">{100}</span> */}
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      <div className="billList" style={{ display: visible ? "block" : "none" }}>
        {billList.map((item) => {
          return (
            <div className="bill" key={item.id}>
                <Icon type={item.useFor}/>
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames("money", item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DayBill;
