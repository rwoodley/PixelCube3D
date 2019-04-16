function Controller(numFrames, divId) {
    var that = this;
    that.phase = 0;
    that.frame = 0;
    that.numFrames = numFrames;
    that.divId = divId;
    that.cubeGeometry = new THREE.BoxGeometry(numFrames,numFrames,numFrames);
    that.animate = function(mesh) {
        that.frame++;
        if (that.frame%400 == 0) {
            that.phase++;
            that.frame = 0;
            that.resetSize(mesh);
            if (that.phase%3==0) {
                that.phase = 0;
            }
        }
        else
            that.adjustSize(mesh);
        document.getElementById(that.divId).innerText = that.phase + ", " + that.frame;
    }
    that.resetSize = function(mesh) {
        mesh.scale.set( 1.0, 1.0, 1.0);
    }
    that.adjustSize = function(mesh) {
        var scaleFactor = (that.numFrames - that.frame)/that.numFrames;
        scaleFactorX = that.phase == 0 ?  scaleFactor : 1.0;
        scaleFactorY = that.phase == 1 ?  scaleFactor : 1.0;
        scaleFactorZ = that.phase == 2 ?  scaleFactor : 1.0;
        mesh.scale.set( scaleFactorX, scaleFactorY, scaleFactorZ );
    }
}
