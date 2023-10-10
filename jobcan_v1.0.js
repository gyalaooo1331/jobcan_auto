// @ts-check
// ==UserScript==
// @name         JOBCAN AUTO
// @version      1.1
// @description  JOBCAN AUTO
// @author       KH
// @match        https://ssl.jobcan.jp/employee/attendance/edit
// @grant        none
// ==/UserScript==


//-----------------------------------------------
// ①下記定数を設定する
// ②上記@matchのリンクを開く
// ③申請確認ダイアログにて「はい」を押下する
const year = 2023;          //年
let month = 10;             //月
const startTime = "09:30";  //開始時間
const endTime = "17:30";    //終了時間
const restTime = "01:00";   //休憩時間
//-----------------------------------------------



function convertDateToEpoch(yyyymmdd) {
    // YYYYMMDD形式の文字列を年、月、日に分割
    const year = parseInt(yyyymmdd.slice(0, 4), 10);
    const month = parseInt(yyyymmdd.slice(4, 6), 10) - 1;
    const day = parseInt(yyyymmdd.slice(6, 8), 10);

    // Dateオブジェクトを作成
    const date = new Date(year, month, day);

    // エポック秒に変換して返す
    return Math.floor(date.getTime() / 1000);
}

function getAllDaysInMonth(year, month) {
    // 月は0から11までの数値で表されるため、指定された月の次の月の1日の前日を指定します
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    // 全ての日付を格納するための配列を初期化します
    const daysArray = [];

    // 1日から月末までループして日付を配列に格納します
    for (let day = 1; day <= lastDayOfMonth; day++) {
        // 日付をYYYYMMDD形式の文字列に変換して配列に追加します
        const formattedDate = `${year}${String(month + 1).padStart(2, '0')}${String(day).padStart(2, '0')}`;
        daysArray.push(formattedDate);
    }

    return daysArray;
}

month--;
const daysInMonth = getAllDaysInMonth(year, month);

let days = [];
days.push(daysInMonth);

for (let i = 0; i < daysInMonth.length; i++) {

    days[i] = convertDateToEpoch(daysInMonth[i]);

    let localStartTime = document.getElementById("start_" + days[i]);
    let localEndTime = document.getElementById("end_" + days[i]);
    let localRestTime = document.getElementById("rest_" + days[i]);
    let shiftStart = document.getElementById("shiftstart_" + days[i]);

    if(!shiftStart.value) {
        localStartTime.value = null;
        localEndTime.value = null;
        localRestTime.value = null;
    } else {
        localStartTime.value = startTime;
        localEndTime.value = endTime;
        localRestTime.value = restTime;
    }
}

// 要素を取得
const applyBtn = document.querySelector(".ml-1.btn.jbc-btn-secondary");
applyBtn.click();