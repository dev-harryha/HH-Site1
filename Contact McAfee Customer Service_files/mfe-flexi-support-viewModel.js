define([
  'knockout',
  'ojs/ojcontext',
  'ojs/ojanimation',
  'ojs/ojconverter-datetime',
  './lib/luxon.min',
  'ojL10n!./resources/nls/mfe-flexi-support-strings',
  'ojs/ojfilepicker',
  'ojs/ojactioncard',
  'ojs/ojtimezonedata'
], function (
  ko,
  ojContext,
  AnimationUtils,
  ojconverter_datetime_1,
  luxon,
  strings
) {
  'use strict';

  function FlexisupportComponentModel(context) {
    var self = this;

    // At the start of your viewModel constructor.
    var busyContext = ojContext.getContext(context.element).getBusyContext();
    var options = { 'description': 'Component Startup - Waiting for data' };
    self.busyResolve = busyContext.addBusyState(options);
    self.composite = context.element;
    self.properties = context.properties;

    self.res = strings;

    self.metadata = ko.observable(context.properties.metadata ? context.properties.metadata : {});
    self.locale = ko.observable(context.properties.locale);//ko.observable('fr-CA');
    self.role = context.properties.role;
    self.timezone = ko.observable(context.properties.timezone); //ko.observable('America/Toronto');
    self.currQ = ko.observable();
    self.showQuestion = ko.observable(true);
    self.showStartOver = ko.observable(false);
    self.srissue = ko.observable();
    self.refundCategory = ko.observable("");
    self.refunddesc = ko.observable("");
    self.platform = ko.observable("");
    self.eVar = ko.observable("");
    self.label = ko.observable();
    self.hrsofoperation = ko.observable();
    self.workinghours = ko.observable();
    self.directurl = context.properties.directurl;
    self.assistanceType = context.properties.assistanceType;


    // Once all startup and async activities have finished, relocate if there are any async activities.
    self.busyResolve();
    self.handleClick = function (e, data) {
      //e.stopPropagation();
      //e.preventDefault();


          var ele = document. activeElement;
 var idVal = e.currentTarget.id;
  var disable = $(id).hasClass("mfe-fq-option-disabled");
  var dis = e.currentTarget.classList.contains("mfe-fq-option-disabled");
  if(dis){
e.preventDefault();
e.stopPropagation();


    // document.getElementById(idVal).style.pointerEvents =
    //       "none";
    //     document.getElementById(idVal).style.cursor = "default";
  }

    else{
       var id = "fq-option-" + data.index; //ocsp-7721
      
       document.getElementById(id).ariaExpanded ='true';//ocsp-7721
     
      
      if (e.detail.originalEvent.type != "touchend") {
        let destination = data.data.destinationType;
        self.eVar = data.data.eVar33;
        self.label = data.data.label;

        if (data.data.srIssueType != undefined) {
          let srType = data.data.srIssueType;
          self.srissue = srType;
        }
        if (data.data.refundCat != undefined) {
          let refcat = data.data.refundCat;
          let refunddes = data.data.label;
          self.refundCategory = refcat;
          self.refunddesc = refunddes;
        }
        if (data.data.platform != undefined) {
          let pltfm = data.data.platform;
          self.platform = pltfm;
        }

        // chat and link on hover others click
        if (destination == 'nextQ') {
          self.showQuestion(true);
          self.currQ(self.metadata().questions[data.data.nextQ - 1]);
          setTimeout(function() {
  document.querySelector(".oj-actioncard").focus();
}, 1);
          self.showStartOver(true);
          let lang = document.getElementById("languageselection");
          let srlink = document.getElementById("la8");
          lang.style.display = "none";
          srlink.style.display = "none";
        }
        else {
          let prevExpArry = document.getElementsByClassName("expandclass");
          if (prevExpArry.length > 0) {
            for (var i = 0; i < prevExpArry.length; i++) {
              if (prevExpArry[i].id != e.target.id) {
                let panel = document.getElementById(prevExpArry[i].id);
                let extra = panel.getElementsByClassName("fq-option-content")[0];
                let initHeight = getComputedStyle(panel)["height"];
                AnimationUtils["collapse"](panel, {
                  endMaxHeight: initHeight
                }).then(() => {
                  extra.style.display = "none";
                  panel.classList.remove("expandclass");
                   panel.ariaExpanded ='false'; //ocsp-7721
                });
              }
            }
          }
          let panel = document.getElementById(e.target.id);
          let extra = panel.getElementsByClassName("fq-option-content")[0];
          let initHeight = getComputedStyle(panel)["height"];

          extra.style.display = "block";
          AnimationUtils["expand"](panel, {
            startMaxHeight: initHeight
          }).then(() => {
            panel.classList.add("expandclass");
          });
        }


        //let eVar = self.eVar;
        let detail = {};
        detail.clickValue = self.eVar;
        detail.option = self.label;
        detail.question = self.currQ().question;
        detail.flow = self.metadata().flow;
        context.element.dispatchEvent(new CustomEvent('analytics', {
          detail: detail
        }));
      }
    }
    };


    self.onfocusFunction = function(e,data){
      
        var ele = document. activeElement;
  var id = "#"+ ele.id;
  if(id!="#"){
 $(window).scrollTop($(id).position().top);
  }
   //   document.getElementById().scrollIntoView();
     
  
};

//ocsp-8229
    self.tileMouseDown = function(e,data){
   e.preventDefault();
  
};

    self.handleMouseEnter = function (e, data) {
      let destination = data.data.destinationType;
      if (destination == 'chat' || destination == 'link') {
        // chat and link on hover others click
        let panel = document.getElementById(e.target.id);
        let extra = panel.getElementsByClassName("fq-option-content")[0];
        let initHeight = getComputedStyle(panel)["height"];
        extra.style.display = "block";
        AnimationUtils["expand"](panel, {
          startMaxHeight: initHeight
        }).then(() => {
        });
      }
    };

    self.handleMouseLeave = function (e, data) {
      let destination = data.data.destinationType;
      // if (destination == 'chat'  || destination == 'link') {
      let panel = document.getElementById(e.target.id);
      let extra = panel.getElementsByClassName("fq-option-content")[0];
      let initHeight = getComputedStyle(panel)["height"];
      AnimationUtils["collapse"](panel, {
        endMaxHeight: initHeight
      }).then(() => {
        extra.style.display = "none";
        panel.classList.remove("expandclass");
          
      });

      // }

    };

    self.resetadmin = function(){
      self.currQ(self.metadata().questions[0]);
      self.showStartOver(false);
    };

    self.reset = function (e) {
      self.currQ(self.metadata().questions[0]);
      self.showStartOver(false);
      self.refundCategory = '';
      self.refunddesc = '';
      self.srissue = 'MCS_NONTECHNICAL';
      self.platform = '';
      self.assistanceType = '';
      self.directurl = false;

      let lang_show = document.getElementById("languageselection");
      let srlink_show = document.getElementById("la8");
      lang_show.style.display = "block";
      srlink_show.style.display = "block";

      let detail = {};
      detail.startover = "Y";
      detail.flow = self.metadata().flow;
      context.element.dispatchEvent(new CustomEvent('analytics', {
        detail: detail
      }));
      context.element.dispatchEvent(new CustomEvent('reset', {
        detail: detail
      }));
      setTimeout(function() {
  document.querySelector(".oj-actioncard").focus();
},500); 
      e.preventDefault();
    };

    self.resetOnKeyPress = function (e) {
      if (e.keyCode && (e.keyCode == 13 || e.keyCode == 32)) {
        self.reset(e);
      }
    };

    self.isOptionAvailable = function (wh, chatenabled) {
      console.log("wh===*********", wh);
      console.log("ChatEnabled==", chatenabled);
      if (chatenabled === 'N')
      {
        return false;
      }
      var self = this;
      // if(self.isEmpty(wh)){
      //   console.log("Inside Else===", wh);
      //  self.workinghours(self.createobject());
      // }
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const d = new Date();
      const dayName = days[d.getDay()];
      if (!wh[dayName]) {
        return true;
      }
      // if (wh[dayName] === '24/7') {
      //   return true;
      // }

      const hrsOfOperation = wh[dayName];

      // if (!self.isEmpty(hrsOfOperation)){
      //   self.workinghours(wh);
      // }

      var startTime = hrsOfOperation['Start Time'];
      var endTime = hrsOfOperation['End Time'];
      if (startTime === 'NA' && endTime === 'NA') {
        return false;
      }

      console.log("local Time = ", self.locale());
      console.log("timeZone = ", self.timezone());
      var currentLocalTime = new Date().toLocaleString('en-US', { timeZone: self.timezone() });
      var currentLocalHr = new Date(currentLocalTime).getHours();
      var currentLocalMin = new Date(currentLocalTime).getMinutes();
      console.log("The Current Local Time is:====", currentLocalTime);
      console.log("The Current Local Hour is:====", currentLocalHr);
      console.log("The Current Local Min is:====", currentLocalMin);
      return self.checkTime(startTime, endTime, currentLocalHr, currentLocalMin);
    };

    self.checkTime = function (startTime, endTime, currentHr, currentLocalMin) {
      var startHr;
      var endHr;
      var startMin;
      var endHrMin;
      if (endTime == undefined) {
        endTime = "23:59";
      }
      try {
        startHr = startTime.split(':')[0];  // from excel
        startMin = startTime.split(':')[1]; // from excel
        endHr = endTime.split(':')[0];  // from excel
        endHrMin = endTime.split(':')[1]; // from excel
        console.log("The start Hour is:====", startHr);
        console.log("The endHr Hour is:====", endHr);
        console.log("The start Min is:====", startMin);
        console.log("The endHr Min is:====", endHrMin);

        if (startHr == undefined || startMin == undefined || endHr == undefined || endHrMin == undefined) {
          console.log("Time format error. Start and End time should be in 24-hour format: Start Time: " + startTime + " End Time: " + endTime);
          return false;
        }

        if (currentHr >= startHr && currentHr <= endHr) {
          if (currentHr == endHr) // if (21 == 21) both hours are same then check Minutes
          {
            if (currentLocalMin <= endHrMin) {
              return true;
            }
            else {
              return false;
            }
          }
          else {
            return true;
          }
        }
      }
      catch (err) {
        console.log("Time format error. Start and End time should be in 24-hour format: Start Time: " + startTime + " End Time: " + endTime);
      }
      return false;
    };

    self.getHrsOfOperationString = function (wh) {
      var self = this;

      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const d = new Date();
      const dayName = days[d.getDay()];
      if (!wh[dayName]) {
        return false;
      }
      if (wh[dayName] === '24/7') {
        return self.res.CONTACT_US_AVAILABLE_ALWAYS;
      }
      const hrs_of_oper = wh[dayName];
      var startTime = hrs_of_oper['Start Time'];
      var endTime = hrs_of_oper['End Time'];
      var output = startTime + "-" + endTime;
      return output;
    };

    self.splitLabel = function (label) {
      var self = this;
      var myArray;
      if (label.includes("_")) {
        myArray = label.split("_");
        let word = myArray[0];
        return word;
      }
      else
        return label;
    };

    self.splitLabel_hours = function (label) {
      var self = this;
      var myArray;
      if (label.includes("_")) {
        myArray = label.split("_");
        let word = myArray[1];
        self.hrsofoperation = word;
        return word;
      }
      else
        return label;
    };

    self.handleChatClick = function (e, data) {
      e.stopPropagation();
      let channelId = data.data.channelId;
	  console.log("Channel id-- " + channelId);
     // let chatapplication = data.data.chatapplication;
     // console.log("chatapplication-- " + chatapplication);
      let hrsofOperationLabel = self.splitLabel_hours(data.data.hoursofOperationLabel);
      if (self.isEmpty(data.data.hrsOfOperation)) {
        self.workinghours(self.createobject());
      }
      if (!self.isEmpty(data.data.hrsOfOperation)) {
        self.workinghours(data.data.hrsOfOperation);
      }
      let detail = {};
      detail.channelId = channelId;
      detail.srIssueType = self.srissue;
      detail.refundCategory = self.refundCategory;
      detail.platform = self.platform;
      detail.refunddescription = self.refunddesc;
      detail.hoursofoperation = hrsofOperationLabel;
      detail.workinghours = self.workinghours;
	 // detail.chatapplication = chatapplication;
      context.element.dispatchEvent(new CustomEvent('startChat', {
        detail: detail
      }));


    };
    self.isMobile = function (numb) {
      let check = false;
      (
        function (a) {
          if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        }
      )
        (navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };

    self.isEmpty = function (obj) {
      for (var key in obj) {
        if (obj[key] !== null && obj[key] != "" && obj[key] != undefined)
          return false;
      }
      return true;
    };

    self.createobject = function () {
      const days_obj = {};
      days_obj.Sun = {};
      days_obj.Mon = {};
      days_obj.Tue = {};
      days_obj.Wed = {};
      days_obj.Thu = {};
      days_obj.Fri = {};
      days_obj.Sat = {};
      days_obj.Sun.StartTime = "00:00";
      days_obj.Sun.EndTime = "23:59";
      days_obj.Mon.StartTime = "00:00";
      days_obj.Mon.EndTime = "23:59";
      days_obj.Tue.StartTime = "00:00";
      days_obj.Tue.EndTime = "23:59";
      days_obj.Wed.StartTime = "00:00";
      days_obj.Wed.EndTime = "23:59";
      days_obj.Thu.StartTime = "00:00";
      days_obj.Thu.EndTime = "23:59";
      days_obj.Fri.StartTime = "00:00";
      days_obj.Fri.EndTime = "23:59";
      days_obj.Sat.StartTime = "00:00";
      days_obj.Sat.EndTime = "23:59";
      return days_obj;
    };

    self.checklanguage = function () {
      var self = this;
      var languagecode = self.locale();
      if (languagecode.startsWith("ar-"))
        return true;
      else
        return false;
    };
  }


  FlexisupportComponentModel.prototype.bindingsApplied = function (context) {
    var self = this;
  };

  FlexisupportComponentModel.prototype.propertyChanged = function (propertyChangedContext) {
    var self = this;

    if (propertyChangedContext.property == 'metadata' && propertyChangedContext.updatedFrom == 'external') {
      if (self.directurl != true) {
        self.metadata(propertyChangedContext.value);
        self.currQ(self.metadata().questions[0]);
        self.locale(self.metadata().localeCode);
        self.showQuestion(true);
      }
      else {
        console.log("Phone Direct flow");
        self.metadata(propertyChangedContext.value);
        let data = self.metadata().questions;
        for (var k = 0; k < data[0].options.length; k++) {
          if (data[0].options[k].eVar33 == self.assistanceType.toLowerCase()) {
            self.srissue = data[0].options[k].srIssueType;
            let destination = data[0].options[k].destinationType;
            if (destination == 'nextQ') {
              let j = 0;
              if (data[data[0].options[k].nextQ - 1].options[j].destinationType == 'number' || data[data[0].options[k].nextQ - 1].options[j].destinationType == 'chat' || data[data[0].options[k].nextQ - 1].options[j].destinationType == 'community') {
                self.showQuestion(false);
                self.currQ(self.metadata().questions[data[0].options[k].nextQ - 1]);
                self.showStartOver(true);
                for (var n = 0; n < data[data[0].options[k].nextQ - 1].options.length; n++) {
                  if (data[data[0].options[k].nextQ - 1].options[n].destinationType == 'number') {
                    let panel = document.getElementById("fq-option-" + n);
                    if (!panel.classList.contains("mfe-fq-option-disabled")) {
                      let extra = panel.getElementsByClassName("fq-option-content")[0];
                      let initHeight = getComputedStyle(panel)["height"];

                      extra.style.display = "block";
                      AnimationUtils["expand"](panel, {
                        startMaxHeight: initHeight
                      }).then(() => {
                        panel.classList.add("expandclass");
                      });
                    }
                  }
                }
                if (document.getElementById("languageselection")) {
                  let lang = document.getElementById("languageselection");
                  let srlink = document.getElementById("la8");
                  lang.style.display = "none";
                  srlink.style.display = "none";
                }
                break;
              }
              else if (data[data[0].options[k].nextQ - 1].options[k].destinationType == 'nextQ') {
                outerloop: for (var z = 0; z < data[data[0].options[k].nextQ - 1].options.length; z++) {
                  if (data[data[data[0].options[k].nextQ - 1].options[z].nextQ - 1].options.some(option => option.destinationType == 'number')) {
                    for (var a = 0; a < data[data[data[0].options[k].nextQ - 1].options[z].nextQ - 1].options.length; a++) {
                      let x = data[data[0].options[k].nextQ - 1].options[z].nextQ - 1;
                      destination = data[x].options[a].destinationType;
                      if (destination == 'number') {
                        self.showQuestion(false);
                        self.currQ(self.metadata().questions[data[data[0].options[k].nextQ - 1].options[z].nextQ - 1]);
                        self.showStartOver(true);
                        let panel = document.getElementById("fq-option-" + a);
                        if (!panel.classList.contains("mfe-fq-option-disabled")) {
                          let extra = panel.getElementsByClassName("fq-option-content")[0];
                          let initHeight = getComputedStyle(panel)["height"];

                          extra.style.display = "block";
                          AnimationUtils["expand"](panel, {
                            startMaxHeight: initHeight
                          }).then(() => {
                            panel.classList.add("expandclass");
                          });
                        }
                          if (document.getElementById("languageselection")) {
                            let lang = document.getElementById("languageselection");
                            let srlink = document.getElementById("la8");
                            lang.style.display = "none";
                            srlink.style.display = "none";
                          }
                          break outerloop;                        
                      }
                    }
                  }
                }
                if (!self.currQ()) {
                  self.showQuestion(false);
                  let x = data[data[0].options[k].nextQ - 1].options[0].nextQ - 1;
                  self.currQ(self.metadata().questions[data[data[0].options[k].nextQ - 1].options[0].nextQ - 1]);
                  self.showStartOver(true);
                  if (document.getElementById("languageselection")) {
                    let lang = document.getElementById("languageselection");
                    let srlink = document.getElementById("la8");
                    lang.style.display = "none";
                    srlink.style.display = "none";
                  }
                }
              }
            }
            break;
          }
        }
      }
    }

    if (propertyChangedContext.property == 'timezone' && propertyChangedContext.updatedFrom == 'external') {
      self.timezone(propertyChangedContext.value);
    }
  };

  // MfeFlowQuestComponentModel.prototype.disconnected = function(element){
  // };

  return FlexisupportComponentModel;
});