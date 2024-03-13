//账单列表相关的Store

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name:'ww',
  //数据状态state
  initialState: {
    billList: [],
  },
  //修改同步方法
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
    //同步增加账单
    addBill(state,action){
     state.billList.push(action.payload)
    }
  },
 
});

//解构出actionCreater函数
const { setBillList ,addBill} = billStore.actions;

//异步请求
const getBillList = () => {
  return async (dispatch) => {
    //编写异步请求
    const res = await axios.get("http://localhost:8888/ka");
    //触发同步reducer
    dispatch(setBillList(res.data));
  };
};
const addBillList=(data)=>{
  return async (dispatch)=>{
    const res =await axios.post("http://localhost:8888/ka",data)
    dispatch(addBill(res.data));
    
  }
}
//获取reducers函数
const reducer = billStore.reducer;

//导出创建action对象的函数和reducer函数

export { getBillList,addBillList };

export default reducer;
