/**
 * 大屏实时通道 Hook（useTallySocket） —— 可读化版本（由源站压缩产物治理而来）
 *
 * 职责：建立 WebSocket -> 收到消息即 JSON.parse 为快照 -> 断线后 1s 起指数退避至 30s 自动重连。
 * 契约：消费方：ScreenPage（大屏）、TallyControlPage（控制台）。协议：服务端连上即推一份快照，之后票数变化再推。
 *
 * 治理方式：
 *   1) 格式化：按语句/块统一换行与缩进，未改动任何 token；
 *   2) 注释：补充模块职责与接口对应关系；
 *   3) 标识符：保留源站原名。压缩产物把单字母名直接作为模块导出符号使用
 *      （本文件导出 w），改名会破坏跨 chunk 契约，故不参与改名；
 *      tally 业务的接口层改名见同目录 tally-BvCEJ8Iv.js。
 */
import{
  b as y
}from"./tally-BvCEJ8Iv.js";
import{
  r as i,
  w as T,
  a1 as h
}from"./index-D2vbWxba.js";
function w(
  m
){
  const s=i(
    null
  ),
  a=i(
    !1
  );
  let e=null,
  t=1e3,
  n=null,
  o=!1;
  function u(
    l
  ){
    r(

    ),
    o=!1;
    try{
      e=new WebSocket(
        y(
          l
        )
      )
    }catch(
      c
    ){
      console.error(
        "Tally WS connect failed",
        c
      ),
      f(
        l
      );
      return
    }e.onopen=(

    )=>{
      a.value=!0,
      t=1e3
    },
    e.onmessage=c=>{
      try{
        s.value=JSON.parse(
          c.data
        )
      }catch(
        p
      ){
        console.error(
          "Tally WS message parse failed",
          p
        )
      }
    },
    e.onclose=(

    )=>{
      a.value=!1,
      o||f(
        l
      )
    },
    e.onerror=(

    )=>{

    }
  }function f(
    l
  ){
    n&&clearTimeout(
      n
    ),
    n=setTimeout(
      (

      )=>u(
        l
      ),
      t
    ),
    t=Math.min(
      t*2,
      3e4
    )
  }function r(

  ){
    if(
      n&&(
        clearTimeout(
          n
        ),
        n=null
      ),
      e
    ){
      o=!0;
      try{
        e.close(

        )
      }catch{

      }e=null
    }
  }return T(
    m,
    l=>{
      l?u(
        l
      ):r(

      )
    },
    {
      immediate:!0
    }
  ),
  h(
    (

    )=>{
      o=!0,
      r(

      )
    }
  ),
  {
    snapshot:s,
    connected:a
  }
}export{
  w as u
};


