import { DatePicker, NavBar } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import DayBill from "./components/DayBIll/index";

const Month = () => {
  //用redux拿到数据
  const billList = useSelector((state) => state.bill.billList);
  //useMemo分组当前月
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY | MM"));
  }, [billList]);
  // console.log(monthGroup);

  const [currentMonthList, setCurrentMonthList] = useState([]);
  //计算月账单
  const monthReasult = useMemo(() => {
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [currentMonthList]);

  //渲染当前月在页面里
  useEffect(() => {
    const nowDate = dayjs().format("YYYY | MM"); //dayjs()里面没有值就是默认现在的时间
    if (monthGroup[nowDate]) {
      setCurrentMonthList(monthGroup[nowDate]);
    }
  }, [monthGroup]);
  //控制时间选择器的状态
  const [dateVisible, setDateVisible] = useState(false);
  //控制时间显示的状态
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY | MM");
  });
  //选择器中点击确定的事件回调
  const onConfirm = (date) => {
    // 设置时间选择器消失
    setDateVisible(false);
    //其他逻辑，传入时间
    const dateFormat = dayjs(date).format("YYYY | MM");
    setCurrentMonthList(monthGroup[dateFormat]);
    setCurrentDate(dateFormat);
  };
  //按照当前日分组
  const dayGroup = useMemo(() => {
    const dayGroupDate = _.groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("M月D日")
    );
    const keys = Object.keys(dayGroupDate);
    return {
      dayGroupDate,
      keys,
    };
  }, [currentMonthList]);
  // console.log(dayGroup);

  return (
    //月度账单
    <div className="monthlyBill">
      {/* 月度收支导航栏 */}
      <NavBar className="nav">月度收支</NavBar>
      {/*内容 */}
      <div className="content">
        {/* 头部 */}
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text"> {currentDate + ""}月度账单</span>
            {/* 适配箭头 */}
            {/* 根据当前弹窗状态配置expand类名是否存在, dateVisible为true,箭头朝下，有expand, */}
            <span
              className={classNames("arrow", dateVisible && "expand")}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            {/* 支出 */}
            <div className="item">
              <span className="money">{monthReasult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            {/* 收入 */}
            <div className="item">
              <span className="money">{monthReasult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            {/* 支出 */}
            <div className="item">
              <span className="money">{monthReasult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kadate"
            title="记账日期"
            // 选择精度precision
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onClose={() => setDateVisible(false)}
            onConfirm={onConfirm}
            max={new Date()}
          />
        </div>
        {/* 日列表,要将数据传过去 */}
        {dayGroup.keys.map(key => {
          return (
            <DayBill
              key={key}
              date={key}
              billList={dayGroup.dayGroupDate[key]}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Month;
