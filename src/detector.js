/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */
// see https://github.com/mrdoob/three.js/blob/master/examples/js/Detector.js
const Detector = {
    canvas: !!window.CanvasRenderingContext2D,
    webgl: (function () {
        try {
            let canvas = document.createElement('canvas');
            return !!(
                window.WebGLRenderingContext
                && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
            );
        } catch (e) {
            return false;
        }
    })(),
    webgl2: (function () {
        try {
            let canvas = document.createElement('canvas');
            return !!(
                window.WebGL2RenderingContext
                && (canvas.getContext('webgl2'))
            );
        } catch (e) {
            return false;
        }
    })(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,

    getWebGLErrorMessage: function () {

        let element = document.createElement('div');
        element.id = 'webgl-error-message';
        element.style.fontFamily = 'monospace';
        element.style.fontSize = '13px';
        element.style.fontWeight = 'normal';
        element.style.textAlign = 'center';
        element.style.background = '#fff';
        element.style.color = '#000';
        element.style.padding = '1.5em';
        element.style.width = '400px';
        element.style.margin = '5em auto 0';

        if (!this.webgl) {

            element.innerHTML = window.WebGLRenderingContext ? [
                'Your graphics card does not seem to support ' +
                '<a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>' +
                '.<br />',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
            ].join('\n') : [
                'Your browser does not seem to support ' +
                '<a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>' +
                '.<br/>',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
            ].join('\n');
        }

        return element;
    }
};

export default Detector;