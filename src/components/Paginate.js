import ReactPaginate from 'react-paginate';
import { CgArrowLongRight, CgArrowLongLeft } from 'react-icons/cg';
import '../files/styles/paginate.css';

const Paginate = ({ pageCount, changePage }) => {
    return ( 
        <>
            <div className="pagination-container">
                <ReactPaginate 
                    previousLabel={<CgArrowLongLeft />}
                    nextLabel={<CgArrowLongRight />}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination-btns"}
                    previousLinkClassName={"previous-btn"}
                    nextLinkClassName={"next-btn"}
                    disabledClassName={"pagination-disabled"}
                    activeClassName={"pagination-active"}
                />
            </div>
        </>
     );
}
 
export default Paginate;