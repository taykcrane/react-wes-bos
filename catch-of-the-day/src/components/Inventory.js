import React from "react";
import AddFishForm from "./AddFishForm.js";
import base from "../base.js"

class Inventory extends React.Component {

	constructor() {
		super();
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.logout = this.logout.bind(this);


		this.state = {
			uid: null,
			owner: null
		}
	}

	componentWillMount() {
		base.onAuth((user) => {
			if(user) {
				this.authHandler(null, {user});
			}
		})
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

	authenticate(provider) {
		console.log("trying to log in with ", provider);
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	authHandler(err, authData) {
		console.log(authData);
		if (err) {
			console.log(err);
			return;
		}

		// grab the store info
		console.log(base.database());
		const storeRef = base.database().ref(this.props.storeId);

		// query firebase once for store data
		storeRef.once("value", (snapshot) => {
			const data = snapshot.val() || {};

			// claim it as our own if there is no owner already
			if (!data.owner) {
				storeRef.set({
					owner: authData.user.uid
				});
			}

			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			})
		});
	}

	renderLogin() {
		return(
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manage your store's inventory</p>
				<button className="facebook" onClick={() => this.authenticate("facebook")}>Log in with Facebook</button>
				<button className="twitter" onClick={() => this.authenticate("twitter")}>Log in with Twitter</button>
			</nav>
		)
	}

	logout() {
		base.unauth();
		this.setState({
			uid: null
		})
	}

	render () {
		const logout = <button onClick={this.logout}>Log out!</button>

		if (!this.state.uid) {
			return <div>{ this.renderLogin() }</div>
		} else if (this.state.uid !== this.state.owner) {
			<div>
				<p>Sorry, you're not the owner of this store.</p>
				{ logout }
			</div>
		}

		return (
			<div>
				<h2>Inventory</h2>
				{ logout }
				{Object.keys(this.props.fishes).map( (key) => this.renderInventory(key) )}
				<AddFishForm addFish = { this.props.addFish } />
				<button onClick={ this.props.loadSamples }>Load Sample Fishes</button>
			</div>
		)
	}

	componentDidMount() {

	}
}

Inventory.propTypes = {
	fishes: React.PropTypes.object.isRequired,
	updateFish: React.PropTypes.func.isRequired,
	removeFish: React.PropTypes.func.isRequired,
	addFish: React.PropTypes.func.isRequired,
	loadSamples: React.PropTypes.func.isRequired,
	storeId: React.PropTypes.string.isRequired
}

export default Inventory;