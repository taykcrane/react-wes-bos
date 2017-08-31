import React from "react";
import AddFishForm from "./AddFishForm.js";

class Inventory extends React.Component {

	constructor() {
		super();
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillUpdate() {
		console.log("Inventory component updated!");
	}

	handleChange(event, key) {
		const fish = this.props.fishes[key];
		console.log("fish", fish);
		
		//Take a copy of fish from state, and then update it with new data
		const updatedFish = {
			...fish,
			[event.target.name]: event.target.value
		}
		
		this.props.updateFish(key, updatedFish);
	}

	renderInventory(key) {
		const fish = this.props.fishes[key];
		return (
			<div className="fish-edit" key={key}>
				<input type="text" name="name" placeholder="Fish Name" defaultValue={fish.name} onChange={ (event) => this.handleChange(event, key) } />
				<input type="text" name="price" placeholder="Fish Price" defaultValue={fish.price} onChange={ (event) => this.handleChange(event, key) } />
				<select name="status" defaultValue={fish.status} onChange={ (event) => this.handleChange(event, key) } >
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea name="desc" placeholder="Fish Description" defaultValue={fish.desc} onChange={ (event) => this.handleChange(event, key) } ></textarea>
				<input type="text" name="image" placeholder="Fish Image" defaultValue={fish.image} onChange={ (event) => this.handleChange(event, key) } />
				<button onClick={ () => this.props.removeFish(key)}>Remove Fish</button>
			</div>
		)
	}

	render () {
		return (
			<div>
				<h2>and then my Inventory</h2>
				{Object.keys(this.props.fishes).map( (key) => this.renderInventory(key) )}
				<AddFishForm addFish = { this.props.addFish } />
				<button onClick={ this.props.loadSamples }>Load Sample Fishes</button>
			</div>
		)
	}
}

Inventory.propTypes = {
	fishes: React.PropTypes.object.isRequired,
	updateFish: React.PropTypes.func.isRequired,
	removeFish: React.PropTypes.func.isRequired,
	addFish: React.PropTypes.func.isRequired,
	loadSamples: React.PropTypes.func.isRequired
}

export default Inventory;