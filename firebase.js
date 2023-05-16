
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
const database = db;
// const titlesRef = ref(dbRef, "titles");
// const titlesRef = ref(dbRef.child("titles"));
const titlesRef = child(dbRef, "titles");




//ボタンの選択と画像の紐付け
let selectedMarkerImage = "./img/dot1.png";




$("#dot1").on("click", function () {
    selectedMarkerImage = "./img/dot1.png"
});

$("#dot2").on("click", function () {
    selectedMarkerImage = "./img/dot2.png"
});

$("#dot3").on("click", function () {
    selectedMarkerImage = "./img/dot3.png"
});

let projectData = {};
let selectedProjectTitle = "";


//タイトルの保存
$("#register").on("click", function () {
    const projectInput = $("#project");
    const title = projectInput.val();
    console.log(title);
    $("#project_title").text(title);
    projectInput.val("");

    projectData = {
        title: title,
        markers: []
    };

    set(child(titlesRef, title), true)
        .then(() => {
            console.log("タイトルを保存しました");
            const projectSelect = $("#project_select");
            const option = $("<option></option>").text(title);
            projectSelect.append(option);
        })
        .catch((error) => {
            console.error("タイトルの保存中にエラーが発生しました:", error);
        });
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

    };
    // markerDataArray.push(markerData);
    projectData.markers.push({[title]:markerData});

 

}

function saveMarkerData(markerData) {
    if (selectedProjectTitle) {
        const markersRef = child(ref(database),`projects/${selectedProjectTitle}/markers`);
        const newMarkerRef = push(markersRef);
        set(newMarkerRef,markerData)
        .then(() =>{
            console.log("マーカーデータを保存しました");
        })
        .catch((error) => {
            console.error("マーカーの保存中にエラーが発生しました:", error);
        });

    }
    return Promise.reject("selectedProjectTitleが設定されていません");
}

map.addListener("click", function (e) {         //地図上をクリックしたときの処理（マーカー表示関数を使用）

    clickedLocation = e.latLng;

    addMarker(clickedLocation, selectedMarkerImage);

    console.log(clickedLocation.lat());
    console.log(clickedLocation.lng());
    console.log(new Date().toISOString())
    console.log(selectedMarkerImage);

});

$("#project_select").on("change", function () {
    selectedProjectTitle = $(this).val();
    console.log("選択されたプロジェクトタイトル:", selectedProjectTitle);
    displayMarkers();
})



function displayMarkers() {
    if (selectedProjectTitle) {
        const markersRef = child(ref(database), `projects/${selectedProjectTitle}/markers`);
        onValue(markersRef,(snapshot) => {
                const markerData = snapshot.val();
                console.log("マーカーデータ:", markerData);
            },(error) => {
                console.error("マーカーデータの取得中にエラーが発生しました:", error);

            });
    } else {
        console.log("プロジェクトタイトルが選択されていません");
    }

}




$("#save").on("click", function () {
    const projectTitle = $("#project_title").text;



    markerDataArray = [];

});






