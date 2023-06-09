//mapArray-決定地圖中每個格
//ctx-HTML5Canvas用
//currentImgMainX,currentImgMainY-決定主角所在
//imgMountain,imgMain,imgEnemy-障礙物,主角,敵人的圖片
let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;

const gridLength = 200;

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
      numImages++;
    }
    for(var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
  }

//intital
$(function(){
    // 0:可走、1:障礙、2:終點、3:敵人
    mapArray = [
        [0, 1, 1],
        [0, 0, 0],
        [3, 1, 2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        "x":0,
        "y":0
    };

//     imgMain.onload = function(){
//         ctx.drawImage(imgMain, 0, 0, 80, 130,currentImgMain.x,currentImgMain.y, gridLength, gridLength);
//     };

//     imgMountain = new Image();
//     imgMountain.src = "images/material.png";
//     imgEnemy = new Image();
//     imgEnemy.src = "images/Enemy.png";

//     imgMountain.onload = function(){
//         imgEnemy.onload = function(){
//             for(var x in mapArray){
//                 for(var y in mapArray[x]){
//                     if(mapArray[x][y]==1){
//                         ctx.drawImage(imgMountain, 32,65,32,32,y*gridLength, x*gridLength, gridLength, gridLength);
//                     } else if (mapArray[x][y] == 3){
//                         ctx.drawImage(imgEnemy, 7, 40, 104, 135, y*gridLength, x*gridLength, gridLength, gridLength );
//                     }
//                 }
//             }
//         };
//       };

  var sources ={
    Main:
    'images/spriteSheet.png',
    Mountain:
    'images/material.png',
    Enmey:
    'images/Enemy.png'
  };
  loadImages(sources,function(images){
    ctx.drawImage(images.Main,0, 0, 80, 130,0,0, gridLength, gridLength)
                for(var x in mapArray){
                    for(var y in mapArray[x]){
                        if(mapArray[x][y]==1){
                            ctx.drawImage(images.Mountain, 32,65,32,32,y*gridLength, x*gridLength, gridLength, gridLength);
                        } else if (mapArray[x][y] == 3){
                            ctx.drawImage(images.Enmey, 7, 40, 104, 135, y*gridLength, x*gridLength, gridLength, gridLength );
                        }  
                    }
                         
                }
            
  });

 });





//User Keyboard
$(document).on("keydown", function(event){
    let count = 0;
    console.log(event.code);
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        "x":-1,
        "y":-1
    }
    targetBlock ={
        "x":-1,
        "y":-1
    }
    event.preventDefault();

    switch(event.code){
        case "ArrowLeft":
        targetImg.x = currentImgMain.x - gridLength;
        targetImg.y = currentImgMain.y;
        cutImagePositionX = 175 // face left
        break;
        case "ArrowUp":
        targetImg.x = currentImgMain.x ;
        targetImg.y = currentImgMain.y- gridLength;
        cutImagePositionX = 355 // face UP
        break;
        case "ArrowRight":
        targetImg.x = currentImgMain.x + gridLength;
        targetImg.y = currentImgMain.y;
        cutImagePositionX = 540 // face right
        break;
        case "ArrowDown":
        targetImg.x = currentImgMain.x;
        targetImg.y = currentImgMain.y + gridLength;
        cutImagePositionX = 0 // face down
        break;
        default:
            return;
    }

    if(targetImg.x<=400 && targetImg.x >= 0 && targetImg.y<=400 && targetImg.y >= 0){
        // 
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }else{
        targetBlock.x = -1,
        targetBlock.y = -1;
    }
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength)

    if(targetBlock.x != -1 && targetBlock.y !=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("");
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有山");
                break;
            case 2:
                $("#talkBox").text("抵達終點");
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                break;
            case 3:
                $("#talkBox").text("哈囉");
                break;
        }
    }else{
        $("#talkBox").text("邊界")
    }
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
});