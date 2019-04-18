function Controller(numFrames, divId) {
    var that = this;
    that.phase = 0;
    that.frame = 0;
    that.numFrames = numFrames;
    that.divId = divId;
    that.cubeGeometry = new THREE.BoxGeometry(numFrames,numFrames,numFrames);
    that.videoFPS = 30;
    that.myVideo = document.getElementById('video1');


    that.animate = function(cubeMesh, planeMesh, uniforms) {
        that.frame++;
        if (that.frame%400 == 0) {
            that.phase++;
            that.frame = 0;
            that.resetCubeSize(cubeMesh);
            if (that.phase%3==0) {
                that.phase = 0;
            }
            that.updateVideo();
        }
        else {

            that.adjustCubeSize(cubeMesh);
            that.adjustPlanePosition(planeMesh);
        }
        document.getElementById(that.divId).innerText =
            that.phase + ", "
            + that.frame + ", "
            + that.myVideo.webkitDecodedFrameCount + ","
            + (30*that.myVideo.currentTime).toFixed(0);
        uniforms.u_phase.value = that.phase;
        uniforms.u_progress.value = that.frame/that.numFrames;
        uniforms.u_phase.needsUpdate = true;
        uniforms.u_progress.needsUpdate = true;
    }
    that.updateVideo = function() {
        if (that.phase == 0)
            pathToTexture = 'media/outputT.mp4';
        else if (that.phase == 1)
            pathToTexture = 'media/outputY.mp4';
        else
            pathToTexture = 'media/outputX.mp4';
        that.myVideo.pause();
        that.myVideo.setAttribute('src', pathToTexture);
        that.myVideo.play();
    }
    that.resetCubeSize = function(mesh) {
        mesh.scale.set( 1.0, 1.0, 1.0);
    }
    that.adjustCubeSize = function(mesh) {
        var scaleFactor = (that.numFrames - that.frame)/that.numFrames;
        var offset = ( that.frame)/2.0;
        scaleFactorX = that.phase == 2 ?  scaleFactor : 1.0;
        scaleFactorY = that.phase == 1 ?  scaleFactor : 1.0;
        scaleFactorZ = that.phase == 0 ?  scaleFactor : 1.0;
        mesh.scale.set( scaleFactorX, scaleFactorY, scaleFactorZ );
        mesh.position.set(
        that.phase == 2 ?  -offset : 1.0,
        that.phase == 1 ?  -offset : 1.0,
        that.phase == 0 ?  -offset : 1.0
        );
    }
    that.adjustPlanePosition = function(mesh) {
        if (that.phase == 0) {
            mesh.rotation.set(0, 0, 0);
            mesh.position.set(0,0,201-that.frame);
        }
        else if (that.phase == 1) {
            mesh.rotation.set(-Math.PI/2, 0, Math.PI/2.0);
            mesh.position.set(0,201-that.frame,0);
        }
        else {
            mesh.rotation.set(0, Math.PI / 2, 0);
            mesh.position.set(201-that.frame,0,0);
        }
    }
}
