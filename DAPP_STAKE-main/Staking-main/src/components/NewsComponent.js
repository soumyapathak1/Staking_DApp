import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class NewsComponent extends Component {
	
	constructor() {
	    super();
	    this.state = {
			articles: [],
			loading: false,
			page: 1,
	    }
	}

	async componentDidMount () {
	    let url = `https://newsapi.org/v2/everything?q=crypto&apiKey=40ac44c76f2b4026be69484770bd565e`;
	    let data = await fetch(url);
	    let parsedData = await data.json();
	    console.log(parsedData);
		this.setState({articles: parsedData.articles})
	}

	handlePrevClick = async ()=>{
		// console.log("p");

		let url = `https://newsapi.org/v2/everything?q=crypto&apiKey=40ac44c76f2b4026be69484770bd565e&page=${this.state.page - 1}`;
	    let data = await fetch(url);
	    let parsedData = await data.json();
	    console.log(parsedData);
		this.setState({articles: parsedData.articles})

		this.setState({
			page: this.state.page - 1,
		})

	}
	handleNextClick = async ()=>{
		// console.log("n");

		let url = `https://newsapi.org/v2/everything?q=crypto&apiKey=40ac44c76f2b4026be69484770bd565e&pageSize=16&page=${this.state.page + 1}`;
	    let data = await fetch(url);
	    let parsedData = await data.json();
	    console.log(parsedData);
		this.setState({articles: parsedData.articles})

		this.setState({
			page: this.state.page +1,
		})
	}

	render() {
		return (
			<div>
				<div className="newscomponent">
				{this.state.articles.map((element)=> {
					return <NewsItem key={element.url} imgurl={element.urlToImage} title={element.title} description={element.description} posturl={element.url} />
				})}

				</div>
				<div className="newscomponent" style={{justifyContent: "space-between", padding: "2% 4%"}}>
					<button disabled={this.state.page <=1} type="button" onClick={this.handlePrevClick} className="btn-primary"  style={{width: "100px"}}>&larr; Previous</button>
					<button type="button" onClick={this.handleNextClick} className="btn-primary" style={{width: "100px"}}>Next &rarr;</button>
				</div>
			</div>
		);
	}
}
