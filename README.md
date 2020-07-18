# Contextify
The simplest Vanilla JS context menu library

## Usage
```javascript
// create Contextify instance
var contextItems = ["Item 1", "Item 2", "Item 3"];
var context = new Contextify(contextItems);

/** 
 * .show(referenceElement, ?relativePosition) is a promise 
 * that resolves on item click and gets rejected
 * when clicking outside the menu or
 * outside an item (in the menu's padding for example)
 */
// referenceElement by element reference (bruh)
context.show(referenceElement).then((itemData) => {
  // do something
}).catch((err) => {
  // do something else if context menu is dismissed
});

```

## Methods
### ```show(referenceElement, ?relativePosition)```
#### Arguments:
```referenceElement```

The element to append the context menu to, can be a css selector or an element reference

```?relativePosition```

The position [TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT] to place the menu at relative to the referenceElement

Default: ```Contextify.positions.BOTTOM_RIGHT```
### On resolve:
Returns an object with the following properties
```javascript
{
  index: selectedItemIndex,
  itemInstance: selectedItemInstance,
  value: itemInnerText
}
```
