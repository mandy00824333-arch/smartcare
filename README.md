# SmartCare

SmartCare 是一款以 React Native 開發的健康照護應用程式，提供回診提醒、預約追蹤、健康教育、緊急聯絡等多項功能，協助用戶更好地管理個人健康。

## 主要功能
- 回診提醒：追蹤預約，貼心提醒
- 線上掛號：快速完成醫院掛號
- 健康教育：提供健康知識與衛教資訊
- 緊急聯絡：一鍵撥打緊急電話
- 藥物提醒：定時提醒用藥
- 醫院導航：協助用戶在醫院內導航
- 遊戲互動：健康相關互動遊戲

## 安裝與執行
1. 下載專案：
   ```bash
   git clone https://github.com/mandy00824333-arch/smartcare.git
   cd smartcare
   ```
2. 安裝依賴：
   ```bash
   npm install
   ```
3. 建立 Supabase 設定檔，複製 `456.env.example` 為 `123.env` 並填入對應金鑰。
4. 啟動專案：
   ```bash
   npm start
   ```

## 主要檔案說明
- `App.js`：應用程式進入點
- `AppointmentReminderScreen.js`：預約提醒畫面
- `RevisitReminderScreen.js`：回診提醒畫面
- `HealthEducationScreen.js`：健康教育畫面
- `EmergencyCallScreen.js`：緊急聯絡畫面
- `MedicationReminderScreen.js`：藥物提醒畫面
- `HospitalNavigationScreen.js`：醫院導航畫面
- `GameScreen.js`：互動遊戲畫面
- `OnlineRegisterScreen.js`：線上掛號畫面
- `assets/`：靜態資源（圖片、icon等）

## 注意事項
- 請勿將 `123.env` 等敏感檔案上傳至公開倉庫。
- 本專案需搭配 Supabase 後端服務。

## 授權
本專案僅供學術或個人學習用途，未經授權請勿用於商業用途。
