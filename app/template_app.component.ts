import {Component, View, Input, ViewChild, ElementRef} from "angular2/core";

//framework recognizes @Component annotation and knows that we are trying to create a new component



@Component({
   selector: 'my-app',
})

@View({
  template: `


     <div id="containerdiv" class="container" ng-controller="SimpleDemoController" >

    <div class="row" style="width: 1200px;" >

    <canvas id="myCanvas" width="750" height="500" ></canvas>
    <h1 style="text-align: center;"> Simple Lists</h1>
        <div id="bodyrowdiv" class="col-xs-6 " style="float: left; width: 300px;">
        <h3 style="text-align: center;"> List A</h3>
          <ul>
            <li *ngFor="#listA of listA" class="borderlist" [attr.id]="'A'+listA.label"
                    (click)="getListData(listA.label,'A'+listA.label)">

              {{listA.label}}

            </li>
          </ul>
        </div>
        <div class="col-xs-6" style="float: left; width: 300px;">
        <h3 style="text-align: center;"> List B</h3>
          <ul>
            <li *ngFor="#listB of listB" class="borderlist" [attr.id]="'B'+listB.label"
            (click)="getListData(listB.label,'B'+listB.label)">

              {{listB.label}}

            </li>
          </ul>
        </div>

        <div class="col-xs-6 " style="float: left; width: 300px;">
        <h3 style="text-align: center;">Concatinated List </h3>
          <ul>
            <li *ngFor="#list of concatedLists" class="borderlist" >

              {{list}}

            </li>
          </ul>
      </div>



        <div class="col-xs-6"  style="float: left; width: 300px;">
          <h3 style="text-align: center;"> Generated Model</h3>
          <div id="json">
            <pre >

              "selected" :
              <item *ngIf="selected!=null">
                ["label":{{selected}}],
              </item>
              <br>
              "lists": {
                "A":{{stringListA}},
                "B": {{stringListB}}
                },

              <br>
                "concatinatedlist":{{stringList}}

            </pre>
          </div>
        </div>
      </div>

    <div class="row" style="width: 500px;">

    </div>

    `


})


export class MyTemplate {
  context:CanvasRenderingContext2D;
  private event: MouseEvent;
  client1X = 0;
  client1Y = 0;
  point = null;

// func
  firstlist = null;
  isclicked = false;

  public listA = [
      {label : "Item A1"},
      {label : "Item A2"},
      {label : "Item A3"},
  ];

  public listB = [
    {label : "Item B1"},
    {label : "Item B2"},
    {label : "Item B3"},
  ];

  public concatedLists =[] ;
  public selected = null;
  public stringList = null;
  public stringListA = JSON.stringify(this.listA); //.split(",").join(",\n");
  public stringListB = JSON.stringify(this.listB); //.split(",").join(",\n");
    // Generate initial model


    // for (var i = 0; i < 5; i++) {

    //     this.models.lists.A.push({label: "Item A" + i});
    //     this.models.lists.B.push({label: "Item B" + i});
    // }

  getListData(value,id){
    this.selected = value;
    if(id.lastIndexOf("B", 0)===0) { //check if id starts with B
      // console.log(id+"true");
      var x_coordinate = (document.getElementById(id).offsetLeft)-10;
      var y_coordinate = document.getElementById(id).offsetTop;

      }else{
        var x_coordinate = (document.getElementById(id).offsetLeft+document.getElementById(id).offsetWidth)-10;
        var y_coordinate = document.getElementById(id).offsetTop;
      }
      if (this.isclicked) {
        if((this.concatedLists.indexOf(this.firstlist+" "+value) == -1)&&this.firstlist!== value) {
          this.concatList(value)
          this.drawLine(this.client1X,this.client1Y,x_coordinate,y_coordinate);
          }
        }else{
            this.firstlist = value;
            this.isclicked = true;

            //setting x,y coordinates
            this.client1X = x_coordinate;
            this.client1Y= y_coordinate;

        }
  }
  concatList(value){

    this.concatedLists.push(this.firstlist+" "+value);
    this.stringList = JSON.stringify(this.concatedLists);
    // this.stringList.split(",").join(",\n")
    this.firstlist = null;
    this.isclicked = false;

    }

  drawLine(x1,y1,x2,y2) {

    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(y2-y1,x2-x1);

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas['getContext']('2d');

    ctx.beginPath();
    ctx.fillStyle = "#FF0000";
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x2-headlen*Math.cos(angle-Math.PI/6),y2-headlen*Math.sin(angle-Math.PI/6));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2-headlen*Math.cos(angle+Math.PI/6),y2-headlen*Math.sin(angle+Math.PI/6));

    ctx.stroke();
    }


  }

