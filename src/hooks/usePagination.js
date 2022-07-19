import { useState } from 'react';


export default function  usePagination (data, itemPerPage) {
    const [pageNumber, setPageNumber] = useState(0);

    const dataPerPage = itemPerPage;
    const pagesVisited = pageNumber * dataPerPage;

    const displayData = data.slice(pagesVisited, pagesVisited + dataPerPage);

    const pageCount = Math.ceil(data.length / dataPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }


    return {
        displayData, pageCount, changePage
    }
            
};