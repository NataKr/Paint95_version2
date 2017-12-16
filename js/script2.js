var MyPaint={};
var color;
var sessionTools=[document.body, document.body];
var currentTool;
var currentToolName;
var flag=false;

MyPaint.canvasSize=function(){
  var s=parseInt(screen.height)-200;
  var popup=document.createElement("DIV");
  document.body.appendChild(popup);
  popup.style.width="50%";
  popup.id="pop-up-size";
  popup.style.position="fixed";

      var textDiv=document.createElement("DIV");
      var textGuide=document.createTextNode("Enter canvas size between 300 and "+s+" in pixel. The canvas will be square, so one number is enough");
      textDiv.appendChild(textGuide);
      popup.appendChild(textDiv);

      var inputFieldForSize=document.createElement("INPUT");
      inputFieldForSize.setAttribute("type", "number");
      inputFieldForSize.setAttribute("min", "300");
      inputFieldForSize.setAttribute("max", s);
      inputFieldForSize.id="input-size";
      popup.appendChild(inputFieldForSize);

      var submitFieldSize=document.createElement("BUTTON");
      var btnText=document.createTextNode("Submit");
      submitFieldSize.appendChild(btnText);
      popup.appendChild(submitFieldSize);
      submitFieldSize.id="btn-field-size";
      submitFieldSize.addEventListener("click", MyPaint.enterFieldSize);
}

MyPaint.enterFieldSize=function(){
  var canvasSize=parseInt(document.getElementById("input-size").value);
  document.body.removeChild(document.getElementById("pop-up-size"));
  MyPaint.createBasis(canvasSize);
  MyPaint.createButtonField();
  MyPaint.bindActionButtons();
}

MyPaint.createBasis=function(canvasSize){

  //create container for all elements
  var containerAll=document.createElement("DIV");
  document.body.appendChild(containerAll);
  containerAll.className="doc-container";


  var toolTitle=document.createElement("DIV");
  var textTool=document.createTextNode("Tool Box");
  toolTitle.appendChild(textTool);
  containerAll.appendChild(toolTitle);
  toolTitle.style.width="700px";
  toolTitle.id="tool-box-name";
  toolTitle.className="tool-name";


  //Creating Toolbar
  var toolBox=document.createElement("DIV");
  containerAll.appendChild(toolBox);
  toolBox.style.width="500px";
  toolBox.style.height="100px";
  toolBox.style.border="0.5px solid black";
  toolBox.style.display="flex";
  toolBox.className="tool-wrapper";
  toolBox.id="tools-container";

      //create color picker field
      var colorField=document.createElement("DIV");
      toolBox.appendChild(colorField);
      colorField.style.width="20%";
      colorField.style.height="100%";
      colorField.id="color-field";

         //create divs inside colorsField
         for (var i=0; i<2; i++){
           var colorFieldDiv=document.createElement("DIV");
           colorField.appendChild(colorFieldDiv);
           colorFieldDiv.id="color-field"+i;
         }
            //create text for colorField
            var colorFieldText=document.createTextNode("Pick a color");
            document.getElementById("color-field0").appendChild(colorFieldText);
            //create color pallet
            var colorPallet=document.createElement("INPUT");
            colorPallet.id="color-picker";
            colorPallet.setAttribute("type", "color");
            document.getElementById("color-field1").appendChild(colorPallet);

      //create field for eraser
      var eraserField=document.createElement("DIV");
      toolBox.appendChild(eraserField);
      eraserField.style.width="30%";
      eraserField.style.height="100%";
      eraserField.id="eraser-field";
      eraserField.style.position="relative";

            for (var i=0; i<3; i++){
              var eraser=document.createElement("IMG");
              eraser.setAttribute("src", "./images/eraser"+i+".jpg");
              eraser.setAttribute("alt", "eraser");
              eraserField.appendChild(eraser);
              eraser.style.display="inline-block";
              eraser.id="eraser-tool"+i;
              eraser.className="erasers";
              eraser.style.position="absolute";
              eraser.addEventListener("click", MyPaint.selectTool);
            }

      //create field for brushes
      var brushesField=document.createElement("DIV");
      toolBox.appendChild(brushesField);
      brushesField.style.width="49%";
      brushesField.style.height="100%";
      brushesField.id="brushes-field";
      brushesField.style.position="relative";

            // brushes of different sizes
            for (var i=0; i<3; i++){
              var brush=document.createElement("IMG");
              brush.setAttribute("src", "./images/brush"+i+".jpg");
              brush.setAttribute("alt", "brush");
              brushesField.appendChild(brush);
              brush.style.display="inline-block";
              brush.id="paint-brush"+i;
              brush.className="brushes";
              brush.style.position="absolute";
              brush.addEventListener("click", MyPaint.selectTool);
            }

              var increaseBrush=document.createElement("INPUT");
              increaseBrush.setAttribute("type", "number");
              increaseBrush.setAttribute("min", "1");
              increaseBrush.setAttribute("max", "7");
              increaseBrush.setAttribute("value", "1");
              brushesField.appendChild(increaseBrush);
              increaseBrush.id="increase-brush";
              increaseBrush.className="brushes";
              increaseBrush.style.display="inline-block";
              increaseBrush.style.position="absolute";
              increaseBrush.addEventListener("click", MyPaint.selectTool);

              // Creating canvas field
              var canvasField=document.createElement("DIV");
              containerAll.appendChild(canvasField); //changeds
              canvasField.style.width=canvasSize+"px";
              canvasField.style.height=canvasSize+"px";
              canvasField.style.border="0.5px solid black";
              canvasField.className="canvas-wrapper";
              canvasField.fontSize="0px";
              canvasField.style.display="flex";
              canvasField.id="container";

                // Creating blocks
                var row;
                var row1;
                var innerDiv;
                for (var j=0; j<10000; j++){
                  row=document.createElement("DIV");
                  canvasField.appendChild(row);
                  row.style.width="1%";
                  row.style.height="1%";
                  row.className="row";
                  row.id=j;
                  row.style.boxShadow="0.3px 0.3px 0.3px #f7efef";
                }

                for (var i=0; i<10000; i++){
                  document.getElementById(i).addEventListener("mousedown", MyPaint.engageMouseAction);
                  document.getElementById(i).addEventListener("mouseup", MyPaint.stopMouseAction);
                }
}

MyPaint.engageMouseAction=function(e){
    for (var i=0; i<10000; i++){
      document.getElementById(i).addEventListener("mouseover", MyPaint.change);
    }
}

MyPaint.change=function(e){
  if (flag){
     if (currentTool.className=="brushes"){
         color=document.getElementById("color-picker").value;
         console.log("i am brush");
         if (currentToolName=="paint-brush0"){
             event.target.style.backgroundColor=color;
             console.log("i am first if");
         } else if (currentToolName=="paint-brush1"){
             var targetId=0;
             var thisId=event.target.id;
             for (var i=0; i<2; i++){
               for (var j=0; j<2; j++){
                 targetId=parseInt(thisId)+i*100+j;
                 document.getElementById(targetId).style.backgroundColor=color;
               }
             }
             console.log("i am second if");
         } else if (currentToolName=="paint-brush2"){
             var targetId=0;
             var thisId=event.target.id;
             for (var i=0; i<3; i++){
               for (var j=0; j<3; j++){
                 targetId=parseInt(thisId)+i*100+j;
                 document.getElementById(targetId).style.backgroundColor=color;
               }
             }
             console.log("i am third if");
         } else if(currentToolName=="increase-brush"){
             var targetId=0;
             var size=3+parseInt(document.getElementById("increase-brush").value);
             console.log(size);
             var thisId=event.target.id;
             for (var i=0; i<size; i++){
               for (var j=0; j<size; j++){
                 targetId=parseInt(thisId)+i*100+j;
                 document.getElementById(targetId).style.backgroundColor=color;
               }
             }
             console.log("i am fourth if");
         }
     }
     else if (currentTool.className=="erasers"){
         color="";
         console.log("i am eraser");

         if (currentToolName=="eraser-tool0"){
             event.target.style.backgroundColor=color;
             console.log("i am first if");
         } else if (currentToolName=="eraser-tool1"){
             var targetId=0;
             var thisId=event.target.id;
             for (var i=0; i<2; i++){
               for (var j=0; j<2; j++){
                 targetId=parseInt(thisId)+i*100+j;
                 document.getElementById(targetId).style.backgroundColor=color;
               }
             }
             console.log("i am second if");
         } else if (currentToolName=="eraser-tool2"){
             var targetId=0;
             var thisId=event.target.id;
             for (var i=0; i<3; i++){
               for (var j=0; j<3; j++){
                 targetId=parseInt(thisId)+i*100+j;
                 document.getElementById(targetId).style.backgroundColor=color;
               }
             }
             console.log("i am third if");
         }
     }
   }
   else{
     alert( "Please pick a tool" );
   }
}

MyPaint.stopMouseAction=function(e){
  for (var i=0; i<10000; i++){
    document.getElementById(i).removeEventListener("mouseover", MyPaint.change);
  }
}

MyPaint.selectTool=function(e){
    currentTool=event.target;
    currentToolName=event.target.id;
    event.target.style.opacity="0.8";
    event.target.style.boxShadow="2px 2px 3px grey";
    sessionTools.push(event.target);
    sessionTools[sessionTools.length-2].style.opacity="1";
    sessionTools[sessionTools.length-2].style.boxShadow="none";
    MyPaint.enable();
    console.log(currentToolName);
    console.log(currentTool);
    console.log(currentTool.className);
}

MyPaint.enable=function(){
    flag=true;
}

MyPaint.bindActionButtons=function(){
    MyPaint.createClearButton();
    MyPaint.createSaveButton();
    MyPaint.createLoandButton();
}

MyPaint.createButtonField=function(){
    var containerAll=document.getElementsByClassName("doc-container")[0];
    var buttonContainer=document.createElement("DIV");
    containerAll.appendChild(buttonContainer);
    buttonContainer.id="button-wrapper";
}

MyPaint.createClearButton=function(){
    var buttonContainer=document.getElementById("button-wrapper");
    var clearBtn=document.createElement("BUTTON");
    var buttonText=document.createTextNode("Reset");
    clearBtn.appendChild(buttonText);
    buttonContainer.appendChild(clearBtn);
    clearBtn.className="buttons";
    clearBtn.id="reset-button";
    clearBtn.addEventListener("click", MyPaint.clearCanvas);
}

MyPaint.clearCanvas=function(){
      for (var i=0; i<10000; i++){
        document.getElementById(i).style.backgroundColor="";
      }
}

MyPaint.createSaveButton=function(){
  var buttonContainer=document.getElementById("button-wrapper");
  var saveBtn=document.createElement("BUTTON");
  var buttonText=document.createTextNode("Save");
  saveBtn.appendChild(buttonText);
  buttonContainer.appendChild(saveBtn);
  saveBtn.className="buttons";
  saveBtn.id="save-button";
  saveBtn.addEventListener("click", MyPaint.saveImage);
}

MyPaint.saveImage=function(){
    MyPaint.createPopUp();
}

MyPaint.createPopUp=function(){
  //crate popup window
  var popup=document.createElement("DIV");
  document.body.appendChild(popup);
  popup.style.width="30%";
  popup.id="pop-up";
  popup.style.position="fixed";

      var inputFileName=document.createElement("INPUT");
      inputFileName.setAttribute("type", "text");
      inputFileName.setAttribute("placeholder", "Enter file name");
      inputFileName.id="file-name";
      popup.appendChild(inputFileName);

      var submitFileNameBtn=document.createElement("BUTTON");
      var btnText=document.createTextNode("Save");
      submitFileNameBtn.appendChild(btnText);
      popup.appendChild(submitFileNameBtn);
      submitFileNameBtn.id="btn-file-name";
      submitFileNameBtn.addEventListener("click", MyPaint.enterFileName);

      var cancelBtn=document.createElement("BUTTON");
      var cancelBtnText=document.createTextNode("Cancel");
      cancelBtn.appendChild(cancelBtnText);
      popup.appendChild(cancelBtn);
      cancelBtn.id="btn-cancel";
      cancelBtn.addEventListener("click", MyPaint.cancelSave);
}

MyPaint.enterFileName=function(){
    var input=document.getElementById("file-name").value; //key
    var newPicture={};
    for (var i=0; i<10000; i++){
      if (document.getElementById(i).style.backgroundColor!=""){
        newPicture[i]=document.getElementById(i).style.backgroundColor;
      }
    }
    console.log(newPicture);
    localStorage.setItem(input, JSON.stringify(newPicture));
    document.body.removeChild(document.getElementById("pop-up"));
}

MyPaint.cancelSave=function(){
    document.body.removeChild(document.getElementById("pop-up"));
}

MyPaint.createLoandButton=function(){
    var buttonContainer=document.getElementById("button-wrapper");
    var loadBtn=document.createElement("BUTTON");
    var buttonText=document.createTextNode("Load");
    loadBtn.appendChild(buttonText);
    buttonContainer.appendChild(loadBtn);
    loadBtn.className="buttons";
    loadBtn.id="load-button";
    loadBtn.addEventListener("click", MyPaint.loadImage);
}

MyPaint.loadImage=function(){
      var fileN=prompt("Enter file name to show");
      var loadedPicture=localStorage.getItem(fileN);
      var picture=JSON.parse(loadedPicture);
      MyPaint.clearCanvas();
      for (var i=0; i<10000; i++){
          document.getElementById(i).style.backgroundColor=picture[i];
      }
}

//MyPaint.start();

MyPaint.canvasSize();
