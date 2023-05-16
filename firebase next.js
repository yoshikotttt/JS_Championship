
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
const dbRef = ref(db, "kusatori");
// const titlesRef = ref(dbRef, "titles");
// const titlesRef = ref(dbRef.child("titles"));
const titlesRef = child(dbRef, "titles");




//googleAuth用
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth();


//ログイン処理
// $("#login").on("click", function () {
//     // alert("ok");
//     signInWithPopup(auth, provider).then((result) => {
//         location.href = "index.html";  //遷移先のページ
//     }).catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         const email = error.email;
//         const credential = GoogleAuthProvider.credentialFromError(error);
//     });

// });


// // ログインしていれば以下の動作を実行
// let userName;

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         const uid = user.uid;
//         if (user !== null) {
//             user.providerData.forEach((profile) => {
//                 //ログイン情報取得
//                 const userName = profile.displayName;
//                 $("#uname").text(profile.displayName);
//                 // $("#prof").attr("src",profile.photoURL);今回写真は使わない
//                 console.log(uname);
//             });
//         }
//     } else {
//         _redirect();
//     }
// });

// //リダイレクト
// function _redirect() {
//     location.href = "login.html";
// }

// //ログアウト
// $("#out").on("click", function () {
//     signOut(auth).then(() => {
//         _redirect();
//     }).catch((error) => {
//         console.error(error);
//     })
// });

//############################################################################
//データを保存には「場所をあける（push()）」と「その場所にデータを設定する（set()）」の2つのステップを踏む

//ボタンの選択と画像の紐付け
let selectedMarkerImage = "./img/dot1.png";
let titleKey;


function addTitle(title) {
    const titleRef = push(titlesRef);
    const titleData = { title: title, key: titleRef.key }; // タイトルとキーのオブジェクトを作成
    set(titleRef, titleData); // Firebaseにセット
    return titleRef.key;
}


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

    titleKey = addTitle(title);

});

let marker;
let markerDataArray = [];
let clickedLocation;

function generateMarkerId() {                //ランダムな数字を作る
    return Math.random().toString(36).substring(2, 15);
}

function addMarker(location, selectedMarkerImage) {  //マーカーを任意の場所に表示させる関数
    marker = new google.maps.Marker({
        position: location,
        map: map, //マーカーを表示する地図オブジェクト
        icon: selectedMarkerImage,
    });

    const markerId = generateMarkerId();
    marker.set("id", markerId);

    const markerData = {
        id: markerId,
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

// map.addListener("dblclick", function (e) {
//     const marker = e.target;
//     if (marker instanceof google.maps.Marker) {
//       removeMarker(marker.get("id"));
//     }

//   });

// function removeMarker(markerId) {
//     const marker = markerDataArray.find(function (data) {
//       return data.id === markerId;
//     });
//     if (marker) {
//       marker.setMap(null);
//       markerDataArray.splice(markerDataArray.indexOf(marker), 1);
//     }
//   }
//上変更前


//   map.addListener("dblclick", handleMarkerDoubleClick);

//   function handleMarkerDoubleClick(e) {
//     const marker = e.target;
//     if (marker instanceof google.maps.Marker) {
//         const markerId = marker.get("id");
//         removeMarker(markerId);
//     }
// };

// function removeMarker(markerId) {
//     const index = markerDataArray.findIndex(function (data) {
//         return data.id === markerId;
//     });
//     if (index !== -1) {
//         markerDataArray[index].marker.setMap(null);
//         markerData.markerImage = null;
//         markerDataArray.splice(index, 1);
//     }
// } 


$("#save").on("click", function () {
    const projectInput = $("#project");
    const title = projectInput.val();

    if (titleKey &&  markerDataArray.length > 0) {

        const markersRef = child(dbRef, `titles/${titleKey}/markers`);

        markerDataArray.forEach((markerData) => {
            const newMarkerRef = push(markersRef, markerData);
            // set(newMarkerRef,markerData);
        });

        markerDataArray = [];

    }
});






