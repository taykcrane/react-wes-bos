import React from "react";
import { formatPrice } from "../helpers.js";

class Fish extends React.Component {
	
	render () {
		
		const details = this.props.details;
		const isAvailable = details.status === "available";
		const buttonText = isAvailable ? "Add to Order" : "Sold Out!";

		return (
			<li className="menu-fish">
				<img src={details.image} alt={details.name}/>
				<h3 className="fish-name">
					{details.name}
					<span className="price">{formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button disabled={!isAvailable} onClick={ (event) => {
					return this.props.addToOrder(this.props.index)
				}}>
					{ buttonText}
				</button>
			</li>
		)
	}
}

Fish.propTypes = {
	details: React.PropTypes.object.isRequired,
	index: React.PropTypes.string.isRequired,
	addToOrder: React.PropTypes.func.isRequired
}

export default Fish;