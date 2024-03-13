import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./modules/billStore";

//创建store 组合子模块
const store = configureStore({
  reducer: {
    bill: billReducer,
  },
});

export default store;
