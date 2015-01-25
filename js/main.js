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
            $('button').on('click', app.ChangePos);
            $('#download').on('click', app.DownloadPNG);


        },
        DownloadPNG: function () {
            var
                bigImg = $('.one img').attr('src'),
                littleImg = $('#two img').attr('src'),
                pos_x = $("#pos_x").spinner("value"),
                pos_y = $("#pos_y").spinner("value"),
                opacity = $("#slider").slider("value");
            console.log(bigImg, littleImg, pos_x, pos_y, opacity);


            $.ajax({
                url: 'server\php\watermark.php',
                type: 'POST',
                data: {bigimg: bigImg, stamp: littleImg, posX: pos_x, posY: pos_y, optic: opacity}
            })

                .done(function (msg) {
                    if (msg === "OK") {
                        console.log(msg);

                    } else {
                        console.log(msg);
                    }
                })
                .always(function () {

                    console.log(msg);
                })
        },
        ChangePos: function (e) {
            var
                button = $(this),
                posX = button.attr('attrX'),
                posY = button.attr('attrY');
            app.Update_Position(posX, posY);
            app.UpdateSpinner(posX, posY);
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
                    imageMaxWidth: 651,
                    imageMaxHeight: 534,
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
                    var position = $(this).position();
                    var xPos = position.left;
                    var yPos = position.top;
                    app.UpdateSpinner(xPos, yPos);
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
                change: app.Get_Position,
                stop: app.Get_Position
            })
        },
        Get_Position: function () {
            var
                pos_x = $("#pos_x").spinner("value"),
                pos_y = $("#pos_y").spinner("value");
            console.log(pos_x, pos_y);
            app.Update_Position(pos_x, pos_y);
        },
        Update_Position: function (pos_x, pos_y) {
            var
                watermark = $("#two");
            watermark.css('left', '' + pos_x + 'px');
            watermark.css('top', '' + pos_y + 'px');
        },
        UpdateSpinner: function (posX, posY) {
            $('#pos_x').val(posX);
            $('#pos_y').val(posY);
        }


    };

    app.initialize();
}());

