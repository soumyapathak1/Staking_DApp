import React, { Component } from "react";
import "./App.css";

export default class NewsItem extends Component {


	render() {
		let {title, description, imgurl, posturl} = this.props;
		return (
			<div className="newscomponentcard">
				<div className="card-image">
					<img src={imgurl} alt=""/>
				</div>
				<div className="card-content">
					<h3>{title}</h3>
					<p>{description}</p>
				</div>
				<a target="_blank" rel="noreferrer" href={posturl}><button className="btn-primary">Read More</button></a>
			</div>
		);
	}
}
