import React from "react";
import { getFunName } from "../helpers.js";

class StorePicker extends React.Component {
	goToStore (event) {
		event.preventDefault();
		const storeId = this.storeInput.value
		console.log(`I'm going to ${storeId}`);
		this.props.history.push(`/store/${storeId}`);
	}

	render () {
		return (
			<form className="store-selector" onSubmit={ this.goToStore.bind(this) }>
				<h2>Please enter a store</h2>
				<input 
					type="text"
					required
					placeholder="Store Name"
					defaultValue={ getFunName() }
					ref={ (input) => { this.storeInput = input }}
				/>
				<button type="submit">Visit Store --></button>
			</form>
		)
	}
}

StorePicker.propTypes = {
	history: React.PropTypes.object.isRequired
}

export default StorePicker