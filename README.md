
# NTUniverse

* 組別：Group 95
* 組長：醫學二 洪愷希 B10401006
* 組員：資工二 陳德維 B10902138
* 組員：電機二 王維勤 B10502010

## 什麼是NTUniverse

NTUniverse 是一個透過 React-Three 以台大為背景模擬出來 的 3D 世界，並引入物理引擎打造出真正的沈浸式體驗。還記得當初考進台大時得那份憧憬嗎？還記得當年第一次走在椰林大道上的那份欣喜嗎？進入到 NTUniverse ，你將化為一台腳踏車，穿梭在台大的場景之中，彷彿回到過去一樣，重新感受台大之美。

## Demo 影片連結

youtube.com

## Live Deployed 網址

www.ntuniverse.com
(建議使用電腦版Google Chrome以獲得最好的體驗)

## NTUniverse 能夠帶給你的體驗

1. 優美的風景、絢麗的光影
2. 化身為腳踏車在台大裡飆車
3. 華麗的傳送系統，穿梭在不同場景
4. 透過 Google 登入 解鎖更多互動功能
    * 座落於地圖四處的留言板
    * 世界頻道的聊天室

## 功能介紹
 - **基本操作**
   - 操控腳踏車：`W S A D` / `← ↑ ↓ →`
   - 煞車：`Space ⎵`
   - 重生：`R`
   - 與地圖互動：`E` / `Enter`
   - 按喇叭：`L`
   - 切換鎖定視角：`Y`
   - 切換第一/第三人稱：`F`
 - **傳送門**
   - 地圖上的白色框框
   - 騎車進入後會出現提示字幕
   - 按下 `Enter` 來進行傳送！
 - **側邊欄**
   - 登入/登出：使用 Google Login API
   - 設定：調整車速 / 音量，操作說明
   - 個人資料：你的 Profile 檔案
   - 關於：關於 NTUniverse 的一些事
 - **留言板**
   - 一個場景有一個，留言板底下有動畫提示
   - 滑鼠 `點擊 `打開留言板頁面
   - 留下你的留言並加上 `#HashTag`！
   - 幫好笑的留言按愛心！
 - **聊天室**
   - `點擊`畫面右下角黃色小泡泡打開聊天室
   - 預設有世界頻道
   - 輸入聊天室名字即可進入該聊天室聊天！
 
## 場景介紹
 - **小福廣場**
   - 四個通往別的場景的傳送門 (3個正在維修中QQ)
   - 小福廣場留言板 (滑鼠點擊打開留言板)
   - 一棵巨大的樹 (點擊打開教學頁面)
 - **總圖**
   - 一條椰林大道通往總圖
   - 總圖留言板 (滑鼠點擊打開留言板)
   - 一個神秘的寶藏等你們來發現！


## 使用之第三方套件、框架、程式碼

* __Frontend__：
> * Vite, React.js, Apollo GraphQL client

> * Antd, styled-components

> * react-spring, react-three/fiber, react-three/cannon, react-three/drei, leva

> * react-oauth/google, lodash, jwt-decode

* __Backend__：
> * Node.js, Apollo GraphQL server, dotenv-defaults, mongoose
* __Database__：
> * MongoDB

* __Deployment__：
> * Render(frontend), Railway(backend)

## 專題製作心得

洪愷希：

陳德維：
透過這次的分組期末專案，我對於Github的瞭解與熟悉度又提升了一個檔次，已經對fork, branch等版本控管有一定的了解。這次的專案中，我接觸到了從沒接觸過的3D模型以及動畫效果，深刻體會到react state/hook對開發者來說是多麽方便。能夠將這學期所學到的內容吸收並加以運用在這次的專案我覺得非常有成就感，對於我們專案的成果我也蠻滿意的，希望大家也會喜歡我們的作品！

王維勤：
這次的期末專案是個很難得的機會，除了將半年來所學實際應用外，也讓我有機會體驗一個產品由無到有產出的成就感。從上課所教的基礎向外延伸接觸了相當多的套件。讓我見識到了網頁發展的各種可能性。而藉由開發的過程，也把一些匆促帶過，上課很可惜沒有仔細講到的概念終於搞懂了！。最後謝謝我的組員們，也希望各位使用者都能享受在 NTUniverse 馳騁的快感。

## 如何在 localhost 安裝與測試之詳細步驟

* Prerequisite：
    * 進入 `./backend` 新增 `.env`，並加入
    `MONGO_URL=mongodb+srv://NTUniverseADMIN:NTUniverseADMIN2022@ntuniverse.ph2g1nj.mongodb.net/test` 來連接 MongoDB.

1. Clone下來後先到 `根目錄`，開啟兩個 `Terminal`，一個負責前端，一個負責後端.

2. 先啟動後端，在第一個 Terminal 的`根目錄` 輸入 `yarn server`，就會開始安裝後端所需要的資源以及開啟後端 server，顯示出以下訊息即表示後端啟動成功。

``` bash
listening on PORT xxxx
mongo db connection created
```

3. 再來啟動前端，在第二個Terminal的 `根目錄` 輸入 `yarn start`，就會開始安裝前端所需要的資源以及開啟前端 server，顯示出以下即表示前端成功啟動.

```bash
  VITE v4.0.3  ready in xxx ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

4. 上方所顯示的 `Local: http://127.0.0.1:5173/`的 `5173` 即為前端所在localhost上的`port` (理論上為5173，若顯示別組port請隨之更改)

5. 請使用 `電腦版Google Chrome` 輸入 `localhost:{port}` (port為4.所提到的port，理論上為5173)，進入前端即可進入 NTUniverse!

    * <font color=#FF0000>注意請不要使用 `http://127.0.0.1:5173/`，由於使用到 `Google API` 網址請輸入 `localhost:5173`，另外`port`若非 `5173`則請儘速聯絡 陳德維 `weiiiii.0622@gmail.com`，Google API只針對特定`port`給予登入權限</font>

## 每位組員之負責項目

* **洪愷希** (wp1111修課同學)
    * Blender 3D 模型渲染 (地圖上的3D模型)
    * 前端主視覺 UI/UX 設計
    * React-three/cannon 物理引擎模型設計
    * React-three/fiber 場景地圖設計
    * React-Spring 動畫特效設計 (Loading頁面、轉場特效...)

* **陳德維** (wp1111修課同學)
    * 前端介面 UI/UX 設計
    * 前後端 資料庫串接
    * 登入/登出系統 設計
    * 側邊欄(關於/個人頁面/設定)介面 設計
    * 留言板系統 設計
    * 地圖互動效果 設計 (地圖互動物件、傳送方塊...)

* **王維勤** (wp1111修課同學)
    * 前後端 資料庫串接
    * Tutorial介面 設計
    * 聊天系統 設計
