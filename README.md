# Bootstrap Utils

Bootstrap Utils is a JavaScript library designed to provide useful utility functions for Bootstrap 5. The library includes a set of functions that can help you create and manage modals easily. The library is compatible with Bootstrap 5, and it provides full support for different modal sizes and drag-and-drop functionality.

## Features

- Create modals easily with custom content and buttons.
- Define the behavior of buttons in modals.
- Full support for different modal sizes.
- Drag-and-drop functionality for modals.

## Installation

You can include the script in your HTML file:

```html
<script src="bootstrap.utils.js"></script>
```

## Usage

To use Bootstrap Utils, you need to include it in your JavaScript file:

You can then use the createModal function to create modals:

```javascript
import bsUtils from 'bootstrap-utils';
```

```javascript
bsUtils.createModal({
    title: 'Modal title',
    body: '<p>Modal body...</p>',
    size: 'modal-lg',
    draggable: true,
    disableCloseOutside: true,
    showCloseButton: true,
    hideCallback: (api) => {
        // Function to be called when the modal is hidden
        // The `api` parameter contains information about the modal instance
        // Add custom logic here
    },
    showCallback: (api) => {
        // Function to be called when the modal is shown
        // The `api` parameter contains information about the modal instance
        // Add custom logic here
    },
    buttons: {
        edit: (event, api) => {
            // The `event` parameter contains information about the click event
            // The `api` parameter contains information about the modal instance
            // Add custom logic here
        },
        save: (event, api) => {
            // Add custom logic here
        },
        delete: (event, api) => {
            // Add custom logic here
        },
        close: (event, api) => {
            // Add custom logic here
        }
    }
});
```

This example creates a modal with the following options:

- `title`: Sets the title of the modal to "Update record".
- `body`: Sets the content of the modal to a simple paragraph.
- `size`: Sets the size of the modal to "modal-lg".
- `draggable`: Enables drag-and-drop functionality for the modal.
- `disableCloseOutside`: Disables the ability to close the modal by clicking outside the modal content.
- `showCloseButton`: Displays the close button in the top-right corner of the modal.
- `hideCallback`: Defines a function to be called when the modal is hidden.
- `showCallback`: Defines a function to be called when the modal is shown.
- `buttons`: Defines the behavior of the modal's buttons (edit, save, delete, close) when they are clicked. The functions in this object receive the event object and the modal API object as parameters, which can be used to manipulate the modal content or perform other actions. In this example, each function simply logs a message to the console.

## Compatibility

Bootstrap Utils is compatible with Bootstrap 4.6 >. The library includes a compabilityTest function that checks the compatibility of the current version of Bootstrap with the library. 

## License

Bootstrap Utils is licensed under the GNU General Public License v3.0. See the LICENSE file for more information.
