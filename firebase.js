
// 他の Firebase 関連のコードに firebaseConfig オブジェクトを使用できます

// Import the functions you need from the SDKs you need


import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push, set, child, onChildAdded, remove, onChildRemoved }
    from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// appendScript("env1.js");





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, "kstr");
// const titlesRef = ref(dbRef, "titles");
// const titlesRef = ref(dbRef.child("titles"));
const titlesRef = child(dbRef, "titles");




//ボタンの選択と画像の紐付け
let selectedMarkerImage = "./img/dot1.png";
let titleKey;


// function addTitle(title) {
//     const titleRef = push(titlesRef);
//     const titleData = { title: title, key: titleRef.key }; // タイトルとキーのオブジェクトを作成
//     set(titleRef, titleData); // Firebaseにセット
//     return titleRef.key;
// }


$("#dot1").on("click", function () {
    selectedMarkerImage = "./img/dot1.png"
});

$("#dot2").on("click", function () {
    selectedMarkerImage = "./img/dot2.png"
});

$("#dot3").on("click", function () {
    selectedMarkerImage = "./img/dot3.png"
});

//タイトルの保存
$("#register").on("click", function () {
    const projectInput = $("#project");
    const title = projectInput.val();
    console.log(title);
    $("#project_title").text(title);
    projectInput.val("");

});

let marker;
let markerDataArray = [];
let clickedLocation;



function addMarker(location, selectedMarkerImage) {  //マーカーを任意の場所に表示させる関数
    marker = new google.maps.Marker({
        position: location,
        map: map, //マーカーを表示する地図オブジェクト
        icon: selectedMarkerImage,
    });


    const markerData = {
        location: { lat: clickedLocation.lat(), lng: clickedLocation.lng() },
        timestamp: new Date().toISOString(),
        markerImage: selectedMarkerImage,
        marker: marker,
        // clickable:false
    };
    markerDataArray.push(markerData);
}

map.addListener("click", function (e) {         //地図上をクリックしたときの処理（マーカー表示関数を使用）

    clickedLocation = e.latLng;

    addMarker(clickedLocation, selectedMarkerImage);

    console.log(clickedLocation.lat());
    console.log(clickedLocation.lng());
    console.log(new Date().toISOString())
    console.log(selectedMarkerImage);



});




$("#save").on("click", function () {
    const projectTitle = $("#project_title").text;



        markerDataArray = [];

});






