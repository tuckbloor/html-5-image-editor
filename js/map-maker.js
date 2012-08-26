	  function writeMessage(messageLayer, message) {
        var context = messageLayer.getContext();
        messageLayer.clear();
        context.font = "18pt Calibri";
        context.fillStyle = "black";
        context.fillText(message, 10, 25);
      }
	  
function update(group, activeAnchor) {

                var topLeft = group.get(".topLeft")[0];
                var topRight = group.get(".topRight")[0];
                var bottomRight = group.get(".bottomRight")[0];
                var bottomLeft = group.get(".bottomLeft")[0];
                var image = group.get(".image")[0];

                // update anchor positions
                 switch (activeAnchor.getName()) {
                     case "topLeft":
                         topRight.attrs.y = activeAnchor.attrs.y;
                         bottomLeft.attrs.x = activeAnchor.attrs.x;
                         if(topLeft.attrs.x >= topRight.attrs.x)
                         {return;}
                         break;
                     case "topRight":
                         topLeft.attrs.y = activeAnchor.attrs.y;
                         bottomRight.attrs.x = activeAnchor.attrs.x;
                         if(topRight.attrs.x <= topLeft.attrs.x)
                         {return;}
                         break;
                     case "bottomRight":
                         bottomLeft.attrs.y = activeAnchor.attrs.y;
                         topRight.attrs.x = activeAnchor.attrs.x;
                         if(bottomLeft.attrs.x >= topRight.attrs.x)
                         {return;}                                                         
                         break;
                     case "bottomLeft":
                         bottomRight.attrs.y = activeAnchor.attrs.y;
                         topLeft.attrs.x = activeAnchor.attrs.x;
                         if(bottomRight.attrs.x <= topLeft.attrs.x)
                         {return;}                                                                                             
                         break;
                 }

                image.setPosition(topLeft.attrs.x, topLeft.attrs.y);
                image.setSize(topRight.attrs.x - topLeft.attrs.x, bottomLeft.attrs.y - topLeft.attrs.y);
            }
             function addAnchor(group, x, y, name) {
                 var stage = group.getStage();
                 var layer = group.getLayer();

                 var anchor = new Kinetic.Circle({
                     x: x,
                     y: y,	
                     stroke: "transparent",
					  //stroke: "blue",
                     fill: "transparent",
                     strokeWidth: 5,
                     radius: 35,
                     name: name,
                     draggable: true,
					 dragBounds: {
             top: 10,
             right: stage.getWidth() -10,
             bottom: 450,
             left: 10
           }
                 });

                 anchor.on("dragmove", function() {
                     update(group, this);
                     layer.draw();
                 });
                 anchor.on("mousedown", function() {
                     group.draggable(false);
                     this.moveToTop();
                 });
                 anchor.on("dragend", function() {
                     group.draggable(true);
                     layer.draw();
                 });
                 // add hover styling
                 anchor.on("mouseover", function() {

                     var layer = this.getLayer();
                     document.body.style.cursor = "move";
                     this.setStrokeWidth(4);
                       this.setStroke("#FF0000");
                     fill: "#000";
                     strokeWidth: 2;
                     radius: 8;
					  layer.draw();
                 });
				 			 
                 anchor.on("mouseout", function() {
				 
       
					
                     var layer = this.getLayer();
                     document.body.style.cursor = "default";
                     this.setStrokeWidth(2);
					  this.setStroke("transparent");
					  
                     layer.draw();
					 
                 });
   
                 
                 group.add(anchor);
				 
             }
            function loadImages(sources, callback) {
                var images = {};
                var loadedImages = 0;
                var numImages = 0;
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
            function initStage(images) {
				     	 
                var stage = new Kinetic.Stage({
                    container: "container",
                    width: 691,
                    height: 440
                });
		        
                var darthVaderGroup = new Kinetic.Group({
                    x: 300,
                    y: 80,
                    draggable: true,
					dragBounds: {
            top: 10,
            right: stage.getWidth() -300,
            bottom: 100,
            left: 10
          }
                });
                var yodaGroup = new Kinetic.Group({
                    x: 0,
                    y: 0,
                    draggable: false
                });
                var layer = new Kinetic.Layer();

                /*
                 * go ahead and add the groups
                 * to the layer and the layer to the
                 * stage so that the groups have knowledge
                 * of its layer and stage
                 */
				 

		
        var simpleText = new Kinetic.Text({
     
        });
		
$('#save').click( function() {
    stage.toDataURL(function(dataUrl) {
       $.post("ajax.php", { data: dataUrl },
        function(data) {
            alert("Your Design Was Saved To The Server");
        });
    });
});



   document.getElementById("preview").addEventListener("click", function() {
                stage.toDataURL(function(dataUrl) {
                    /*
                     * here you can do anything you like with the data url.
                     * In this tutorial we'll just open the url with the browser
                     * so that you can see the result as an image
                     */
                    window.open(dataUrl, rel="lightbox");
					
                });
            }, false);
				  
  $("ul#img a").click(function(){
        addProduct( $('img', this) );            
    });
        
   function addProduct( imgObj ){

       var layer = new Kinetic.Layer();

        var imageObj = new Image();
        imageObj.onload = function() {
          var image = new Kinetic.Image({
            x: stage.getWidth() / 2 - 53,
            y: stage.getHeight() / 2 - 59,
            image: imageObj,
            width: 250,
            height: 120,
			draggable: true
          });
            // add the shape to the layer
          layer.add(image);

          // add the layer to the stage
     stage.add(layer);
	 
	    image.on("mouseover", function(){
    var imagelayer = this.getLayer();
    document.body.style.cursor = "move"; 
    this.setStrokeWidth(1);
    this.setStroke("#000000");
	layer.draw();   
	 writeMessage(messageLayer, "Drag Image Into Position Double Click To Remove");    
});
 image.on("mouseout", function(){
    var imagelayer = this.getLayer();
    document.body.style.cursor = "default"; 
    this.setStrokeWidth(0);
    this.setStroke("transparent");
	layer.draw();  
	 writeMessage(messageLayer, "");       
});
image.on("dblclick dbltap", function(){
	layer.remove(image);
    layer.clear();
   layer.draw();
   });
        };
		
		
         imageObj.src = imgObj.attr('src');
 }

	  
	         $("ul#text #textsubmit").click(function(){
	
        addText();         
    });
	
	
function addText() {

        var text2 =  $('#texts').val();
		   var fontfam = $('#fontfam').val();
		   var colour = $('#colour').val();
		   var textstroke = $('#textstroke').val();
		   var width = document.getElementById("textcount").clientWidth;
		   var height = document.getElementById("textcount").clientHeight;
		   
           var length = text2.length;
	       var rectwidth=width;
		   
	var shapesLayer = new Kinetic.Layer();
		//add group
        var group = new Kinetic.Group({
        draggable: true
        });

      if(font==undefined)
		{ var font=30; }
		
		  if(x==undefined)
		   {var x=250;}
		   
		 if(y==undefined)
		    {var y=55;}
           var complexText = new Kinetic.Text({

          x: x,
          y: y,
          text: text2,
          fontSize: font,
          fontFamily: fontfam,
          textFill: colour,
          textStroke: textstroke

        });
		
		
		 stage.add(shapesLayer);
		 
		 if(rectheight==undefined)
	      { var rectheight=50; } 
	  
	   if(rectwidth==undefined)
	     { var rectwidth=250; } 
	  
		var rectx=250;
		var recty=40;
		
		
        var rect = new Kinetic.Rect({
          x: rectx,
          y: recty,
          width: rectwidth,
          height: rectheight,
          fill: "transparent",
          stroke: "black",
          strokeWidth: 1
        });    
		
	   	
		var recttrx=width+243;
		var recttry=32;
		var recttr= new Kinetic.Rect({
          x: recttrx,
          y: recttry,
          width: 15,
          height: 15,
          fill: "black",
          stroke: "red",
          strokeWidth: 1
        });    

		var rectbrx=width+243;
		var rectbry=82;		
		var rectbr= new Kinetic.Rect({
          x: rectbrx,
          y: rectbry,
          width: 15,
          height: 15,
          fill: "black",
          stroke: "red",
          strokeWidth: 1
        });    
		
		var recttlx=243;
		var recttly=32;	
		var recttl= new Kinetic.Rect({
          x: recttlx,
          y: recttly,
          width: 15,
          height: 15,
          fill: "black",
          stroke: "red",
          strokeWidth: 1
        });  
	
		var rectblx=243;
		var rectbly=82;		
		var rectbl= new Kinetic.Rect({
          x: rectblx,
          y: rectbly,
          width: 15,
          height: 15,
          fill: "black",
          stroke: "red",
          strokeWidth: 1
        })	
		

 
rect.on("mouseover dragmove", function() {
           var shapesLayer = this.getLayer();
           document.body.style.cursor = "move";
           recttl.setFill("black"); 
		   recttl.setStroke("red"); 
           rectbl.setFill("black"); 
		   rectbl.setStroke("red");
           rectbr.setFill("black"); 
		   rectbr.setStroke("red");
           recttr.setFill("black"); 
		   recttr.setStroke("red");
		   rect.setStrokeWidth(1);
		   rect.setStroke("black");		   
           shapesLayer.draw();
		writeMessage(messageLayer, "Double Click To Remove Or Edit Text");
})
rect.on("mouseout", function() {
           var shapesLayer = this.getLayer();
           document.body.style.cursor = "default";
           recttl.setFill("transparent"); 
		   recttl.setStroke("transparent"); 
           rectbl.setFill("transparent"); 
		   rectbl.setStroke("transparent");
           rectbr.setFill("transparent"); 
		   rectbr.setStroke("transparent");
           recttr.setFill("transparent"); 
		   recttr.setStroke("transparent");
		   rect.setStrokeWidth(0);
		   rect.setStroke("transparent");
	       shapesLayer.draw();
		    writeMessage(messageLayer, ""); 
})

   
complexText.on("mouseover dragmove", function() {
           var shapesLayer = this.getLayer();
           document.body.style.cursor = "move";
           recttl.setFill("black"); 
		   recttl.setStroke("red"); 
           rectbl.setFill("black"); 
		   rectbl.setStroke("red");
           rectbr.setFill("black"); 
		   rectbr.setStroke("red");
           recttr.setFill("black"); 
		   recttr.setStroke("red");
		   rect.setStrokeWidth(1);
		   rect.setStroke("black");		   
           shapesLayer.draw();
		   writeMessage(messageLayer, "Drag Corners Increse Or Decrease Text Size"); 
})
complexText.on("mouseout", function() {
           var shapesLayer = this.getLayer();
           document.body.style.cursor = "default";
           recttl.setFill("transparent"); 
		   recttl.setStroke("transparent"); 
           rectbl.setFill("transparent"); 
		   rectbl.setStroke("transparent");
           rectbr.setFill("transparent"); 
		   rectbr.setStroke("transparent");
           recttr.setFill("transparent"); 
		   recttr.setStroke("transparent");
		   rect.setStrokeWidth(0);
		   rect.setStroke("transparent");
	       shapesLayer.draw();
		     writeMessage(messageLayer, "");
})
		group.add(complexText);
		group.add(rectbl);		
		group.add(recttr);
		group.add(rectbr);
		group.add(recttl);
		group.add(rect);
		shapesLayer.add(group);
		shapesLayer.draw();
		
		//bottom right square move start
		  rectbr.on("mousedown.event1 dragmove", function () {
		  var shapesLayer = this.getLayer();
		  rectbr.moveToTop();
          document.body.style.cursor = "nw-resize";
          rectbr.setFill("red");
		  var mousePos = stage.getMousePosition();
		  var xpos=mousePos.x;
		  var ypos=mousePos.y;
          shapesLayer.draw();
		  //drag br
		  group.on("dragmove.event2", function () { 	  
		  var shapesLayer = this.getLayer();
          document.body.style.cursor = "nw-resize";
          rectbr.setFill("blue");	
		  //start  mouse position and font size 
		  var dragmousePos = stage.getMousePosition();
		  var dragxpos=dragmousePos.x;
		  var dragypos=dragmousePos.y;
			
			if(dragypos > ypos)//drag increase
	       {   
            if(font>50)
       {complexText.setFontSize(50);
	   writeMessage(messageLayer, "Maximum Font Size Reached");
	   complexText.setFontSize(font);  }
             else {
			 font=(font + 1); 
	
		complexText.setFontSize(font);
		 var textwidth=complexText.getTextWidth(); 
             rectwidth=(textwidth);
			 rectbrx=244+textwidth;
			 recttrx=244+textwidth;
			 x=x+0;
			 y=y-0.5;
			 
		  complexText.setPosition(x ,y);
	   	  rect.setWidth(rectwidth);
		  rect.setHeight(rectheight);
		  rectbr.setPosition(rectbrx, rectbry);
		  rectbl.setPosition(rectblx, rectbly);
		  recttl.setPosition(recttlx, recttly);		 
		  recttr.setPosition(recttrx, recttry); 
		  rect.setPosition(rectx, recty);
		  writeMessage(messageLayer, "");
                               }
			}
			if(dragypos < ypos)//drag increase
	       {   
		   
            if(font<21)
       {complexText.setFontSize(20);
	   writeMessage(messageLayer, "Minimum Font Size Reached");
	   complexText.setFontSize(font);  }
             else {
			 font=(font-1); 
	
		complexText.setFontSize(font);
		 var textwidth=complexText.getTextWidth(); 
             rectwidth=(textwidth);
			 rectbrx=rectblx+textwidth;
			 recttrx=recttlx+textwidth;
			 x=x+0;
			 y=y+0.5;
			 
		  complexText.setPosition(x ,y);
	   	  rect.setWidth(rectwidth);
		  rect.setHeight(rectheight);
		  rectbr.setPosition(rectbrx, rectbry);
		  rectbl.setPosition(rectblx, rectbly);
		  recttl.setPosition(recttlx, recttly);		 
		  recttr.setPosition(recttrx, recttry); 
		  rect.setPosition(rectx, recty);
		  writeMessage(messageLayer, "");
                               }
			}
          shapesLayer.draw();
		  })
		  })
		  //end bottom right square
		  
		  
		  //bottom left square move start
		  rectbl.on("mousedown.event1 dragmove", function () {
		  var shapesLayer = this.getLayer();
		  rectbl.moveToTop();
          document.body.style.cursor = "nw-resize";
          rectbl.setFill("red");
		  var mousePos = stage.getMousePosition();
		  var xpos=mousePos.x;
		  var ypos=mousePos.y;
          shapesLayer.draw();
		  //drag br
		  group.on("dragmove.event2", function () { 	  
		  var shapesLayer = this.getLayer();
          document.body.style.cursor = "nw-resize";
          rectbl.setFill("blue");	
		  //start  mouse position and font size 
		  var dragmousePos = stage.getMousePosition();
		  var dragxpos=dragmousePos.x;
		  var dragypos=dragmousePos.y;
			
			if(dragypos > ypos)//drag increase
	       {   
            if(font>50)
       {complexText.setFontSize(50);
	   writeMessage(messageLayer, "Maximum Font Size Reached");
	   complexText.setFontSize(font);  }
             else {
			 font=(font + 1); 
	
		complexText.setFontSize(font);
		 var textwidth=complexText.getTextWidth(); 
             rectwidth=(textwidth);
			 rectbrx=244+textwidth;
			 recttrx=244+textwidth;
			 x=x+0;
			 y=y-0.5;
			 
		  complexText.setPosition(x ,y);
	   	  rect.setWidth(rectwidth);
		  rect.setHeight(rectheight);
		  rectbr.setPosition(rectbrx, rectbry);
		  rectbl.setPosition(rectblx, rectbly);
		  recttl.setPosition(recttlx, recttly);		 
		  recttr.setPosition(recttrx, recttry); 
		  rect.setPosition(rectx, recty);
		  writeMessage(messageLayer, "");
                               }
			}
			if(dragypos < ypos)//drag increase
	       {   
		   
            if(font<21)
       {complexText.setFontSize(20);
	   writeMessage(messageLayer, "Minimum Font Size Reached");
	   complexText.setFontSize(font);  }
             else {
			 font=(font-1); 
	
		complexText.setFontSize(font);
		 var textwidth=complexText.getTextWidth(); 
             rectwidth=(textwidth);
			 rectbrx=rectblx+textwidth;
			 recttrx=recttlx+textwidth;
			 x=x+0;
			 y=y+0.5;
			 
		  complexText.setPosition(x ,y);
	   	  rect.setWidth(rectwidth);
		  rect.setHeight(rectheight);
		  rectbr.setPosition(rectbrx, rectbry);
		  rectbl.setPosition(rectblx, rectbly);
		  recttl.setPosition(recttlx, recttly);		 
		  recttr.setPosition(recttrx, recttry); 
		  rect.setPosition(rectx, recty);
		  writeMessage(messageLayer, "");
                               }
			}
          shapesLayer.draw();
		  })
		  })
		  //end bottom left square
		  
		  //top left right square move start
		  recttl.on("mousedown.event1 dragmove", function () {
		  var shapesLayer = this.getLayer();
		  recttl.moveToTop();
          document.body.style.cursor = "nw-resize";
          recttl.setFill("red");
		  var mousePos = stage.getMousePosition();
		  var xpos=mousePos.x;
		  var ypos=mousePos.y;
          shapesLayer.draw();
		  //drag br
		  group.on("dragmove.event2", function () { 	  
		  var shapesLayer = this.getLayer();
          document.body.style.cursor = "nw-resize";
          recttl.setFill("blue");	
		  //start  mouse position and font size 
		  var dragmousePos = stage.getMousePosition();
		  var dragxpos=dragmousePos.x;
		  var dragypos=dragmousePos.y;
			
			if(dragypos > ypos)//drag increase
	       {   
            if(font>50)
       {complexText.setFontSize(50);
	   writeMessage(messageLayer, "Maximum Font Size Reached");
	   complexText.setFontSize(font);  }
             else {
			 font=(font + 1); 
	
		complexText.setFontSize(font);
		 var textwidth=complexText.getTextWidth(); 
             rectwidth=(textwidth);
			 rectbrx=244+textwidth;
			 recttrx=244+textwidth;
			 x=x+0;
			 y=y-0.5;
			 
		  complexText.setPosition(x ,y);
	   	  rect.setWidth(rectwidth);
		  rect.setHeight(rectheight);
		  rectbr.setPosition(rectbrx, rectbry);
		  rectbl.setPosition(rectblx, rectbly);
		  recttl.setPosition(recttlx, recttly);		 
		  recttr.setPosition(recttrx, recttry); 
		  rect.setPosition(rectx, recty);
		  writeMessage(messageLayer, "");
                               }
			}
			if(dragypos < ypos)//drag increase
	       {   
		   
            if(font<21)
       {complexText.setFontSize(20);
	   writeMessage(messageLayer, "Minimum Font Size Reached");
	   complexText.setFontSize(font);  }
             else {
			 font=(font-1); 
	
		complexText.setFontSize(font);
		 var textwidth=complexText.getTextWidth(); 
             rectwidth=(textwidth);
			 rectbrx=rectblx+textwidth;
			 recttrx=recttlx+textwidth;
			 x=x+0;
			 y=y+0.5;
			 
		  complexText.setPosition(x ,y);
	   	  rect.setWidth(rectwidth);
		  rect.setHeight(rectheight);
		  rectbr.setPosition(rectbrx, rectbry);
		  rectbl.setPosition(rectblx, rectbly);
		  recttl.setPosition(recttlx, recttly);		 
		  recttr.setPosition(recttrx, recttry); 
		  rect.setPosition(rectx, recty);
		  writeMessage(messageLayer, "");
                               }
			}
          shapesLayer.draw();
		  })
		  })
		  //end bottom top left square
		  
		  
		 		//top right square move start
		  recttr.on("mousedown.event1 dragmove", function () {
		  var shapesLayer = this.getLayer();
		  recttr.moveToTop();
          document.body.style.cursor = "nw-resize";
          recttr.setFill("red");
		  var mousePos = stage.getMousePosition();
		  var xpos=mousePos.x;
		  var ypos=mousePos.y;
          shapesLayer.draw();
		  //drag br
		  group.on("dragmove.event2", function () { 	  
		  var shapesLayer = this.getLayer();
          document.body.style.cursor = "nw-resize";
          recttr.setFill("blue");	
		  //start  mouse position and font size 
		  var dragmousePos = stage.getMousePosition();
		  var dragxpos=dragmousePos.x;
		  var dragypos=dragmousePos.y;
			
			if(dragypos > ypos)//drag increase
	       {   
            if(font>50)
       {complexText.setFontSize(50);
	   writeMessage(messageLayer, "Maximum Font Size Reached");
	   complexText.setFontSize(font);  }
             else {
			 font=(font + 1); 
	
		complexText.setFontSize(font);
		 var textwidth=complexText.getTextWidth(); 
             rectwidth=(textwidth);
			 rectbrx=244+textwidth;
			 recttrx=244+textwidth;
			 x=x+0;
			 y=y-0.5;
			 
		  complexText.setPosition(x ,y);
	   	  rect.setWidth(rectwidth);
		  rect.setHeight(rectheight);
		  rectbr.setPosition(rectbrx, rectbry);
		  rectbl.setPosition(rectblx, rectbly);
		  recttl.setPosition(recttlx, recttly);		 
		  recttr.setPosition(recttrx, recttry); 
		  rect.setPosition(rectx, recty);
		  writeMessage(messageLayer, "");
                               }
			}
			if(dragypos < ypos)//drag increase
	       {   
		   
            if(font<21)
       {complexText.setFontSize(20);
	   writeMessage(messageLayer, "Minimum Font Size Reached");
	   complexText.setFontSize(font);  }
             else {
			 font=(font-1); 
	
		complexText.setFontSize(font);
		 var textwidth=complexText.getTextWidth(); 
             rectwidth=(textwidth);
			 rectbrx=rectblx+textwidth;
			 recttrx=recttlx+textwidth;
			 x=x+0;
			 y=y+0.5;
			 
		  complexText.setPosition(x ,y);
	   	  rect.setWidth(rectwidth);
		  rect.setHeight(rectheight);
		  rectbr.setPosition(rectbrx, rectbry);
		  rectbl.setPosition(rectblx, rectbly);
		  recttl.setPosition(recttlx, recttly);		 
		  recttr.setPosition(recttrx, recttry); 
		  rect.setPosition(rectx, recty);
		  writeMessage(messageLayer, "");
                               }
			}
          shapesLayer.draw();
		  })
		  })
		  //end top right square 
		  
		  
		  //end square
		  		rect.on("dblclick", function(){
           //	group.remove(complexText);
 var shapesLayer=this.getLayer();
 group.remove(complexText);
  group.remove(rect);
   group.remove(recttl);
    group.remove(recttr);
	 group.remove(rectbl);
	  group.remove(rectbr);
 shapesLayer.clear();
   shapesLayer.draw();
   });
   
   complexText.on("dblclick", function(){
        var shapesLayer=this.getLayer();
        group.remove(complexText);
        group.remove(rect);
          group.remove(recttl);
    group.remove(recttr);
	 group.remove(rectbl);
	  group.remove(rectbr);
 shapesLayer.clear();
   shapesLayer.draw();
   });
		  //start dragging
	group.on("dragend", function() {
            rectbr.off("dragmove.event1");
            group.off("dragmove.event2");
			document.body.style.cursor = "default";
            }, false)
	  
	   
	   group.on("dragend", function() {
            rectbl.off("dragmove.event1");
            group.off("dragmove.event2");
			document.body.style.cursor = "default";
            }, false)
		
	   group.on("dragend", function() {
            recttl.off("dragmove.event1");
            group.off("dragmove.event2");
			document.body.style.cursor = "default";
            }, false)	
			
	   group.on("dragend", function() {
            recttr.off("dragmove.event1");
            group.off("dragmove.event2");
			document.body.style.cursor = "default";
            }, false)
	   //end dragging
	   
	  rectbr.on("mouseout", function () {
		  var shapesLayer = this.getLayer();
		  rectbr.setFill("#black");
		    rectbr.off("dragmove.event1");
            group.off("dragmove.event2");
			 document.body.style.cursor = "default";
		  shapesLayer.draw();
			})
			rectbl.on("mouseout", function () {
		  var shapesLayer = this.getLayer();
		  rectbl.setFill("#black");
		    rectbl.off("dragmove.event1");
            group.off("dragmove.event2");
			 document.body.style.cursor = "default";
		  shapesLayer.draw();
			})
			recttr.on("mouseout", function () {
		  var shapesLayer = this.getLayer();
		  recttr.setFill("#black");
		    recttr.off("dragmove.event1");
            group.off("dragmove.event2");
			 document.body.style.cursor = "default";
		  shapesLayer.draw();
			})
			recttl.on("mouseout", function () {
		  var shapesLayer = this.getLayer();
		  recttl.setFill("#black");
		    recttl.off("dragmove.event1");
            group.off("dragmove.event2");
			 document.body.style.cursor = "default";
		  shapesLayer.draw();
			})
			
    rectbr.on("mouseover dragmove", function () {
	       var shapesLayer = this.getLayer();
	       rect.setStrokeWidth(1);
		   rect.setStroke("black");  
		   recttl.setFill("black"); 
		   recttl.setStroke("red"); 
           rectbl.setFill("black"); 
		   rectbl.setStroke("red");
           rectbr.setFill("black"); 
		   rectbr.setStroke("red");
           recttr.setFill("black"); 
		   recttr.setStroke("red");
		   rect.setStrokeWidth(1);
		   rect.setStroke("black");		   
           shapesLayer.draw(); 
		   })
		   
     rectbl.on("mouseover dragmove", function () {
	       var shapesLayer = this.getLayer();
	       rect.setStrokeWidth(1);
		   rect.setStroke("black");  
		   recttl.setFill("black"); 
		   recttl.setStroke("red"); 
           rectbl.setFill("black"); 
		   rectbl.setStroke("red");
           rectbr.setFill("black"); 
		   rectbr.setStroke("red");
           recttr.setFill("black"); 
		   recttr.setStroke("red");
		   rect.setStrokeWidth(1);
		   rect.setStroke("black");		   
           shapesLayer.draw(); 
		   })
		   
  recttr.on("mouseover dragmove", function () {
	       var shapesLayer = this.getLayer();
	       rect.setStrokeWidth(1);
		   rect.setStroke("black");  
		   recttl.setFill("black"); 
		   recttl.setStroke("red"); 
           rectbl.setFill("black"); 
		   rectbl.setStroke("red");
           rectbr.setFill("black"); 
		   rectbr.setStroke("red");
           recttr.setFill("black"); 
		   recttr.setStroke("red");
		   rect.setStrokeWidth(1);
		   rect.setStroke("black");		   
           shapesLayer.draw(); 
		   })
		   
 recttl.on("mouseover dragmove", function () {
	       var shapesLayer = this.getLayer();
	       rect.setStrokeWidth(1);
		   rect.setStroke("black");  
		   recttl.setFill("black"); 
		   recttl.setStroke("red"); 
           rectbl.setFill("black"); 
		   rectbl.setStroke("red");
           rectbr.setFill("black"); 
		   rectbr.setStroke("red");
           recttr.setFill("black"); 
		   recttr.setStroke("red");
		   rect.setStrokeWidth(1);
		   rect.setStroke("black");		   
           shapesLayer.draw(); 
		   })		   	
		   
recttl.on("mouseout", function (){
	var shapeslayer= this.getLayer();
    recttl.setFill("transparent"); 
		   recttl.setStroke("transparent"); 
           rectbl.setFill("transparent"); 
		   rectbl.setStroke("transparent");
           rectbr.setFill("transparent"); 
		   rectbr.setStroke("transparent");
           recttr.setFill("transparent"); 
		   recttr.setStroke("transparent");
		   rect.setStrokeWidth(0);
		   rect.setStroke("transparent");
		 shapesLayer.draw();  	
})
recttr.on("mouseout", function (){
	var shapeslayer= this.getLayer();
    recttl.setFill("transparent"); 
		   recttl.setStroke("transparent"); 
           rectbl.setFill("transparent"); 
		   rectbl.setStroke("transparent");
           rectbr.setFill("transparent"); 
		   rectbr.setStroke("transparent");
           recttr.setFill("transparent"); 
		   recttr.setStroke("transparent");
		   rect.setStrokeWidth(0);
		   rect.setStroke("transparent");
		 shapesLayer.draw();  	
})

rectbl.on("mouseout", function (){
	var shapeslayer= this.getLayer();
    recttl.setFill("transparent"); 
		   recttl.setStroke("transparent"); 
           rectbl.setFill("transparent"); 
		   rectbl.setStroke("transparent");
           rectbr.setFill("transparent"); 
		   rectbr.setStroke("transparent");
           recttr.setFill("transparent"); 
		   recttr.setStroke("transparent");
		   rect.setStrokeWidth(0);
		   rect.setStroke("transparent");
		 shapesLayer.draw();  	
})

rectbr.on("mouseout", function (){
	var shapeslayer= this.getLayer();
    recttl.setFill("transparent"); 
		   recttl.setStroke("transparent"); 
           rectbl.setFill("transparent"); 
		   rectbl.setStroke("transparent");
           rectbr.setFill("transparent"); 
		   rectbr.setStroke("transparent");
           recttr.setFill("transparent"); 
		   recttr.setStroke("transparent");
		   rect.setStrokeWidth(0);
		   rect.setStroke("transparent");
		 shapesLayer.draw();  	
})

	 
	
			//end mouse out of  squares


//end mouse out of  squares
			
            // add the shapes to the layer
	        shapesLayer.add(group);
        
           
    
            // add the shape to the layer
        
            // add the layer to the stage		
}
//end text editor
	
	

        // add the shapes to the layer
                layer.add(yodaGroup);
				layer.add(darthVaderGroup);
				
                stage.add(layer);

                // darth vader
                var darthVaderImg = new Kinetic.Image({
                    x: 0,
                    y: 0,
                    image: images.darthVader,
                    width: 300,
                    height: 320,
                    strokeWidth: 2,
                     stroke: "black",
                     name: "image"
	  });
darthVaderImg.on("mouseover", function() {
                     var layer = this.getLayer();
                     document.body.style.cursor = "cursor";
                     this.setStrokeWidth(2);
					  this.setStroke("black");
                     layer.draw();
					 writeMessage(messageLayer, "Drag Image Into Position Click And Drag The Corners To Re-size");
					 
                 });
darthVaderImg.on("mouseout", function() {
                     var layer = this.getLayer();
                     document.body.style.cursor = "default";
                     this.setStrokeWidth(0);
					  this.setStroke("transparent");
                     layer.draw();
					  writeMessage(messageLayer, "");
					 
                 });				 

var messageLayer = new Kinetic.Layer();
		stage.add(messageLayer);
		
                darthVaderGroup.add(darthVaderImg);
                addAnchor(darthVaderGroup, 0, 0, "topLeft");
                addAnchor(darthVaderGroup, 300, 0, "topRight");
                addAnchor(darthVaderGroup, 300, 320, "bottomRight");
                addAnchor(darthVaderGroup, 0, 320, "bottomLeft");

                // yoda
                var yodaImg = new Kinetic.Image({
                    x: 0,
                    y: 0,
                    image: images.yoda,
                    width: 691,
                    height: 450,
                    name: "image"
                });

                yodaGroup.add(yodaImg);
               
                stage.draw();
            }
			

            window.onload = function() {
                var sources = {
					
                //    darthVader: "images/Bears_3.png",
                    yoda: "images/world_map.gif"
                };
                loadImages(sources, initStage);
				
            };
			
$(window).load( function() { 

 var stage2 = new Kinetic.Stage({
          container: "container2",
          width: 130,
          height: 40
 })

 $("ul#text #texts").keyup(function(){
           
         addText2();
     });
 $("ul#text #fontfam").change(function(){
           
         addText2();
     });	 
	 
	 $("ul#text #colour").change(function(){
           
         addText2();
     });	 
	  $("ul#text #textstroke").change(function(){
           
         addText2();
     });	
function addText2() {

        var text3 =  $('#texts').val();
		   var fontfam3 = $('#fontfam').val();
		   var colour3 = $('#colour').val();
		   var textstroke3 = $('#textstroke').val();

		   var font3=23;
	var shapesLayer2 = new Kinetic.Layer();


 
           var complexText2 = new Kinetic.Text({

          x: 10,
          y: 12,
          text: text3,
          fontSize: font3,
          fontFamily: fontfam3,
          textFill: colour3,
          textStroke: textstroke3

        });

         stage2.clear();
   shapesLayer2.draw();

         
        // add the shapes to the layer
        shapesLayer2.add(complexText2);
 
        stage2.add(shapesLayer2);
		 };
      });
	  
    $("#texts").keyup(function () {
      var value = $(this).val();
      $("p#textcount").text(value);
	  	   var fontid =  $('#fontfam').val();
		     $("p#textcount").css("font-family", fontid);
		   var color =  $('#colour').val();
             $("p#textcount").css("color", color);  
    }).keyup();
	
	    
	
		    $("#fontfam").change(function () {
      var value = $('texts').val();
      $("p#textcount").text(value);
	  	   var fontid =  $('#fontfam').val();
		     $("p#textcount").css("font-family", fontid);
		   var color =  $('#colour').val();
             $("p#textcount").css("color", color);  
    }).keyup();		