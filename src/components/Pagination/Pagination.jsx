import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css'


var round = "";

export default class ReactPagination extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            perPage:5,
            currentPage:0,
            offset:5,
            pageCount:this.props.total_count,
            limit:this.props.limit
        
        }

      round = Math.ceil( (this.state.pageCount / this.state.limit) );
        

        console.log("senoriootss",round)
    }


    handlePageClick = (e) => {
       
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        console.log('sdfjsdfhjsdfh',selectedPage)
        

        this.setState({
            currentPage:selectedPage,
            offset
        },() => this.props.getAdDetails(this.state.currentPage))
    }
    render(){
        return(

            <>

            <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={round}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    containerClassName={"mypagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    />
            </>

        )
    }
}