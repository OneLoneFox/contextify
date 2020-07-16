class Contextify {
	constructor(_items, _props){
		this.positions = {
			TOP_LEFT: 1,
			TOP_RIGHT: 2,
			BOTTOM_LEFT: 3,
			BOTTOM_RIGHT: 4
		}
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
					topOffset = referenceElement.top + referenceElementRect.height;
					break;
				case this.positions.BOTTOM_RIGHT:
					leftOffset = referenceElementRect.left + referenceElementRect.width;
					topOffset = referenceElement.top + referenceElementRect.height;
				default:
					// fa q!
					break;
			};
			this.domMenu.style.left = leftOffset+"px";
			console.log(leftOffset, this.domMenu.style.left);
			this.domMenu.style.top = topOffset+"px";
			console.log(topOffset, this.domMenu.style.top);
			document.body.appendChild(this.domMenu);

			window.addEventListener("click", function selectHandler(e){
				if (e.target.closest('.contextify') != this.domMenu) {
					resolve(-1);
					//reject("clicked outside context menu");
				}else{
					window.removeEventListener("click", selectHandler);
					let selectedItem = e.target.closest('.contextify_item');
					if (selectedItem) {
						document.body.removeChild(this.domMenu);
						resolve(selectedItem.innerText);
					}else{
						resolve(-1);
						//reject("no item match");
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