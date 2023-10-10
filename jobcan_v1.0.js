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
// �@���L�萔��ݒ肷��
// �A��L@match�̃����N���J��
// �B�\���m�F�_�C�A���O�ɂāu�͂��v����������
const year = 2023;          //�N
let month = 10;             //��
const startTime = "09:30";  //�J�n����
const endTime = "17:30";    //�I������
const restTime = "01:00";   //�x�e����
//-----------------------------------------------



function convertDateToEpoch(yyyymmdd) {
    // YYYYMMDD�`���̕������N�A���A���ɕ���
    const year = parseInt(yyyymmdd.slice(0, 4), 10);
    const month = parseInt(yyyymmdd.slice(4, 6), 10) - 1;
    const day = parseInt(yyyymmdd.slice(6, 8), 10);

    // Date�I�u�W�F�N�g���쐬
    const date = new Date(year, month, day);

    // �G�|�b�N�b�ɕϊ����ĕԂ�
    return Math.floor(date.getTime() / 1000);
}

function getAllDaysInMonth(year, month) {
    // ����0����11�܂ł̐��l�ŕ\����邽�߁A�w�肳�ꂽ���̎��̌���1���̑O�����w�肵�܂�
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    // �S�Ă̓��t���i�[���邽�߂̔z������������܂�
    const daysArray = [];

    // 1�����猎���܂Ń��[�v���ē��t��z��Ɋi�[���܂�
    for (let day = 1; day <= lastDayOfMonth; day++) {
        // ���t��YYYYMMDD�`���̕�����ɕϊ����Ĕz��ɒǉ����܂�
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

// �v�f���擾
const applyBtn = document.querySelector(".ml-1.btn.jbc-btn-secondary");
applyBtn.click();