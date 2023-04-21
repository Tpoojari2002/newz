import React, { Component } from "react";

import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component{
  static defaultProps = {
    country: "in",
    pageSize: "8",
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  articles = [];

  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.props.category}-NewsWorld`;
  }

  async updateNews() {
      this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ef07cdb051d4a839ad62f6afbc1d986&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async () => {
   
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ef07cdb051d4a839ad62f6afbc1d986&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({page: this.state.page +1})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  render() {
    return (
      <div>
        <h1 className="text-center" style={{ margin: "30px 0px", marginTop:"90px" }}>
          News World- top {this.props.category} headline
        </h1>
        {this.state.loading &&<Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
      > 
      <div className="container">
          <div className="row ">
            {this.state.articles.map((element) => {
              return <div className="col col md-4" key={element.url}>
                  <Newsitem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    source={element.source.name}
                    date={element.publishedAt}
                  />
                </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}

export default News;
