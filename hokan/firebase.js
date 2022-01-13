{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script> */ }
// 日時をいい感じの形式にする関数、padStartは頭文字に０を入れる関数
function convertTimestampToDatetime(timestamp) {
    const _d = timestamp ? new Date(timestamp * 1000) : new Date();
    const Y = _d.getFullYear();
    const m = (_d.getMonth() + 1).toString().padStart(2, '0');
    const d = _d.getDate().toString().padStart(2, '0');
    const H = _d.getHours().toString().padStart(2, '0');
    const i = _d.getMinutes().toString().padStart(2, '0');
    const s = _d.getSeconds().toString().padStart(2, '0');
    return `${Y}/${m}/${d} ${H}:${i}:${s}`;
}
// <!--以下にfirebaseのコードを貼り付けよう -->
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjSrLVMKohxnwStu0UW6fkmxxRNcS-TYA",
    authDomain: "gs-realtime-chat.firebaseapp.com",
    projectId: "gs-realtime-chat",
    storageBucket: "gs-realtime-chat.appspot.com",
    messagingSenderId: "43046841878",
    appId: "1:43046841878:web:97a4c60ccb83256cfc0f37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Firebaseのデータベースとの掛橋
const db = getFirestore(app);



import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    orderBy,//データの順番
    query,//フィルターをかける
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";


$("#send").on("click", function () {
    // alert("check")
    //オブジェクトでデータを渡す
    const data = {
        name: $("#name").val(),
        text: $("#text").val(),
        time: serverTimestamp(),//読み込んだ関数を実行している
    };
    addDoc(collection(db, "chat"), data);//自分のプロジェクトのchatコレクションにdataを追加している
    $("#text").val("");//送信後に入力値を空文字で上書き

});

//onsnapshotがデータベースの変更を検知→データベースの中身を返してくれる

const q = query(collection(db, "chat"), orderBy("time", "desc"))
onSnapshot(q, (querySnapshot) => {
    //自分のfirestore databaseのchatコレクションをonsnapshotが監視してくれる
    // console.log(querySnapshot.docs[0].id);//docsが配列。要素のidをドットで繋いで取得。documentのidは削除や更新で使う
    // console.log(querySnapshot.docs[0].data());//datal関数でname/text/timeを取得

    const dataArray = [];
    //docsは配列でいくつもデータがある。それを分解したものをdocとする。
    // forEachを走らせて、一つずつの要素（doc）をそれぞれ処理していく。
    // 固まったデータを壊して分解するイメージ
    querySnapshot.docs.forEach(function (doc) {//forEachを回す
        const data = {
            id: doc.id,
            data: doc.data()
        };
        dataArray.push(data);

    });
    // console.log(dataArray)

    //分解されたデータを配列に入れていく
    const tagArray = [];
    dataArray.forEach(function (data) {
        tagArray.push(`<li id="${data.id}">
      <p>${data.data.name} at ${convertTimestampToDatetime(data.data.time.seconds)}</p>
      <p>${data.data.text}</p></li>`)
        //convertTimestampToDatetimeにsecondsの情報を渡す→secondsは1/1から何秒経ったかの数値データ

    })

    $("#output").html(tagArray);


    $("#text").on("keydown", function (e) {
        //keyコードはキーボードのボタンごとに規定されている。eをコンソールして確認できる
        if (e.keyCode === 13) {
            const data = {
                name: $("#name").val(),
                text: $("#text").val(),
                time: serverTimestamp(),
            };
            addDoc(collection(db, "chat"), data);
            $("#text").val("");
        }
    });
})

