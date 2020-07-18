class Contextify {
	static positions = {
		TOP_LEFT: 1,
		TOP_RIGHT: 2,
		BOTTOM_LEFT: 3,
		BOTTOM_RIGHT: 4
	}
	constructor(_items, _props){
		this.items = _items;
		this.domMenu = document.createElement('div');
		if (_props){
			this.props = _props; // className: dark, or idk man
			Object.assign(this.domMenu, _props);
		}
		this.domMenu.classList.add('contextify');
		this._createItems();
	}

	show(referenceElement, relativePosition = this.positions.BOTTOM_RIGHT){
		return new Promise((resolve, reject) => {
			if (typeof referenceElement === "string") {
				referenceElement = document.querySelector(referenceElement);
			}
			let referenceElementRect = referenceElement.getBoundingClientRect();
			let menuRect = this.domMenu.getBoundingClientRect();
			let leftOffset = 0;
			let topOffset = 0;
			switch (relativePosition) {
				case this.positions.TOP_LEFT:
					leftOffset = referenceElementRect.left - menuRect.width;
					topOffset = referenceElementRect.top - menuRect.height;
					break;
				case this.positions.TOP_RIGHT:
					leftOffset = referenceElementRect.left + referenceElementRect.width;
					topOffset = referenceElementRect.top - menuRect.height;
					break;
				case this.positions.BOTTOM_LEFT:
					leftOffset = referenceElementRect.let - menuRect.width;
					topOffset = referenceElementRect.top + referenceElementRect.height;
					break;
				case this.positions.BOTTOM_RIGHT:
					leftOffset = referenceElementRect.left + referenceElementRect.width;
					topOffset = referenceElementRect.top + referenceElementRect.height;
					break;
				default:
					// fa q!
					break;
			};
			this.domMenu.style.left = leftOffset+"px";
			this.domMenu.style.top = topOffset+"px";
			let menuInstance = document.body.appendChild(this.domMenu);

			window.addEventListener("click", function selectHandler(e){
				window.removeEventListener("click", selectHandler);
				if (e.target.closest('.contextify') != menuInstance){
					document.body.removeChild(menuInstance);
					reject("clicked outside context menu");
				}else{
					let selectedItem = e.target.closest('.contextify_item');
					if (selectedItem) {
						let selectedItemIndex = Array.from(menuInstance.childNodes).indexOf(selectedItem);
						let data = {
							index: selectedItemIndex,
							itemInstance: selectedItem,
							value: selectedItem.innerText
						}
						document.body.removeChild(menuInstance);
						resolve(data);
					}else{
						document.body.removeChild(menuInstance);
						reject("no item match");
					}
				}
			})
		});
	}

	_createItems(){
		for(let i = 0; i < this.items.length; i++){
			let item = this.items[i];
			let domItem = this._createElement('div', item);
			this.domMenu.appendChild(domItem);
		}
	}

	_createElement(type, content){
		let domItem = document.createElement(type);
		domItem.classList.add('contextify_item');
		if (typeof content === "string") {
				domItem.appendChild(document.createTextNode(content));
			}else{
				content.appendChild(content);
			}
		return domItem;
	}
}