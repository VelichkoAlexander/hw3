'use strict';
(function () {
    var app = {
        initialize: function () {
            this.modules();
            this.setUpListeners();
            this.dragObj();
            this.Slider();

        },
        modules: function () {

        },
        setUpListeners: function () {
            $('#fileupload1').on('click', app.fileUpload);
            $('#fileupload2').on('click', app.fileUpload);



        },


        fileUpload: function (e) {
            var selector = $(this);
            var Id = this.id;
            console.log(Id);
            if (Id === 'fileupload1') {
                console.log(Id);

                $('#'+Id).fileupload({
                    dataType: 'json',
                    disableImageResize: false,
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                    maxFileSize: 500000,
                    imageMaxWidth: 649,
                    imageMaxHeight: 532,
                    imageCrop: true, // Force cropped images
                    done: function (e, data) {
                        console.log(data.result);
                        $.each(data.result.files, function (index, file) {
                            console.log(file.url);
                            $('.one').css({'background-image': 'url(' + file.url + ')'});
                        });
                    }
                })
            } else if (Id = 'fileupload2') {
                console.log(Id);
                $('#'+Id).fileupload({
                    dataType: 'json',
                    disableImageResize: false,
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                    maxFileSize: 500000,
                    // imageMaxWidth: 100,
                    // imageMaxHeight: 100,
                    // imageCrop: true, // Force cropped images
                    done: function (e, data) {
                        console.log(data.result);
                        $.each(data.result.files, function (index, file) {
                            $('#two').html('<img  src="' + file.url + '"/>');
                        });
                    }
                });
            }


        },
        dragObj: function(){
            console.log("opppp");
            $("#two").draggable({
                containment: "parent"
            });
        },
        Slider: function(){
            $( "#slider" ).slider({
                value:0.5,
                min: 0,
                max: 1,
                step: 0.01,
                slide: function( event, ui ) {
                    $( "#amount" ).val( "opacity" + ui.value );
                    $("#two").css('opacity',ui.value);
                }
            });
            $( "#amount" ).val( "opacity" + $( "#slider" ).slider( "value" ) );
        }
    };

    app.initialize();
}());

