!function(t){function i(i,a){this.settings=t.extend(!0,r,a),this.$context=i,this.domAudio=this.$context.find("audio")[0],this.$domPlaylist=this.$context.find(".jAudio--playlist"),this.$domControls=this.$context.find(".jAudio--controls"),this.$domVolumeBar=this.$context.find(".jAudio--volume"),this.$domDetails=this.$context.find(".jAudio--details"),this.$domStatusBar=this.$context.find(".jAudio--status-bar"),this.$domProgressBar=this.$context.find(".jAudio--progress-bar-wrapper"),this.$domTime=this.$context.find(".jAudio--time"),this.$domElapsedTime=this.$context.find(".jAudio--time-elapsed"),this.$domTotalTime=this.$context.find(".jAudio--time-total"),this.$domThumb=this.$context.find(".jAudio--thumb"),this.currentState="pause",this.currentTrack=this.settings.defaultTrack,this.timer=void 0,this.init()}function a(t,i){for(var t=String(t);t.length<i;)t="0"+t;return t}var e="jAudio",r={playlist:[],defaultAlbum:void 0,defaultArtist:void 0,defaultTrack:0,autoPlay:!1,debug:!1};i.prototype={init:function(){var t=this;t.renderPlaylist(),t.preLoadTrack(),t.highlightTrack(),t.updateTotalTime(),t.events(),t.debug(),t.domAudio.volume=.2},play:function(){var t=this,i=t.$domControls.find("#btn-play");t.currentState="play",t.domAudio.play(),clearInterval(t.timer),t.timer=setInterval(t.run.bind(t),50),i.data("action","pause"),i.attr("id","btn-pause"),i.toggleClass("active")},pause:function(){var t=this,i=t.$domControls.find("#btn-pause");t.domAudio.pause(),clearInterval(t.timer),t.currentState="pause",i.data("action","play"),i.attr("id","btn-play"),i.toggleClass("active")},stop:function(){var t=this;t.domAudio.pause(),t.domAudio.currentTime=0,t.animateProgressBarPosition(),clearInterval(t.timer),t.updateElapsedTime(),t.currentState="stop"},prev:function(){var t,i=this;t=0===i.currentTrack?i.settings.playlist.length-1:i.currentTrack-1,i.changeTrack(t)},next:function(){var t,i=this;t=i.currentTrack===i.settings.playlist.length-1?0:i.currentTrack+1,i.changeTrack(t)},preLoadTrack:function(){var t=this;t.changeTrack(t.settings.defaultTrack),t.settings.autoPlay&&t.play()},changeTrack:function(t){var i=this;i.currentTrack=t,i.domAudio.src=i.settings.playlist[t].file,i.highlightTrack(),i.updateThumb(),i.renderDetails(),"play"===i.currentState&&i.play()},events:function(){var i=this;i.$domControls.on("click","button",function(){var a=t(this).data("action");switch(a){case"prev":i.prev.call(i);break;case"next":i.next.call(i);break;case"pause":i.pause.call(i);break;case"stop":i.stop.call(i);break;case"play":i.play.call(i)}}),i.$domPlaylist.on("click",".jAudio--playlist-item",function(){var a=t(this),e=(a.data("track"),a.index());i.currentTrack!==e&&i.changeTrack(e)}),i.$domProgressBar.on("click",function(t){i.updateProgressBar(t),i.updateElapsedTime()}),t(i.domAudio).on("loadedmetadata",function(){i.animateProgressBarPosition.call(i),i.updateElapsedTime.call(i),i.updateTotalTime.call(i)})},getAudioSeconds:function(t){var t=t%60;return t=a(Math.floor(t),2),t=60>t?t:"00"},getAudioMinutes:function(t){var t=t/60;return t=a(Math.floor(t),2),t=60>t?t:"00"},highlightTrack:function(){var t=this,i=t.$domPlaylist.children(),a="active";i.removeClass(a),i.eq(t.currentTrack).addClass(a)},renderDetails:function(){var t=this,i=t.settings.playlist[t.currentTrack],a=(i.file,i.thumb,i.trackName),e=i.trackArtist,r=(i.trackAlbum,"");r+="<p>",r+="<span>"+a+"</span>",r+="<span>"+e+"</span>",r+="</p>",t.$domDetails.html(r)},renderPlaylist:function(){var i=this,a="";t.each(i.settings.playlist,function(t,i){{var e=i.file,r=i.thumb,o=i.trackName,s=i.trackArtist;i.trackAlbum}trackDuration="00:00",a+="<div class='jAudio--playlist-item' data-track='"+e+"'>",a+="<div class='jAudio--playlist-thumb'><img src='"+r+"'></div>",a+="<div class='jAudio--playlist-meta-text'>",a+="<h4>"+o+"</h4>",a+="<p>"+s+"</p>",a+="</div>",a+="</div>"}),i.$domPlaylist.html(a)},run:function(){var t=this;t.animateProgressBarPosition(),t.updateElapsedTime(),t.domAudio.ended&&t.next()},animateProgressBarPosition:function(){var t=this,i=100*t.domAudio.currentTime/t.domAudio.duration+"%",a={width:i};t.$domProgressBar.children().eq(0).css(a)},updateProgressBar:function(t){var i,a,e,r=this;t.offsetX&&(i=t.offsetX),void 0===i&&t.layerX&&(i=t.layerX),a=i/r.$domProgressBar.width(),e=r.domAudio.duration*a,r.domAudio.currentTime=e,r.animateProgressBarPosition()},updateElapsedTime:function(){var t=this,i=t.domAudio.currentTime,a=t.getAudioMinutes(i),e=t.getAudioSeconds(i),r=a+":"+e;t.$domElapsedTime.text(r)},updateTotalTime:function(){var t=this,i=t.domAudio.duration,a=t.getAudioMinutes(i),e=t.getAudioSeconds(i),r=a+":"+e;t.$domTotalTime.text(r)},updateThumb:function(){var t=this,i=t.settings.playlist[t.currentTrack].thumb,a={"background-image":"url("+i+")"};t.$domThumb.css(a)},debug:function(){var t=this;t.settings.debug&&console.log(t)}},t.fn[e]=function(a){var e=function(){return new i(t(this),a)};t(this).each(e)}}(jQuery);

// initialize
(function(){
    
    var mediaDir = "";
    
    $("#player").jAudio({
        playlist: [{
                file: mediaDir + "songs/01.mp3",
                thumb: mediaDir + "img/01.jpg",
                trackName: "Dusk",
                trackArtist: "Tobu & Syndec",
                trackAlbum: "Single"
        }, {
                file: mediaDir + "songs/02.mp3",
                thumb: mediaDir + "img/02.jpg",
                trackName: "Blank",
                trackArtist: "Disfigure",
                trackAlbum: "Single"
        }, {
                file: mediaDir + "songs/03.mp3",
                thumb: mediaDir + "img/03.jpg",
                trackName: "Fade",
                trackArtist: "Alan Walker",
                trackAlbum: "Single"
        }]
    });
    
}());
