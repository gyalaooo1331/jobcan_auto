// @ts-check
// ==UserScript==
// @name         jobcan_auto
// @version      1.1
// @description  jobcan_auto
// @author       KH
// @match        https://ssl.jobcan.jp/employee/attendance/edit
// @grant        none
// ==/UserScript==

// �@���L�萔��ݒ肷��
// �A��L@match��URL���J��
// �B�\���m�F�_�C�A���O�ɂāu�͂��v����������
//
// ���ΑӏC�����K�v�Ȃ��ꍇ�A���̂܂܂�OK
// ���C�����K�v�ȏꍇ�A�Đ\�����蓮�ŏC������

(function () {
    //---�y�萔�̐ݒ�z----------------------------
    const year = 2023;          // �N
    const month = 11;           // ��
    const startTime = "09:30";  // �J�n����
    const endTime = "17:30";    // �I������
    const restTime = "01:00";   // �x�e����
    //---------------------------------------------

    // ���t���G�|�b�N�b�ɕϊ�
    function convertDateToEpoch(yyyymmdd) {
        const year = parseInt(yyyymmdd.slice(0, 4), 10);
        const month = parseInt(yyyymmdd.slice(4, 6), 10) - 1;
        const day = parseInt(yyyymmdd.slice(6, 8), 10);
        const date = new Date(year, month, day);
        return Math.floor(date.getTime() / 1000);
    }

    // ���̂��ׂĂ̓����擾
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

    // �\���{�^�����N���b�N
    const applyBtn = document.querySelector(".ml-1.btn.jbc-btn-secondary");
    applyBtn.click();
/*
    // �Đ\���{�^�����N���b�N
    const reApplyBtn = document.querySelector("btn jbc-btn-secondary");
    reApplyBtn.click();
*/
})();
