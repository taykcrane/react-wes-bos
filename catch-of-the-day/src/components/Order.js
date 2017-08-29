import React from "react";
import { formatPrice } from "../helpers.js";

class Order extends React.Component {
	
	constructor () {
		super();
		this.renderOrder = this.renderOrder.bind(this);
	}

	componentWillUpdate() {
		console.log("Order component updated!");
	}

	renderOrder (key) {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const removeButton = <button onClick={() => this.props.removeOrder(key)}>&times;</button>

		if (!fish || fish.status === "unavailable") {
			return <li key={key}>Sorry, { fish ? fish.name : "This fish"} is no longer available. {removeButton}</li>
		}
		return (
			<li key={key}>
				<span>{count} lbs {fish.name} {removeButton}</span>
				<span className="price">{formatPrice(count * fish.price)}</span>
			</li>
		)
	}

	render () {
		
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((prevTotal, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status === "available";
			if (isAvailable) {
				return prevTotal + (count * fish.price || 0)
			}
			return prevTotal;
		}, 0);

		return (
			<div className="order-wrap">
				<h2>Your Order</h2>
				<ul className="order">
					{ orderIds.map( (id) => this.renderOrder(id) ) }
					<li className="total">
						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
				</ul>
			</div>
		)
	}
}

export default Order;