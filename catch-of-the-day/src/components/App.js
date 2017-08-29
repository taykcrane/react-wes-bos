import React from "react";
import Header from "./Header.js";
import Order from "./Order.js";
import Inventory from "./Inventory.js";
import sampleFishes from "../sample-fishes.js";
import Fish from "./Fish.js";
import base from "../base.js";

class App extends React.Component {
	constructor () {
		super();
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeOrder = this.removeOrder.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.state = {
			fishes: {},
			order: {}
		}
	}

	componentWillMount () {
		this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`,
			{
				context: this,
				state: "fishes"
			}
		)

		// Check if there is any order in local storage
		const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`)
		if (localStorageRef) {
			// Update our app component state
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}
	}

	componentWillUnMount () {
		base.removeBinding(this.ref);
	}

	componentWillUpdate (nextProps, nextState) {

		localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.order))
	}

	addFish (fish) {
		const fishes = { ...this.state.fishes };
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		this.setState({ fishes: fishes });
	}

	loadSamples () {
		this.setState({
			fishes: sampleFishes
		})	
	}

	addToOrder (key) {
		const order = {...this.state.order};
		order[key] = order[key] + 1 || 1;
		this.setState({
			order: order
		})
	}

	removeOrder (key) {
		const order = {...this.state.order};
		delete order[key];
		this.setState({
			order: order
		})

	}

	updateFish (key, updatedFish) {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;

		this.setState({
			fishes: fishes
		})
	}

	removeFish (key) {
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({
			fishes: fishes
		})
	}

	render () {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{ Object.keys(this.state.fishes).map(key => { 
							return <Fish 
										key={key} 
										index={key} 
										details={this.state.fishes[key]}
										addToOrder={ this.addToOrder }
									/>
						})}
					</ul>
				</div>
				<Order 
					fishes={this.state.fishes} 
					order={this.state.order} 
					params={this.props.match.params}
					removeOrder={this.removeOrder}
				/>
				<Inventory 
					addFish={ this.addFish } 
					loadSamples={ this.loadSamples } 
					fishes={this.state.fishes}
					updateFish={this.updateFish}
					removeFish={this.removeFish}
				/>
			</div>
		)
	}
}

export default App;