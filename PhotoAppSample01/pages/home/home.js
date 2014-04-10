(function () {
    "use strict";

    var photoObject = {
        src: null,
        displayName: null,
        name: null,
        path: null,
        dateCreated: null
    };

    var homePage = WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            document.getElementById("getPhotoButton").addEventListener("click", this.getPhotoButtonClickHandler, false);
        },

        getPhotoButtonClickHandler: function (eventInfo) {
            var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
            openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
            openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;

            openPicker.fileTypeFilter.clear();
            openPicker.fileTypeFilter.append(".bmp");
            openPicker.fileTypeFilter.append(".png");
            openPicker.fileTypeFilter.append(".jpeg");
            openPicker.fileTypeFilter.append(".jpg");

            openPicker.pickSingleFileAsync().done(
                homepage.prototype.loadImage,
                homepage.prototype.displayError
                );
        },

        loadImage: function (file) {
            if (file) {
                photoObject.displayName = file.displayName;
                photoObject.name = file.name;
                photoObject.path = file.path;
                photoObject.dateCreated = file.dateCreated;

                var imageBlob = URL.createObjectURL(file, { oneTimeOnly: true });
                photoObject.src = imageBlob;
            }
        },

        displayError: function (error) {
            document.getElementById("imageName").innerHTML = "Unable to load image!";
        }
    });
})();
