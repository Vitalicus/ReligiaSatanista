var screenOrientation = {},
    Orientations = [
        'portrait-primary',
        'portrait-secondary',
        'landscape-primary',
        'landscape-secondary',
        'portrait',
        'landscape'
    ];

screenOrientation.Orientations = Orientations;
screenOrientation.currOrientation = 'unlocked';

screenOrientation.setOrientation = function(orientation) {
    console.log('setOrientation not supported on device');
};

function addScreenOrientationApi(obj) {
    if (obj.unlockOrientation || obj.lockOrientation) {
        return;
    }

    obj.lockOrientation = function(orientation) {
        if (Orientations.indexOf(orientation) == -1) {
            console.log('INVALID ORIENTATION', orientation);
            return;
        }
        screenOrientation.currOrientation = orientation;
        screenOrientation.setOrientation(orientation);
    };

    obj.unlockOrientation = function() {
        screenOrientation.currOrientation = 'unlocked';
        screenOrientation.setOrientation('unlocked');
    };
}

addScreenOrientationApi(screen);
orientationChange();

function orientationChange() {
    var orientation;

    switch (window.orientation) {
        case 0:
             orientation = 'portrait-primary';
             break;
        case 90:
            orientation = 'landscape-secondary';
            break;
        case 180:
            orientation = 'portrait-secondary';
            break;
        case -90:
            orientation = 'landscape-primary';
            break;
        default:
            orientation = 'unknown';
    }

    screen.orientation = orientation;
}

window.addEventListener("orientationchange", orientationChange, true);

module.exports = screenOrientation;