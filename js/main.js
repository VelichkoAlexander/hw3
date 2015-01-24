'use strict';
(function () {
    var app = {
        initialize: function () {
            this.modules();
            this.setUpListeners();
            this.dragObj();
            this.Slider();
            this.Spinner();

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

                $('#' + Id).fileupload({
                    dataType: 'json',
                    disableImageResize: false,
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                    maxFileSize: 500000,
                    imageMaxWidth: 649,
                    imageMaxHeight: 532,
                    //imageCrop: true,
                    imageForceResize: true,// Force cropped images
                    done: function (e, data) {
                        console.log(data.result);
                        $.each(data.result.files, function (index, file) {
                            console.log(file.url);
                            //$('.one').css({'background-image': 'url(' + file.url + ')'});
                            $('.one').html('<img  src="' + file.url + '"/>');
                        });
                    }
                })
            } else if (Id = 'fileupload2') {
                console.log(Id);
                $('#' + Id).fileupload({
                    dataType: 'json',
                    disableImageResize: false,
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                    maxFileSize: 500000,
                    imageMaxWidth: 216,
                    imageMaxHeight: 223,
                    imageForceResize: true, // Force cropped images
                    done: function (e, data) {
                        console.log(data.result);
                        $.each(data.result.files, function (index, file) {
                            $('#two').html('<img  src="' + file.url + '"/>');
                        });
                    }
                });
            }


        },
        dragObj: function () {

            $("#two").draggable({
                containment: "parent",
                drag: function () {
                    var offset = $(this).offset();
                    var xPos = offset.left;
                    var yPos = offset.top;
                    $('#pos_x').val(xPos);
                    $('#pos_y').val(yPos);

                }
            });
        },
        Slider: function () {
            $("#slider").slider({
                value: 0.5,
                min: 0,
                max: 1,
                step: 0.01,
                slide: function (event, ui) {
                    $("#amount").val("opacity" + ui.value);
                    $("#two").css('opacity', ui.value);
                }
            });
            $("#amount").val("opacity" + $("#slider").slider("value"));
        },
        Spinner: function () {
            $("#pos_x, #pos_y").spinner({
                step: 1,
                min: 0,
                change: update_position,
                stop: update_position
            });
            function update_position() {
                $("#two").css('left', '' + $("#pos_x").spinner("value") + 'px');
                $("#two").css('top', '' + $("#pos_y").spinner("value") + 'px');
            }

        }
    };

    app.initialize();
}());

