System.register(["angular2/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var MyTemplate;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            //framework recognizes @Component annotation and knows that we are trying to create a new component
            MyTemplate = (function () {
                function MyTemplate() {
                    this.client1X = 0;
                    this.client1Y = 0;
                    this.point = null;
                    // func
                    this.firstlist = null;
                    this.isclicked = false;
                    this.listA = [
                        { label: "Item A1" },
                        { label: "Item A2" },
                        { label: "Item A3" },
                    ];
                    this.listB = [
                        { label: "Item B1" },
                        { label: "Item B2" },
                        { label: "Item B3" },
                    ];
                    this.concatedLists = [];
                    this.selected = null;
                    this.stringList = null;
                    this.stringListA = JSON.stringify(this.listA); //.split(",").join(",\n");
                    this.stringListB = JSON.stringify(this.listB); //.split(",").join(",\n");
                }
                // Generate initial model
                // for (var i = 0; i < 5; i++) {
                //     this.models.lists.A.push({label: "Item A" + i});
                //     this.models.lists.B.push({label: "Item B" + i});
                // }
                MyTemplate.prototype.getListData = function (value, id) {
                    this.selected = value;
                    if (id.lastIndexOf("B", 0) === 0) {
                        // console.log(id+"true");
                        var x_coordinate = (document.getElementById(id).offsetLeft) - 10;
                        var y_coordinate = document.getElementById(id).offsetTop;
                    }
                    else {
                        var x_coordinate = (document.getElementById(id).offsetLeft + document.getElementById(id).offsetWidth) - 10;
                        var y_coordinate = document.getElementById(id).offsetTop;
                    }
                    if (this.isclicked) {
                        if ((this.concatedLists.indexOf(this.firstlist + " " + value) == -1) && this.firstlist !== value) {
                            this.concatList(value);
                            this.drawLine(this.client1X, this.client1Y, x_coordinate, y_coordinate);
                        }
                    }
                    else {
                        this.firstlist = value;
                        this.isclicked = true;
                        //setting x,y coordinates
                        this.client1X = x_coordinate;
                        this.client1Y = y_coordinate;
                    }
                };
                MyTemplate.prototype.concatList = function (value) {
                    this.concatedLists.push(this.firstlist + " " + value);
                    this.stringList = JSON.stringify(this.concatedLists);
                    // this.stringList.split(",").join(",\n")
                    this.firstlist = null;
                    this.isclicked = false;
                };
                MyTemplate.prototype.drawLine = function (x1, y1, x2, y2) {
                    var headlen = 10; // length of head in pixels
                    var angle = Math.atan2(y2 - y1, x2 - x1);
                    var canvas = document.getElementById("myCanvas");
                    var ctx = canvas['getContext']('2d');
                    ctx.beginPath();
                    ctx.fillStyle = "#FF0000";
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
                    ctx.moveTo(x2, y2);
                    ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
                    ctx.stroke();
                };
                MyTemplate = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                    }),
                    core_1.View({
                        template: "\n\n\n     <div id=\"containerdiv\" class=\"container\" ng-controller=\"SimpleDemoController\" >\n\n    <div class=\"row\" style=\"width: 1200px;\" >\n\n    <canvas id=\"myCanvas\" width=\"750\" height=\"500\" ></canvas>\n    <h1 style=\"text-align: center;\"> Simple Lists</h1>\n        <div id=\"bodyrowdiv\" class=\"col-xs-6 \" style=\"float: left; width: 300px;\">\n        <h3 style=\"text-align: center;\"> List A</h3>\n          <ul>\n            <li *ngFor=\"#listA of listA\" class=\"borderlist\" [attr.id]=\"'A'+listA.label\"\n                    (click)=\"getListData(listA.label,'A'+listA.label)\">\n\n              {{listA.label}}\n\n            </li>\n          </ul>\n        </div>\n        <div class=\"col-xs-6\" style=\"float: left; width: 300px;\">\n        <h3 style=\"text-align: center;\"> List B</h3>\n          <ul>\n            <li *ngFor=\"#listB of listB\" class=\"borderlist\" [attr.id]=\"'B'+listB.label\"\n            (click)=\"getListData(listB.label,'B'+listB.label)\">\n\n              {{listB.label}}\n\n            </li>\n          </ul>\n        </div>\n\n        <div class=\"col-xs-6 \" style=\"float: left; width: 300px;\">\n        <h3 style=\"text-align: center;\">Concatinated List </h3>\n          <ul>\n            <li *ngFor=\"#list of concatedLists\" class=\"borderlist\" >\n\n              {{list}}\n\n            </li>\n          </ul>\n      </div>\n\n\n\n        <div class=\"col-xs-6\"  style=\"float: left; width: 300px;\">\n          <h3 style=\"text-align: center;\"> Generated Model</h3>\n          <div id=\"json\">\n            <pre >\n\n              \"selected\" :\n              <item *ngIf=\"selected!=null\">\n                [\"label\":{{selected}}],\n              </item>\n              <br>\n              \"lists\": {\n                \"A\":{{stringListA}},\n                \"B\": {{stringListB}}\n                },\n\n              <br>\n                \"concatinatedlist\":{{stringList}}\n\n            </pre>\n          </div>\n        </div>\n      </div>\n\n    <div class=\"row\" style=\"width: 500px;\">\n\n    </div>\n\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], MyTemplate);
                return MyTemplate;
            }());
            exports_1("MyTemplate", MyTemplate);
        }
    }
});
//# sourceMappingURL=template_app.component.js.map