function add_attr(e,att_name,att_val) {
  var att = document.createAttribute(att_name);       // Create a "class" attribute
  att.value = att_val;               // Set the value of the attribute
  e.setAttributeNode(att);
}
function add_icons(icons_str,label,midden) {
  //console.log(icons_str);
  if (icons_str!="hidden,hidden") {
    var icons = icons_str.split(",");
    if (icons[0]!="hidden") {
      var span = document.createElement("span");
      add_attr(span,"id","icon-l");
      add_attr(span,"class","icon-dato-"+icons[0]);
      label.appendChild(span);
    }
    label.appendChild(midden);
    if (icons[1]!="hidden") {
      var span = document.createElement("span");
      add_attr(span,"id","icon-r");
      add_attr(span,"class","icon-dato-"+icons[1]);
      label.appendChild(span);
    }

  }else {
    label.appendChild(midden);
  }

}
function num_map( x,  in_min,  in_max,  out_min,  out_max){
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function toHex(d) {
  return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
}
function logKeys() {
    var s = 'Keys';
    for (var i = 0; i < midiNotes.length; i++) {
        s = s + ' ' + midiNotes[i].pitch;
    }
    evnt.innerHTML = s;
}
function print(event) {
    //console.log(event.data);
    var data = event.data;

    //console.log(cmd);
    //var timestamp=Date.now();
    var status = toHex(data[0]);
    if (data[1] == undefined) {
        var data1 = "--";
    } else {
        var data1 = toHex(data[1]);
    }
    if (data[2] == undefined) {
        var data2 = "--";
    } else {
        var data2 = toHex(data[2]);
    }
    var note = "---";
    var output = true;
    switch (status) {
    case "B0":
        var color = "color:blue";
        /*
      The Dato DUO sends the following CCâ€™s:
      MIDI CC 7 Volume
      MIDI CC 65 Glide 0 to 63 = Off, 64 to 127 = On
      MIDI CC 70 Pulse width
      MIDI CC 71 Filter Resonance
      MIDI CC 72 VCA Release Time
      MIDI CC 74 Filter cutoff
      MIDI CC 80 Delay 0 to 63 = Off, 64 to 127 = On
      MIDI CC 81 Crush 0 to 63 = Off, 64 to 127 = On
      MIDI CC 94 Detune amount

      It wonâ€™t respond to incoming CCâ€™s because internal controls are always nr.1
    */
        switch (data1) {
            //case "7B":

            //break;
        case "07":
            var event_msg = "Volume";
            break;
        case "41":
            var event_msg = "Glide ";
            //console.log(data[2]);
            if (data[2] >= 0 && data[2] <= 63) {
                event_msg = event_msg + "Off";
            } else if (data[2] >= 64 && data[2] <= 127) {
                event_msg = event_msg + "On";
            } else {
                event_msg = event_msg + "Nani!";
            }
            break;
        case "51":
            var event_msg = "Crush ";
            //console.log(data[2]);
            if (data[2] >= 0 && data[2] <= 63) {
                event_msg = event_msg + "Off";
            } else if (data[2] >= 64 && data[2] <= 127) {
                event_msg = event_msg + "On";
            } else {
                event_msg = event_msg + "Nani!";
            }
            break;
        case "50":
            var event_msg = "Delay ";
            //console.log(data[2]);
            if (data[2] >= 0 && data[2] <= 63) {
                event_msg = event_msg + "Off";
            } else if (data[2] >= 64 && data[2] <= 127) {
                event_msg = event_msg + "On";
            } else {
                event_msg = event_msg + "Nani!";
            }
            break;
        case "5E":
            var event_msg = "Detune Amount";
            break;
        case "46":
            var event_msg = "Pulse width / Wave";
            break;
        case "4A":
            var event_msg = "Filter cutoff / Freq";
            break;
        case "47":
            var event_msg = "Filter Resonance / Res";
            break;
        case "48":
            var event_msg = "VCA Release Time / Release";
            break;
        default:
            var event_msg = "Undefined Event " + data[1];
        }
        var event_msg = "CC: " + event_msg;
        break;
    case "F8":
        var output = false;
        var color = 'color:rgb(255,201,14);';
        var event_msg = "Timing Clock";
        break;
    case "FC":
        var color = 'color:rgb(255,201,14);';
        var event_msg = "Stop";
        break;
    case "FB":
        var color = 'color:rgb(255,201,14);';
        var event_msg = "Continue";
        break;
    case "90":
        if (data2 == "00") {
            var color = 'color:rgb(0,128,0);';
            var event_msg = "Note On&Off";
        } else {
            var color = 'color:rgb(6,255,6);';
            var event_msg = "Note On";
        }
        break;
    case "80":
        var color = 'color:rgb(0,128,0);';
        var event_msg = "Note Off";
        break;
    case "F0":
        var output = false;
        //window.version=data[3]+"."+data[4]+"."+data[5];
        console.log("Dato Duo firmware version:" + data[3] + "." + data[4] + "." + data[5]);
        break;
    default:
        var color = 'color:rgb(127,127,127);';
        var event_msg = "Undefined Event";
    }
    //var status = data[0] & 0xf0;
    // timestamp|status / type|Data1|Data2|note|Event
    // 0015BA0C|80|3A|00|1|Bb 3|Note Off
    if (output == true) {

        console.log("%c" + status + " " + data1 + " " + data2 + " " + note + " " + event_msg, color)
    }

}
var colors = [
    "#ffffff",
    "#FF0001",
    "#FFDD00",
    "#11FF00",
    "#0033DD",
    "#FF00FF",
    "#FF2209",
    "#99FF00",
    "#00EE22",
    "#0099CC",
    "#BB33BB",
    "#444444"+toHex(32),
    "#FF0001"+toHex(32),
    "#FFDD00"+toHex(32),
    "#11FF00"+toHex(32),
    "#0033DD"+toHex(32),
    "#FF00FF"+toHex(32),
    "#FF2209"+toHex(32),
    "#99FF00"+toHex(32),
    "#00EE22"+toHex(32),
    "#0099CC"+toHex(32),
    "#BB33BB"+toHex(32),
    "#444444"+toHex(150),
    "#FF0001"+toHex(150),
    "#FFDD00"+toHex(150),
    "#11FF00"+toHex(150),
    "#0033DD"+toHex(150),
    "#FF00FF"+toHex(150),
    "#FF2209"+toHex(150),
    "#99FF00"+toHex(150),
    "#00EE22"+toHex(150),
    "#0099CC"+toHex(150),
    "#BB33BB"+toHex(150),
    "rgba(230,255)",
    "rgba(230,255,32)",
    "rgba(230,255,150)"
  ];
function getColorsInLog() {
    for (var i = 0; i < colors.length; i++) {
        if (i < 10) {
            console.log("%c\t\t%c  " + i + " ", "background-color:" + getColor(i) + ";", "background-color:black;color:#ffffff;");
        } else {
            console.log("%c\t\t%c " + i + " ", "background-color:" + getColor(i) + ";", "background-color:black;color:#ffffff;");
        }

    }
}
function getColor(colorid) {

    if (typeof colors[colorid] == "undefined") {
        if (colorid != false) {
            console.warn("'" + colorid + "' is not falid colorid\nhere are the options:");
            getColorsInLog();
            console.warn("\tPlease fix it...");
            return "#ff00ff60";
        } else {
            return "grey";
        }

    } else {
        return colors[colorid];
    }
    //console.warn(typeof colors[colorid]);

}
