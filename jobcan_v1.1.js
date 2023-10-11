// @ts-check
// ==UserScript==
// @name         jobcan_auto
// @version      1.1
// @description  jobcan_auto
// @author       KH
// @match        https://ssl.jobcan.jp/employee/attendance/edit
// @grant        none
// ==/UserScript==

// ①下記定数を設定する
// ②上記@matchのURLを開く
// ③申請確認ダイアログにて「はい」を押下する
//
// ※勤怠修正が必要ない場合、そのままでOK
// ※修正が必要な場合、再申請し手動で修正する

(function () {
    //---【定数の設定】----------------------------
    const year = 2023;          // 年
    const month = 11;           // 月
    const startTime = "09:30";  // 開始時間
    const endTime = "17:30";    // 終了時間
    const restTime = "01:00";   // 休憩時間
    //---------------------------------------------

    // 日付をエポック秒に変換
    function convertDateToEpoch(yyyymmdd) {
        const year = parseInt(yyyymmdd.slice(0, 4), 10);
        const month = parseInt(yyyymmdd.slice(4, 6), 10) - 1;
        const day = parseInt(yyyymmdd.slice(6, 8), 10);
        const date = new Date(year, month, day);
        return Math.floor(date.getTime() / 1000);
    }

    // 月のすべての日を取得
    function getAllDaysInMonth(year, month) {
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = [];
        for (let day = 1; day <= lastDayOfMonth; day++) {
            const formattedDate = `${year}${String(month + 1).padStart(2, '0')}${String(day).padStart(2, '0')}`;
            daysArray.push(formattedDate);
        }
        return daysArray;
    }

    const adjustedMonth = month - 1;
    const daysInMonth = getAllDaysInMonth(year, adjustedMonth);

    for (let i = 0; i < daysInMonth.length; i++) {
        const day = daysInMonth[i];
        const epochDate = convertDateToEpoch(day);
        let localStartTime = document.getElementById("start_" + epochDate);
        let localEndTime = document.getElementById("end_" + epochDate);
        let localRestTime = document.getElementById("rest_" + epochDate);
        let shiftStart = document.getElementById("shiftstart_" + epochDate);
        if (!shiftStart.value) {
            localStartTime.value = null;
            localEndTime.value = null;
            localRestTime.value = null;
        } else {
            localStartTime.value = startTime;
            localEndTime.value = endTime;
            localRestTime.value = restTime;
        }
    }

    // 申請ボタンをクリック
    const applyBtn = document.querySelector(".ml-1.btn.jbc-btn-secondary");
    applyBtn.click();
/*
    // 再申請ボタンをクリック
    const reApplyBtn = document.querySelector("btn jbc-btn-secondary");
    reApplyBtn.click();
*/
})();
