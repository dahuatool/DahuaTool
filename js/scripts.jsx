// Really a JS file, no ts here, extension .ts used due to system limitations
// Global text from main textarea
var mainText = document.getElementById("mainText");

// Global string defaultHash, stores hash in its original form
// fieldName:[templateText,isMandatory,value]
// Application default status
const defaultHash = {
    "inputProblem": ["Problem", true, ""],
    "inputModel": ["Device Model", true, ""],
    "inputSerial": ["SN", true, ""],
    "inputDistributor": ["Distributor", true, ""],
    "inputFirmware": ["Firmware", false, ""],
    "selectFirst": ["\n- First time happening?", false, ""],
    "selectBefore": ["- Was it working before?", false, ""],
    "inputFrequency": ["- How often does it happen and under what conditions?", false, ""],
    "inputError": ["- Error", false, ""],
    "inputSoftware": ["- App/Software used", false, ""],
    "selectWhere": ["- Problem happens on", false, ""],
    "selectWhere2": ["", false, ""],
    "selectCompatible": ["- Units are compatible)", false, ""],
    "inputTx": ["\nTroubleshooting", true, ""],
    "inputMissing": ["\nMissing Steps", false, ""]
};

// Global string formHash, copies defaultHash
var formHash = JSON.parse(JSON.stringify(defaultHash));

// Global current date in the required format
var d = new Date();
var currentDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();


function setName(element) {
    localStorage.setItem("wizardName", element.textContent);

    document.getElementById("dropdownWizard").textContent = element.textContent;
    updateTextarea(document.getElementById("inputProblem"));
}

// updateTextarea(): When a user types in the fields, textarea gets updated automatically
function updateTextarea(element) {
    var str = document.getElementById("dropdownWizard").innerHTML + " - " + currentDate + "\n\n";
    // update hash with the new info, reset if needed
    if (element == "reset")
        formHash = JSON.parse(JSON.stringify(defaultHash));
    else
        formHash[element.id][2] = element.value;

    // create and output string from hash
    for (var i in formHash) {
        // if its empty or na and optional
        if ((formHash[i][2] == "" || formHash[i][2] == "na") && !formHash[i][1]) {
            str += "";
            // special case for the "happens where" fields
        } else if ((i == "selectWhere" || i == "selectWhere2") && formHash["selectWhere2"][2] != "na") {
            if (i == "selectWhere2") {
                ;
            } else {
                str += formHash[i][0] + ": " + formHash[i][2] + ", " + formHash["selectWhere2"][2] + "\n";
            }
            // need additional return carriages for the troubleshoot field only
        } else if (i == "inputTx") {
            str += formHash[i][0] + ": \n\n" + formHash[i][2] + "\n";
        } else if (i == "inputModel" || i == "inputSerial") {
            str += formHash[i][0] + ": " + formHash[i][2].toUpperCase() + "\n";
        } else {
            str += formHash[i][0] + ": " + formHash[i][2] + "\n";
        }
    }
    mainText.value = str;
}

function loadStorage() {
    if (localStorage.wizardName) {
        document.getElementById("dropdownWizard").innerHTML = localStorage.wizardName;
    }
}

function formReset() {
    document.getElementById("dataForm").reset();
    updateTextarea("reset");
}

function copyTextArea() {
    mainText.select();
    document.execCommand("copy");
}

function switchCase(obj) {
    obj.value = obj.value.toUpperCase()
}

// Templates. Todo: 1 function for all templates

// Password Reset
function passwordReset() {
    var templateText = JSON.parse(JSON.stringify(defaultHash));
    templateText.inputProblem[0, 2] = "Password Reset";
    templateText.inputTx[0, 2] = "Date on the screen is <INSERT DATE HERE>.\nSent email with the passwords and asked to follow the instructions on the email.";

    for (var k in templateText) {
        document.getElementById(k).value = templateText[k][2];
    }

    updateTextarea(document.getElementById("inputProblem"));
    updateTextarea(document.getElementById("inputTx"));
}

// Remote connection setup
function P2PSetup(interface) {
    var templateText = JSON.parse(JSON.stringify(defaultHash));
    templateText.inputProblem[0, 2] = "P2P connection setup";
    if (interface == "Blue") {
        templateText.inputTx[0, 2] = "On the Unit: Main Menu > Network (Setting) > P2P and enabled P2P. Click OK.\r" +
            "Status 'Not Connected'.\r" +
            "Main Menu > Network (Setting) > TCP/IP > Edit (Pencil) Ethernet Port 1 and enable DHCP. Click OK.\r" +
            "Enable DHCP again. Click Apply.\r" +
            "Main Menu > Shut Down > Restart to reboot the unit.\r" +
            "Main Menu > Network (Setting) > P2P.\r" +
            "Status: 'Connect Success'.\r" +
            "On the Phone/Tablet: Open iDMSS/gDMSS.\r" +
            "Click on the Three lines on the top left.\r" +
            "Device Manager > Add > Camera > Wired Device > P2P.\r" +
            "Fill the information on Screen.\r" +
            "Click 'Start Live Preview'.\r";
    } else {
        templateText.inputTx[0, 2] = "On the unit: Main Menu > P2P > Enable > Apply.\r" +
            "P2P Status: 'Offline'.\r" +
            "Main Menu > Network > TCP > Enable DHCP > Apply.\r" +
            "Top Right Icon > Reboot.\r" +
            "Main Menu > P2P > P2P Status: 'Online'.\r" +
            "On the Phone/Tablet Open iDMSS/gDMSS.\r" +
            "Click on the Three lines on the top left.\r" +
            "Device Manager > Add > Camera > Wired Device > P2P.\r" +
            "Fill the information on screen. Click 'Start Live Preview'.\r";
    }

    for (var k in templateText) {
        document.getElementById(k).value = templateText[k][2];
    }

    updateTextarea(document.getElementById("inputProblem"));
    updateTextarea(document.getElementById("inputTx"));
}

// Motion Setup
function motionRecording(interface) {
    var templateText = JSON.parse(JSON.stringify(defaultHash));
    templateText.inputProblem[0, 2] = "Motion recording setup";
    if (interface == "Blue") {
        templateText.inputTx[0, 2] = "Main Menu > Event under Settings > Video Detect > Motion Detect > Enable.\r" +
            "Enable Record Channel. Channel is the same as the camera channel.\r" +
            "Main Menu > Storage > Schedule > Hit Motion/MD > Hit All > Draw motion lines over the timeline.\r" +
            "Main Menu > Storage > Record > Cameras are on Auto for the Main Stream\r";
    } else {
        templateText.inputTx[0, 2] = "Main Menu > Management > Camera > Video Detect > Motion Detect > Enable MD\r" +
            "Enable Record Channel. Channel is the same as the camera channel.\r" +
            "Main Menu > Management > Storage > Schedule > Hit Motion/MD > Hit All > Draw motion lines over the timeline.\r" +
            "Main Menu > Storage > Record > Cameras are on Auto for the Main Stream";
    }

    for (var k in templateText) {
        document.getElementById(k).value = templateText[k][2];
    }

    updateTextarea(document.getElementById("inputProblem"));
    updateTextarea(document.getElementById("inputTx"));
}

// Keyboard Shortcuts
function doc_keyUp(e) {
    // alt+r
    if (e.altKey && e.keyCode == 82) {
        $(document).ready(function () {
            $("#resetModal").modal();
        });
    }
    // alt+g
    if (e.altKey && e.keyCode == 71) {
        copyTextArea();
    }
}
document.addEventListener('keyup', doc_keyUp, false);    